import type { CSSProperties } from "react";
import { collaboration } from "@/content/chapters";
import { ChapterHeader } from "@/components/ui/Chapter";
import { ButtonLink } from "@/components/ui/Buttons";

/** Hairlines between the four models at 1 / 2 / 4 columns. */
const MODEL_BORDERS = [
  "sm:pl-0 lg:pl-0",
  "border-t sm:border-t-0 sm:border-l",
  "border-t sm:pl-0 lg:border-t-0 lg:border-l lg:pl-8",
  "border-t sm:border-l lg:border-t-0",
];

export function Collaboration() {
  return (
    <section id="collaboration" aria-labelledby="collaboration-title" className="py-28 md:py-40">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ChapterHeader index="07" label={collaboration.label} title={collaboration.title} id="collaboration-title" />
          </div>
          <p data-reveal className="max-w-[34rem] self-end text-[17px] leading-[1.7] text-muted-text lg:col-span-5">
            {collaboration.body}
          </p>
        </div>

        <ul className="mt-16 grid border-t border-ink/15 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {collaboration.models.map((m, i) => (
            <li
              key={m.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
              className={`group flex flex-col gap-5 border-border py-8 sm:px-6 sm:py-10 lg:px-8 ${MODEL_BORDERS[i]}`}
            >
              <span className="label-mono text-blue-text">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[clamp(1.5rem,2.2vw,1.85rem)] font-medium leading-[1.1] tracking-[-0.025em] text-ink">
                {m.title}
              </h3>
              <p className="text-[15.5px] leading-relaxed text-muted-text">{m.body}</p>
            </li>
          ))}
        </ul>

        {/* CTA band — a deliberate navy moment */}
        <div
          data-reveal
          className="relative mt-16 overflow-hidden rounded-[28px] bg-ink px-6 py-14 sm:px-10 md:mt-24 md:rounded-[36px] md:px-14 md:py-20"
        >
          <div
            aria-hidden
            className="absolute -right-[10%] -top-[40%] h-[140%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgb(52_120_246/0.35),transparent)]"
          />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="relative flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-[14ch] text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
              {collaboration.cta.heading}
            </h2>
            <ButtonLink href={collaboration.cta.href} variant="light" arrow className="self-start md:self-auto">
              {collaboration.cta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
