# agents/ — KRN marketing agents

The KRN marketing system is a set of Claude skills (markdown files). They will be versioned here so the whole system is in one repo and survives any single machine or account.

**Status:** placeholder. Skills currently live in the `krn-marketing` Claude plugin. Move them here one at a time; each move is a PR.

## Agents

| Skill file | Role | Cadence | Writes to |
|---|---|---|---|
| `krn-orchestrator.md` | Single point of contact. Reads the status ledger, dispatches the others, answers "what's going on" | On demand + daily | Ledger |
| `krn-brief-agent.md` | Composes and sends the daily marketing brief email | Daily 7am Brisbane | Email outbox |
| `krn-content-agent.md` | Weekly blog + social posts. Publishes by committing to `content/` via Make | Monday | This repo (PR) |
| `krn-video-reels.md` | Weekly reel script and render handoff (Kling/Veo via Make) | Monday | Drive, Make |
| `krn-seo-daily-agent.md` | Chases seven target terms, applies on-page fixes, reverts losses | Daily | This repo (PR) |
| `krn-seo-competitor-agent.md` | Weekly competitor scorecard by state | Weekly | Drive |
| `krn-linkedin-buffer.md` | LinkedIn practitioner posts, Buffer scheduling | Tue + Thu | Buffer |
| `krn-ads-agent.md` | Google Ads scoring and recommendations. Never spends | Weekly | Report only |
| `krn-comments-agent.md` | Drafts IG/FB comment replies for a human to post | Daily | Email |
| `krn-leads-agent.md` | Finds people asking about fertility/pregnancy nutrition; drafts compliant replies | Weekly | Email |
| `krn-collab-agent.md` | Partnership outreach drafts | Weekly | Email |
| `krn-latitude-agent.md` | AI visibility: Latitude prompts, articles, llms.txt, IndexNow, Bing | Monthly + reviews | This repo, Latitude |
| `krn-approval-agent.md` | Mail integrity, stranded drafts, applies Kat's CHANGES, verifies reels scheduled | 3× daily | Buffer, email |
| `krn-expansion-agent.md` | Interstate organic expansion (Adelaide, Perth, Sydney, Melbourne) | Fortnightly | This repo (PR) |

## File format

Each agent is one markdown file with YAML frontmatter:

```markdown
---
name: krn-content-agent
description: One line — when to use it.
cadence: weekly-monday
gates: [health-copy]
---
Instructions...
```

`gates` lists which of the five human gates the agent can hit (`money`, `health-copy`, `credentials`, `policy`, `client-contact`). An agent with a gate stops and asks; it never proceeds on its own.

## Rules

- Agents draft; humans send, post and spend. No agent contacts a client, posts publicly or changes a budget.
- Every agent reads `CLAUDE.md` compliance rules before writing public copy.
- Agents that write content open a PR to this repo. They never commit to `main`.
- Shared status ledger stays in Drive (dated files) until it moves here.
- Changes to an agent = PR with a one-line reason in the description.
