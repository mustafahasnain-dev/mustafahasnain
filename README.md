# mustafahasnain

Personal portfolio — Mustafa Hasnain, AI-Native Software Engineer.
Light theme, cinematic, "human directs, AI accelerates".

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static)
```

## Edit content without touching components

| File | What it holds |
|---|---|
| `content/site.ts` | Name, nav, hero copy, info strip, tagline, contact links |
| `content/chapters.ts` | Chapters 01–04 and 06–08 copy, workflow steps, architecture layers, capabilities, ecosystem, collaboration |
| `content/projects.ts` | Chapter 05 case studies (facts only; `null` = placeholder) |
| `content/media.ts` | Every image, video and real interface capture |

Anything still missing renders as a visible `[KIND: …]` tag. See **[PLACEHOLDERS.md](PLACEHOLDERS.md)** for the full list.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis.

- Design tokens live in `app/globals.css` (`:root`). Two AA helpers (`--muted-text`, `--blue-text`) are used for small text only, because `--muted` and `--blue` fall just under 4.5:1 on the light backgrounds.
- Chapter 02 pins on screens ≥ 1024 × 640 with motion allowed; otherwise it renders as a vertical step list.
- `prefers-reduced-motion`: no smooth scroll, pinning, parallax, drift or video autoplay; simple fades only.

## Reference photos

`references/` holds the identity photos used for generated scene imagery. It is git-ignored so personal photos don't end up in a public repo.
