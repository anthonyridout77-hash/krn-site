---
target: homepage
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 4
target_identity: "file:/home/claude/krn-site/site/src/pages/index.astro"
target_fingerprint: "sha256:c238c097d0bebdb9d044d5667861db36b949c1c63c98c43064f240e8859c5e4a"
target_path: /home/claude/krn-site/site/src/pages/index.astro
timestamp: 2026-10-20T22-47-43Z
slug: site-src-pages-index-astro
---
# Homepage critique — 21 Oct 2026
Method: dual-agent. Score 19/32 (7 and 10 n/a). Acceptable.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of status | 2 | Forms show "Sent." without sending |
| 2 | Match real world | 3 | "evidence-led guidance" clinical; Calendly slug "investigative-callback" |
| 3 | User control | 3 | Phone book-bar not dismissible |
| 4 | Consistency | 2 | Three book labels; 60 vs 75 min; links to old www domain |
| 5 | Error prevention | 2 | novalidate, no endpoint |
| 6 | Recognition | 3 | No phone menu |
| 7 | Flexibility | n/a | Persuade page |
| 8 | Minimal | 3 | Ticker repeats tiles; rating x3 |
| 9 | Error recovery | 1 | Failed send has no path back |
| 10 | Help | n/a | FAQ is content |

## Design specificity
Authored below the fold (APD card + register link, Step 1 copy, article titles); interchangeable above it (no face, no "mum of three", generic headline).
Detector: 19 findings; 12 false positives (theme mix-ups, padded wrappers); 9 reveal a REAL dark-mode bug: .reviews and .cbox use var(--ink) which flips to #E9F0EB in dark mode -> 1.16:1. Browser: no overflow at 390/1280; 1 h1; smallest text 10.9px; "Learn more" links 23px tall.

## Priority issues
1. P0 Forms are fake (wire() shows Sent., no POST). Wire via Make->Brevo or hide. /impeccable harden
2. P1 Tiles/recipes/articles link to https://www.katridout.com.au/ (old site). Use relative paths. /impeccable harden
3. P1 Dark mode: .reviews and .cbox unreadable. Pin to fixed tokens. /impeccable polish
4. P1 Factual drift: "60 minutes" (75), "writes every plan herself", "since 2018", "Medicare provider", "new recipes every week". Cut/verify, Kat gate. /impeccable clarify
5. P1 Headline "Empower your pregnancy" excludes IVF/postpartum readers; propose stage-range line, Kat approval. /impeccable clarify
6. P2 No reassurance under hero button; no phone menu; three book labels. /impeccable clarify + /impeccable adapt

## Persona red flags
Jordan: consult unexplained until Step 2; three labels; no phone menu. Casey: bar eats screen; no image on screen 1; ticker not tappable. Riley: fake send; old-domain links; dark mode. Mel (IVF, 11pm): headline says pregnancy; no "been there"; call-only path; checklist silently fails; "Hear from clients" -> "Reviews on Google".

## Minor
"Nutritionist" beside APD; recipe cards same link; rename Calendly event; coral leaks to stars/tile rule/nav underline (P3).

## Questions
Headline as person+stage range — what else is needed above the fold? Five credentials before one consult? Checklist as the 11pm path?
