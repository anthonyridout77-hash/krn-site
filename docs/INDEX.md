# Katrina Ridout Nutrition — index

Start here if you are new. One page: what the business runs on, where each thing lives, who decides what, and which document to read for what. Updated 20 Oct 2026.

## The business in one paragraph
Katrina (Kat) Ridout is an Accredited Practising Dietitian in Milton, Brisbane, consulting Australia-wide by telehealth in fertility, IVF, pregnancy and postpartum nutrition, plus general nutrition. Anthony Ridout runs the marketing and systems. Claude runs the day-to-day marketing agents in the cloud and asks a human only at five gates: money, new public health copy (Kat approves), credentials/DNS, policy risk, client contact.

## Where everything lives
| What | Where | Owner |
|---|---|---|
| Website code, content, docs, agents | GitHub `anthonyridout77-hash/krn-site` (private) | Anthony |
| Website hosting | Cloudflare Workers `krn-site`, auto-deploys from `main`; preview https://krn-site.anthonyridout77.workers.dev | Anthony |
| Domain katridout.com.au | Registrar unknown until Surf Pacific handover; DNS to move to Cloudflare | Anthony |
| Old site (until cut-over) | www.katridout.com.au (Next.js) + api.katridout.com.au (WordPress), hosted by Surf Pacific (Lachlan) | Surf Pacific |
| Bookings | Calendly (free 15-min call: https://calendly.com/katridout/15-minute-investigative-callback) | Kat |
| Clinic software, notes, Medicare, invoices | Zanda → Xero | Kat |
| Email marketing and CRM | Brevo (anthonyridout77@gmail.com for now; info@ later) | Anthony |
| Automation glue | Make.com (WP publisher, reels, email outbox, images) | Anthony |
| Ads | Google Ads 494-611-5193, budget A$52.60/day | Anthony |
| Analytics | GA4 + GTM (GTM-NVQZKHL, AW-10944755829), Search Console, Bing Webmaster | Anthony |
| Social | Buffer (Instagram, Facebook, LinkedIn, TikTok), ManyChat (IG DMs) | Anthony |
| AI visibility | Latitude | Anthony |
| Brand assets, photos, templates | Google Drive "KRN Marketing"; also `site/public/images/` | Anthony |
| Plans | Claude Docs: KRN Growth Engine Plan, KRN Business Stack 2026 | Anthony |

## Which document for what
| Question | Read |
|---|---|
| What is the current state and what is open? | `docs/STATE.md` |
| Why was it built this way? | `docs/decisions.md` |
| How do I deploy, roll back, move the domain? | `docs/runbook-deploy.md` |
| What do we need from Surf Pacific? | `docs/handover-surf-pacific.md` |
| How do I add a blog post or recipe? | `README.md` then `docs/content-model.md` |
| What are the rules for anyone (or any AI) editing this? | `CLAUDE.md` |
| How do the marketing agents work? | `agents/README.md` and the Growth Engine Plan |
| What happened on a given day in Jun–Sep 2026? | `docs/archive/run-log-archive-2026-06-to-09.md` |
| The One-Question Consult offer | project doc KRN_OneQuestion_Consult_Plan_2026-10-20 |

## Who decides
- Kat: anything a client reads about nutrition or health; prices; the One-Question Consult; her photos.
- Anthony: money, accounts, DNS, tools, ad budget.
- Claude: everything else, logged in `docs/STATE.md` and the Growth Engine Plan.

## Compliance in one line
Say Accredited Practising Dietitian (never AHPRA); Medicare = GP Chronic Condition Management Plan; no testimonials about care, no outcome claims, no unverified claims; review figures must be current.
