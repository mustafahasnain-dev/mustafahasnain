import type { CSSProperties } from "react";
import { hero, manifesto } from "@/content/site";
import { ButtonLink } from "@/components/ui/Buttons";
import { HeroBackdrop, HeroScene } from "./HeroScene";

export function Hero() {
  const headWords = hero.heading.split(" ");
  const accentWords = hero.accent.split(" ");

  return (
    <>
      <section
        id="top"
        aria-labelledby="hero-title"
        className="relative isolate overflow-hidden pt-[var(--nav-h)]"
      >
        {/* atmosphere */}
        <div aria-hidden className="atmos absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_75%_30%,rgb(52_120_246/0.10),transparent_70%),radial-gradient(ellipse_50%_40%_at_10%_90%,rgb(120_101_216/0.06),transparent_70%)]" />
          <div className="grid-faint absolute inset-0" />
        </div>
        <HeroBackdrop />

        <div className="relative lg:min-h-[max(640px,calc(100svh-var(--nav-h)-81px))]">
          <div className="container-x relative z-20 flex flex-col justify-center py-14 sm:py-20 lg:min-h-[max(640px,calc(100svh-var(--nav-h)-81px))] lg:py-16">
            <div className="max-w-[640px] lg:w-1/2">
              <p
                className="fade-up label-mono flex items-center gap-3 text-muted-text"
                style={{ "--d": "100ms" } as CSSProperties}
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blue" />
                {hero.eyebrow}
              </p>

              <h1
                id="hero-title"
                className="mt-7 text-[clamp(2.9rem,8.4vw,4.75rem)] lg:text-[clamp(2.9rem,5.9vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink [text-wrap:wrap]"
              >
                {headWords.map((w, i) => (
                  <Word key={`h${i}`} i={i}>
                    {w}
                  </Word>
                ))}
                {accentWords.map((w, i) => (
                  <Word key={`a${i}`} i={headWords.length + i} className="text-blue">
                    {w}
                  </Word>
                ))}
              </h1>

              <p
                className="fade-up mt-8 max-w-[34rem] text-[clamp(1.05rem,1.35vw,1.25rem)] leading-relaxed text-muted-text"
                style={{ "--d": "750ms" } as CSSProperties}
              >
                {hero.sub}
              </p>

              <div
                className="fade-up mt-10 flex flex-col gap-3 sm:flex-row"
                style={{ "--d": "900ms" } as CSSProperties}
              >
                <ButtonLink href={hero.primaryCta.href} arrow>
                  {hero.primaryCta.label}
                </ButtonLink>
                <ButtonLink href={hero.secondaryCta.href} variant="outline">
                  {hero.secondaryCta.label}
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="container-x pb-6 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:max-w-none lg:p-0">
            <HeroScene />
          </div>
        </div>

        {/* info strip */}
        <div className="relative z-20 border-y border-border bg-white/70 backdrop-blur-md">
          <ul className="container-x grid grid-cols-2 md:grid-cols-4">
            {hero.strip.map((item, i) => (
              <li
                key={item}
                className={`fade-up label-mono flex min-h-20 items-center gap-3 py-4 text-ink ${
                  i % 2 === 1 ? "pl-4 md:pl-6" : ""
                } ${i > 1 ? "border-t border-border md:border-t-0" : ""} ${
                  i > 0 ? "md:border-l md:border-border md:pl-6" : ""
                } ${i === 1 ? "border-l border-border" : ""} ${i === 3 ? "border-l border-border" : ""}`}
                style={{ "--d": `${1100 + i * 90}ms` } as CSSProperties}
              >
                <span aria-hidden className="font-mono text-[10px] text-blue-text">
                  0{i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* manifesto — the tagline, said plainly */}
      <section aria-label="Tagline" className="bg-surface">
        <div className="container-x grid gap-px py-6 md:grid-cols-3 md:py-0">
          {manifesto.map((m, i) => (
            <div
              key={m.role}
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as CSSProperties}
              className={`flex flex-col gap-4 py-8 md:py-16 ${i > 0 ? "border-t border-border md:border-l md:border-t-0 md:pl-6 lg:pl-10" : ""}`}
            >
              <span className="label-mono flex items-center gap-3 text-muted-text">
                <span className="text-blue-text">0{i + 1}</span>
                {m.role}
              </span>
              <p className="font-display text-[clamp(1.4rem,2.6vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
                {m.line}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Word({ children, i, className = "" }: { children: string; i: number; className?: string }) {
  return (
    <>
      <span className="inline-block overflow-hidden pb-[0.08em] align-top">
        <span className={`word-rise ${className}`} style={{ "--i": i } as CSSProperties}>
          {children}
        </span>
      </span>{" "}
    </>
  );
}
