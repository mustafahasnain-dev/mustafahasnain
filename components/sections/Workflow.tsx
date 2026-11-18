"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { workflow, type WorkflowStep } from "@/content/chapters";
import { ChapterHeader } from "@/components/ui/Chapter";
import { ControlBadge } from "@/components/ui/Buttons";
import { getGsap, scrollToY } from "@/lib/motion";
import { StepVisual } from "./WorkflowVisuals";

const PIN_QUERY =
  "(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";

const steps = workflow.steps;
const n = steps.length;

export function Workflow() {
  return (
    <section id="workflow" aria-labelledby="workflow-title" className="relative bg-section">
      <div className="container-x pb-14 pt-28 md:pt-40">
        <ChapterHeader index="02" label={workflow.label} title={workflow.title} id="workflow-title">
          <p className="max-w-[34rem] text-[17px] leading-[1.7] text-muted-text">{workflow.intro}</p>
        </ChapterHeader>
      </div>

      <PinnedSequence />
      <StepList />

      <div className="container-x pb-28 pt-20 md:pb-40 md:pt-28">
        <p
          data-reveal
          className="mx-auto max-w-[22ch] text-center font-display text-[clamp(2rem,4.4vw,4rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink"
        >
          <span className="text-muted-text">AI generates possibilities.</span> Engineering expertise determines what gets approved, implemented, and shipped.
        </p>
      </div>
    </section>
  );
}

/* ── Desktop: one pinned workstation, six states ──────────────────────────── */

