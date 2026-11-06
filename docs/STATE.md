# KRN site and growth engine — current state

Read this first in any new session. Updated 21 Oct 2026, 09:00 AEST.

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
- 6 Nov: Surf Pacific sent the handover pack (WP backup, old Next.js zip, EPP code, zone file). 480 original images/PDFs extracted from the backup into `site/public/images/wp/` (PR #2, branch `feat/wp-media`); `_redirects` maps `/wp-content/uploads/*` to `/images/wp/*`. Fixed branch preview builds (`previews: {}` in wrangler.jsonc, NODE_VERSION=22 on the preview env). Full backup + cut-over checklist in Anthony's `KRN Marketing/Surf Pacific migration/` folder.
- Astro site: 127 pages build clean, all return 200 on the preview.
- Docs: README, CLAUDE.md, deploy runbook, Surf Pacific handover checklist + email, decisions log, content model.
- CI on GitHub (build check).
- 21 Oct: impeccable audit 17/20, critique 19/32 (snapshot in `.impeccable/critique/`). Fixed on main: button/dark-mode/footer contrast, static topic strip, tiles without icons, relative links (were pointing at www.katridout.com.au), dark-mode reviews/coral panels, phone menu, one booking label ("Book a free call"), hero reassurance line, "Reviews on Google", consult 75 min, cut "since 2018"/"Medicare provider"/"writes every plan herself"/"new recipes every week"/"most clients outside Brisbane".

## Branches awaiting review
| `feat/audit-2026-11-06` (PR #4) | 6 Nov site audit safe fixes (links, a11y, JSON-LD, images); full report in project doc KRN_Site_Audit_2026-11-06.md | Anthony merges |
| `content/audit-copy-2026-11-06` | Proposed homepage headline/lede and One-Question wording from the 6 Nov audit | Kat approves copy |
 (built overnight 20 Oct, nothing merged)
| Branch | What | Gate |
|---|---|---|
| `content/service-rewrites` (PR #1) | 14 service pages rewritten from old-site copy; removed every "15 years"/"leading"/"cure"/"best" claim; GPCCMP wording | Kat approves health copy, then merge |
| `feat/utility-pages` | `_redirects` (35 rules), /privacy-policy/, /telehealth-terms/ (draft, noindex), /thank-you/, /contact-us/, /about-kat/, /guide/ placeholder, /im-pregnant-now-what/, /refer-your-patients/, Perth and Adelaide pages; footer links; sitemap excludes noindex | Anthony reviews; Kat checks about-kat degree wording ("Applied Science (Honours)" in old copy vs "Health Science" on site) and telehealth terms |
| `content/fees-page` | /fees-and-rebates/ draft: single consult fees with Medicare out-of-pocket, Program on the call; unlinked | Anthony and Kat agree pricing approach |
| `content/hero-headline` | New homepage headline "Eat well for the baby you're hoping for, carrying, or holding." + lede with "mum of three" (replaces "Nourish your body. Empower your pregnancy.") | Kat approves (new public copy) |

## Open, in order
1. Surf Pacific handover: images DONE. Still open: Anthony transfers the domain into his own GoDaddy (EPP code in Lachlan's email), then Claude imports the edited zone into Anthony's Cloudflare and attaches katridout.com.au + www to the Worker (DNS gate). Ask Lachlan: info@ mailbox host (67.231.22.32), switch-off date, GSC/GA4/GTM ownership.
2. Kat: approve One-Question Consult (price, name, scope), list general conditions, download new APD certificate, review the preview on her phone.
3. Merge `content/service-rewrites` after Kat signs off (PR #1).
4. Recipes: only titles came across; rebuild from Kat's originals.
5. Merge `feat/utility-pages` and `content/fees-page` after review; bump `updated` dates on merged service pages.
6. Forms: homepage checklist and enquiry forms show "Sent." but post nowhere (Anthony: leave until wired). Checklist → Brevo (tag `checklist`), enquiry → email, via Make. Then nurture sequence (fertility & IVF, 5 emails) from template 4.
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

## 6 Nov 2026 13:20 — launch branch
- Anthony approved (6 Nov): price on the homepage One-Question strip, all pending branches merged, fix everything for bookings. Branch `feat/launch-2026-11-06` = audit fixes (PR #4) + mobile hero (PR #3) + utility pages + fees page + new headline/lede/ladder copy + homepage price + privacy links by both forms + forms POST to Make webhook (scenario 8408528 "KRN Website Forms", webhook 4050925) with honest error messages + remaining old-domain links converted + 4 redirects added.
- Calendly "One-Question Consult" event type created 6 Nov (30 min, outbound call, slug one-question-consult, matches the site link). Payment NOT set up in Calendly (is_paid false); the $129 must be collected another way or Stripe/PayPal added in Calendly by Kat. "How did you hear" question not on it (API cannot add custom questions).
- Make scenario 8408528 is built but NOT activated (Anthony toggles it on; Free plan active-scenario cap may bite). Leads go to data store 206342, not Brevo (no Brevo connection in Make yet). No checklist PDF exists: the email tells the visitor Kat will send it and info@ gets a prompt.
- Still Kat-gated: PR #1 service rewrites. The new headline/lede went live on Anthony's call; Kat to review.

## 6 Nov 2026 — One-Question journey built (branch feat/oneq-journey, not merged)
- Make scenarios 8408756 Booking, 8408758 Intake, 8408761 Reminders, 8408775 Nurture, 8408776 Transcript to Job, 8408782 Approval; data stores 247912 (journeys) and 247916 (nurture emails, `approved` flag false until Kat signs off). All INACTIVE. Drive folders KRN OneQ Transcripts / Jobs / Plans. Copy drafts in content/oneq-journey/, intake page site/src/pages/one-question-intake.astro, plan agent prompt agents/krn-oneq-plan-agent.md. Full runbook: project doc KRN_OneQ_Journey_Build_2026-11-06.md.

## 6 Nov 2026 — One-Question journey reworked to the staged brief (branch feat/oneq-journey, PR #6, not merged)
- Records now keyed by appointment: key = md5(Calendly invitee URI); a derived client_id ties reschedules to the same person; per-appointment link signature for intake and approval. Duplicate webhooks are no-ops; cancel, reschedule, unpaid, missing-intake and missing-transcript each have a status field and an alert email.
- Approval is POST-only from site/src/pages/oneq-approve.astro (noindex, no-store via site/public/_headers, loads nothing on open) and checks link signature + document version hash + pending; GET does nothing; stale version gets 409. Plan agent (agents/krn-oneq-plan-agent.md) writes plan_version and marks drafts UNAPPROVED DRAFT.
- Deadline = 2 business days Brisbane using data store 247920 "KRN QLD Public Holidays" (2026-2027, qld.gov.au). Reminders scenario is now a 6-hourly sweep with 24h approval reminder and 36h escalation (drafted delay note for Kat, never auto-sent).
- Intake page asks transcription consent; "manual notes" sets consent_transcript=false and emails Kat. Kat's pre-brief is a Drive link. Nurture record 0 behavioural-claim line removed. Zanda: no API, Zapier or Make app yet; restricted Drive folder is the interim clinical record and Kat files the approved PDF manually.
- Blueprints are generated by automation/oneq/build_blueprints.py; test plan automation/oneq/TEST_PLAN.md (nothing could run: all scenarios inactive by design). Still all INACTIVE; nothing sent to anyone.

## 6 Nov 2026 15:20 — hero rotator (PR #13 feat/hero-rotator, not merged)
- Homepage hero rotates 7 headline + sub-line pairs (all stages, trying, IVF, pregnant, after birth, PMOS & hormones, everyday) every 5.5 s with tappable chips; chip click stops rotation and fires `hero_segment` dataLayer event. Slide text in `site/src/pages/index.astro` (#heroSlides); CSS under "Hero rotator" in global.css.
- H1 in HTML unchanged for SEO. No testimonials (DA rule). Kat to approve slide copy. PMOS vs PCOS on the public headline is Kat's call.

## 6 Nov 2026 17:30 — AI / LLM visibility
- Live: `/llms.txt`, `/llms-full.txt`, IndexNow key file, robots.txt naming AI crawlers, sitewide Organization + Person + WebSite schema, Article/Breadcrumb/FAQPage schema.
- City telehealth pages: Sydney, Melbourne, Perth, Adelaide, Gold Coast, Canberra (`StatePage.astro`), linked from the footer. Kat to glance at the four new ones.
- `.github/workflows/indexnow.yml` submits every sitemap URL to Bing after each push to main and daily 05:30 Brisbane.
- Latitude agent writes one answer article a day to `content/blog/` (queue `content/_latitude-queue.md`). Make 8409336 still syncs any WordPress posts hourly until WP is switched off.
- Latitude tracked prompts now cover Brisbane ×5, telehealth Australia, Sydney, Melbourne, Perth, Adelaide. Next visibility refresh ~25 Nov.
- Kat's Reddit Replies page refilled to 12 pending (artifact Q1euco6QVhEqhg4P57TKcZ).
- Human-only listings (Bing Webmaster sitemap, Bing Places, Apple Business Connect, healthdirect, weightloss.com.au address): see project doc `KRN_AI_and_SEO_Visibility_2026-11-06.md`.
