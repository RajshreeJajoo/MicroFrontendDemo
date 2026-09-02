# Micro-Frontend Demo

> Shell + Product + Cart — Vite Module Federation · React 19 · Runtime composition

[![Live Demo](https://img.shields.io/badge/demo-vercel-black?style=flat-square&logo=vercel)](https://micro-frontend-demo-eta.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Module Federation](https://img.shields.io/badge/Module_Federation-Vite-6366F1?style=flat-square)](https://github.com/originjs/vite-plugin-federation)
[![GitHub](https://img.shields.io/badge/source-GitHub-181717?style=flat-square&logo=github)](https://github.com/RajshreeJajoo/MicroFrontendDemo)

A micro-frontend architecture demo using **Vite Module Federation** with React 19. A shell application dynamically loads independently deployable **Product** and **Cart** micro-apps at runtime — with **shell-owned routing**, **shared event contracts**, **persistent cart**, and **cross-MFE Add to Cart**.

**Live Demo:** https://micro-frontend-demo-eta.vercel.app

**Resume line:** *Architected a micro-frontend e-commerce demo with Vite Module Federation — shell host with route-level remote composition, shared `@mfe/contracts` event bus, localStorage cart persistence, env-based remote URLs, error boundaries with retry, and GitHub Actions CI.*

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Shell App  (port 3000)                       │
│              Host / orchestrator application                 │
│                                                              │
│   ┌─────────────────────┐    ┌─────────────────────┐        │
│   │   Product MFE       │    │    Cart MFE         │        │
│   │   (port 3001)       │    │    (port 3002)      │        │
│   │   remoteEntry.js    │    │    remoteEntry.js   │        │
│   │                     │    │                     │        │
│   │  [Add to Cart] ────────► │  listens for events │        │
│   └─────────────────────┘    └─────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
         Event bus: window CustomEvent("mfe:add-to-cart")
```

### How It Works

1. **Product App** and **Cart App** are standalone Vite apps that expose components via Module Federation
2. **Shell App** declares remotes pointing to each app's `remoteEntry.js`
3. Shell uses `React.lazy()` + `Suspense` to load remote components at runtime
4. React and React DOM are **shared singletons** across all apps
5. **Cross-MFE communication:** Product dispatches `mfe:add-to-cart` events; Cart subscribes and updates its local state

## Tech Stack

| App | Role | Port | Exposes |
|-----|------|------|---------|
| `shell/` | Host / orchestrator | 3000 | — |
| `product-app/` | Product catalog MFE | 3001 | `./Product` |
| `cart-app/` | Shopping cart MFE | 3002 | `./Cart` |

- React 19 · Vite 7 · `@originjs/vite-plugin-federation`

## Quick Start

### Prerequisites

- Node.js 18+

### Install

```bash
git clone https://github.com/RajshreeJajoo/MicroFrontendDemo.git
cd MicroFrontendDemo
npm run install:all
```

### Run (one command — all 3 apps)

```bash
npm run dev:all
```

Open [http://localhost:3000](http://localhost:3000) only — use **Shop** and **Cart** routes, search/filter products, click **Add to Cart**, refresh to see persistence.

> **Note:** Module Federation remotes must be **built** before the shell can load them. `dev:all` builds product-app and cart-app, serves them with `vite preview` on :3001/:3002 (with rebuild-on-change), and runs the shell with `vite dev` on :3000.

## Features

| Feature | Description |
|---------|-------------|
| **Shell routing** | `/` shop (Product + Cart), `/cart` dedicated cart view |
| **Shared contracts** | `packages/mfe-contracts` — event names, storage, pub/sub helpers |
| **Cart persistence** | `localStorage` — survives page refresh |
| **Search & filter** | Product remote with category chips + search |
| **Shell nav badge** | Live cart count/total via `mfe:cart-sync` events |
| **Toast notifications** | Shell listens for add-to-cart events |
| **Remote retry** | Lazy import retry + error boundary reload |
| **Env-based remotes** | `VITE_*_REMOTE_URL` in `shell/.env` |
| **CI** | GitHub Actions — lint + build all apps |

See [ARCHITECTURE.md](./ARCHITECTURE.md) for design decisions.

### Run manually (3 terminals)

```bash
# Terminal 1 — Product remote (build + watch + preview)
cd product-app && npm run build && npx concurrently "npm run build:watch" "npm run preview"

# Terminal 2 — Cart remote
cd cart-app && npm run build && npx concurrently "npm run build:watch" "npm run preview"

# Terminal 3 — Shell host (after remotes are serving remoteEntry.js)
cd shell && npm run dev
```

## Cross-MFE Communication

Product and Cart are **independently deployed** apps with no shared React state. They import the same contract from `packages/mfe-contracts`:

```js
import { dispatchAddToCart, CART_EVENTS } from "@mfe/contracts";

// product-app — dispatch
dispatchAddToCart({ id: 1, name: "Keyboard", price: 79.99 });

// cart-app — subscribe
subscribeMfeEvent(CART_EVENTS.ADD, (event) => addItem(event.detail));

// shell — nav badge
subscribeMfeEvent(CART_EVENTS.SYNC, (event) => setCount(event.detail.count));
```

## Build for Production

```bash
npm run build:all
```

Serve built remotes, then set production URLs in `shell/.env` (see `shell/.env.example`):

```bash
cd product-app && npm run serve   # :3001
cd cart-app && npm run serve      # :3002
cd shell && npm run preview       # :3000
```

### Deploy to Vercel

Three independent Vercel projects (shell + 2 remotes):

```bash
npm run install:all
npm run deploy:vercel   # requires: npx vercel login
```

| App | Production URL |
|-----|----------------|
| Shell (demo) | https://micro-frontend-demo-eta.vercel.app |
| Product remote | https://micro-frontend-product.vercel.app |
| Cart remote | https://micro-frontend-cart.vercel.app |

### GitHub repo setup (About section)

After `gh auth login`, run once:

```bash
npm run github:setup
```

Sets repo description, homepage URL, and topics.

## Project Structure

```
MicroFrontendDemo/
├── package.json          # install:all, dev:all, build:all
├── ARCHITECTURE.md       # Design decisions & production patterns
├── packages/mfe-contracts/  # Shared event bus + cart storage
├── shell/                # Host — routing, nav, toasts, remote orchestration
├── product-app/          # Remote — catalog, search/filter, Add to Cart
└── cart-app/             # Remote — cart state, persistence, event listener
```

## Key Configuration

**Shell remotes** (`shell/vite.config.js`):

```js
remotes: {
  product_app: "http://localhost:3001/assets/remoteEntry.js",
  cart_app: "http://localhost:3002/assets/remoteEntry.js",
}
```

**Remote expose** (`product-app/vite.config.js`):

```js
exposes: {
  "./Product": "./src/Product.jsx",
}
```

## Why Micro-Frontends?

- **Independent deployment** — ship Product and Cart features separately
- **Team scalability** — clear domain ownership per micro-app
- **Runtime composition** — shell loads remotes without rebuilding
- **Technology flexibility** — each MFE can evolve independently

## Author

**Rajshree Jajoo** — Frontend Engineer | React | Next.js | TypeScript

- [LinkedIn](https://www.linkedin.com/in/rajshree-jajoo-297049184)
- [GitHub](https://github.com/RajshreeJajoo)
- [Live Demo](https://micro-frontend-demo-eta.vercel.app)

If this project helped you, consider giving it a star.
