import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "");
  const productRemote =
    env.VITE_PRODUCT_REMOTE_URL ??
    "http://localhost:3001/assets/remoteEntry.js";
  const cartRemote =
    env.VITE_CART_REMOTE_URL ??
    "http://localhost:3002/assets/remoteEntry.js";

  return {
    plugins: [
      react(),
      federation({
        name: "shell",
        remotes: {
          product_app: productRemote,
          cart_app: cartRemote,
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
    server: {
      port: 3000,
    },
  };
});
