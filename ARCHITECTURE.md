# Architecture — MicroFrontendDemo

This document describes production-oriented patterns used in the demo beyond basic Module Federation wiring.

## System overview

| App | Role | Port | Responsibility |
|-----|------|------|----------------|
| `shell/` | Host | 3000 | Routing, layout, remote orchestration, global UX (nav, toasts) |
| `product-app/` | Remote | 3001 | Product catalog, search/filter, dispatches cart events |
| `cart-app/` | Remote | 3002 | Cart state, persistence, listens to cart events |
| `packages/mfe-contracts/` | Shared contract | — | Event names, storage helpers, pub/sub utilities |

Each remote is independently buildable and deployable. The shell loads them at runtime via `remoteEntry.js`.

## Module Federation

- **Plugin:** `@originjs/vite-plugin-federation`
- **Shared singletons:** `react`, `react-dom` (one instance across host + remotes)
- **Dev constraint:** remotes must be **built** before the shell can consume `remoteEntry.js`; `npm run dev:all` handles build → preview → shell dev
- **Prod URLs:** configured via `VITE_PRODUCT_REMOTE_URL` and `VITE_CART_REMOTE_URL` in `shell/.env`

## Shell orchestration

The shell owns cross-cutting concerns:

1. **Routing** (`react-router-dom`) — `/` shop view, `/cart` dedicated cart route
2. **Remote loading** — `React.lazy` + retry wrapper (`loadRemote`) for transient network failures
3. **Error isolation** — per-remote error boundaries with retry
4. **Global UI** — cart badge/total in nav, toast on add-to-cart

Remotes remain unaware of shell routing; they only expose federated components.

## Shared contracts (`@mfe/contracts`)

Duplicated event strings across MFEs are a common source of production bugs. This repo uses a small shared contract package imported via Vite alias:

```js
import { dispatchAddToCart, CART_EVENTS } from "@mfe/contracts";
```

**Events:**

| Event | Producer | Consumer |
|-------|----------|----------|
| `mfe:add-to-cart` | Product remote | Cart remote, Shell (toast) |
| `mfe:remove-from-cart` | Cart remote | Cart remote |
| `mfe:cart-clear` | Cart remote | Cart remote |
| `mfe:cart-sync` | Cart remote | Shell (nav badge) |

**Why CustomEvents instead of shared React state?**

- No compile-time coupling between remotes
- Works across independently deployed bundles
- Mirrors how teams integrate via browser APIs or message buses in production

Trade-off: payloads are not type-checked at build time (TypeScript + a published contract package would be the next step at scale).

## Cart persistence

Cart items persist in `localStorage` under `mfe:cart`. On every change, the cart remote:

1. Saves to storage
2. Dispatches `mfe:cart-sync` so the shell nav reflects count/total without importing Cart state

Refresh the page — cart survives.

## Resilience patterns

| Pattern | Location | Purpose |
|---------|----------|---------|
| Lazy import retry | `shell/src/utils/loadRemote.js` | Recover from failed chunk fetch |
| Error boundary + retry | `RemoteErrorBoundary`, `RemoteSlot` | Isolate remote render failures |
| Loading skeletons | `ShopPage` | Per-remote Suspense fallback |
| `wait-on` in dev | root `dev:all` | Shell starts after remotes expose federation entry |

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on every push/PR:

- `npm run install:all`
- `npm run lint:all`
- `npm run build:all`

This verifies all three apps still compile together.

## Production deployment checklist

1. Build each app: `npm run build:all`
2. Deploy `product-app/dist` and `cart-app/dist` to separate origins/CDN paths
3. Set shell env vars to production `remoteEntry.js` URLs
4. Ensure CORS headers on remote static hosts (see `server.js` in remotes)
5. Deploy shell separately — ship shell without rebuilding remotes when only Cart changes

## Future extensions (not in scope for this demo)

- TypeScript contract package published to npm/registry
- E2E tests (Playwright) across federation boundary
- Auth token propagation from shell to remotes
- Feature-flag driven dynamic remote registration
