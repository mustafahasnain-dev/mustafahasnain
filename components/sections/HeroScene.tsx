"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { heroCaptures, heroMedia } from "@/content/media";
import { CaptureSlot, PlaceholderTag } from "@/components/ui/Placeholder";
import { getGsap } from "@/lib/motion";
import { DESKTOP_MOTION, useMediaQuery } from "@/lib/useMediaQuery";

type PanelDef = {
  key: keyof typeof heroCaptures;
  title: string;
  meta: string;
  /** Position + width inside the scene. Tune these once the real H1 still is in. */
  className: string;
  depth: number;
  rows: number;
  drift: string;
};

/*
 * Layout is tuned to the H1 still: the face sits roughly at 55–92% across and
 * 10–50% down the scene area, so every panel stays clear of that box.
 */
const PANELS: PanelDef[] = [
  {
    key: "claudeCode",
    title: "Claude Code",
    meta: "Terminal",
    className: "left-[4%] top-[5%] w-[64%] sm:left-[3%] sm:w-[38%]",
    depth: 18,
    rows: 4,
    drift: "-0.5s",
  },
  {
    key: "githubPr",
    title: "GitHub · Copilot",
    meta: "PR",
    className: "right-[4%] bottom-[13%] w-[62%] sm:right-[2%] sm:bottom-[16%] sm:w-[30%]",
    depth: 28,
    rows: 3,
    drift: "-2.5s",
  },
  {
    key: "figma",
    title: "Figma",
    meta: "Frame",
    className: "hidden sm:block left-[3%] top-[40%] w-[28%]",
    depth: 14,
    rows: 2,
    drift: "-4s",
  },
  {
    key: "browser",
    title: "Browser",
    meta: "Preview",
    className: "hidden sm:block left-[6%] bottom-[6%] w-[32%]",
    depth: 24,
    rows: 2,
    drift: "-1.5s",
  },
  {
    key: "database",
    title: "Database · API",
    meta: "Schema",
    className: "hidden sm:block left-[40%] bottom-[3%] w-[27%]",
    depth: 10,
    rows: 2,
    drift: "-3.2s",
  },
];

/** Full-bleed H1 still (and H2 loop when it exists) behind the whole hero, desktop only. */
export function HeroBackdrop() {
  const desktopMotion = useMediaQuery(DESKTOP_MOTION);
  const poster = heroMedia.poster.src ? heroMedia.poster : null;
  const video = heroMedia.video;
  if (!poster) return null;
  const playVideo = !!video && desktopMotion;

  return (
    <div className="atmos absolute inset-0 -z-10 hidden overflow-hidden lg:block">
      <Image
        src={poster.src!}
        alt={poster.alt}
        fill
        preload
        sizes="100vw"
        className={`object-cover object-[85%_40%] ${playVideo ? "" : "push-in"}`}
      />
      {playVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover object-[85%_40%]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster.src!}
          aria-hidden
        >
          {video.webm ? <source src={video.webm} type="video/webm" /> : null}
          <source src={video.mp4} type="video/mp4" />
        </video>
      ) : null}
      {/* keep the headline side calm and readable */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--bg)_0%,var(--bg)_30%,rgb(247_248_250/0.88)_40%,rgb(247_248_250/0.45)_50%,rgb(247_248_250/0)_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-bg/70 to-transparent" />
    </div>
  );
}

type Line = { x1: number; y1: number; x2: number; y2: number; visible: boolean };

/** Point on a rect's edge facing (hx, hy), pushed 10px inside so drift never shows a gap. */
function edgePoint(r: DOMRect, s: DOMRect, hx: number, hy: number) {
  const cx = r.left - s.left + r.width / 2;
  const cy = r.top - s.top + r.height / 2;
  const dx = hx - cx;
  const dy = hy - cy;
  const scale = Math.min(
    Math.abs((r.width / 2 - 10) / (dx || 1e-6)),
    Math.abs((r.height / 2 - 10) / (dy || 1e-6))
  );
  return { x: cx + dx * scale, y: cy + dy * scale };
}

