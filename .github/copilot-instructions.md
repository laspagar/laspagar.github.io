Purpose
-------
This repository is a Jekyll-based static site (Kharisma Steel — Indonesian steel fabrication/construction services) served via GitHub Pages. It features blog content, a product catalog, and automated content generation tools.

Quick Architecture (big picture)
--------------------------------
**Content Layers:**
- Blog posts: `_posts/` with Jekyll naming `YYYY-MM-DD-slug.md` (12 posts as of 2025-12)
- Products catalog: `_products/` directory (12 product pages); each product is a separate markdown file
- Pages: `index.md`, `archive.md`, `tentang-kami.md`, `garansi.md`, etc. (Indonesian site)
- Config: `_config.yml` (collections setup, plugins, site metadata)

**Presentation:**
- `_layouts/`: `default.html`, `post.html`, `home.html`, `product.html`, `products.html` (product listing page)
- `_includes/`: `head.html`, `header.html`, `footer.html`, `navlinks.html`, `sharelinks.html`, `sidebar.html`
- CSS: `css/override.css` for site customizations (keep vendor CSS in `js/highlightjs/` untouched)
- JS: `js/highlightjs/` contains syntax highlighting (languages/ and styles/ subdirs)

**Automation & Tools:**
- `bot-posting/` — Node.js CLI for rapid article/product creation (npm run post:article, npm run post:product)
- `scripts/` — Python utilities for image fetching (fetch_images.py, scrape_bintang_images.py)
- `_data/product_images.yml` — manages product image mappings

**Output:**
- `jekyll build` generates `_site/`; GitHub Pages auto-builds on push to `main`

Developer workflows (discovered / verifiable)
-------------------------------------------
**Jekyll local preview:**
```bash
bundle install
bundle exec jekyll serve --livereload
```
Runs on http://127.0.0.1:4000; rebuilds on file changes.

**Bot-based content creation (recommended for posts/products):**
```bash
cd bot-posting
npm install              # One-time setup
npm run post:article    # Interactive CLI → creates _posts/YYYY-MM-DD-title.md
npm run post:product    # Interactive CLI → creates _products/name.md
```
Both scripts use `slugify`, `dayjs`, `inquirer`, and helper utilities to generate valid YAML front matter and markdown files. See `bot-posting/README.md` for full examples.

**Python image utilities (optional):**
```bash
python3 scripts/fetch_images.py <url> <dest_path>     # Download single image
python3 scripts/scrape_bintang_images.py               # Bulk scrape (requires setup)
```

**Build & deploy:**
- `jekyll build` or `bundle exec jekyll build` → inspect `_site/`
- Push to `main` → GitHub Pages auto-builds and publishes

Project-specific conventions and patterns
----------------------------------------
**Blog post front matter (YYYY-MM-DD-slug.md):**
```markdown
---
layout: post
title: "Article Title Here"
date: 2025-12-22 09:00:00 +0700
description: Short excerpt for previews and meta tags
image: https://example.com/image.png
categories: [kanopi, pagar, tangga, balkon, pintu, studi-kasus, finishing, tips, harga]
tags: [comma-separated, seo-keywords, in-indonesian]
---
```
- Date format: `YYYY-MM-DD HH:MM:SS +0700` (Jakarta timezone)
- Categories are predefined (see bot-posting/bin/create-article.js for full list)
- Image is typically a Google Photos or CDN URL
- Bot auto-generates slug from title; manually created posts must follow Jekyll date-slug convention

**Product page front matter (_products/slug.md):**
```markdown
---
title: "Product Name | Subheading"
price: Rp X.XXX / m² or Rp X juta
category: Kanopi | Pagar | Tangga | Railing | Pintu
image: https://example.com/image.png
description: SEO-optimized product summary (appears in listing)
keywords: seo-keyword-1, seo-keyword-2, lokasi-bandung
---
```
- Uses `product.html` layout (auto-set by Jekyll collections config)
- Price format is freeform text (e.g., "Rp 450rb/m²" or "Mulai Rp 450rb/m²")
- Categories must match _config.yml collection scope (see collections config)
- Bot enforces these fields; manual edits should preserve structure

**Category taxonomy:**
- **Kanopi** (roof/canopy) — most popular, 6+ products
- **Pagar** (fencing) — laser-cut and WPC variants
- **Tangga** (stairs) — iron/minimalist styles
- **Railing** (balcony railing)
- **Pintu** (doors)
- **Finishing** (coating, powder coat, galvanize) — for blog posts only
- **Blog post tags** are separate and SEO-focused (use Indonesian terms + modifiers like "minimalis", "bandung", "harga")

**Layout responsibilities:**
- `default.html` — base template (head, header, footer included)
- `post.html` — blog article layout (extends default)
- `product.html` — single product page (extends default)
- `products.html` — product listing with filter/search (iterates over site.products)
- Never modify vendor layouts; use `_includes/` for reusable partials

**Language & locale:**
- Site is in Indonesian (Bahasa Indonesia)
- Slug/filename: lowercase-with-hyphens
- Title, description, content: Indonesian language
- Timezone: +0700 (Jakarta/Bandung local time)

