# Placeholders to supply

Everything below renders on the site as a visible `[KIND: …]` tag until you fill it in.
Nothing was invented to fill these gaps.

## 1. Generated scene imagery (Higgsfield — needs your credit approval)

| # | Asset | Put it at | Switch it on in |
|---|---|---|---|
| 1 | ~~**H1 hero still**~~ — **done** (variant B, 2026-11-18). Both variants are kept privately in `references/generated/`. | `public/media/hero.jpg` | `content/media.ts` → `heroMedia.poster.src` |
| 2 | **H1 mobile reframe**, 9:16 — *optional now*: mobile currently uses a crop of the H1 still | `public/media/hero-mobile.jpg` | `heroMedia.posterMobile.src` |
| 3 | **H2 hero loop**, 8 s, silent, MP4 (H.264) + WebM, ≤ 4 MB | `public/media/hero.mp4`, `hero.webm` | `heroMedia.video = { mp4, webm }` |
| 4 | **Closing still**, the studio at golden hour, no person or soft back view | `public/media/closing.jpg` | `closingMedia.src` |

Quoted on 2026-11-18 (balance 100 credits): H1 × 2 variants ≈ 4 credits · mobile reframe ≈ 2 · closing still ≈ 2 · H2 8 s 1080p loop ≈ 64.

The floating panel positions in `components/sections/HeroScene.tsx` (`PANELS`) are tuned to variant B so they stay clear of your face. Re-check them if you swap the still.

## 2. Real interface captures (screenshots you take — never generated)

Drop PNG/JPGs into `public/captures/` and set `src` in `content/media.ts`.

**Hero panels (`heroCaptures`)**
5. Claude Code terminal running a task
6. GitHub pull request with Copilot suggestions
7. Figma frame from a real project
8. Browser preview of a shipped app
9. Database schema / API request panel

**Chapter 02 workflow (`workflowCaptures`)**
10. Real system diagram or database schema (Architect)
11. Claude Code terminal receiving a scoped task (Orchestrate)
12. A real diff from an implementation (Build)
13. PR review with a rejected suggestion and the fix (Review)
14. The live, deployed application (Deliver)

## 3. Case studies (`content/projects.ts`) — for SARO, TECHNEXIA and SMBIZ each

15. Main screenshot (`screenshot.src`)
16. Additional screens
17. A real code / integration snippet (`snippet.code`)
18. Confirm or correct the architecture mini-diagram (`diagram`, then set `confirmed: true`)
19. Overview
20. Challenge
21. Technical Approach
22. Architecture (written)
23. Implementation
24. Outcome — real results only

## 4. Contact & site (`content/site.ts`)

25. Email
26. LinkedIn URL
27. GitHub URL
28. Production domain → set `NEXT_PUBLIC_SITE_URL` (used by canonical URL, Open Graph, sitemap, JSON-LD)

## 5. Optional

29. Dates for the five career stages (`foundation.timeline[].period` in `content/chapters.ts`)
30. Official product logo files for Chapter 06 (currently text labels, as the brief asks)

## Wording I wrote that you should review

- Chapter 03 layer summaries, "Covers" lists and "Tools in use" (tools are limited to your supplied stack).
- Chapter 02 step detail lines, and the three Review-step rows ("Suggestion conflicts with the agreed data model…"). These are labelled on the page as an illustration of the process, not a real PR.
- Timeline sub-lines (e.g. "ERP and business applications" for Enterprise Software, taken from your "Also built" list).
