#!/usr/bin/env python3
"""Replace Google Drive image URLs in HTML with Vercel Blob URLs."""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MAP_FILE = ROOT / "scripts" / "blob-url-map.json"

pattern = re.compile(
    r"https://lh3\.googleusercontent\.com/d/([A-Za-z0-9_-]+)(?:=[^\"'\s>]*)?"
)


def main() -> None:
    url_map = json.loads(MAP_FILE.read_text())

    for path in sorted(ROOT.rglob("*.html")):
        text = path.read_text()
        original = text

        def replace(match: re.Match[str]) -> str:
            file_id = match.group(1)
            if file_id not in url_map:
                raise KeyError(f"Missing blob URL for {file_id} in {path}")
            return url_map[file_id]

        text = pattern.sub(replace, text)
        if text != original:
            path.write_text(text)
            print(f"updated {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
