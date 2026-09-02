#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

deploy_project() {
  local config="$1"
  local project="$2"
  shift 2
  local -a extra_env=("$@")

  rm -rf .vercel

  local -a cmd=(npx vercel deploy --prod --yes --local-config "$config" --name "$project")
  for env_var in "${extra_env[@]}"; do
    cmd+=(--build-env "$env_var")
  done

  local output
  output="$("${cmd[@]}" 2>&1)"
  echo "$output"

  local url="https://${project}.vercel.app"
  if curl -sfI "${url}/" >/dev/null 2>&1; then
    echo "$url"
    return
  fi

  echo "$output" | grep -Eo 'https://[^ ]+\.vercel\.app' | tail -1
}

echo "▶ Deploying Product remote..."
PRODUCT_URL="$(deploy_project vercel.product.json micro-frontend-product | tail -1)"
echo "   Product: $PRODUCT_URL"

echo "▶ Deploying Cart remote..."
CART_URL="$(deploy_project vercel.cart.json micro-frontend-cart | tail -1)"
echo "   Cart: $CART_URL"

PRODUCT_REMOTE="${PRODUCT_URL%/}/assets/remoteEntry.js"
CART_REMOTE="${CART_URL%/}/assets/remoteEntry.js"

echo "▶ Deploying Shell..."
SHELL_URL="$(deploy_project vercel.shell.json micro-frontend-demo \
  "VITE_PRODUCT_REMOTE_URL=$PRODUCT_REMOTE" \
  "VITE_CART_REMOTE_URL=$CART_REMOTE" | tail -1)"

echo ""
echo "✅ Live demo: $SHELL_URL"
echo "   Product remote: $PRODUCT_REMOTE"
echo "   Cart remote:    $CART_REMOTE"
