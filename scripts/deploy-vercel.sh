#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "▶ Building remotes..."
npm run build --prefix "$ROOT/product-app"
npm run build --prefix "$ROOT/cart-app"

echo "▶ Deploying Product remote..."
PRODUCT_URL="$(cd "$ROOT/product-app" && npx vercel deploy --prod --yes 2>&1 | tail -1)"
echo "   Product: $PRODUCT_URL"

echo "▶ Deploying Cart remote..."
CART_URL="$(cd "$ROOT/cart-app" && npx vercel deploy --prod --yes 2>&1 | tail -1)"
echo "   Cart: $CART_URL"

PRODUCT_REMOTE="${PRODUCT_URL%/}/assets/remoteEntry.js"
CART_REMOTE="${CART_URL%/}/assets/remoteEntry.js"

echo "▶ Building & deploying Shell..."
export VITE_PRODUCT_REMOTE_URL="$PRODUCT_REMOTE"
export VITE_CART_REMOTE_URL="$CART_REMOTE"
npm run build --prefix "$ROOT/shell"
SHELL_URL="$(cd "$ROOT/shell" && npx vercel deploy --prod --yes 2>&1 | tail -1)"

echo ""
echo "✅ Live demo: $SHELL_URL"
echo "   Product remote: $PRODUCT_REMOTE"
echo "   Cart remote:    $CART_REMOTE"
