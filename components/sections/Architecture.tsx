"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { architecture } from "@/content/chapters";
import { ChapterHeader } from "@/components/ui/Chapter";

const layers = architecture.layers;

export function Architecture() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const next = (i + layers.length) % layers.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      focusTab(i + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      focusTab(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusTab(layers.length - 1);
    }
  };

  const layer = layers[active];

  return (
    <section id="architecture" aria-labelledby="architecture-title" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="grid-faint absolute inset-0 -z-10 opacity-80" />
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ChapterHeader index="03" label={architecture.label} title={architecture.title} id="architecture-title" />
          </div>
          <p data-reveal className="max-w-[34rem] self-end text-[17px] leading-[1.7] text-muted-text lg:col-span-5">
            {architecture.body}
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* The stack */}
          <div data-reveal className="lg:col-span-7">
            <div className="mb-4 flex items-center justify-between">
              <p className="label-mono text-muted-text">System stack · select a layer</p>
              <p className="label-mono hidden text-muted-text sm:block">Request flow ↓</p>
            </div>
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Architecture layers"
              className="relative flex flex-col gap-2"
            >
              {/* request-flow spine */}
              <span aria-hidden className="absolute bottom-6 right-[27px] top-6 hidden w-px bg-ink/10 sm:block" />
              {layers.map((l, i) => {
                const on = i === active;
                return (
                  <button
                    key={l.name}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`arch-tab-${i}`}
                    aria-selected={on}
                    aria-controls="arch-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    onPointerMove={(e) => {
                      if (e.pointerType === "mouse" && i !== active) setActive(i);
                    }}
                    onFocus={() => setActive(i)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={`group relative flex min-h-[60px] items-center gap-4 rounded-2xl border px-4 text-left transition-[transform,background-color,border-color,box-shadow] duration-500 ease-premium sm:min-h-[68px] sm:px-5 ${
                      on
                        ? "translate-x-0 border-blue/60 bg-white shadow-[0_24px_48px_-28px_rgb(52_120_246/0.55)] sm:translate-x-3"
                        : "border-border bg-white/70 backdrop-blur hover:border-ink/20"
                    }`}
                  >
                    <span className={`label-mono w-8 shrink-0 ${on ? "text-blue-text" : "text-muted-text"}`}>L{i + 1}</span>
                    <span
                      className={`flex-1 font-display text-[clamp(1.05rem,1.6vw,1.35rem)] font-medium tracking-[-0.02em] ${
                        on ? "text-ink" : "text-ink/80"
                      }`}
                    >
                      {l.name}
                    </span>
                    <span aria-hidden className="hidden items-center gap-1 sm:flex">
                      {l.covers.map((_, k) => (
                        <span
                          key={k}
                          className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${on ? "bg-blue" : "bg-ink/15"}`}
                        />
                      ))}
                    </span>
                    <span
                      aria-hidden
                      className={`relative z-10 hidden h-3 w-3 rounded-full border-2 transition-colors duration-500 sm:block ${
                        on ? "border-blue bg-blue" : "border-ink/20 bg-white"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-5">
            <div
              id="arch-panel"
              role="tabpanel"
              aria-labelledby={`arch-tab-${active}`}
              className="glass-strong rounded-[28px] p-6 sm:p-8 lg:sticky lg:top-28"
            >
              <div className="flex items-center justify-between">
                <p className="label-mono text-blue-text">
                  Layer {String(active + 1).padStart(2, "0")} / {String(layers.length).padStart(2, "0")}
                </p>
                <span aria-hidden className="flex gap-1">
                  {layers.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 w-4 rounded-full transition-colors duration-500 ${i === active ? "bg-blue" : "bg-ink/10"}`}
                    />
                  ))}
                </span>
              </div>
              <div key={active} className="swap-in">
                <h3 className="mt-6 text-[clamp(1.8rem,2.8vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
                  {layer.name}
                </h3>
                <p className="mt-4 text-[16px] leading-relaxed text-muted-text">{layer.summary}</p>

                <p className="label-mono mt-8 text-ink">Covers</p>
                <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {layer.covers.map((c) => (
                    <li key={c} className="flex items-center gap-2.5 text-[15px] text-ink">
                      <span aria-hidden className="h-1 w-3 rounded-full bg-blue" />
                      {c}
                    </li>
                  ))}
                </ul>

                {layer.tools.length ? (
                  <>
                    <p className="label-mono mt-8 text-ink">Tools in use</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {layer.tools.map((t) => (
                        <li key={t} className="rounded-full border border-border bg-white px-3 py-1.5 text-[13px] text-ink">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
