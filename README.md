# krn-site

Single home for **Katrina Ridout Nutrition** (KRN) — the website and the marketing automation around it. Everything the business needs to run its web presence lives here, cloud-backed, with no dependency on a developer or on anyone's laptop.

Live site: `katridout.com.au` (Cloudflare Pages). Old WordPress at `api.katridout.com.au` is being retired.

## Folder map

| Path | What |
|---|---|
| `site/` | Astro static site (source, layouts, components) |
| `content/` | All content as markdown — `blog/`, `recipes/`, `services/`, `pages/`, `locations/`, `products/`, plus `media-index.json` (WordPress media export, 20 Oct 2026) |
| `site/public/images/wp/` | Images migrated from WordPress `wp-content/uploads` |
| `docs/` | Runbooks and decisions — start with [`docs/decisions.md`](docs/decisions.md) |
| `make/` | Make.com scenario blueprints (JSON exports) |
| `agents/` | KRN marketing agent skill files (markdown) |
| `.github/workflows/` | CI — build check on every PR and push to `main` |
| `CLAUDE.md` | Rules for Claude Code working in this repo |

## Run locally

```bash
cd site && npm install && npm run dev
```

Node 22. Site opens at `http://localhost:4321`.

## Deploys

Push to `main` → Cloudflare Pages builds and deploys automatically. PRs get a preview URL. Setup and rollback: [`docs/runbook-deploy.md`](docs/runbook-deploy.md).

## Content

Content is markdown in `content/`. The content agents publish by committing markdown here (via Make's GitHub module), not to WordPress. Full schema: [`docs/content-model.md`](docs/content-model.md).

### Add a blog post

Create `content/blog/<slug>.md`:

```markdown
---
title: "Choline in Pregnancy: What Australian Prenatals Miss"
description: "One-sentence meta description, under 160 characters."
date: "2026-10-20"
updated: "2026-10-20"
categories:
  - "Pregnancy"
image: "/images/wp/2026/10/krn-choline-featured.jpg"
imageAlt: "Describe the image for screen readers."
draft: false
---

Body in markdown. First paragraph is the lead.
```

URL becomes `/blogs/<slug>/`. Run `cd site && npm run build` before opening a PR.

## Who approves what

| Change | Approver |
|---|---|
| Spending money (hosting, tools, ads) | Anthony |
| New public health or nutrition copy | **Kat** (APD) — always |
| Credentials, DNS, domain, account ownership | Anthony |
| Anything with policy/compliance risk (Dietitians Australia, Google Ads policy) | Anthony + Kat |
| Contacting a client or prospect | Kat |

Compliance rules every page must meet: [`docs/content-model.md#compliance-checklist`](docs/content-model.md#compliance-checklist).

## Stack

Astro · Cloudflare Pages + DNS · Brevo (CRM/email) · Calendly (bookings) · Zanda (clinic) · Make.com (automation) · GA4/GTM `GTM-NVQZKHL` · Google Search Console · Bing Webmaster · Latitude (AI visibility) · Buffer (social) · ManyChat (IG DMs)
