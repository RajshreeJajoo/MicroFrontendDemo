# Micro-Frontend Demo

A micro-frontend architecture demo using **Vite Module Federation** with React 19. A shell application dynamically loads independently deployable product and cart micro-apps at runtime.

## Architecture

```
┌─────────────────────────────────────────────────┐
│              Shell App  (port 3000)              │
│         Host / orchestrator application          │
│                                                  │
│   ┌──────────────────┐  ┌──────────────────┐   │
│   │  Product MFE     │  │   Cart MFE       │   │
│   │  (port 3001)     │  │   (port 3002)    │   │
│   │  remoteEntry.js  │  │  remoteEntry.js  │   │
│   └──────────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────┘
```

### How It Works

1. **Product App** and **Cart App** are standalone Vite apps that expose components via Module Federation
2. **Shell App** declares remotes pointing to each app's `remoteEntry.js`
3. Shell uses `React.lazy()` + `Suspense` to load remote components at runtime
4. React and React DOM are shared as singleton dependencies across all apps

## Tech Stack

| App | Role | Port | Key Packages |
|-----|------|------|-------------|
| `shell/` | Host / orchestrator | 3000 | `@originjs/vite-plugin-federation` |
| `product-app/` | Product micro-frontend | 3001 | Exposes `./Product` |
| `cart-app/` | Cart micro-frontend | 3002 | Exposes `./Cart` |

- React 19
- Vite 7
- Module Federation via `@originjs/vite-plugin-federation`

## Getting Started

### Prerequisites

- Node.js 18+

### Install Dependencies

Each app has its own dependencies. Install all three:

```bash
cd product-app && npm install && cd ..
cd cart-app && npm install && cd ..
cd shell && npm install && cd ..
```

### Run in Development

**Important:** Start remotes before the shell. Open three terminal windows:

```bash
# Terminal 1 — Product micro-frontend
cd product-app
npm run dev

# Terminal 2 — Cart micro-frontend
cd cart-app
npm run dev

# Terminal 3 — Shell (host)
cd shell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

Build remotes first, then the shell:

```bash
cd product-app && npm run build && cd ..
cd cart-app && npm run build && cd ..
cd shell && npm run build && cd ..
```

Serve the built `dist/` folders and update remote URLs in `shell/vite.config.js` to match your deployment URLs.

## Project Structure

```
MicroFrontendDemo/
├── shell/              # Host app — loads remotes
│   ├── src/App.jsx
│   └── vite.config.js
├── product-app/        # Remote — exposes Product component
│   ├── src/Product.jsx
│   └── vite.config.js
└── cart-app/           # Remote — exposes Cart component
    ├── src/Cart.jsx
    └── vite.config.js
```

## Key Configuration

**Shell** (`shell/vite.config.js`) — declares remotes:

```js
remotes: {
  product_app: "http://localhost:3001/assets/remoteEntry.js",
  cart_app: "http://localhost:3002/assets/remoteEntry.js",
}
```

**Remote** (`product-app/vite.config.js`) — exposes a module:

```js
exposes: {
  "./Product": "./src/Product.jsx",
}
```

## Why Micro-Frontends?

- **Independent deployment** — Teams can ship product and cart features separately
- **Technology flexibility** — Each micro-app can use different versions or frameworks
- **Scalable teams** — Clear ownership boundaries per domain
- **Runtime composition** — Shell loads remotes dynamically without rebuilding

## Author

**Rajshree Jajoo** — Frontend Engineer | React | Next.js | TypeScript

- [LinkedIn](https://www.linkedin.com/in/rajshree-jajoo-297049184)
- [GitHub](https://github.com/RajshreeJajoo)

If this project helped you, consider giving it a star.
