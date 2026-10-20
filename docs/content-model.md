# Content model

All content is markdown with YAML frontmatter in `content/`. One file = one page. Filename = slug.

## Collections

| Folder | URL | Notes |
|---|---|---|
| `content/blog/` | `/blogs/<slug>/` | Articles |
| `content/recipes/` | `/recipes/<slug>/` | Recipes |
| `content/services/` | `/our-services/<slug>/` or `/our-services/<parent-slug>/<slug>/` | `parent` sets nesting |
| `content/pages/` | `/<slug>/` (home = `/`) | Static pages and landing pages |
| `content/locations/` | `/<slug>/` | State/city pages |
| `content/products/` | `/<slug>/` | Legacy shop items — mostly redirect |

## Frontmatter

### Common (all collections)

| Field | Required | Type | Notes |
|---|---|---|---|
| `title` | yes | string | Page H1 and `<title>` |
| `description` | yes | string | Meta description, ≤160 chars |
| `date` | yes | `YYYY-MM-DD` | Original publish date |
| `updated` | yes | `YYYY-MM-DD` | Bump on every content change |
| `draft` | no | bool | `true` = not built. Default `false` |
| `image` | no | string | Featured image, `/images/wp/...` |
| `imageAlt` | **yes if `image`** | string | Alt text. Build fails without it |
| `noindex` | no | bool | Exclude from sitemap/robots. Default `false` |
| `wpId` | no | string | WordPress post ID (migration only, never edit) |
| `wpUrl` | no | string | Original WordPress URL (migration only) |

### Blog (`content/blog/`)

| Field | Required | Notes |
|---|---|---|
| `categories` | yes | List. Use existing: `Pregnancy`, `Fertility`, `Postpartum`, `Gestational Diabetes`, `PCOS`, `Recipes`, `General` |
| `tags` | no | List, lowercase |
| `author` | no | Default `Katrina Ridout, APD` |
| `reviewed` | no | `YYYY-MM-DD` Kat's clinical review date |

```markdown
---
title: "Choline in Pregnancy: What Australian Prenatals Miss"
description: "Most Australian prenatal supplements contain little or no choline. What it does and the foods that supply it."
date: "2026-08-24"
updated: "2026-08-24"
categories:
  - "Pregnancy"
image: "/images/wp/2026/08/krn-choline-featured.jpg"
imageAlt: "Eggs, salmon and legumes on a board, foods that supply choline in pregnancy."
reviewed: "2026-08-24"
---
```

### Recipes (`content/recipes/`)

| Field | Required | Notes |
|---|---|---|
| `serves` | no | number |
| `prepMinutes` | no | number |
| `cookMinutes` | no | number |
| `tags` | no | e.g. `iron-rich`, `gd-friendly`, `vegetarian` |
| `ingredients` | no | List of strings. If omitted, use a `## Ingredients` heading in the body |

Body convention: `## Ingredients`, `## Method`, optional `## Notes`.

### Services (`content/services/`)

| Field | Required | Notes |
|---|---|---|
| `parent` | no | `wpId` or slug of the parent service (for nested URLs) |
| `order` | no | number, nav sort |
| `cta` | no | `book` (default, Calendly 15-min) or `enquire` |

### Pages (`content/pages/`)

| Field | Required | Notes |
|---|---|---|
| `layout` | no | `default`, `landing` (no nav/footer clutter), `home` |
| `inNav` | no | bool, default `false` |

## URL rules

- Slug = filename without `.md`. Lowercase, hyphens, no dates.
- **Preserve WordPress paths.** The migrated slugs are final. Changing one requires a 301 in `site/public/_redirects` in the same PR.
- **Trailing slash always.** `/blogs/choline-in-pregnancy/` not `/blogs/choline-in-pregnancy`. Astro `trailingSlash: 'always'`.
- Internal links are root-relative with trailing slash: `[see](/blogs/other-post/)`. Never link to `api.katridout.com.au`.
- No `/?p=123` style links. Map them in `_redirects` if found inbound.

## Image rules

- Migrated images: `/images/wp/<yyyy>/<mm>/<file>` (mirrors `wp-content/uploads`). Source: `public/images/wp/`.
- New images: `/images/<yyyy>/<mm>/<descriptive-name>.jpg`. Lowercase, hyphens.
- Max 1600 px wide, JPEG/WebP, under 300 KB. No PNG photos.
- **`alt` text required** on every image — frontmatter `imageAlt` and markdown `![alt](src)`. Describe the picture, not the keyword. Empty alt only for pure decoration.
- Never use photos of Kat unless Anthony has explicitly selected that image.
- Stock photos: hands-only or food-only is fine; check licence (Pexels/Unsplash OK).
- Never hotlink `api.katridout.com.au/wp-content/...`. Copy the file into `public/images/wp/` first.

## Compliance checklist — every post, before merge

Dietitians Australia "Marketing your practice". Tick all or don't publish.

- [ ] No testimonial, review quote or client story about clinical care
- [ ] No outcome claim (fall pregnant faster, lose X kg, fix GD, "proven")
- [ ] Title used is **Accredited Practising Dietitian** or **APD** — never "AHPRA"
- [ ] Medicare wording is **GP Chronic Condition Management Plan (GPCCMP)**, rebate figure current ($63.40/session as at 1 Jul 2026, 5 visits/yr)
- [ ] Any statistic, rating or "X clients" figure is current and sourced, or removed
- [ ] Health statements are general education, not individual advice; includes a "see your dietitian/GP" line where relevant
- [ ] No supplement brand endorsement or dose instruction beyond Australian guidelines
- [ ] Kat has approved any **new** health copy (`reviewed` date set)
- [ ] `description` ≤160 chars, `imageAlt` present, internal links use trailing slashes
- [ ] `npm run build` passes

## Build checks (enforced by the site)

The Astro content config validates frontmatter. A missing required field or an `image` without `imageAlt` fails the build, so CI fails, so it cannot deploy.
