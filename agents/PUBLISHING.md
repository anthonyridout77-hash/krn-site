# Publishing content to katridout.com.au (Astro site) — for KRN agents

Live since 6 Nov 2026 14:02 Brisbane. WordPress (api.katridout.com.au) is retired as a publishing target. Anything written to WordPress after that time does NOT appear on the live site. "NextJS Redeploy" no longer exists.

## How to publish

Commit a markdown file to this repo on `main`. Cloudflare builds and deploys automatically (about 2 minutes). No human click is needed.

Use the Make scenario **KRN Board -> GitHub Pages** (id 8082864, MCP tool `mcp__Make__s8082864_krn_board_git_hub_pages`, or `scenarios_run`) with:

- `repo`: `krn-site`
- `path`: see table below
- `content_base64`: the whole file, base64-encoded
- `message`: short commit message, e.g. `blog: <slug>`

One call creates or updates one file. Images go to `site/public/images/<yyyy>/<mm>/<file>` as separate calls (base64 of the binary) and are referenced as `/images/<yyyy>/<mm>/<file>`.

| Content | Path | URL on site |
|---|---|---|
| Blog post | `content/blog/<slug>.md` | `/blogs/<slug>/` |
| Recipe | `content/recipes/<slug>.md` | `/recipes-for-pregnancy/<slug>/` |
| Service page | `content/services/<slug>.md` | `/our-services/<slug>/` (Kat-gated, do not auto-publish) |

Slug: lowercase, hyphens, no stop-word stripping needed. Never reuse an existing slug for a different article.

## Blog frontmatter (schema in site/src/content.config.ts)

```yaml
---
title: "Plain title, no superlatives"
description: "150-160 chars, used as meta description"
date: "2026-11-06"
updated: "2026-11-06"
categories:
  - "Pregnancy"
image: "/images/2026/11/<hero>.jpg"
imageAlt: "Literal description of the photo"
---
```

Body is standard markdown. Internal links are site-relative (`/blogs/<slug>/`, `/consultations/`, `/our-services/...`). No `api.katridout.com.au` links anywhere.

## Rules that still apply

- Every post carries a booking path: the free call `https://calendly.com/katridout/15-minute-investigative-callback` (CTA "Book a free 15-minute call"), and where fitting `/consultations/`. The One-Question Consult was retired 7 Nov 2026: never link or mention it.
- APD never AHPRA. "PMOS (previously called PCOS)". No prices in blog copy. No emojis. No em-dash chains.
- Byline under the opening paragraph: "By Katrina Ridout, Accredited Practising Dietitian (APD), Brisbane. Reviewed <Month YYYY>."
- Verify after publishing: fetch `https://www.katridout.com.au/blogs/<slug>/` and expect HTTP 200 within 5 minutes. Record the URL in the ledger.

## Not yet migrated (as at 6 Nov 2026)

The weekly content agent, Latitude gate, SEO daily agent and desktop catch-up still target WordPress. Their prompts must be changed to use the method above. Until then their blog output does not reach the live site.
