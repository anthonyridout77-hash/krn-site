# Decisions log

ADR-style. Newest at the bottom. One entry per decision; amend by adding a new entry, not editing an old one.

---

## ADR-001 — Bring the site in-house, retire Surf Pacific (Oct 2026)
**Status:** Accepted
**Context:** Website and hosting depended on an external developer (Surf Pacific). Changes were slow, ownership of accounts unclear, and automation could not publish reliably.
**Decision:** This repo becomes the single home for the site and marketing automation. Surf Pacific engagement ends once handover is complete (`docs/handover-surf-pacific.md`).
**Consequences:** Anthony owns all accounts. Everything must be cloud-backed and runnable by a non-developer with Claude Code.

## ADR-002 — Astro static site in `site/` (Oct 2026)
**Status:** Accepted
**Context:** Need a fast, cheap, low-maintenance site that renders markdown and ships static HTML (good for SEO and AI crawlers; prior Next.js front end was client-rendered and hurt indexation).
**Decision:** Astro 5, static output, `@astrojs/sitemap`. No CMS UI.
**Alternatives rejected:** Keep WordPress + headless front end (two systems, developer-dependent); Webflow/Squarespace (lock-in, weak automation).

## ADR-003 — Content is markdown in `content/`, exported from WordPress 20 Oct 2026
**Status:** Accepted
**Decision:** Blog, recipes, services, pages, locations and products exported to markdown with frontmatter preserving `wpId` and `wpUrl`. Media index in `content/media-index.json`. WordPress is read-only from this date.
**Consequences:** Git history is the content audit trail. Schema in `docs/content-model.md`.

## ADR-004 — Hosting on Cloudflare Pages, DNS on Cloudflare (Oct 2026)
**Status:** Accepted (DNS pending domain handover)
**Decision:** Cloudflare Pages free plan, connected to this GitHub repo, auto-deploy on `main`. DNS moves to Cloudflare once the registrar login is handed over.
**Alternatives rejected:** Vercel/Netlify (fine, but Cloudflare gives DNS + hosting + redirects in one place at $0).

## ADR-005 — Preserve WordPress URL paths (Oct 2026)
**Status:** Accepted
**Decision:** `/blogs/<slug>/`, `/recipes/<slug>/`, `/our-services/.../<slug>/` keep their exact paths with trailing slashes. Dropped pages get 301s in `site/public/_redirects`.
**Why:** Protect existing rankings and backlinks during cutover.

## ADR-006 — Content agents publish by committing to GitHub, not WordPress (Oct 2026)
**Status:** Accepted, build pending
**Decision:** The Make.com "KRN WordPress Publisher" scenario is replaced by a GitHub-commit publisher that writes `content/blog/<slug>.md` + images to a branch and opens a PR (or commits to `main` for Kat-approved content). Cloudflare deploys it.
**Consequences:** Publishing is a git commit, reviewable and revertable. See `make/README.md`.

## ADR-007 — Keep `api.katridout.com.au` live until content verified (Oct 2026)
**Status:** Accepted
**Decision:** The `api` subdomain stays pointed at WordPress for at least 30 days after cutover, until every page and all 392 media files are confirmed on the new site.

## ADR-008 — "Fresh" design concept (Oct 2026)
**Status:** Accepted
**Decision:** White base, sage/eucalyptus green headings, mint tints, coral used for buttons only, system font stack, Apple-like restraint. Approved pages so far: homepage, One-Question Consult page.

## ADR-009 — One-Question Consult offer (Oct 2026)
**Status:** Page built, **not linked publicly** pending Kat's sign-off
**Decision:** $129, new clients only. Page exists in the site but is excluded from nav and sitemap until approved.

## ADR-010 — Tool stack (Oct 2026)
**Status:** Accepted
| Function | Tool |
|---|---|
| CRM + email | Brevo (replaced ActiveCampaign) |
| Bookings | Calendly — free 15-min call: https://calendly.com/katridout/15-minute-investigative-callback |
| Clinic software | Zanda |
| Automation glue | Make.com |
| Analytics / tags | GA4 + GTM `GTM-NVQZKHL`, Google Ads `AW-10944755829` |
| Search | Google Search Console, Bing Webmaster |
| AI visibility | Latitude |
| Social scheduling | Buffer |
| IG DM automation | ManyChat |

## ADR-011 — Five human gates (Oct 2026)
**Status:** Accepted
**Decision:** Automation and Claude stop for a human on: money, new public health copy (Kat), credentials/DNS, policy risk, client contact. Everything else may run unattended.

## ADR-012 — Compliance baseline (Oct 2026)
**Status:** Accepted
**Decision:** Dietitians Australia "Marketing your practice" rules apply to every public word: no clinical testimonials, no outcome claims, "Accredited Practising Dietitian"/APD (never AHPRA), Medicare = GPCCMP, review figures current, no unverified claims. Checklist in `docs/content-model.md`.

## ADR-013 — Nothing depends on Anthony's Mac (Oct 2026)
**Status:** Accepted
**Decision:** All automation runs in Make, GitHub Actions or Cloudflare. Any Mac-side script is a convenience, never a dependency.
