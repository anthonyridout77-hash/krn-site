# make/ — Make.com scenario blueprints

Version-controlled copies of the KRN Make.com scenarios. Make is the automation glue; this folder is the backup and the change log.

## Scenarios

| File | Make scenario | ID | Purpose |
|---|---|---|---|
| `krn-wordpress-publisher.json` | KRN WordPress Publisher | 7213642 | Publishes weekly blog to WordPress. **To be replaced** (see below) |
| `krn-veo-reel.json` | KRN Veo Reel | 7213929 | Renders weekly video reel |
| `krn-overlay-render.json` | KRN Overlay Render | 7214437 | Text overlays on reels |
| `krn-vision-qa.json` | KRN Vision QA | 7214569 | Visual QA on rendered media |
| `krn-wp-images-to-drive.json` | KRN WP images to Drive (ads/GBP upload) | 7601884 | Copies blog images to Drive for ads and Google Business Profile |
| `krn-github-publisher.json` | KRN GitHub Publisher | — | **Planned.** Replaces WordPress Publisher |

Blueprints not yet exported are listed for completeness. Export them on the next change.

## Export a blueprint

1. Make → scenario → **⋯ (bottom toolbar) → Export Blueprint**. Saves `blueprint.json`.
2. Rename to the table name above, drop it here.
3. Scrub before commit: blueprints can embed connection names and webhook URLs. Remove any `apiKey`, `token`, `password` or full webhook URL. Connection IDs are fine.
4. Commit: `make: export KRN Veo Reel (change summary)`.

Re-export after every meaningful edit. The JSON diff is the change log.

## Import / restore

Make → Create new scenario → **⋯ → Import Blueprint** → pick the file → re-link connections (they are not in the export) → test → activate. Deactivate the old copy.

## Plan: WordPress Publisher → GitHub Publisher

**Why:** WordPress is retired (ADR-006). Content is markdown in this repo; Cloudflare deploys on commit.

**New flow (Make):**
1. Trigger: same as today — weekly content pack lands in Drive (`content_pack.md` + featured image).
2. Parse pack → build frontmatter per `docs/content-model.md`. Required: `title`, `description`, `date`, `updated`, `categories`, `image`, `imageAlt`.
3. **GitHub → Create a file**: `public/images/<yyyy>/<mm>/<slug>-featured.jpg` (base64).
4. **GitHub → Create a file**: `content/blog/<slug>.md`.
   - Branch `content/<slug>`, commit message `content: add <slug>`.
5. **GitHub → Create a pull request** → `main`. Body includes the compliance checklist from `docs/content-model.md`.
6. Email Kat the PR link via the existing outbox sender. Kat replies APPROVE → Anthony (or a follow-up Make step on a keyword) merges. CI builds, Cloudflare deploys.
7. Post-merge: existing downstream scenarios (Buffer, images-to-Drive, Latitude) read the live URL `https://katridout.com.au/blogs/<slug>/` — update any step that currently reads the WordPress REST response for the post URL.

**Gate:** new public health copy → Kat approves before merge. The PR is the gate. No direct commits to `main` from Make for blog content.

**Prereqs:**
- [ ] GitHub connection in Make using a fine-grained PAT scoped to `krn-site` only, Contents + Pull requests: write. Store in Make, never here.
- [ ] Branch protection on `main`: require CI pass. Allow Anthony to merge.
- [ ] Dry run on a test slug, delete the branch after.

**Cutover:** run both publishers for one week → compare → deactivate WordPress Publisher → export final blueprint here → mark it retired in the table.

## Rules

- Never commit secrets. Blueprints with keys get rejected in review.
- Every scenario has an error handler that emails Anthony. If it doesn't, add one before export.
- Scenario names in Make stay prefixed `KRN `.
