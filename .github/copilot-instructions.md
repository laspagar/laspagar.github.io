# .github/copilot-instructions.md

Purpose
-------
Concise onboarding for AI coding agents working on this Jekyll-based GitHub Pages site (Kharisma Steel). Focus on where content and assets live, safe edit patterns, automation, and quick troubleshooting.

Quick architecture
------------------
- Content: `_posts/` (blog posts) and `_products/` (product collection exposed via `site.products` in Liquid). See `_config.yml` for collection settings.
- Templates: `_layouts/` (page templates) + `_includes/` (partials such as `navlinks.html`, `sharelinks.html`, `head.html`).
- Assets: `assets/products/` (product images), `css/override.css` (site customizations), `js/highlightjs/` (vendor HighlightJS).

Developer workflows (commands)
------------------------------
- Local preview / build
  - bundle install
  - bundle exec jekyll serve --livereload  (preview at http://127.0.0.1:4000)
  - bundle exec jekyll build (one-off static build; output in `_site/`)
- Bot-assisted content (preferred)
  - cd bot-posting && npm install
  - npm run post:article  → creates `_posts/YYYY-MM-DD-slug.md`
  - npm run post:product  → creates `_products/slug.md`
  - Relevant files: `bot-posting/bin/create-article.js`, `bot-posting/bin/create-product.js`, `bot-posting/utils/helper.js`
- Image tooling
  - python3 scripts/fetch_images.py <url> <dest>
  - python3 scripts/fetch_images_bulk.py (bulk download)
  - python3 scripts/scrape_bintang_images.py (updates `_data/product_images.yml`)
  - Dependencies: requests, pyyaml, beautifulsoup4 (pip install)

Project conventions (concrete rules)
------------------------------------
- Post filename format: `YYYY-MM-DD-title.md`. Preserve YAML front matter and `layout: post`.
  Example front matter:
  ```yaml
  ---
  layout: post
  title: "Judul Artikel"
  date: 2025-12-22 09:00:00 +0700
  categories: [kanopi, pagar]
  tags: [bandung, harga]
  ---
  ```
- Product front matter must include: `title`, `price`, `category`, `image`, `keywords`.
  Example:
  ```yaml
  ---
  title: "Kanopi Kordoba"
  price: "Rp 450rb/m²"
  category: Kanopi
  image: /assets/products/kanopi-kordoba.jpg
  keywords: kanopi, bandung
  ---
  ```
- Categories are defined in `_config.yml`; ensure product `category` matches available taxonomy.
- Language & timezone: site content is Indonesian; use `+0700` timezone for dates.

Safe edit checklist ✅
----------------------
- Prefer the bot (`npm run post:article` / `post:product`) when creating content.
- Preserve YAML front matter and filename conventions for posts/products.
- Edit UI consistently via `_includes/` (e.g., `navlinks.html`) rather than copying markup.
- For CSS changes, modify `css/override.css` (avoid editing vendor JS/CSS in `js/highlightjs/`).
- Run `bundle exec jekyll build` and preview the changed pages in `_site/` before opening PR.
- Keep commits focused and describe which pages were previewed locally.
- Do NOT commit `node_modules/` or unintended `Gemfile.lock` changes unless required.

Troubleshooting / where to look 🔍
---------------------------------
- Layout issues: `_layouts/default.html`, `_layouts/post.html`, `_layouts/product.html`.
- Navigation / header: `_includes/navlinks.html`, `_includes/head.html`.
- Missing images: check `_data/product_images.yml` and `assets/products/`.
- Bot issues: `bot-posting/bin/*` and `bot-posting/utils/helper.js` (reproduce with the CLI).
- Scraper issues: `scripts/scrape_bintang_images.py`, `scripts/fetch_images_bulk.py` (source site layout can change).

Known gaps & asks
------------------
- No `Gemfile` or CI (GitHub Actions) configuration was found; add these if reproducible builds or automated tests are required.
- If you want stronger automation (CI, deploy previews), we can add a minimal GitHub Actions workflow that runs `bundle exec jekyll build` and reports build artifacts.

If this looks good, I can commit this file and tidy wording further — say the word and I'll create a PR.

