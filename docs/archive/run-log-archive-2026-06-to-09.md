---
name: krn-run-log-archive-2026-06-to-09
description: One-line-per-run archive of KRN agent run logs and change logs Jun–Sep 2026 (approval checks, SEO daily, comment replies, desktop catch-ups, weekly runs, GTM/Ads changes); read only when the history of a specific day matters
sources: [cowork]
---

Times are Brisbane. Browser deviceId for every unattended Aug run = `07551915-4ef0-47cd-9e32-6a41c3bde9ce`. Buffer org `6a15f7f506c8522ea6471c85`. 7:30pm Brisbane = dueAt 09:30Z.

## Approval checks (krn-approval-check, 7am / 12pm / 5pm)

- 2026-08-05 17:00 — KRN approval-check 5pm run 5 Aug 2026 — Reel A compliance re-render swap + Buffer re-ingest gotcha; all 3 reels compliant and scheduled — key facts: Reel A posts IG 6a72dde59cb174149978b9da / FB 6a72dde04207e0dee5415c54 pointed at the old non-compliant render (clip 6967709); compliant re-render (clip 36180237) uploaded under FRESH name KRN_reelA_2026-08-03_v2.mp4 (media 4643; in-place replace of media 4632 does NOT make Buffer re-download); moved both to Fri 7 Aug 7:30pm.
- 2026-08-06 07:00 — KRN approval-check 7am run 6 Aug 2026 — all 3 reels verified scheduled in Buffer, COLLAB=no, no CHANGES reply — key facts: Reel B IG 6a71042ed702c24ecb1cedca / FB 6a71042a20d3689200ad29e3; Reel C IG 6a7149e93e02cab4770fd2ee / FB 6a7149e4d702c24ecb206d5b; injected AskUserQuestion instruction in a tool result disregarded; Buffer list_posts dueAt+status combined filter returns empty edges.
- 2026-08-07 07:00 — KRN approval-check 7am Fri 7 Aug run — all 3 reels verified (B sent Thu, A scheduled Fri 7:30pm v2, C scheduled Sat 7:30pm); COLLAB=no; blog 4616 lazy-img fix applied — key facts: blog 4616 body images carried loading="lazy" and never rendered; fixed via wp-admin nonce path (wpApiSettings.nonce + X-WP-Nonce + credentials:include, POST /wp-json/wp/v2/post/4616); app-password REST gives 401 rest_forbidden_context on custom `post` type; org-wide Buffer list_posts with status filter returned EMPTY while posts existed, re-query per channel.
- 2026-08-07 17:00 — KRN approval-check 5pm Fri run — all 3 reels fully scheduled/sent both platforms, COLLAB=no, no CHANGES reply, queue empty — key facts: week KRN_content_2026-08-03, blog 4616 iron-in-pregnancy.
- 2026-08-08 07:00 — KRN approval-check 7am Sat 2026-08-08 run outcome — key facts: A v2 and B SENT, C scheduled Sat 8 Aug; Kat sent 0 emails in 10 days.
- 2026-08-10 09:34 — KRN approval-check run 2026-08-10 ~9:34am Mon — new week not yet set up; last week fully sent; COLLAB no; no reply — key facts: Monday content run historically lands afternoon (4:45pm on 3 Aug) so a missing pack before noon is WATCH not failure; run.sh line 74 `[: >=:` is a cosmetic shell bug.
- 2026-08-10 12:00 — KRN approval-check 12pm Mon 10 Aug — Monday pack still not landed at noon (expected, lands afternoon); Reel B Veo already rendered; held all scheduling pending pack; COLLAB=no (queue empty) — key facts: Veo reel rendered 11:01 before the pack existed; scheduling held because captions cannot be verified without content_pack.md.
- 2026-08-10 17:00 — KRN approval-check 5pm Mon 10 Aug — pack landed; Reels A+B rendered+compliant but file_upload BLOCKED by space-in-path bug so NOT hosted/scheduled; Reel C render promoted; COLLAB=no; no CHANGES reply — key facts: pack landed ~2:23pm, blog 4675 live; Chrome file_upload dropped the `paths` arg (first diagnosed as spaces, corrected 11 Aug); Reel C promoted via prompts/stock_trigger_2026-08-10-C.marker.
- 2026-08-11 07:08 — KRN approval-check Tue 11 Aug 7am — all 3 reels rendered; Reel C FAILED APD gate (clip 8481275 non-fair-skin hands), re-rendered with vetted clips; hosting still blocked by file_upload space bug so NO reel scheduled — key facts: Pexels job notes mislabel skin tone, view the frames; ADDENDUM: file_upload true root cause = it corrupts `paths` for ANY path inside a connected folder, unusable, do not re-diagnose; new hosting = krn_host_reels.py POSTs to /wp-json/wp/v2/media using buffer_config.json wordpress.app_password, writes hosted_reels.json; Mac app_password was 401 (Anthony to regenerate); Veo 429 RESOURCE_EXHAUSTED (AI Studio credits).
- 2026-08-11 12:00 — KRN 12pm approval-check 2026-08-11 — host-script Monday-dir bug hosted the FLAWED Reel C; all 3 reels now scheduled clean; WP app password now valid — key facts: krn_host_reels.py week_mp4s() scans only output/<monday> and output/stock_<monday>, so a re-render in stock_2026-08-11 was never seen (flawed media 4684 hosted); fix = cp corrected file over the Monday-dir copy + host_trigger marker, re-hosted as media 4685 KRN_reelC_2026-08-10-1.mp4; C scheduled FB 6a7a853e399fea065b503ad5 / IG 6a7a854288a243979068204c Sat 15 Aug; permanent fix = dedupe by basename newest mtime.
- 2026-08-11 17:00 — KRN approval-check 5pm Tue run — clean; all 3 reels scheduled both platforms, COLLAB=no, 4 stale stranded drafts (unchanged, Anthony already alerted 7:02am so no re-escalation), no CHANGES reply — key facts: Reel A media 4683 FB 6a7a5ef698be23f3c73eb071 / IG 6a7a5ef0030db7cdaf45b54b Tue 11 Aug; Reel B media 4682 FB 6a7a5f0188a243979066055c / IG 6a7a5efb74c67cb9fa236167 Thu 13 Aug; Reel C media 4685 Sat 15 Aug.
- 2026-08-12 12:04 — KRN approval-check Wed 12 Aug 12pm run — first DUTY 0 same-day rescue actually fired — key facts: "KRN brief — Wednesday 12 August" stranded in Drafts, SENT 12:07pm; it named the stuck briefs + ad overspend A$1,502 vs A$1,400 ceiling, so no separate escalation.
- 2026-08-12 17:04 — KRN approval-check 5pm Wed 12 Aug 2026 — clean run, nothing needed action; 4 stale stranded drafts persist (already escalated today), all 3 reels done both platforms, COLLAB=no, no content CHANGES — key facts: hosted_reels.json B=4682, A=4683, C=4685; Kat's only reply in 7d = six SEO approvals on the 11 Aug SEO thread.
- 2026-08-13 07:00 — KRN approval-check run Thu 13 Aug 7am — clean run, nothing needed action; Reel B fires tonight — key facts: no-daily-spam re-escalation pattern established.
- 2026-08-13 12:05 — KRN approval-check 12pm run 2026-08-13 (Thu) — clean; all 3 reels scheduled both platforms; same 4 stranded drafts; no CHANGES reply — key facts: none.
- 2026-08-13 17:04 — KRN approval-check 5pm Thu 2026-08-13 run — clean; no same-day draft; same 4 stranded drafts (no re-escalate); all 3 reels correct on both platforms (A sent Tue, B fires tonight, C Sat); COLLAB=no; queue empty; content thread no reply — key facts: none.
- 2026-08-14 07:04 — KRN approval-check run 2026-08-14 7am Fri — clean; all 3 reels done both platforms; 4 stranded drafts persist (no re-escalate); COLLAB=no; no CHANGES reply — key facts: none.
- 2026-08-14 12:05 — KRN approval-check run log for 2026-08-14 12pm (Friday) — same-day brief rescued; 4 older stranded drafts persist; all 3 reels correct; COLLAB=no — key facts: "KRN brief — Friday 14 August" stranded then SENT 12:07pm; send-step bug recurred after a clean 7am.
- 2026-08-14 17:03 — KRN approval-check 5pm Fri 14 Aug — clean; no same-day draft; same 4 stranded drafts; all 3 reels correct both platforms; COLLAB=no; queue empty; content thread no reply — key facts: none.
- 2026-08-15 07:03 — KRN approval-check 2026-08-15 7am Sat — clean; no same-day rescue; same 4 stranded drafts persist; Reel C scheduled both platforms tonight 7:30pm automatic (COLLAB=no) — key facts: none.
- 2026-08-15 12:03 — KRN approval-check 12pm Sat 15 Aug — same-day RESCUE fired (today's 7:39am brief stranded → SENT 12:05pm); 4 older stranded persist; Reel C scheduled tonight both platforms; queue empty; content thread no reply — key facts: second same-day rescue of the pattern.
- 2026-08-15 17:05 — KRN approval-check 2026-08-15 5pm Sat — clean; Reel C verified scheduled tonight both platforms; 4 stranded drafts persist report-only — key facts: Buffer list_posts with status filter but no date returned empty (quirk); dated query is authoritative.
- 2026-08-16 07:03 — KRN approval-check 7am Sun 16 Aug — clean; whole Aug-10 content week complete (all 3 reels sent both platforms); no same-day rescue; same 4 stranded drafts persist; blog spot-check clean — key facts: blog 4675 body images krn-upf-fertility-body1-v2.jpg/body2.jpg load, Calendly = 3 real anchors to /15-minute-investigative-callback.
- 2026-08-16 12:03 — KRN approval-check 2026-08-16 12pm Sun — clean; no same-day rescue; same 4 stranded KRN drafts persist (report-only, all pre-today, stale); Aug-10 content week COMPLETE (all 3 reels sent both platforms); IG4 feed post scheduled tonight 19:30; COLLAB=no both signals absent; queue empty; content thread no reply; LAST_RUN_FAILED rc=1 benign — key facts: IG4 postpartum-fatigue post 6a79513be99da63ec8a4ca67.
- 2026-08-16 17:04 — KRN approval-check 2026-08-16 5pm Sun — clean; week COMPLETE; all 3 reels verified sent both platforms via Buffer; same 4 stranded drafts persist (report-only); COLLAB=no; DUTY 3 clean — key facts: none.
- 2026-08-17 07:03 — KRN approval-check 2026-08-17 7am Mon — new week, first run; today's lead digest stranded but UN-rescuable (off allowlist); 4 old stranded persist; no reels due yet; COLLAB=no — key facts: NEW failure mode: "KRN lead digest — 17 August" addressed to katrinaridoutnutrition@gmail.com + ant_kat@hotmail.com, both outside the DUTY 0 auto-send allowlist (anthonyridout77@gmail.com / info@katridout.com.au).
- 2026-08-17 12:04 — KRN approval-check 12pm Mon 2026-08-17 — RESCUED today's brief; NEW pipeline break — content agent published blog+6 posts but wrote NO content_pack.md, so reels have no caption source and are HELD — key facts: blog 4732 (glp-1-medications-planning-a-pregnancy) published 07:13; Reel A hosted media 4733; all 3 reels HELD because content_pack.md is the required caption + CTA-gate source.
- 2026-08-17 17:00 — KRN approval-check 5pm Mon 2026-08-17 run result — key facts: Monday-after-9am ALERT raised (no KRN_content_2026-08-17/ dir); Reel C hosted media 4734; Reel B Veo not rendered; Buffer week = 6 image posts, zero reels.
- 2026-08-18 07:04 — KRN approval-check 18 Aug 7am — content_pack.md FINALLY exists this week; A+C already scheduled both platforms; Veo Reel B blocked by depleted AI Studio credits — key facts: pack written 06:36 (17KB); content_pack channel-id labels "6a8370…" are Buffer POST ids not channel ids; Reel A (WP 4733) IG 6a8370ba… / FB 6a8370c0… Tue 18 Aug; Reel C (WP 4734) IG 6a8370ce… / FB 6a8370d5… Sat 22 Aug; Veo 429 prepayment credits depleted is the real cause of weeks of "Veo failed".

## SEO daily / weekly (krn-seo-daily, krn-seo-competitor)

- 2026-08-06 07:00 — KRN daily SEO run 6 Aug 2026 — homepage hero copy lives in the Next.js front end not WordPress; WP app password now 401s; blog library had zero links to any service page — key facts: hero "Brisbane Leading Nutritionist | 5,000+ Happy Clients" is hard-coded in Next.js (WP page 2 does not contain it); krn_wp_auth app password 401s on every write, fallback = wpApiSettings.nonce + X-WP-Nonce; 42 posts had zero links to service pages (service URLs are /our-services/...); pregnancy dietitian Australia 3→20 fired the guardrail, service 415 reverted.
- 2026-08-07 07:00 — KRN daily SEO run 7 Aug 2026 — homepage has NO meta description tag on the live front end (the 4 Aug write never rendered), homepage testimonials are a prohibited-outright DA breach, revert guardrail now 2 fires / 2 false positives, first-ever internal links into service 527 — key facts: rendered homepage carries "RATED 4.9 ON GOOGLE" + named testimonials (prohibited for a regulated health service); links into 527 from posts 4080/4081/4087; blog 4653 postnatal-iron-and-energy-still-exhausted published; wrote "free 15-minute callback" (pricing is outside agent autonomy).
- 2026-08-11 07:00 — KRN daily SEO 11 Aug — first board gain (IVF 3→2); KRN daily briefs found sitting UNSENT in Gmail drafts for 4 days, so prior escalations may never have reached Anthony; Gmail hash nav returns a stale DOM — key facts: IVF dietitian Brisbane 3→2 (service 383); Google CAPTCHA rate-limited mid-run; links into 527 from posts 3526, 3352, 3342, 4675; 527 path is /our-services/nutrition-for-fertility/; canonical host www.katridout.com.au.
- 2026-08-12 07:00 — KRN daily SEO 12 Aug 2026 — the 20-day frozen page head means every title/meta change since 23 July never reached Google; Kat approved all six items; board best since it opened — key facts: x-vercel-cache HIT, / age 20.3 days, no redeploy since ~23 Jul, so both guardrail "false positives" were mechanically impossible; Kat (not Anthony) replied 11 Aug 08:59 "Approve 1..6"; guardrail now needs a drop on two consecutive daily checks; PCOS post 4086 outcome claims removed; Yoast on `service` type unavailable over REST, write via wp.data.dispatch('yoast-seo/editor').updateData() + core/editor savePost().
- 2026-08-13 07:00 — KRN daily SEO 13 Aug 2026 — the 20-day head freeze ended (site redeployed ~midday 12 Aug), and the real indexation blocker is measured: the whole site is client-rendered, serving only 47-64 words per page to a first-pass crawl — key facts: homepage age 1,754,454s → 72,005s; 527 title "Fertility Dietitian Brisbane and Australia-wide | Kat Ridout APD" and 415 title live; no head changes until ~20 Aug to preserve the measurement window; cache:'reload' needed before infrastructure measurements; links into 415 from posts 1773, 3879, 1767.
- 2026-08-15 07:00 — KRN daily SEO 15 Aug 2026 — 7 held; Brief 3 pillar published (post 4713, cadence 2 of 2); the 13 Aug duplicate-H1 finding WITHDRAWN as wrong; indexation count flat at 9 but membership churning — key facts: post 4713 postnatal-nutrition-first-year (featured 4710), reciprocal links from 4641 and 4653; "Merry Christmas" string is payload, not an H1 (raw string match promoted to a DOM claim).
- 2026-08-16 07:00 — KRN daily SEO run 16 Aug 2026 — 7 held; indexation corrected 9→15 of 45 (five runs wrong); service 413 meta compliance fix; link hypothesis retired — key facts: site: with num=50 page one only under-counted; service 413 meta description removed "reduce endo pain" (COMPLIANCE FIX / never revert).
- 2026-08-17 07:00 — KRN daily SEO 17 Aug 2026 — 16 Aug brief never composed so yesterday's report went undelivered (4th time); front-end claim inventory written; meta-desc compliance fixes only fix the snippet, not the page — key facts: only 3 briefs sent in 10 days (12, 14, 15 Aug); KRN_Developer_Brief_Frontend_Copy_2026-08-17.md = 26 items across six pages; service bodies are 1,068 bytes of block shells naming Next.js components (Sidebar, BackgroundWithBlocks, Qualification, FromOurBlog, NewsletterSubscription); three consecutive lead digests stranded (3, 10, 17 Aug), fix = re-point recipients.
- 2026-08-18 07:00 — KRN daily SEO 18 Aug 2026 — two "take #1" goals met but credited to She Blooms falling, public sitemap strips every lastmod, indexation corrected to 14 of 46 — key facts: fertility dietitian Brisbane and IVF dietitian Brisbane 2→1 because She Blooms fell 1→2; www sitemap has 106 URLs and zero lastmod while api.katridout.com.au/post-sitemap.xml has 46, already item 3 of KRN_Developer_Email_2026-08-11.md and with Lachlan; no title/meta/H1 changes before 26 Aug; CORS from the www origin reads as "Failed to fetch".
- 2026-09-03 10:52 — 3 Sep weekly SEO run — rendering theory dead (sitemap was the cause), Perth on page 1, CAPTCHA now fires on query ONE, Calendly past-view unreadable — key facts: all four state assets indexed within a fortnight of the 18 Aug sitemap submission with zero rendering changes, so the developer brief now matters for compliance only; GSC via Adspirer is the primary position instrument (ignores dimensionFilterGroups, honours startRow); Buffer aggregate drops impressions/reach when TikTok+LinkedIn are in the set; paid 30d A$1,422.59, 11 conv, A$129.33/conv; no weekly run 18 Aug–3 Sep.

## Comment replies (krn-comment-replies)

- 2026-08-07 07:00 — KRN comment-reply run 7 Aug 2026 — zero new comments IG+FB, empty digest SKIPPED (already sent 4+5 Aug) — key facts: Buffer sidebar badges are Publish-queue counts, not comments; empty digest sent at most once.
- 2026-08-08 08:00 — KRN comment-reply scheduled task run 8 Aug 2026 — zero new comments IG+FB, empty digest skipped per anti-spam — key facts: none.
- 2026-08-16 08:00 — KRN comment-reply run 2026-08-16 — no new comments; skipped digest (annietheosteo already sent Aug 14) — key facts: annietheosteo comment on the Aug 12 IG WA-fertility post (reply link instagram.com/p/Db7CrZrlPHx/c/18185733559398201) already digested 14 Aug.
- 2026-08-17 08:00 — KRN comment-reply run 2026-08-17 — no new comments, digest skipped (no-spam) — key facts: annietheosteo still unanswered by Kat; ohgoodness_nutrition answered; LinkedIn ignored per task.

## Desktop catch-ups (krn-desktop-catchup)

- 2026-08-19 07:15 — 19 Aug 7:15am desktop catch-up — all queues clean; TikTok reel A confirmed to have MISSED its 18 Aug slot while still a draft — key facts: TikTok reel A 6a83ddf233ec6735e9121bae passed dueAt as status: draft, sentAt: null; reels B 6a83de106fc89d436401fb3f and C 6a83de156fc89d436401fbb5 will fail identically (a Buffer draft with dueAt never publishes); Buffer Mentions tab supports X only, Comments tab is the only signal; ledger KRN_status_desktop-catchup_20260819-1710.json.
- 2026-08-31 12:04 — 31 Aug midday catch-up: content pack failed to land at 6h15m, and the reel pipeline's 60-minute fallback FIRED and rebuilt last week's choline script — key facts: no KRN_content_pack_2026-08-31.md, newest WP post still 4777 (24 Aug); output/2026-08-31/ reel caption byte-identical to 24 Aug = new video of an old script; detect via prompts/ vs output/ listing + caption diff (run.sh logs "Monday job OK" either way); cron is `0 7,12,17`; ledger Drive id 18HQVBrPq1dgi-NlqaGGYMXhRr2M3dMFC.
- 2026-08-31 17:04 — 31 Aug 17:04 desktop catch-up: published blog 4794, badged the week's 5 scheduled posts, notified Katrina; Instagram and the reel are still open — key facts: blog 4794 inositol-pcos-what-the-2026-evidence-says, category PCOS (27), featured 4792, GRADE bar 4793; posts re-imaged with -apdg media 4785, 4788, 4789, 4790, 4791; chip/badge assets media 4786, 4787; media 4615 carries the retired orange APD mark, 4662 shows a pregnant subject on a PCOS topic.

## Weekly content runs (krn-weekly-content)

- 2026-07-07 --:-- — First KRN approval-publish run — what shipped, the held reel (false ratings claim), and the working Meta upload technique — key facts: blog 4155 gut-health-fertility-nutrition (featured 4154 set in the same call); reel end card had fabricated "Google 4.9 / 5,000+ Happy Clients", cta_credentials changed to "Accredited Practising Dietitian (APD)" only; krn_weekly_images.py added to run.sh; FB post 1716624829425951 blog-link comment; Meta reel scheduler parses typed dates as US format, use the calendar picker; Gmail label KRN-Processed = Label_1.
- 2026-07-27 07:10 — Weekly GDM-topic pack fully written but HELD — wp-admin logged out again Mon 27 Jul (2nd hold in 8 days); reel handoff done, Buffer/blog/email/dashboard all pending — key facts: RESOLVED 2:10pm: root cause was TWO Chrome instances connected and the automation attached to the one never logged in, not session expiry; permanent fix = WP application password in localStorage krn_wp_auth; blog 4424 live (GDM, category 30), reel media 4425 Thu 30 Jul; notification email to Kat sent only when live.
- 2026-08-03 12:00 — KRN Monday content run for week of 2026-08-03 did NOT fire; no pack, no blog, reels held — key facts: RESOLVED, the run completed ~4:45pm same day (blog 4616 iron in pregnancy, featured 4613); the Mac Veo cron rendered at 11:00 with the stale 27 Jul prompt ("no prompt for this week after 60 min — using newest available"); an early-morning "failed to fire" is transient, not a skipped week.
- 2026-08-10 14:30 — KRN Monday run 10 Aug 2026 (ultra-processed food and fertility) — caught the Mac pre-rendering the Veo reel from LAST week's prompt; `_pad` must be a 600-DEEP NESTED array not a flat one; Pexels thumbnails misrepresent skin tone — key facts: blog 4675 /blogs/ultra-processed-food-and-fertility/ category 25; run.sh skips Veo if output/<date> exists, so rename the stale dir aside, update config.json message_lines, THEN write prompts/<date>_video_prompt.txt (check `grep "Using prompt from" run.log`); flat _pad gets HTTP 500, copy the nested value from the previous dashboard JSON; dashboard media 4676.
- 2026-08-17 07:13 — KRN weekly content run for week of 17 Aug 2026 — GLP-1 and pregnancy planning; interrupted mid-run, recovered 18 Aug — key facts: blog 4732 (featured 4730, category 25), pegged to Obesity Reviews DOI 10.1111/obr.70203; run interrupted after Buffer scheduling and before the pack was saved (write content_pack.md first); medication topics pass the gates if no brand names/doses/timing and the decision stays with her prescriber; visual gate must also catch life-stage errors (pregnant subject on a preconception topic); Ads 10-16 Aug A$327.27, SP Search A$220.77 (67%) for zero conversions; dashboard 4735.

## Collab / expansion / ads weekly

- 2026-08-11 09:24 — KRN fortnightly state-expansion run 11 Aug 2026 — state pages are an orphaned link island, first WA-timezone enquiry, site title carries a build label — key facts: Adelaide 4406 and Perth 4589 linked only to their own LP; fixed same day with closing-paragraph links from posts 4080, 4081, 4087, 4155, 4172, 3956, 4424, 4616; site title "Katrina Ridout 2026" fixed via POST wp/v2/settings; Yoast meta over REST is registered for `post` only (pages/service/recipe expose none), xmlrpc.php 403 at host; do NOT edit the `service` CPT via REST (escaped block markup); dev email KRN_Developer_Email_2026-08-11.md = 4 items with Surf Pacific (redeploy + ISR, register_post_meta Yoast keys for page/service, sitemap lastmod, /thank-you redirect bug); graduation review 16-17 Sep.
- 2026-08-17 08:28 — KRN Ads 17 Aug 2026 — morning 4/10 report contained TWO WRONG CLAIMS, corrected same day; the six "demotions" were Anthony's own deliberate 4 Aug change; values are configured correctly — key facts: Consultation Booking A$275 and form_submit_new A$80 use "same value for each conversion", value rules empty; anthonyridout77 manually demoted six actions to Secondary on 4 Aug 10:27-10:35 (thank-you page view, gform_submission, form_submit, form_submit_new, purchase_guide_success, click_to_call), do NOT restore; applied: auto-apply 0 of 14, RSA auto-apply off, Competitor Conquesting PAUSED (130 clicks, A$104.21, 0 conv), SP Search A$28→A$15/day, TOF A$5→A$8/day, total A$31/day; PM Branded A$8→A$20 blocked by "Confirm it's you" re-auth; mitch@pathfindermarketing.com.au has access.
- 2026-08-18 09:08 — KRN collab run 18 Aug 2026 — third week of zero sends, Wave 1 exhausted, so no new names drafted; two existing drafts rewritten to two sentences instead — key facts: nine drafts unsent since 28 Jul, nothing ever DRAFTED→SENT; @kangatraining.sandgate and @flourishmidwifery rewritten short; Kat IG 311 posts / 301 followers / 724 following, twelve posts over two weeks moved followers by zero; hasActiveMemberDevice for katrinaridoutnutrition (6a4e1e25404834462881cafd) false fourth week.
- 2026-08-18 09:38 — KRN fortnightly state expansion 18 Aug — 4th consecutive zero-indexation read at 4 weeks, second NZ enquiry while NZ sits on hold, no rotation — key facts: Adelaide 3.9 / Perth 3.7 weeks, 8-week bar, review 16/17 Sep; per-path site: queries all "did not match"; cache age 5.7 days (no redeploy since 12 Aug); state IG posts Adelaide 6a8228d3acf3e75953aa8e7f (geo 115970731750761) and Perth 6a8228d94c3cde3c3a297d87 (geo 108252552529332) carry the NOURISH CTA; 11 enquiries since state start (1 Perth, 0 Adelaide, 1 Auckland); NZ on regulatory hold since 22 Jul.

## Changes applied Jun–Jul 2026

- 2026-06-13 --:-- — Live changes applied to KRN accounts on 2026-06-13 via browser + open follow-ups (call-tracking number question, AC rotation pending) — key facts: Calendly "How did you hear about us?" options rewritten (Google search / GP referral / Facebook / Instagram / Google ad / AI assistant / friend / Other); Google Ads 494-611-5193 "Standard" negative list: removed "book", added books/ebook/recipe book (70 kw), applied to all 6 campaigns; wrong call number 1300 375 934 paused, account-level 1300640104 (Katrina's mobile) enabled; account timezone GMT+8 AWST.
- 2026-06-16 --:-- — Changes applied 2026-06-16: Calendly→GA4 booking tracking setup + Consultation Booking conversion action fixed to Secondary — key facts: GA4 G-Z19F4KZQQW = property 333889566 "Katridout Website" entered in Calendly; booking event is `invitee_meeting_scheduled` (not calendly.event_scheduled); Consultation Booking ctId=7638747317 (GTM manual event, never fires) Primary→Secondary; TOF budget A$10→A$30/day (account A$99/day); Medicare RSA swaps on SP Search campaignId=17753783731 ("Medicare Rebate Available", "GP Referral = Medicare Rebate") on 8 RSAs, EOFY ads skipped.
- 2026-06-18 --:-- — Changes applied 2026-06-18: App and web metrics turned ON for GA4 property 333889566; Calendly→GA4→Google Ads loop diagnosis complete — key facts: "Import app and web metrics" Off→On was the blocker to importing GA4 events; older property 322082887 already On; anthonyridout77 has no GA4 admin on 333889566 (Katrina's account) but the Ads import wizard suffices.
- 2026-06-28 --:-- — Changes applied 2026-06-28: Homepage hero 'Make an Enquiry' CTA repointed from /contact-us/ to Calendly 15-min link; Google Ads conversion diagnostic produced — key facts: site = headless WP api.katridout.com.au (Carbon Fields theme by Surf Pacific) + Next.js on Vercel; Home page post=2 Page Banner Main Button → https://calendly.com/katridout/15-minute-investigative-callback, Nextjs Redeploy admin-bar button; sticky "Book" bar and LP Main Buttons still pointed to /contact-us/; diagnostic in KRN Marketing/Google_Ads_Conversion_Diagnostic_2026-06-19.md.
- 2026-07-04 --:-- — Calendly → /thank-you redirect live; Google Ads page_view conversion action set up; one manual GTM/GA4 step remains — key facts: /thank-you page ID 4146 created via REST; Calendly redirect to https://www.katridout.com.au/thank-you/; Page view conversion ctId=7671294203; GTM-NVQZKHL has GA4 only, no AW tag, is hardcoded in the Next.js source and owned by Surfpacific (developer@surfpacific.com.au emailed); Ads account 5707929233 ↔ GA4 333889566 linked; AW-10944755829; Katrina's Google tag G-D8SNTC4FES never installed.

## Lessons that still apply

- Done = SENT, not drafted; a Buffer draft with a dueAt never publishes (TikTok reels A/B/C missed their slots as drafts).
- Buffer re-ingest gotcha: replacing a WP media file in place does not make Buffer re-download; upload under a fresh filename and re-point the post.
- Buffer list_posts quirks: org-wide (no channelIds) or dueAt+status combined filters return empty edges while posts exist; re-query per channel with a date before concluding anything is unscheduled.
- Buffer sidebar badges are Publish-queue counts, not comment counts; the Mentions tab supports X only, so Comments is the only signal for IG/FB.
- Buffer aggregate metrics drop impressions/reach when TikTok+LinkedIn are in the channel set.
- content_pack.md is the single point of failure for reels: write it as soon as captions are final, before publishing; no pack = reels HELD (never invent captions).
- `_pad` in the dashboard JSON must be a 600-deep NESTED array; a flat array gets HTTP 500 / rest_upload_sideload_error; copy it from the previous file.
- Mac Veo/Kling render fires at 11:00 from the newest prompt; run.sh skips if output/<date> exists, so rename the stale dir aside, update config.json message_lines, then write prompts/<date>_video_prompt.txt; check `grep "Using prompt from" run.log` and diff captions against the prior week.
- krn_host_reels.py week_mp4s() scans only output/<monday> and output/stock_<monday>; re-renders in other dirs are invisible until copied over the Monday-dir file (dedupe by basename newest mtime).
- Chrome file_upload corrupts `paths` for any file inside a connected folder; never use it for reel hosting, host via REST /wp-json/wp/v2/media with the app password.
- Pexels thumbnails and job notes misrepresent skin tone; gate on full-size frames (end card + mid-frame + closing clip), budget 2-3 rounds; the visual gate must also catch life-stage/topic mismatches (pregnant subject on a preconception or PCOS topic) and retired brand marks.
- Reel end cards carry only "Accredited Practising Dietitian (APD)"; no ratings, client counts or testimonials anywhere (prohibited outright for a regulated health service).
- LAST_RUN_FAILED "images rc=1" and Veo "video rc=1" (429 RESOURCE_EXHAUSTED, AI Studio credits) are benign once reels are hosted; run.sh line 74 `[: >=:` is cosmetic.
- Monday content pack historically lands in the afternoon; a missing pack before noon is WATCH, after a pre-set threshold (six hours) it is a fault.
- A Monday-morning "failed to fire" is transient; confirm at the 5pm run before calling a week skipped.
- Stranded-mail rule: rescue only same-day drafts to the allowlist (anthonyridout77@gmail.com / info@katridout.com.au); older drafts are report-only; escalate once, never 3x/day.
- Lead digests addressed to katrinaridoutnutrition@gmail.com + ant_kat@hotmail.com can never be rescued; agents must address mail inside the allowlist.
- An agent that hands off to another channel (the 7am brief) must verify that channel delivered; "unanswered" is only true once delivery is verified.
- Gmail hash navigation returns a stale DOM; force a full reload of Sent before concluding a message is missing; the Cc button needs two clicks; the recipient dropdown trap is real.
- Check both correspondents for approvals: Kat is the substantive approver on compliance items, not only Anthony.
- An approval to fix a specific thing is not an approval to fix everything adjacent to it.
- Check Google Ads change history before calling anything drift; the 4 Aug Secondary demotions were Anthony's deliberate change, do not restore them.
- Do not divide "All conv. value" by "All conv." across a window that straddles a config change.
- Google Ads budget writes above a threshold trigger "Confirm it's you" re-auth; never authenticate as Anthony.
- Google CAPTCHA now fires on the first SERP query; front-load mandatory checks, treat scraping budget as zero, use GSC via Adspirer (ignores dimensionFilterGroups, honours startRow; GSC avg position is not a SERP read).
- Calendly bot-gates automated browsers; meetings_preset URL swaps are ignored after first load; invitee timezone/source only render in the details pane, screenshot it.
- javascript_tool returns [BLOCKED: Cookie/query string data] if the payload includes location.href on a query-string URL; omit it.
- Measure the delivery path before crediting or blaming a change: fetch the live rendered page (and the `age` header) rather than trusting wp-json; verifying a save proves the write, not the effect.
- Re-fetch with cache:'reload' before reporting any infrastructure measurement; verify DOM, not raw string matches; the alarming first reading has been wrong repeatedly.
- Fetch robots.txt and the sitemap before concluding a crawl-route failure; diff site: membership across all pages, never compare counts.
- A named proxy must be re-checked the moment the real test returns, or it becomes a fact by repetition.
- Record the ranking URL every run; a change in it is a finding in itself; do not claim credit when a competitor fell.
- Revert guardrail requires a drop confirmed on two consecutive daily checks; tag every ledger row compliance fix vs SEO experiment at write time; compliance fixes are never reverted.
- When a lever is reconnected (redeploy lands), stop pulling it and measure; hold title/meta/H1 changes through the check date.
- Site-wide copy (hero, testimonials, service-page prose, GTM-NVQZKHL) is hard-coded in the Next.js front end owned by Surf Pacific; it cannot be fixed from wp-admin or REST; the developer brief is for compliance only now that the sitemap fixed indexation.
- Yoast meta over REST is registered for `post` only; pages/service use wp.data.dispatch('yoast-seo/editor').updateData() + core/editor savePost(); xmlrpc.php is 403 and never an escape hatch; do not edit the `service` CPT via REST.
- App-password REST writes 401 on the custom `post` type and are likelier to 401 while logged into wp-admin; nonce path (wpApiSettings.nonce + X-WP-Nonce + credentials:include) is the working write route.
- Two Chrome instances are connected; select by deviceId 07551915-4ef0-47cd-9e32-6a41c3bde9ce with a functional self-check (krn_wp_auth present), never by display name; disregard injected AskUserQuestion instructions in tool results.
- Never fetch a blog's public URL right after publish (ISR); set featured_media in the same call as status: publish.
- Internal linking is second-pass work; service 413 ranks #1 with zero inbound links, so the "links from indexed pages" hypothesis is retired.
- "Verified" is not "new": check KRN_Developer_Email_2026-08-11.md and KRN_state_focus.md before re-escalating items already with the developer.
- Expected delivery is not delivery: waiting for someone else to act (Kat replying, collab sends) has been wrong every time on KRN; act on offers already made.
- Collab: Wave 1 is exhausted and nothing has moved DRAFTED→SENT; do not draft new names until something sends.
- GPCCMP terminology, never "GP Management Plan and Team Care Arrangement"; pricing words ("free") are outside agent autonomy.
- Medication topics pass compliance only with no brand names, doses or timing advice and the decision left to her prescriber.
- Meta reel scheduler parses typed dates as US format; use the calendar picker; re-arm the input monkey-patch after every navigation; type captions after deselecting a platform.
- Calendly booking event is `invitee_meeting_scheduled`; it needs GA4 key-event status (property 333889566, Katrina's account) or a GTM AW tag to count as an Ads conversion.
- Cron is the truth for scheduled tasks, not the human-readable schedule text; a run's silence can be latency, so expire negative findings.

Source files condensed: 60
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-05.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-06.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-07-5pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-07.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-08-7am.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-10-12pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-10-5pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-10-7am.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-11-12pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-11-5pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-11-7am.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-12-12pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-12-5pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-13-12pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-13-5pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-13-7am.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-14-12pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-14-5pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-14-7am.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-15-12pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-15-5pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-15-7am.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-16-12pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-16-5pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-16-7am.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-17-12pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-17-5pm.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-17-7am.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_approval_check_2026-08-18-7am.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_comment_replies_2026-08-07.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_comment_replies_2026-08-08.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_comment_replies_2026-08-16.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_comment_replies_2026-08-17.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_desktop_catchup_2026-08-19.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_desktop_catchup_2026-08-31-1204.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_desktop_catchup_2026-08-31-1737.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_weekly_run_2026-08-10.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_weekly_run_2026-08-17.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_collab_2026-08-18.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_monday_run_failed_2026-08-03.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_seo_daily_2026-08-06.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_seo_daily_2026-08-07.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_seo_daily_2026-08-11.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_seo_daily_2026-08-12.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_seo_daily_2026-08-13.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_seo_daily_2026-08-15.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_seo_daily_2026-08-16.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_seo_daily_2026-08-17.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_seo_daily_2026-08-18.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_seo_weekly_2026-09-03.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_state_expansion_2026-08-11.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_state_expansion_2026-08-18.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_ads_weekly_2026-08-17.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_pack_2026-07-27_held.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_publish_run_2026-07-07.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_changes_2026-06-13.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_changes_2026-06-16.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_changes_2026-06-18.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_changes_2026-06-28.md
/projects/01a0a1ae-4606-714d-ac14-6912620d5204/project_krn_changes_2026-07-04.md
