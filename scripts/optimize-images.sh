#!/usr/bin/env bash
# Download and optimize Google Drive-hosted site images into ./images/site/
# Usage: ./scripts/optimize-images.sh
#
# Requires: curl, cwebp
# After running, update HTML src attributes to point at local /images/site/ files.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT/images/site"
mkdir -p "$OUT_DIR"

mapfile -t URLS < <(rg -o 'https://lh3\.googleusercontent\.com/d/[A-Za-z0-9_-]+(?:=[^"\s>]*)?' "$ROOT" --glob '*.html' | sort -u)

echo "Found ${#URLS[@]} unique image URLs"

for url in "${URLS[@]}"; do
  id="${url##*/d/}"
  id="${id%%=*}"
  out="$OUT_DIR/${id}.webp"

  if [[ -f "$out" ]]; then
    echo "skip $id"
    continue
  fi

  echo "fetch $id"
  tmp="$(mktemp)"
  curl -sL "https://lh3.googleusercontent.com/d/${id}=w1600-rw" -o "$tmp"
  cwebp -q 82 "$tmp" -o "$out" >/dev/null
  rm -f "$tmp"
done

echo "Done. Optimized files are in images/site/"