function PinnedSequence() {
  const pinRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const stRef = useRef<{ start: number; end: number } | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = pinRef.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = getGsap();
    const mm = gsap.matchMedia();
    mm.add(PIN_QUERY, () => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 0.9 * n)}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          stRef.current = { start: self.start, end: self.end };
          setActive(Math.min(n - 1, Math.floor(self.progress * n)));
          if (railRef.current) railRef.current.style.transform = `scaleY(${self.progress})`;
        },
        onRefresh: (self) => {
          stRef.current = { start: self.start, end: self.end };
        },
      });
      stRef.current = { start: st.start, end: st.end };
      return () => {
        stRef.current = null;
      };
    });
    return () => mm.revert();
  }, []);

  const goTo = (i: number) => {
    const st = stRef.current;
    if (!st) return;
    scrollToY(st.start + ((st.end - st.start) * (i + 0.5)) / n);
  };

  const step = steps[active];
  const dark = step.id === "review";

  return (
    <div ref={pinRef} className="wf-pinned">
      <div className="flex h-svh items-center pt-[var(--nav-h)]">
        <div className="container-x grid grid-cols-12 items-center gap-10">
          {/* Who is in control */}
          <nav aria-label="Workflow steps" className="col-span-4 xl:col-span-3">
            <p className="label-mono mb-6 text-muted-text">Who is in control</p>
            <div className="relative">
              <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-ink/10">
                <span ref={railRef} className="absolute inset-0 origin-top scale-y-0 bg-blue" />
              </span>
              <ol className="flex flex-col">
                {steps.map((s, i) => {
                  const on = i === active;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={on ? "step" : undefined}
                        className={`group relative flex w-full items-start gap-4 rounded-lg py-3 pl-7 pr-2 text-left transition-colors duration-500 ${
                          on ? "" : "hover:bg-white/50"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute left-0 top-[18px] h-[11px] w-[11px] rounded-full border-2 transition-all duration-500 ${
                            on
                              ? s.id === "review"
                                ? "scale-125 border-ink bg-ink"
                                : "border-blue bg-blue"
                              : i < active
                                ? "border-blue bg-section"
                                : "border-ink/20 bg-section"
                          }`}
                        />
                        <span className="flex flex-1 flex-col gap-1.5">
                          <span className="flex flex-wrap items-center justify-between gap-2">
                            <span className={`label-mono transition-colors duration-500 ${on ? "text-ink" : "text-muted-text"}`}>
                              0{i + 1} · {s.verb}
                            </span>
                            <span className={`transition-opacity duration-500 ${on ? "opacity-100" : "opacity-60"}`}>
                              <ControlBadge control={s.control} />
                            </span>
                          </span>
                          <span
                            className={`grid transition-[grid-template-rows,opacity] duration-700 ease-premium ${
                              on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <span className="overflow-hidden text-[15px] leading-snug text-ink">{s.title}</span>
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>

          {/* The workstation */}
          <div className="col-span-8 xl:col-span-9">
            <div
              className={`relative overflow-hidden rounded-[28px] border transition-[background-color,border-color,box-shadow] duration-700 ease-premium ${
                dark
                  ? "border-ink bg-ink shadow-[0_60px_120px_-50px_rgb(20_36_58/0.75)]"
                  : "glass-strong"
              }`}
            >
              <div
                className={`flex items-center justify-between gap-4 border-b px-5 py-3.5 transition-colors duration-700 ${
                  dark ? "border-white/10" : "border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span aria-hidden className="flex gap-1.5">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className={`h-2.5 w-2.5 rounded-full ${dark ? "bg-white/20" : "bg-ink/10"}`} />
                    ))}
                  </span>
                  <span className={`label-mono transition-colors duration-700 ${dark ? "text-white" : "text-ink"}`}>
                    Step 0{active + 1} / 0{n} — {step.verb}
                  </span>
                </div>
                <span className={`label-mono flex items-center gap-2 text-[10px] ${dark ? "text-white/70" : "text-muted-text"}`}>
                  In control
                  <ControlBadge control={step.control} tone={dark ? "dark" : "light"} />
                </span>
              </div>

              <div className="@container relative aspect-[16/9] xl:aspect-[16/8.6]">
                {steps.map((s, i) => (
                  <div
                    key={s.id}
                    aria-hidden={i !== active}
                    inert={i !== active}
                    className="absolute inset-0 p-5 transition-[opacity,transform] duration-700 ease-premium"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transform: i === active ? "none" : `translate3d(0, ${i < active ? -14 : 14}px, 0)`,
                    }}
                  >
                    <StepVisual id={s.id} active={i === active} />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-6 min-h-[84px]">
              {steps.map((s, i) => (
                <div
                  key={s.id}
                  aria-hidden={i !== active}
                  className="absolute inset-x-0 top-0 grid grid-cols-[auto_1fr] gap-x-6 transition-[opacity,transform] duration-700 ease-premium"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "none" : "translate3d(0, 8px, 0)",
                  }}
                >
                  <span className="font-display text-[44px] font-medium leading-none tracking-[-0.04em] text-blue">
                    0{i + 1}
                  </span>
                  <span>
                    <span className="block font-display text-[22px] font-medium tracking-[-0.02em] text-ink">{s.title}</span>
                    <span className="mt-1 block max-w-[46rem] text-[15px] leading-relaxed text-muted-text">{s.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile, tablet and reduced motion: a vertical step list ─────────────── */

function StepList() {
  return (
    <ol className="wf-list container-x flex flex-col gap-6">
      {steps.map((s, i) => (
        <StepCard key={s.id} step={s} index={i} />
      ))}
    </ol>
  );
}

function StepCard({ step, index }: { step: WorkflowStep; index: number }) {
  const dark = step.id === "review";
  return (
    <li
      data-reveal
      style={{ "--reveal-delay": "60ms" } as CSSProperties}
      className={`overflow-hidden rounded-[24px] border ${dark ? "border-ink bg-ink" : "border-border bg-white soft-shadow"}`}
    >
      <div className="flex flex-col gap-3 p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className={`label-mono ${dark ? "text-white" : "text-ink"}`}>
            0{index + 1} · {step.verb}
          </span>
          <ControlBadge control={step.control} tone={dark ? "dark" : "light"} />
        </div>
        <h3 className={`text-[clamp(1.4rem,4vw,1.9rem)] font-medium leading-tight tracking-[-0.02em] ${dark ? "text-white" : "text-ink"}`}>
          {step.title}
        </h3>
        <p className={`text-[15px] leading-relaxed ${dark ? "text-white/75" : "text-muted-text"}`}>{step.detail}</p>
      </div>
      <div className={`@container border-t p-4 sm:p-5 ${dark ? "border-white/10" : "border-border bg-bg"}`}>
        <StepVisual id={step.id} active />
      </div>
    </li>
  );
}
