#!/usr/bin/env python3
"""
Simple script to download product images to `assets/products/`.

Usage:
  python3 scripts/fetch_images.py https://example.com/image.jpg assets/products/imagename.jpg

This script is intentionally minimal — run locally and verify images before committing.
"""
import sys
from pathlib import Path

try:
    import requests
except ImportError:
    print("requests not installed. Run: pip install requests")
    sys.exit(1)

def download(url, dest):
    dest_path = Path(dest)
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    resp = requests.get(url, stream=True)
    resp.raise_for_status()
    ctype = resp.headers.get('content-type', '')
    if not ctype.startswith('image/'):
        print(f"URL did not return an image (content-type={ctype}): {url}")
        return False
    with open(dest_path, 'wb') as fh:
        for chunk in resp.iter_content(8192):
            fh.write(chunk)
    print(f"Saved: {dest_path}")
    return True

def main():
    if len(sys.argv) < 3:
        print("Usage: fetch_images.py <image-url> <dest-path>")
        sys.exit(2)
    url = sys.argv[1]
    dest = sys.argv[2]
    ok = download(url, dest)
    if not ok:
        print("Download failed or not an image; destination not written.")

if __name__ == '__main__':
    main()
