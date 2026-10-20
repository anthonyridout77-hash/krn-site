# Runbook — deploy, domain, rollback

## 1. Cloudflare Pages (one-time setup)

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick `krn-site`.
2. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `site`
   - Production branch: `main`
3. Environment variables (Production and Preview): `NODE_VERSION = 22`.
4. Save and deploy. First build gives `https://krn-site.pages.dev`.
5. Check: homepage, a blog post, a recipe, a service page, `/sitemap-index.xml`, `/robots.txt`.

After this, every push to `main` deploys. Every PR gets a preview URL in the PR checks.

## 2. Custom domain + DNS cutover

Prerequisite: domain registrar access from Surf Pacific handover (`docs/handover-surf-pacific.md`).

### Before cutover
- [ ] Add `katridout.com.au` as a Cloudflare zone (Add site → Free plan). Note the two nameservers it assigns.
- [ ] Copy **every** existing DNS record from the current registrar/host into the Cloudflare zone — especially **MX, SPF (TXT), DKIM, DMARC** for `info@katridout.com.au`, and the `api` A/CNAME record for WordPress.
- [ ] At the current DNS host, lower TTL on `@`, `www` and `api` to 300 s. Wait 24 h.
- [ ] Pages project → **Custom domains** → add `katridout.com.au` and `www.katridout.com.au`.
- [ ] Decide canonical host (`www` or apex) and set the other to redirect — Cloudflare Bulk Redirect or a Pages `_redirects` rule.
- [ ] Add redirect map for old URLs to `site/public/_redirects` (see §3). Verify on the `.pages.dev` preview.
- [ ] GA4/GTM: confirm `GTM-NVQZKHL` and `AW-10944755829` fire on the preview URL (Tag Assistant).
- [ ] Spot-check 20 old URLs from Google Search Console "top pages" against the preview — all 200 or redirected.

### Cutover (do in one sitting, weekday morning)
- [ ] Change nameservers at the registrar to Cloudflare's. Propagation 1–24 h.
- [ ] In Cloudflare DNS, point `@` and `www` to the Pages project (Cloudflare does this when you add the custom domain). **Keep `api` pointing at the old WordPress host.**
- [ ] SSL/TLS mode: **Full (strict)**. Enable "Always use HTTPS".
- [ ] Test: `https://katridout.com.au`, `https://www.katridout.com.au`, `https://api.katridout.com.au/wp-admin` (still WordPress), email send/receive on `info@`.
- [ ] Google Search Console: resubmit sitemap. Bing Webmaster: same.
- [ ] Calendly, Brevo, Buffer, ManyChat, Google Ads final URLs: confirm any hard-coded links still resolve.

### After cutover
- [ ] Keep `api.` WordPress alive **at least 30 days** until every page, image and redirect is verified live and the 392 media files are confirmed in `public/images/wp/`.
- [ ] Watch GSC Coverage for 404 spikes for two weeks.
- [ ] Then: cancel Surf Pacific hosting, remove the `api` DNS record.

## 3. Redirect map

File: `site/public/_redirects` (Cloudflare Pages reads it at the output root).

Rules:
- Old WordPress paths are preserved as-is (`/blogs/<slug>/`, `/recipes/<slug>/`, `/our-services/...`), so most pages need **no** redirect.
- Add a line for anything that moved or was dropped:
  ```
  /old-path/            /new-path/            301
  /category/pregnancy/  /blogs/               301
  /?p=4777              /blogs/choline-in-pregnancy-australian-prenatal-supplements/  301
  ```
- WordPress-only paths with no equivalent (`/wp-admin`, `/wp-json`, `/feed`, `/cart/`, `/checkout/`, `/my-account/`) → 301 to the nearest useful page or `/`.
- Max 2,000 static rules on the free plan. Fine.

## 4. Rollback

Bad deploy on `main`:
1. Cloudflare → Pages project → **Deployments** → find the last good one → **⋯ → Rollback to this deployment**. Instant, no rebuild.
2. Then fix forward in a branch, or `git revert <sha>` and push.

Bad DNS cutover:
1. Change nameservers back at the registrar (this is why TTL was lowered first).
2. Or, inside Cloudflare, point `@`/`www` back at the old host IP — site returns to WordPress within minutes.

## 5. Where things live

| Thing | Where |
|---|---|
| Build logs | Cloudflare → Pages → Deployments |
| Env vars / secrets | Cloudflare → Pages → Settings → Environment variables |
| DNS | Cloudflare → katridout.com.au → DNS |
| CI | GitHub → Actions (`.github/workflows/ci.yml`) |
