# Deploying MINDSET 2.0 to GitHub Pages

This site is a Jekyll site. GitHub Pages will build it automatically on push.

## 1. First-time setup

From this folder:

```bash
git init
git add .
git commit -m "Initial MINDSET 2.0 site (Jekyll Serif-inspired)"
git branch -M main
git remote add origin https://github.com/<your-user-or-org>/<repo>.git
git push -u origin main
```

## 2. Enable GitHub Pages

1. Open the repo on GitHub → **Settings → Pages**.
2. Under **Build and deployment → Source**, select **Deploy from a branch**.
3. Choose **`main`** branch and **`/ (root)`** folder. Save.
4. Wait ~1 minute; the URL will appear on the same page.

## 3. Configure the base URL

How you deploy affects `baseurl` in `_config.yml`:

- **Project site** (`https://<user>.github.io/<repo>/`)
  Set `baseurl: "/<repo>"` in `_config.yml`. Example: `baseurl: "/MINDSET_website"`.
- **User / org site** (`https://<user>.github.io/`) or **custom domain**
  Leave `baseurl: ""`.

All internal links in this site use `| relative_url` so they respect `baseurl`
automatically — you only need to set it once.

## 4. (Optional) Run locally

Requires Ruby 3.x.

```bash
bundle install
bundle exec jekyll serve --livereload
# open http://localhost:4000
```

## Site map

| Page                 | Source file              | URL             |
|----------------------|--------------------------|-----------------|
| Home                 | `index.html`             | `/`             |
| The MINDSET Model    | `model.md`               | `/model/`       |
| Reports              | `reports.md`             | `/reports/`     |
| Announcements        | `announcements.html`     | `/announcements/` |
| Announcement posts   | `_posts/YYYY-MM-DD-*.md` | `/YYYY/MM/DD/*` |

## Editing the site

- **Add an announcement** — create `_posts/YYYY-MM-DD-slug.md` with the same
  front-matter as `_posts/2026-04-20-site-launch.md`.
- **Update the Model page** — edit `model.md`.
- **Add a report** — drop the PDF in `assets/pdfs/` and add a `<article
  class="report-card">` block in `reports.md`.
- **Change nav order/labels** — edit the `navigation:` list in `_config.yml`.
- **Restyle** — edit `assets/css/style.css` (CSS custom properties at the top
  control colors, fonts, and container width).
