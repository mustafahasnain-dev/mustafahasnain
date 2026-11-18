"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/motion";

type Item = { title: string; detail: string; period: string | null };

/** Five-stage career path. A blue line draws across as you scroll; stages light up in turn. */
export function FoundationTimeline({ items }: { items: Item[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const line = lineRef.current;
    if (!wrap || !line) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();

    mm.add(
      {
        horizontal: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        vertical: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const horizontal = ctx.conditions?.horizontal;
        const nodes = nodeRefs.current.filter(Boolean) as HTMLLIElement[];
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: horizontal ? "top 85%" : "top 80%",
            end: horizontal ? "top 35%" : "bottom 55%",
            scrub: 0.8,
          },
        });
        tl.fromTo(
          line,
          horizontal ? { scaleX: 0 } : { scaleY: 0 },
          { ...(horizontal ? { scaleX: 1 } : { scaleY: 1 }), duration: 1, ease: "none" },
          0
        );
        nodes.forEach((node, i) => {
          tl.fromTo(
            node,
            { opacity: 0.18, y: horizontal ? 18 : 0, x: horizontal ? 0 : 12 },
            { opacity: 1, y: 0, x: 0, duration: 0.18, ease: "power2.out" },
            (i / Math.max(1, nodes.length - 1)) * 0.82
          );
          const dot = node.querySelector("[data-dot]");
          if (dot)
            tl.fromTo(
              dot,
              { backgroundColor: "#ffffff", scale: 0.6 },
              { backgroundColor: "#3478f6", scale: 1, duration: 0.12 },
              (i / Math.max(1, nodes.length - 1)) * 0.82
            );
        });
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative mt-24 md:mt-32">
      <p data-reveal className="label-mono mb-10 text-muted-text">
        The path · enterprise to AI-native
      </p>

      <div className="relative">
      {/* track */}
      <div aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-border md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto">
        <span
          ref={lineRef}
          className="absolute inset-0 origin-top bg-blue md:origin-left"
        />
      </div>

      <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
        {items.map((item, i) => (
          <li
            key={item.title}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className="relative pl-10 md:pl-0 md:pt-12"
          >
            <span
              data-dot
              aria-hidden
              className="absolute left-0 top-0 h-[15px] w-[15px] rounded-full border-2 border-blue bg-blue"
              style={{ boxShadow: "0 0 0 6px var(--bg)" }}
            />
            <p className="label-mono text-blue-text">
              0{i + 1}
              {item.period ? <span className="text-muted-text"> · {item.period}</span> : null}
            </p>
            <h3 className="mt-3 text-[clamp(1.25rem,1.6vw,1.5rem)] font-medium leading-tight tracking-[-0.02em] text-ink">
              {item.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-text">{item.detail}</p>
          </li>
        ))}
      </ol>
      </div>
    </div>
  );
}
