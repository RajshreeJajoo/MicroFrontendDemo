#!/usr/bin/env bash
# Sets GitHub repo About section (description, homepage, topics).
# Requires: gh auth login (one-time)
set -euo pipefail

REPO="RajshreeJajoo/MicroFrontendDemo"
LIVE_URL="https://micro-frontend-demo-eta.vercel.app"

if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI not logged in. Run: gh auth login"
  exit 1
fi

gh repo edit "$REPO" \
  --description "Micro-frontend e-commerce demo — Vite Module Federation, React 19, shell routing, cross-MFE events" \
  --homepage "$LIVE_URL"

gh api -X PUT "repos/$REPO/topics" --input - <<EOF
{"names":["micro-frontends","module-federation","vite","react","reactjs","architecture","vercel","portfolio"]}
EOF

echo "✅ GitHub About updated for $REPO"
echo "   Homepage: $LIVE_URL"
