import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "cart_app",
      filename: "remoteEntry.js",
      exposes: {
        "./Cart": "./src/Cart.jsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  resolve: {
    alias: {
      "@mfe/contracts": path.resolve(
        __dirname,
        "../packages/mfe-contracts/index.js"
      ),
    },
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    emptyOutDir: false,
  },
  server: {
    port: 3002,
    cors: true,
  },
  preview: {
    port: 3002,
    strictPort: true,
    cors: true,
  },
});
