import type { CSSProperties } from "react";
import { ecosystem } from "@/content/chapters";
import { ChapterHeader } from "@/components/ui/Chapter";

type Group = (typeof ecosystem.groups)[number];

export function Ecosystem() {
  const g = ecosystem.groups;
  const left = [g[0], g[2], g[4]];
  const right = [g[1], g[3], g[5]];

  return (
    <section id="ecosystem" aria-labelledby="ecosystem-title" className="relative overflow-hidden bg-section py-28 md:py-40">
      <div className="container-x">
        <ChapterHeader index="06" label={ecosystem.label} title={ecosystem.title} id="ecosystem-title" />

        {/* mobile / tablet: centre first, then groups */}
        <div className="mt-14 lg:hidden">
          <div data-reveal className="flex items-center gap-4 rounded-[24px] bg-ink p-6 text-white">
            <span aria-hidden className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25">
              <span className="h-2.5 w-2.5 rounded-full bg-blue" />
            </span>
            <span>
              <span className="label-mono block text-white/65">At the centre</span>
              <span className="mt-1 block font-display text-[24px] font-medium tracking-[-0.02em]">{ecosystem.center}</span>
            </span>
          </div>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {g.map((group, i) => (
              <li key={group.name} data-reveal style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as CSSProperties}>
                <GroupCard group={group} />
              </li>
            ))}
          </ul>
        </div>

        {/* desktop: organised map around the centre */}
        <div className="relative mt-24 hidden grid-cols-[1fr_280px_1fr] grid-rows-[repeat(3,minmax(0,1fr))] gap-x-16 gap-y-5 lg:grid">
          <ul className="contents">
            {left.map((group, i) => (
              <li
                key={group.name}
                data-reveal
                style={{ gridColumn: 1, gridRow: i + 1, "--reveal-delay": `${i * 90}ms` } as CSSProperties}
              >
                <GroupCard group={group} />
              </li>
            ))}
            {right.map((group, i) => (
              <li
                key={group.name}
                data-reveal
                style={{ gridColumn: 3, gridRow: i + 1, "--reveal-delay": `${i * 90 + 45}ms` } as CSSProperties}
              >
                <GroupCard group={group} />
              </li>
            ))}
          </ul>

          <div className="relative col-start-2 row-span-3 row-start-1 flex items-center justify-center">
            <svg
              aria-hidden
              className="absolute inset-y-0 -left-16 -right-16 h-full w-[calc(100%+8rem)]"
              viewBox="0 0 100 300"
              preserveAspectRatio="none"
            >
              {[50, 150, 250].map((y) => (
                <g key={y}>
                  <line x1="50" y1="150" x2="0" y2={y} stroke="var(--blue)" strokeWidth="1" vectorEffect="non-scaling-stroke" className="flow-line" />
                  <line x1="50" y1="150" x2="100" y2={y} stroke="var(--blue)" strokeWidth="1" vectorEffect="non-scaling-stroke" className="flow-line" />
                </g>
              ))}
            </svg>
            <div data-reveal className="relative flex aspect-square w-full items-center justify-center">
              <span aria-hidden className="absolute inset-0 rounded-full border border-ink/10 bg-section" />
              <span aria-hidden className="absolute inset-5 rounded-full border border-dashed border-blue/35" />
              <div className="relative flex aspect-square w-[78%] flex-col items-center justify-center rounded-full bg-ink p-8 text-center text-white shadow-[0_50px_90px_-40px_rgb(20_36_58/0.7)]">
                <span className="label-mono text-[10px] text-white/65">At the centre</span>
                <span className="mt-3 font-display text-[28px] font-medium leading-[1.05] tracking-[-0.025em]">
                  {ecosystem.center}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GroupCard({ group }: { group: Group }) {
  return (
    <div
      className={`flex h-full flex-col gap-4 rounded-[22px] border p-6 transition-colors duration-500 ${
        group.emphasis ? "border-blue/40 bg-white shadow-[0_30px_60px_-36px_rgb(52_120_246/0.5)]" : "border-border bg-white/80"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[19px] font-medium tracking-[-0.015em] text-ink">{group.name}</h3>
        <span className="label-mono text-[10px] text-muted-text">{String(group.items.length).padStart(2, "0")}</span>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {group.items.map((t) => (
          <li
            key={t}
            className={`rounded-full border px-3 py-1 text-[13px] ${
              group.emphasis ? "border-blue/25 bg-blue/[0.06] text-ink" : "border-border bg-bg text-ink"
            }`}
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
