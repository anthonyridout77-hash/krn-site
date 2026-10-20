# KRN site and growth engine — current state

Read this first in any new session. Updated 20 Oct 2026, 21:45 AEST (overnight run).

## Where things are
| Thing | Location |
|---|---|
| Code, content, docs, agents | GitHub `anthonyridout77-hash/krn-site` (private). Attach it with add_repo at the start of a session. |
| Live preview | https://krn-site.anthonyridout77.workers.dev (Cloudflare Workers, auto-deploys on push to `main`, Node 22, root `site`) |
| Old site (still public) | www.katridout.com.au (Next.js front end) + api.katridout.com.au (WordPress). Surf Pacific is cancelling hosting; date unknown. |
| Design demos | Homepage v10 https://claude.ai/artifact/AXs1HKK3QAraraULipKqSS · One-Question page v3 https://claude.ai/artifact/7zrKBLg6vHC95ApaQs4yaV |
| Plans | Claude Docs: "KRN Growth Engine Plan" and "KRN Business Stack 2026". Project doc: KRN_OneQuestion_Consult_Plan_2026-10-20.md |
| Brevo | Account on anthonyridout77@gmail.com, Free plan, master template id 4 "KRN Master Template v4". Templates 1–3 to delete. Account validation pending. |
| Make | Existing scenarios: WP Publisher (to become GitHub publisher), Veo Reel, Overlay Render, Vision QA, WP images to Drive, email outbox 6989127 |

## Decisions (do not reopen)
- Stack: Astro static site, markdown content in repo, Cloudflare hosting, Brevo, Calendly, Zanda, Make. No WordPress on VentraIP. No HubSpot, GoHighLevel, Zoho, Vercel Pro.
- Design: "Fresh" concept. White, sage headings, mint tints, coral buttons only, system font. Refine, never redesign.
- GitHub under Anthony's existing account for now; move to a KRN organisation later.
- One-Question Consult: $129, no GST, 30 min telehealth, written one-page plan, new clients only, one per person, fee credited against Initial/Program within 30 days. Name is Kat's call. Not linked in nav until Kat signs off.
- Prices: show single consult fees with Medicare out-of-pocket framing; Program prices discussed on the free call, not published. Anthony and Kat still need to agree (Kat said keep prices live on 25 Sep).
- General dietetics: same site, "General nutrition" tile and section, organic only, no paid campaign.
- Homepage: no price for One-Question; APD number APD008207 shown, no certificate image (current cert expired 30 Sep 2026, Kat to download the new one).
- Credentials shown: hero, Qualifications section, footer. Not in About badges.

## Done
- WordPress exported 20 Oct: 90 blogs, 9 recipes, 14 services, 44 pages, 3 products, media index (392). Markdown in `content/`.
- Astro site: 127 pages build clean, all return 200 on the preview.
- Docs: README, CLAUDE.md, deploy runbook, Surf Pacific handover checklist + email, decisions log, content model.
- CI on GitHub (build check).

## Branches awaiting review (built overnight 20 Oct, nothing merged)
| Branch | What | Gate |
|---|---|---|
| `content/service-rewrites` (PR #1) | 14 service pages rewritten from old-site copy; removed every "15 years"/"leading"/"cure"/"best" claim; GPCCMP wording | Kat approves health copy, then merge |
| `feat/utility-pages` | `_redirects` (35 rules), /privacy-policy/, /telehealth-terms/ (draft, noindex), /thank-you/, /contact-us/, /about-kat/, /guide/ placeholder, /im-pregnant-now-what/, /refer-your-patients/, Perth and Adelaide pages; footer links; sitemap excludes noindex | Anthony reviews; Kat checks about-kat degree wording ("Applied Science (Honours)" in old copy vs "Health Science" on site) and telehealth terms |
| `content/fees-page` | /fees-and-rebates/ draft: single consult fees with Medicare out-of-pocket, Program on the call; unlinked | Anthony and Kat agree pricing approach |

## Open, in order
1. Surf Pacific handover: cancellation date, registrar/DNS login, info@ mailbox host, `wp-content/uploads` (392 images; cannot be pulled from the cloud), GSC/GA4/GTM ownership. Email draft in docs/handover-surf-pacific.md.
2. Kat: approve One-Question Consult (price, name, scope), list general conditions, download new APD certificate, review the preview on her phone.
3. Merge `content/service-rewrites` after Kat signs off (PR #1).
4. Recipes: only titles came across; rebuild from Kat's originals.
5. Merge `feat/utility-pages` and `content/fees-page` after review; bump `updated` dates on merged service pages.
6. Forms: checklist → Brevo (tag `checklist`), enquiry → email, via Make. Then nurture sequence (fertility & IVF, 5 emails) from template 4.
7. Make: WP Publisher → GitHub commit publisher; content agent writes markdown to the repo.
8. GA4/GTM on the new site; Calendly → Make → Brevo stage changes; offline conversions to Google Ads.
9. DNS cut-over after handover; GSC and Bing resubmit.

## Rules that bite
- Five gates: money, new public health copy (Kat), credentials/DNS, policy risk, client contact.
- APD not AHPRA; GPCCMP wording; no testimonials about care; no outcome claims; no unverified claims.
- Never revoke the "KRN Automation" WordPress app password (Make uses it).
- api.katridout.com.au blocks the cloud sandbox and the Mac shell; only a real browser (the desktop browser pane) can read it.
- Gmail connector strips `<img>` tags; test Brevo templates in Brevo, not via Gmail.
- Anthony reads fast: short replies, fix don't explain.
