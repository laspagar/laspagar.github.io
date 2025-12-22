#!/usr/bin/env python3
"""
Bulk download product images defined in `_data/product_images.yml` into `assets/products/`.

Usage:
  python3 scripts/fetch_images_bulk.py

This script requires `requests` and `PyYAML` (install with `pip install requests pyyaml`).
It reads `_data/product_images.yml` where keys are product slugs and values are remote URLs.
"""
import sys
from pathlib import Path
import requests
import yaml

BASE = Path(__file__).resolve().parents[1]
DATA_FILE = BASE / '_data' / 'product_images.yml'
OUT_DIR = BASE / 'assets' / 'products'

def download(url, dest_path):
    resp = requests.get(url, stream=True)
    resp.raise_for_status()
    ctype = resp.headers.get('content-type', '')
    if not ctype.startswith('image/'):
        print(f"Skipping {url}: content-type={ctype} is not an image")
        return False
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    with open(dest_path, 'wb') as fh:
        for chunk in resp.iter_content(8192):
            fh.write(chunk)
    print(f"Downloaded {url} -> {dest_path}")
    return True

def main():
    if not DATA_FILE.exists():
        print(f"Mapping file not found: {DATA_FILE}")
        sys.exit(2)
    with open(DATA_FILE, 'r') as fh:
        mapping = yaml.safe_load(fh)
    if not mapping:
        print("No entries in mapping file.")
        sys.exit(0)
    for slug, url in mapping.items():
        if not url:
            print(f"No URL for {slug}, skipping")
            continue
        ext = Path(url).suffix or '.jpg'
        dest = OUT_DIR / f"{slug}{ext}"
        try:
            ok = download(url, dest)
            if not ok:
                print(f"Did not download image for {slug}")
        except Exception as e:
            print(f"Failed {slug}: {e}")

if __name__ == '__main__':
    main()
