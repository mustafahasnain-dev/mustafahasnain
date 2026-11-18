import type { CSSProperties, ReactNode } from "react";
import { workflowCaptures } from "@/content/media";
import type { WorkflowStep } from "@/content/chapters";
import { CaptureSlot, PlaceholderTag, Skeleton } from "@/components/ui/Placeholder";

/**
 * Process illustrations for each workflow step. These are diagrams of the method,
 * never fake screenshots — every real interface is a labelled capture slot.
 */
export function StepVisual({ id, active }: { id: WorkflowStep["id"]; active: boolean }) {
  switch (id) {
    case "architect":
      return <Architect />;
    case "orchestrate":
      return <Orchestrate />;
    case "connect":
      return <Connect active={active} />;
    case "build":
      return <Build active={active} />;
    case "review":
      return <Review />;
    case "deliver":
      return <Deliver active={active} />;
  }
}

function Card({
  title,
  children,
  className = "",
  tone = "light",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={`flex min-h-0 flex-col overflow-hidden rounded-xl border ${
        tone === "dark" ? "border-white/15 bg-white/[0.06]" : "border-border bg-white"
      } ${className}`}
    >
      <p
        className={`label-mono border-b px-3 py-2 text-[9.5px] ${
          tone === "dark" ? "border-white/10 text-white/70" : "border-border text-muted-text"
        }`}
      >
        {title}
      </p>
      <div className="flex min-h-0 flex-1 flex-col p-3">{children}</div>
    </div>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={`h-3.5 w-3.5 shrink-0 ${className}`}>
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* 01 ARCHITECT — requirements, system diagram, schema */
function Architect() {
  return (
    <div className="grid h-full gap-3 @lg:grid-cols-[1fr_1.35fr_1fr]">
      <Card title="Requirements" className="@max-md:hidden">
        <ul className="flex flex-col gap-2.5">
          {[78, 62, 88, 54].map((w, i) => (
            <li key={i} className="flex items-center gap-2 text-blue">
              <Check />
              <span className="block h-[7px] rounded-full bg-ink/[0.08]" style={{ width: `${w}%` }} />
            </li>
          ))}
        </ul>
      </Card>
      <Card title="System diagram">
        <svg viewBox="0 0 240 150" className="h-full max-h-56 w-full" aria-label="Generic schematic: client, API, services and data layers">
          {[
            { x: 90, y: 8, l: "CLIENT" },
            { x: 90, y: 58, l: "API" },
            { x: 20, y: 108, l: "SERVICES" },
            { x: 160, y: 108, l: "DATA" },
          ].map((b) => (
            <g key={b.l}>
              <rect x={b.x} y={b.y} width="60" height="30" rx="6" fill="#fff" stroke="var(--ink)" strokeOpacity="0.25" />
              <text x={b.x + 30} y={b.y + 19} textAnchor="middle" fontSize="8" fontFamily="var(--font-mono)" fill="var(--ink)" letterSpacing="1">
                {b.l}
              </text>
            </g>
          ))}
          <path d="M120 38v20M105 88l-35 20M135 88l35 20M80 123h80" stroke="var(--blue)" strokeWidth="1.2" fill="none" />
        </svg>
      </Card>
      <Card title="Schema" className="@max-md:hidden">
        <div className="flex flex-col gap-2">
          {[0, 1, 2, 3, 4].map((r) => (
            <div key={r} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-sm ${r === 0 ? "bg-blue" : "bg-ink/15"}`} />
              <span className="block h-[7px] w-[42%] rounded-full bg-ink/[0.08]" />
              <span className="block h-[7px] w-[28%] rounded-full bg-ink/[0.05]" />
            </div>
          ))}
        </div>
      </Card>
      <div className="@lg:col-span-3">
        <PlaceholderTag kind="DIAGRAM" label={workflowCaptures.architect.label} />
      </div>
    </div>
  );
}

/* 02 ORCHESTRATE — scoped task handed to Claude Code */
function Orchestrate() {
  return (
    <div className="grid h-full items-stretch gap-3 @lg:grid-cols-[1fr_auto_1.4fr]">
      <Card title="Task brief · written by a human">
        <div className="flex flex-col gap-3">
          {["Context", "Constraints", "Scoped task"].map((k, i) => (
            <div key={k} className="flex flex-col gap-1.5">
              <span className="label-mono text-[9px] text-ink">{k}</span>
              <Skeleton rows={i === 2 ? 1 : 2} />
            </div>
          ))}
        </div>
      </Card>
      <div aria-hidden className="flex items-center justify-center text-blue">
        <svg viewBox="0 0 40 16" className="h-4 w-10 rotate-90 @lg:rotate-0">
          <path d="M0 8h34M28 2l7 6-7 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <Card title="Claude Code">
        <CaptureSlot capture={workflowCaptures.orchestrate} rows={5} className="h-full !p-0" sizes="40vw" />
      </Card>
    </div>
  );
}

/* 03 CONNECT — MCP hub with tools lighting up */
function Connect({ active }: { active: boolean }) {
  const nodes = [
    { l: "GitHub", x: 60, y: 40 },
    { l: "Figma", x: 300, y: 32 },
    { l: "Database", x: 330, y: 150 },
    { l: "Browser", x: 270, y: 250 },
    { l: "APIs", x: 70, y: 245 },
  ];
  const hub = { x: 195, y: 145 };
  return (
    <div className="flex h-full flex-col gap-3">
      <svg viewBox="0 0 400 290" className="h-full min-h-0 w-full flex-1" aria-label="MCP hub connected to GitHub, Figma, a database, the browser and APIs, with Claude Code and the engineer above it">
        {nodes.map((n, i) => (
          <line
            key={n.l}
            x1={hub.x}
            y1={hub.y}
            x2={n.x}
            y2={n.y}
            stroke="var(--blue)"
            strokeWidth="1.3"
            className={active ? "flow-line" : ""}
            style={{
              opacity: active ? 1 : 0.15,
              transition: `opacity .6s var(--ease) ${i * 140 + 200}ms`,
            }}
          />
        ))}
        {/* Claude Code → hub, Human → Claude Code */}
        <line x1={hub.x} y1={hub.y} x2={hub.x} y2={78} stroke="var(--violet)" strokeWidth="1.3" />
        <line x1={hub.x} y1={58} x2={hub.x} y2={22} stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1.3" />
        <g>
          <rect x={hub.x - 30} y="4" width="60" height="20" rx="10" fill="var(--ink)" />
          <text x={hub.x} y="17" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="var(--font-mono)" letterSpacing="1.2">
            HUMAN
          </text>
          <rect x={hub.x - 44} y="56" width="88" height="22" rx="11" fill="#fff" stroke="var(--violet)" strokeOpacity="0.5" />
          <text x={hub.x} y="70" textAnchor="middle" fontSize="8" fill="var(--ink)" fontFamily="var(--font-mono)" letterSpacing="1.2">
            CLAUDE CODE
          </text>
        </g>
        <circle cx={hub.x} cy={hub.y} r="30" fill="#fff" stroke="var(--blue)" strokeOpacity="0.5" />
        <text x={hub.x} y={hub.y + 4} textAnchor="middle" fontSize="11" fontWeight="500" fill="var(--ink)" fontFamily="var(--font-mono)" letterSpacing="1.5">
          MCP
        </text>
        {nodes.map((n, i) => (
          <g
            key={n.l}
            style={{
              opacity: active ? 1 : 0.35,
              transition: `opacity .6s var(--ease) ${i * 140 + 300}ms`,
            }}
          >
            <rect x={n.x - 38} y={n.y - 14} width="76" height="28" rx="8" fill="#fff" stroke="var(--border)" />
            <circle cx={n.x - 26} cy={n.y} r="3" fill="var(--blue)" />
            <text x={n.x + 4} y={n.y + 3.5} textAnchor="middle" fontSize="9.5" fill="var(--ink)" fontFamily="var(--font-sans)">
              {n.l}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* 04 BUILD — diff + interface going from wireframe to finished */
function Build({ active }: { active: boolean }) {
  const blocks = [
    "col-span-6 h-5",
    "col-span-4 h-16",
    "col-span-2 h-16",
    "col-span-2 h-12",
    "col-span-2 h-12",
    "col-span-2 h-12",
  ];
  return (
    <div className="grid h-full gap-3 @lg:grid-cols-2">
      <Card title="Diff">
        <div className="flex flex-col gap-2" aria-hidden>
          {[
            ["+", 82],
            ["+", 64],
            ["−", 52],
            [" ", 74],
            ["+", 58],
            ["+", 88],
            ["−", 40],
          ].map(([s, w], i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`w-3 font-mono text-[11px] ${s === "+" ? "text-blue-text" : "text-muted-text"}`}>{s}</span>
              <span
                className={`block h-[7px] rounded-full ${s === "+" ? "bg-blue/25" : s === "−" ? "bg-ink/10 line-through" : "bg-ink/[0.06]"}`}
                style={{ width: `${w}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-auto pt-3">
          <PlaceholderTag kind="CAPTURE" label={workflowCaptures.build.label} />
        </div>
      </Card>
      <Card title="Interface · wireframe → finished">
        <div className="grid grid-cols-6 gap-2">
          {blocks.map((b, i) => (
            <span
              key={i}
              className={`${b} rounded-md border transition-[background-color,border-color,border-style] duration-700`}
              style={
                {
                  transitionDelay: active ? `${300 + i * 160}ms` : "0ms",
                  borderStyle: active ? "solid" : "dashed",
                  borderColor: active ? "transparent" : "rgb(20 36 58 / 0.25)",
                  backgroundColor: active
                    ? i === 0
                      ? "var(--ink)"
                      : i === 1
                        ? "rgb(52 120 246 / 0.16)"
                        : "var(--section)"
                    : "transparent",
                } as CSSProperties
              }
            />
          ))}
        </div>
        <p className="label-mono mt-auto pt-3 text-[9px] text-muted-text">Illustration · not a product screen</p>
      </Card>
    </div>
  );
}

/* 05 REVIEW — the human decision (navy stage) */
function Review() {
  const rows = [
    { mark: "✓", state: "Approved", note: "Suggestion meets the architecture and passes review.", tone: "ok" },
    { mark: "✕", state: "Rejected", note: "Suggestion conflicts with the agreed data model. Not merged.", tone: "no" },
    { mark: "↺", state: "Bug caught", note: "Edge case found in review. Fix written and verified by hand.", tone: "fix" },
  ];
  return (
    <div className="grid h-full gap-3 @lg:grid-cols-[1.25fr_1fr]">
      <div className="flex flex-col gap-2.5">
        {rows.map((r) => (
          <div
            key={r.state}
            className={`flex items-start gap-3 rounded-xl border px-3.5 py-3 ${
              r.tone === "no"
                ? "border-white/70 bg-white text-ink shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)] @lg:-mx-2 @lg:py-4"
                : "border-white/15 bg-white/[0.06] text-white"
            }`}
          >
            <span
              aria-hidden
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] ${
                r.tone === "no" ? "bg-ink text-white" : "bg-white/10 text-white"
              }`}
            >
              {r.mark}
            </span>
            <span className="flex flex-col gap-1">
              <span className={`label-mono text-[10px] ${r.tone === "no" ? "text-blue-text" : "text-white/70"}`}>
                {r.state} · human decision
              </span>
              <span className={`text-[13.5px] leading-snug ${r.tone === "no" ? "text-ink" : "text-white/85"}`}>{r.note}</span>
            </span>
          </div>
        ))}
        <p className="label-mono pt-1 text-[9px] text-white/55">Illustration of the review step</p>
      </div>
      <div className="flex flex-col justify-between gap-3 rounded-xl border border-white/15 p-4">
        <p className="font-display text-[clamp(1.4rem,2.4cqw,2rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white">
          The suggestion is optional.
          <br />
          <span className="text-[#8db4fa]">The judgment is not.</span>
        </p>
        <PlaceholderTag kind="CAPTURE" label={workflowCaptures.review.label} tone="dark" />
      </div>
    </div>
  );
}

/* 06 DELIVER — checks pass, it ships */
function Deliver({ active }: { active: boolean }) {
  const checks = ["Tests passing", "Build complete", "Deployed", "Live"];
  return (
    <div className="grid h-full gap-3 @lg:grid-cols-[1fr_1.5fr]">
      <Card title="Release">
        <ul className="flex flex-col gap-3">
          {checks.map((c, i) => (
            <li
              key={c}
              className="flex items-center gap-3 text-[14px] text-ink"
              style={{
                opacity: active ? 1 : 0.3,
                transition: `opacity .6s var(--ease) ${active ? 250 + i * 220 : 0}ms`,
              }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue/10 text-blue">
                <Check />
              </span>
              {c}
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Live application">
        <CaptureSlot capture={workflowCaptures.deliver} rows={5} className="h-full !p-0" sizes="40vw" />
      </Card>
    </div>
  );
}
