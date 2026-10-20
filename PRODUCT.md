# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: a woman aged roughly 25 to 44 in Australia who is planning a pregnancy, going through IVF, pregnant, or newly postpartum. She finds Kat through Google on her phone, is often anxious and short on time, and wants a clear next step from someone qualified. Confirmed by Anthony, 21 Oct 2026.

Secondary (confirmed as secondary): her partner during the fertility stage (couples consults exist); GPs and other referrers; general nutrition clients outside the maternity stages.

## Product Purpose

Katrina Ridout Nutrition is the practice of Katrina (Kat) Ridout, an Accredited Practising Dietitian based at Milton Village Medical in Brisbane, consulting Australia-wide by telehealth. The website exists to turn a search into a booked free 15-minute call (or, once live, a paid One-Question Consult), and from there into a Program client.

Success, as confirmed: bookings of the free call and the One-Question Consult, and clients who go on to a Program. Nothing else counts as the website's success metric.

## Positioning

An Accredited Practising Dietitian who specialises in fertility, IVF, pregnancy and postpartum nutrition (and also sees general nutrition clients); a mum of three who has been through it herself; warm and nurturing rather than clinical, while evidence-based; available in person in Milton, Brisbane or by telehealth anywhere in Australia. Confirmed by Anthony, 21 Oct 2026 (he asked to add "mum of three", to drop "writes every plan herself", and to avoid "only" maternity).

The named competitor Anthony watches is Lifestyle Maternity (Dr Shelley Wilkinson, Brisbane), which claims "most experienced". KRN does not compete on experience claims; it competes on the warmer, more personal relationship.

## Operating Context

- Bookings: Calendly. Free 15-minute call: https://calendly.com/katridout/15-minute-investigative-callback (no advice given on the call; it is for fit). Kat is never available on Mondays.
- Clinic software, notes, Medicare: Zanda. Invoices: Xero.
- Email and CRM: Brevo. Automation: Make.com. Ads: Google Ads. Analytics: GA4 + GTM. Social: Buffer, ManyChat.
- Consults: initial 75 min, review 30 min, extended review 45 min, couples initial 90 min; programs of 5 or 7 consults, usually across 12 weeks, flexible to stage; plans and resources sent within 2 business days of a consult; individualised supplement plan from the first consult.
- Medicare: rebates may apply with a GP Chronic Condition Management Plan (GPCCMP), 5 allied-health visits per calendar year. Dietetic services are GST-free.
- Site: Astro static site in this repo, hosted on Cloudflare, auto-deployed from `main`. Content is markdown in `content/`.

## Capabilities and Constraints

- Compliance (Dietitians Australia "Marketing your practice"): no testimonials or reviews about clinical care; no outcome claims; title is Accredited Practising Dietitian (APD), never "AHPRA"; Medicare wording is GPCCMP; review counts and star ratings must be current and verifiable; no unverified claims (no years-of-experience or client-count claims unless Kat verifies them).
- Google Ads: fertility-related terms are policy-limited; pregnancy-nutrition framing serves without restriction.
- Pricing: single consult fees may be shown; Program prices are discussed on the free call, not published (decision pending final confirmation by Anthony and Kat).
- One-Question Consult: $129, 30 min telehealth, new clients only, written one-page plan; not linked in navigation until Kat signs off. Name undecided (Kat's call).
- Photos of Kat: only those Anthony has approved (currently the blue-top studio headshot and the black-and-white portrait). Two portraits per page maximum on the homepage.
- Undecided: the list of general nutrition conditions to name; whether to publish consult fees at all; the public name of the One-Question Consult.

## Brand Commitments

- Name: Katrina Ridout Nutrition; "Kat" in copy.
- Logo: script wordmark (`site/public/images/krn-logo.png`). APD mark (`site/public/images/apd-logo.png`) used as supplied, unaltered.
- Voice: warm, direct, practical, plain language, Australian spelling, sentence case. Not clinical, not salesy. Signs emails "Kat xx".
- Binding visual constraint Anthony set (recorded, not expanded): the "Fresh" concept chosen 20 Oct 2026; refine rather than redesign. Details live in `site/src/styles/global.css`, not here.

## Evidence on Hand

- Credentials: APD registration APD008207 (Dietitians Australia register link on the site); Bachelor degree in Nutrition and Dietetics from QUT (old site says "Applied Science (Honours)", current copy says "Health Science"; Kat to confirm); Graduate Certificate in Research in prenatal nutrition (QUT); Early Life Nutrition Alliance training (certified; not a current member).
- Google Business Profile: 4.9 average, 49 reviews as at 20 Oct 2026 (aggregate figures only; keep current or remove).
- Content: 90 blog posts, 9 recipe titles (bodies to be rebuilt), 14 service pages, all in `content/`.
- Absences future work must not fabricate: no media, talks or podcast appearances; no testimonials may be used; no client counts; no verified years-of-experience figure; APD certificate on file has expired (new one pending from Kat).

## Product Principles

1. The next step is always visible: every page gets the visitor to the free call in one tap.
2. Say less, truthfully: no claim without a source, and the APD rules are a floor, not a target.
3. Warmth is the differentiator: write and design for an anxious woman on her phone, not for a clinician.
4. Specialist front door, general wing: lead with fertility, pregnancy and postpartum; keep general nutrition reachable.
5. Kat decides health copy; everything else can move fast.

## Accessibility & Inclusion

Mobile first (most traffic is phones). Readable contrast on all text, including on the salmon panels. Pill buttons at least 44px tall. No reliance on colour alone. Imagery should reflect a range of women and families; the reel pipeline already gates on this.