Integration points and external deps
-----------------------------------
**Bot automation (Node.js):**
- `bot-posting/bin/create-article.js` — interactive CLI using `inquirer` for prompts
  - Input: title, description, content (optional), categories (checkbox), tags (comma-separated), author
  - Output: `_posts/YYYY-MM-DD-slugified-title.md` with valid front matter
  - Uses: `slugify` (title→slug), `dayjs` (auto-date), `chalk` (colors), `fs` (file write)
  - Helper: `bot-posting/utils/helper.js` exports `generateFrontMatter()` for programmatic use

- `bot-posting/bin/create-product.js` — interactive CLI for product creation
  - Input: name, price, category (select), description, image path, keywords, content (optional)
  - Output: `_products/slugified-name.md` with valid product front matter
  - Follows same pattern as article bot (uses inquirer, slugify, dayjs)

**Python utilities (optional, manual use):**
- `scripts/fetch_images.py` — lightweight image downloader
  - Usage: `python3 scripts/fetch_images.py <url> <destination>`
  - Requires: `requests` library (install via `pip install requests`)
  - Purpose: Download product images to `assets/products/` for local storage (optional; URLs can be external)

- `scripts/scrape_bintang_images.py` — bulk image scraper (requires additional setup)
  - For bulk product image sourcing; not commonly used in daily workflow
  - Requires credentials or local image directory

**Data mappings:**
- `_data/product_images.yml` — YAML map of product names to image paths/URLs (optional reference; not required for products to display)

**Jekyll plugins (from _config.yml):**
- `jekyll-feed` — auto-generates RSS feed at `/feed.xml`
- `jekyll-sitemap` — auto-generates `sitemap.xml` for SEO
- Custom `titles_from_headings` config strips h1 from collections

**Syntax highlighting:**
- `js/highlightjs/highlight.min.js` + language files in `languages/` + styles in `styles/`
- Site uses HighlightJS (not Pygments); see `css/override.css` for any custom theme tweaks
- Do NOT edit minified files; if updating HighlightJS, replace entire directory from upstream

Safe edit guidelines for AI agents
---------------------------------
- When editing content, preserve YAML front matter and the post filename date format.
- For layout changes, open `_layouts/default.html` and `_layouts/post.html` to understand markup and Liquid variables before editing.
- For global style changes, modify `css/override.css` instead of vendor CSS; this keeps upstream assets intact.
- To preview a change locally, run `bundle exec jekyll serve` and verify output under `http://127.0.0.1:4000/` or `_site/` directory.
- When adding new assets, keep paths relative and reference them from layouts/includes with site variables where appropriate.
- **DO NOT** manually create or edit post/product files unless absolutely necessary; prefer using the bot scripts (`npm run post:article` or `npm run post:product`). If manual creation is required:
  - Post: filename must be `YYYY-MM-DD-slug.md` and placed in `_posts/`
  - Product: slug must match filename, placed in `_products/`, and category must exist in `_config.yml` collections
- Never commit `node_modules/` or `Gemfile.lock` changes without intent; keep these stable for reproducible builds

Examples (how to perform common edits)
-------------------------------------
- **Add a new post:** Use `cd bot-posting && npm run post:article` for interactive creation, OR manually create `_posts/YYYY-MM-DD-your-title.md` with proper front matter (layout, title, date format, categories, tags).
- **Add a new product:** Use `cd bot-posting && npm run post:product` for interactive creation, OR manually create `_products/slug-name.md` with title, price, category, image, description, keywords in front matter.
- **Update navigation:** Edit `_includes/navlinks.html` to add/remove links; then run local preview to confirm.
- **Change header metadata:** Edit `_includes/head.html` and adjust `_config.yml` if adding site-wide values.
- **Bulk image download (optional):** Use `python3 scripts/fetch_images.py <url> assets/products/filename.jpg` to cache images locally (external URLs are also acceptable).

What I couldn't discover automatically
-------------------------------------
- No Gemfile or explicit plugin list was found in the repository snapshot. If this project uses a `Gemfile` or custom GitHub Actions for build/deploy, provide those files or the typical local setup so instructions can be expanded.
- Any external analytics or CI integrations (e.g., Google Analytics, Netlify) were not found; tell me if present so I can document them.

Key directories and critical files reference
---------------------------------------------
| Path | Purpose | When to edit |
|------|---------|-------------|
| `_posts/` | Blog articles | Use bot or create manually with correct date-slug naming |
| `_products/` | Product pages | Use bot or create manually with category matching _config.yml |
| `_layouts/` | Page templates (post.html, product.html, default.html) | Layout structure, Liquid logic, page rendering |
| `_includes/` | Reusable partials (navlinks.html, footer.html, sharelinks.html) | Navigation, footer, header customizations |
| `bot-posting/` | Node.js automation scripts for content creation | Automation logic, CLI prompts, front matter generation |
| `scripts/` | Python utilities for image management | Image fetching, bulk operations |
| `_config.yml` | Site configuration, collections, plugins | Site metadata, category taxonomy, plugin settings |
| `css/override.css` | Custom CSS overrides | Styling changes (do NOT edit js/highlightjs/ directly) |

If you're reviewing edits from an AI agent
----------------------------------------
- Verify local build with `bundle exec jekyll build` and spot-check altered pages in `_site/`.
- Prefer small, focused commits (one change per PR): "Update navlinks", "Add post: 2025-12-22-new-post".

Next steps / Feedback
---------------------
If any workflow or integration (Gemfile, GitHub Actions, analytics, custom plugins) exists but wasn't included in this snapshot, tell me or add those files and I'll update these instructions accordingly.
