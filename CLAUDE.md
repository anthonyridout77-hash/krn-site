# CLAUDE.md — krn-site

Rules for Claude Code in this repo. Short, because Anthony reads fast. Keep replies short too: fix problems, don't explain them.

## What this is

Astro static site + markdown content + automation config for Katrina Ridout Nutrition (Brisbane dietitian, Accredited Practising Dietitian). Read `docs/STATE.md` first (current state, open items), then `README.md` and `docs/decisions.md`.

## The five human gates — stop and ask

Never do these without explicit approval in the conversation:

1. **Money** — anything that costs money or changes a paid plan.
2. **New public health copy** — any new or changed nutrition/health statement on the site. Kat approves, not Anthony.
3. **Credentials / DNS** — tokens, passwords, DNS records, domain, account ownership.
4. **Policy risk** — anything that could breach Dietitians Australia or Google Ads policy.
5. **Client contact** — emailing, messaging or replying to a client or prospect.

Copy edits that keep meaning (typos, formatting, links) are fine. New claims are not.

## Compliance (Dietitians Australia "Marketing your practice")

- No testimonials or reviews about clinical care. None. Anywhere.
- No outcome claims ("helped 500 women fall pregnant", "lose 5 kg").
- Title is **Accredited Practising Dietitian** / **APD**. Never "AHPRA-registered" (dietitians are not AHPRA-registered).
- Medicare: say **GP Chronic Condition Management Plan (GPCCMP)**. Not "care plan", not "EPC".
- Review counts/star ratings must be current and verifiable, or removed.
- No unverified claims. If you can't source it, cut it.

## Conventions

- Site code in `site/`, content in `content/`, images in `public/images/wp/`.
- Content frontmatter schema: `docs/content-model.md`. Required: `title`, `description`, `date`, `updated`. Images need `imageAlt`.
- URLs preserve the WordPress paths with trailing slashes (`/blogs/<slug>/`, `/recipes/<slug>/`, `/our-services/<slug>/`). Never change a slug without adding a redirect in `site/public/_redirects`.
- Design: "Fresh" — white base, sage/eucalyptus green headings, mint tints, **coral for buttons only**, system font stack, restrained. Don't add fonts, gradients or new colours.
- Node 22. `cd site && npm ci && npm run build` must pass before any PR.
- Don't edit `content/media-index.json` by hand; it is a WordPress export.

## Secrets

- Never commit secrets. No API keys, tokens, app passwords, `.env` files.
- Secrets live in Cloudflare Pages env vars, Make.com connections, or GitHub Actions secrets.
- If you see a secret in the tree, remove it and say so.

## Git

- Branches: `feat/<short-name>`, `fix/<short-name>`, `content/<slug>`, `docs/<topic>`.
- Commits: imperative, one line, under 70 chars. Body only if needed. e.g. `Add choline blog post`, `Fix recipe image paths`.
- PR to `main`. CI must be green. Content PRs touching health copy get Kat's sign-off noted in the PR.
- Automated content commits (from Make) use the prefix `content:`.

## Don't

- Don't publish the One-Question Consult page in nav until Kat signs off (price $129, new clients only).
- Don't touch WordPress at `api.katridout.com.au` — it is being retired.
- Don't rely on anything on Anthony's Mac. Everything runs from this repo, Cloudflare, Make or GitHub Actions.