export function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const humanRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const flowRefs = useRef<(SVGLineElement | null)[]>([]);
  const [geo, setGeo] = useState<{ w: number; h: number; lines: Line[]; human: Line | null }>({
    w: 0,
    h: 0,
    lines: [],
    human: null,
  });

  const desktopMotion = useMediaQuery(DESKTOP_MOTION);
  const poster = heroMedia.poster.src ? heroMedia.poster : null;
  const posterMobile = heroMedia.posterMobile.src ? heroMedia.posterMobile : poster;

  /* Measure panels → connection lines to the MCP hub. */
  useEffect(() => {
    const scene = sceneRef.current;
    const hub = hubRef.current;
    if (!scene || !hub) return;

    const measure = () => {
      const s = scene.getBoundingClientRect();
      const h = hub.getBoundingClientRect();
      const hx = h.left - s.left + h.width / 2;
      const hy = h.top - s.top + h.height / 2;
      // Ignore transforms from parallax when measuring.
      const lines = PANELS.map((_, i) => {
        const el = panelRefs.current[i];
        if (!el || el.offsetParent === null) return { x1: hx, y1: hy, x2: hx, y2: hy, visible: false };
        const prev = el.style.transform;
        el.style.transform = "none";
        const p = edgePoint(el.getBoundingClientRect(), s, hx, hy);
        el.style.transform = prev;
        return { x1: hx, y1: hy, x2: p.x, y2: p.y, visible: true };
      });
      let human: Line | null = null;
      if (humanRef.current) {
        const p = edgePoint(humanRef.current.getBoundingClientRect(), s, hx, hy);
        human = { x1: p.x, y1: p.y, x2: hx, y2: hy, visible: true };
      }
      setGeo({ w: s.width, h: s.height, lines, human });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(scene);
    return () => ro.disconnect();
  }, []);

  /* Cursor parallax (panels + their line ends) and scroll drift. Desktop, motion allowed. */
  useEffect(() => {
    if (!desktopMotion) return;
    const scene = sceneRef.current;
    const section = scene?.closest("section");
    if (!scene || !section) return;
    const { gsap } = getGsap();

    const movers = PANELS.map((p, i) => {
      const el = panelRefs.current[i];
      if (!el) return null;
      return {
        depth: p.depth,
        x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3.out" }),
        i,
      };
    }).filter(Boolean) as { depth: number; x: (v: number) => void; y: (v: number) => void; i: number }[];

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = section.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      for (const m of movers) {
        const dx = nx * m.depth;
        const dy = ny * m.depth;
        m.x(dx);
        m.y(dy);
        const line = geo.lines[m.i];
        const l1 = lineRefs.current[m.i];
        const l2 = flowRefs.current[m.i];
        if (line && l1 && l2) {
          gsap.to([l1, l2], {
            attr: { x2: line.x2 + dx, y2: line.y2 + dy },
            duration: 1.4,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      }
    };
    section.addEventListener("pointermove", onMove);

    const st = gsap.to(scene, {
      yPercent: 6,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
    });

    return () => {
      section.removeEventListener("pointermove", onMove);
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, [desktopMotion, geo.lines]);

  return (
    <>
      <div
        ref={sceneRef}
        className="relative aspect-[5/7] w-full sm:aspect-[16/12] lg:absolute lg:inset-0 lg:aspect-auto"
      >
        {/* Backdrop: placeholder studio (no still yet) or the mobile still. */}
        <div
          className={`atmos absolute inset-0 overflow-hidden rounded-[24px] border border-border lg:inset-x-6 lg:bottom-11 lg:top-6 lg:rounded-[28px] ${
            poster ? "lg:hidden" : ""
          }`}
        >
          {posterMobile ? (
            <Image
              src={posterMobile.src!}
              alt={posterMobile.alt}
              fill
              sizes="(min-width: 1024px) 1px, 100vw"
              className="push-in object-cover object-[80%_40%]"
            />
          ) : (
            <StudioPlaceholder />
          )}
        </div>

        {/* Connection lines → MCP hub */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          viewBox={`0 0 ${geo.w || 1} ${geo.h || 1}`}
          preserveAspectRatio="none"
        >
          {geo.human ? (
            <line
              x1={geo.human.x1}
              y1={geo.human.y1}
              x2={geo.human.x2}
              y2={geo.human.y2}
              stroke="var(--ink)"
              strokeOpacity="0.55"
              strokeWidth="1.25"
            />
          ) : null}
          {geo.lines.map((l, i) =>
            l.visible ? (
              <g key={i}>
                <line
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  x1={l.x1}
                  y1={l.y1}
                  x2={l.x2}
                  y2={l.y2}
                  stroke="var(--blue)"
                  strokeOpacity="0.22"
                  strokeWidth="1"
                />
                <line
                  ref={(el) => {
                    flowRefs.current[i] = el;
                  }}
                  className="flow-line"
                  style={{ animationDelay: `${i * -0.45}s` }}
                  x1={l.x1}
                  y1={l.y1}
                  x2={l.x2}
                  y2={l.y2}
                  stroke="var(--blue)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </g>
            ) : (
              <g key={i} />
            )
          )}
        </svg>

        {/* Floating capture panels */}
        {PANELS.map((p, i) => (
          <div
            key={p.key}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className={`absolute z-10 ${p.className}`}
          >
            <div
              className="drift"
              style={{ "--drift-delay": p.drift, "--drift-dur": `${7 + i}s` } as CSSProperties}
            >
              <figure
                className="glass fade-up overflow-hidden rounded-2xl"
                style={{ "--d": `${700 + i * 120}ms` } as CSSProperties}
              >
                <figcaption className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blue" />
                    <span className="text-[12px] font-medium text-ink">{p.title}</span>
                  </span>
                  <span className="label-mono hidden text-[9px] text-muted-text md:inline">{p.meta}</span>
                </figcaption>
                <CaptureSlot capture={heroCaptures[p.key]} rows={p.rows} compact sizes="30vw" />
              </figure>
            </div>
          </div>
        ))}

        {/* Human — directs the hub */}
        <div
          ref={humanRef}
          className="fade-up absolute right-[4%] top-[46%] z-10 sm:right-[2%] sm:top-[49%]"
          style={{ "--d": "1300ms" } as CSSProperties}
        >
          <div className="glass-strong flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3.5">
            <span className="label-mono flex h-7 items-center rounded-full bg-ink px-2.5 text-[9px] text-white">
              Human
            </span>
            <span className="label-mono text-[9px] text-ink"><span className="sm:hidden">Directs</span><span className="hidden sm:inline">Architect · Reviewer · Owner</span></span>
          </div>
        </div>

        {/* MCP hub */}
        <div
          ref={hubRef}
          className="fade-up absolute left-[24%] top-[52%] z-10 -translate-x-1/2 -translate-y-1/2 sm:left-[47%] sm:top-[56%]"
          style={{ "--d": "1100ms" } as CSSProperties}
        >
          <div className="relative flex h-16 w-16 items-center justify-center">
            <span aria-hidden className="pulse-ring absolute inset-0 rounded-full border border-blue/50" />
            <span className="glass-strong relative flex h-16 w-16 flex-col items-center justify-center rounded-full">
              <span className="font-mono text-[12px] font-medium tracking-[0.12em] text-ink">MCP</span>
            </span>
          </div>
          <span className="label-mono absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-white/85 px-2 py-0.5 text-[9px] text-ink backdrop-blur">
            AI tools · execution
          </span>
        </div>
      </div>

      {/* Placeholder notice sits outside the scene so panels never cover it. */}
      {!posterMobile || !poster ? (
        <div className={`mt-3 lg:absolute lg:bottom-3 lg:left-6 lg:mt-0 ${poster ? "lg:hidden" : ""} ${posterMobile ? "hidden lg:block" : ""}`}>
          <PlaceholderTag kind="SCENE" label={poster ? heroMedia.posterMobile.label : heroMedia.poster.label} />
        </div>
      ) : null}
    </>
  );
}

/** Bright daylight studio stand-in until the generated H1 still exists. Blank screens, no UI. */
function StudioPlaceholder() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(165deg,#ffffff_0%,#f3f6fb_45%,var(--section)_100%)]">
      <div className="push-in absolute inset-0">
        {/* window light from the left */}
        <div aria-hidden className="absolute -left-[10%] -top-[10%] h-[120%] w-[60%] -skew-x-12 opacity-80">
          <div className="absolute left-[10%] top-0 h-full w-[14%] bg-gradient-to-b from-white via-white/70 to-transparent blur-2xl" />
          <div className="absolute left-[32%] top-0 h-full w-[14%] bg-gradient-to-b from-white via-white/60 to-transparent blur-2xl" />
          <div className="absolute left-[54%] top-0 h-full w-[10%] bg-gradient-to-b from-white via-white/50 to-transparent blur-2xl" />
        </div>
        {/* soft blue morning haze */}
        <div
          aria-hidden
          className="absolute right-[-10%] top-[-10%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgb(52_120_246/0.16),transparent)]"
        />
        {/* desk */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[30%] border-t border-white bg-[linear-gradient(180deg,#ffffff_0%,#eef3f9_100%)]"
        />
        {/* blank, softly glowing screens */}
        <div aria-hidden className="absolute bottom-[29%] left-1/2 flex -translate-x-1/2 items-end gap-[3%]" style={{ width: "62%" }}>
          <Screen className="aspect-[16/10] w-[52%]" />
          <Screen className="aspect-[16/10] w-[44%] translate-y-[2%]" />
        </div>
        <div
          aria-hidden
          className="absolute bottom-[18%] left-[50%] h-[3%] w-[22%] -translate-x-1/2 rounded-md bg-white shadow-[0_10px_30px_-12px_rgb(20_36_58/0.25)]"
        />
      </div>
    </div>
  );
}

function Screen({ className }: { className: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-[6px] border border-ink/10 bg-[linear-gradient(160deg,#ffffff_0%,#e6eefb_100%)] shadow-[0_0_60px_-6px_rgb(52_120_246/0.35),0_20px_40px_-20px_rgb(20_36_58/0.3)]" />
      <div className="absolute -bottom-[14%] left-1/2 h-[14%] w-[6%] -translate-x-1/2 bg-ink/10" />
    </div>
  );
}
