import type { CSSProperties } from "react";
import { foundation } from "@/content/chapters";
import { ChapterHeader } from "@/components/ui/Chapter";
import { FoundationTimeline } from "./FoundationTimeline";

export function Foundation() {
  const [lead, ...rest] = foundation.paragraphs;
  return (
    <section id="foundation" aria-labelledby="foundation-title" className="relative py-28 md:py-40">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <ChapterHeader index="01" label={foundation.label} title={foundation.title} id="foundation-title" />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-6 lg:pt-14">
            <p
              data-reveal
              className="font-display text-[clamp(1.35rem,2vw,1.75rem)] font-medium leading-[1.3] tracking-[-0.02em] text-ink"
            >
              {lead}
            </p>
            {rest.map((p, i) => (
              <p
                key={i}
                data-reveal
                style={{ "--reveal-delay": `${(i + 1) * 90}ms` } as CSSProperties}
                className="max-w-[38rem] text-[17px] leading-[1.7] text-muted-text"
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        <FoundationTimeline items={foundation.timeline} />
      </div>
    </section>
  );
}
