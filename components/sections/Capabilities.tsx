"use client";

import { useState, type CSSProperties } from "react";
import { capabilities } from "@/content/chapters";
import { ChapterHeader } from "@/components/ui/Chapter";

export function Capabilities() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="bg-surface py-28 md:py-40">
      <div className="container-x">
        <ChapterHeader index="04" label={capabilities.label} title={capabilities.title} id="capabilities-title" />

        <ul className="mt-16 border-t border-ink/15 md:mt-24">
          {capabilities.items.map((cap, i) => {
            const isOpen = open === i;
            const num = String(i + 1).padStart(2, "0");
            return (
              <li
                key={cap.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 50}ms` } as CSSProperties}
                className="border-b border-ink/15"
              >
                <h3>
                  <button
                    type="button"
                    id={`cap-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`cap-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex min-h-[88px] w-full items-center gap-5 py-6 text-left md:gap-10 md:py-8"
                  >
                    <span className={`label-mono w-8 shrink-0 transition-colors duration-500 ${isOpen ? "text-blue-text" : "text-muted-text"}`}>
                      {num}
                    </span>
                    <span
                      className={`flex-1 font-display text-[clamp(1.55rem,3.6vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.035em] transition-[color,transform] duration-500 ease-premium group-hover:translate-x-1.5 ${
                        isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink"
                      }`}
                    >
                      {cap.title}
                    </span>
                    <span className="label-mono hidden text-muted-text md:inline">{cap.items.length} areas</span>
                    <span
                      aria-hidden
                      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,transform] duration-500 ease-premium ${
                        isOpen ? "rotate-45 border-ink bg-ink text-white" : "border-ink/20 text-ink group-hover:border-ink/50"
                      }`}
                    >
                      <span className="absolute h-px w-3.5 bg-current" />
                      <span className="absolute h-3.5 w-px bg-current" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`cap-panel-${i}`}
                  role="region"
                  aria-labelledby={`cap-btn-${i}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-700 ease-premium ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="grid gap-3 pb-10 sm:grid-cols-2 md:pl-[72px] lg:grid-cols-5">
                      {cap.items.map((item, k) => (
                        <li
                          key={item}
                          className="flex flex-col gap-6 rounded-2xl border border-border bg-bg p-5 transition-colors duration-500 hover:border-blue/40"
                        >
                          <span className="label-mono text-[10px] text-muted-text">
                            {num}.{k + 1}
                          </span>
                          <span className="text-[16px] font-medium leading-snug text-ink">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
