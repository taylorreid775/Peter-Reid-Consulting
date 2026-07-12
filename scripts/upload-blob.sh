#!/usr/bin/env bash
# Upload optimized images from images/site/ to Vercel Blob.
# Requires BLOB_READ_WRITE_TOKEN in .env.local (created by `vercel blob create-store`).

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT/images/site"
MAP_FILE="$ROOT/scripts/blob-url-map.json"

if [[ ! -d "$OUT_DIR" ]]; then
  echo "Run ./scripts/optimize-images.sh first."
  exit 1
fi

if [[ -f "$ROOT/.env.local" ]]; then
  export $(grep -v '^#' "$ROOT/.env.local" | grep BLOB_READ_WRITE_TOKEN | xargs)
fi
unset VERCEL_OIDC_TOKEN

echo "{" > "$MAP_FILE"
first=1

for file in "$OUT_DIR"/*.webp; do
  [[ -f "$file" ]] || continue
  id="$(basename "$file" .webp)"
  pathname="site/${id}.webp"

  echo "upload $id"
  output="$(npx vercel@latest blob put "$file" --pathname "$pathname" --access public --allow-overwrite 2>&1)"
  url="$(echo "$output" | rg -o 'https://[^[:space:]]+\.webp' | tail -1)"

  if [[ -z "$url" ]]; then
    echo "Failed to upload $id"
    echo "$output"
    exit 1
  fi

  if [[ $first -eq 1 ]]; then
    first=0
  else
    echo "," >> "$MAP_FILE"
  fi
  printf '  "%s": "%s"' "$id" "$url" >> "$MAP_FILE"
done

echo "" >> "$MAP_FILE"
echo "}" >> "$MAP_FILE"
echo "Wrote $MAP_FILE"
