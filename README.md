# Micro-Frontend Demo

> Shell + Product + Cart — Vite Module Federation · React 19 · Runtime composition

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Module Federation](https://img.shields.io/badge/Module_Federation-Vite-6366F1?style=flat-square)](https://github.com/originjs/vite-plugin-federation)
[![GitHub](https://img.shields.io/badge/source-GitHub-181717?style=flat-square&logo=github)](https://github.com/RajshreeJajoo/MicroFrontendDemo)

A micro-frontend architecture demo using **Vite Module Federation** with React 19. A shell application dynamically loads independently deployable **Product** and **Cart** micro-apps at runtime — with **cross-MFE Add to Cart** via a browser event bus.

**Resume line:** *Built a micro-frontend e-commerce demo using Vite Module Federation — shell host loads Product and Cart remotes at runtime with shared React dependencies and cross-app communication via custom DOM events.*

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

Open [http://localhost:3000](http://localhost:3000) only — click **Add to Cart** on products → Cart remote updates live.

> **Note:** Module Federation remotes must be **built** before the shell can load them. `dev:all` builds product-app and cart-app, serves them with `vite preview` on :3001/:3002 (with rebuild-on-change), and runs the shell with `vite dev` on :3000.

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

Product and Cart are **independently deployed** apps with no shared React state. Communication uses the browser event bus:

```js
// product-app — dispatch
window.dispatchEvent(
  new CustomEvent("mfe:add-to-cart", { detail: product })
);

// cart-app — subscribe
window.addEventListener("mfe:add-to-cart", (event) => {
  addItem(event.detail);
});
```

This pattern works across runtime boundaries without coupling the micro-frontends.

## Build for Production

```bash
npm run build:all
```

Serve built remotes, then update URLs in `shell/vite.config.js`:

```bash
cd product-app && npm run serve   # :3001
cd cart-app && npm run serve      # :3002
cd shell && npm run preview       # :3000
```

## Project Structure

```
MicroFrontendDemo/
├── package.json          # install:all, dev:all, build:all
├── shell/                # Host — loads remotes + error boundaries
├── product-app/          # Remote — product catalog + Add to Cart
└── cart-app/             # Remote — cart state + event listener
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

If this project helped you, consider giving it a star.
