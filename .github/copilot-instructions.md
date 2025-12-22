Purpose
-------
This repository is a Jekyll-based static site served via GitHub Pages. These instructions orient an AI coding agent to the repo layout, conventions, and common developer workflows so changes are safe, consistent, and minimal.

Quick Architecture (big picture)
--------------------------------
- Content: `_posts/`, `index.md`, `archive.md` — blog pages and markdown content.
- Presentation: `_layouts/` (site templates) and `_includes/` (partials like `head.html`, `navlinks.html`, `sharelinks.html`).
- Assets: `css/` (site overrides in `override.css`) and `js/highlightjs/` (syntax highlighter scripts and styles).
- Config: `_config.yml` controls site settings and must be updated for site-wide changes (title, baseurl, permalinks).
- Output: `jekyll build` produces `_site/` for local preview; GitHub Pages builds on push to `main`.

Developer workflows (discovered / verifiable)
-------------------------------------------
- Local preview (common): install Ruby + Bundler, then run:

```bash
bundle install
bundle exec jekyll serve --livereload
```

- Build site output for inspection:

```bash
bundle exec jekyll build
# or: jekyll build
```

- Deploy: GitHub Pages auto-builds from `main` (push commits to `main` to publish).

Project-specific conventions and patterns
----------------------------------------
- Post filenames: use Jekyll naming `YYYY-MM-DD-title.md` and include YAML front matter (see `_posts/2021-03-08-blog-post-title-from-file-name.md`).
- Post layout: set `layout: post` in front matter to use `_layouts/post.html`.
- Use `_includes/navlinks.html` and `_includes/sharelinks.html` for navigation and social links — prefer editing includes for repetitive UI changes.
- Keep vendor/minified JS in `js/highlightjs/` unchanged unless updating the library; customize appearance in `css/override.css`.
- Do not rename `_layouts/` or `_includes/` files without updating all references in layouts/includes.

Integration points and external deps
-----------------------------------
- Syntax highlighting: `js/highlightjs/` with language files in `js/highlightjs/languages/` and styles in `js/highlightjs/styles/`.
- Primary external integration is GitHub Pages (Jekyll). If adding plugins, update `_config.yml` and ensure those plugins are supported by GitHub Pages or vendor them.

Safe edit guidelines for AI agents
---------------------------------
- When editing content, preserve YAML front matter and the post filename date format.
- For layout changes, open `_layouts/default.html` and `_layouts/post.html` to understand markup and Liquid variables before editing.
- For global style changes, modify `css/override.css` instead of vendor CSS; this keeps upstream assets intact.
- To preview a change locally, run `bundle exec jekyll serve` and verify output under `http://127.0.0.1:4000/` or `_site/` directory.
- When adding new assets, keep paths relative and reference them from layouts/includes with site variables where appropriate.

Examples (how to perform common edits)
-------------------------------------
- Add a new post: create `_posts/YYYY-MM-DD-your-title.md` with front matter `---\nlayout: post\ntitle: "Your Title"\ndate: YYYY-MM-DD HH:MM:SS +/-TTTT\n---`.
- Update navigation: edit `_includes/navlinks.html` to add/remove links; then run local preview to confirm.
- Change header metadata: edit `_includes/head.html` and adjust `_config.yml` if adding site-wide values.

What I couldn't discover automatically
-------------------------------------
- No Gemfile or explicit plugin list was found in the repository snapshot. If this project uses a `Gemfile` or custom GitHub Actions for build/deploy, provide those files or the typical local setup so instructions can be expanded.
- Any external analytics or CI integrations (e.g., Google Analytics, Netlify) were not found; tell me if present so I can document them.

If you're reviewing edits from an AI agent
----------------------------------------
- Verify local build with `bundle exec jekyll build` and spot-check altered pages in `_site/`.
- Prefer small, focused commits (one change per PR): "Update navlinks", "Add post: 2025-12-22-new-post".

Next steps / Feedback
---------------------
If any workflow or integration (Gemfile, GitHub Actions, analytics, custom plugins) exists but wasn't included in this snapshot, tell me or add those files and I'll update these instructions accordingly.
