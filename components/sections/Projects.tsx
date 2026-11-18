
import { alsoBuilt, projects, work, type CaseSection, type Project } from "@/content/projects";
import { ChapterHeader } from "@/components/ui/Chapter";
import { CaptureSlot, PlaceholderTag, Skeleton } from "@/components/ui/Placeholder";

const SECTION_ORDER: ({ key: CaseSection; label: string } | { key: "role"; label: string } | { key: "screenshots"; label: string })[] = [
  { key: "overview", label: "Overview" },
  { key: "challenge", label: "Challenge" },
  { key: "role", label: "My Role" },
  { key: "approach", label: "Technical Approach" },
  { key: "architecture", label: "Architecture" },
  { key: "implementation", label: "Implementation" },
  { key: "outcome", label: "Outcome" },
  { key: "screenshots", label: "Screenshots" },
];

/** Hairlines for the 8-cell case-study grid at 1 / 2 / 4 columns. */
function cellBorders(i: number) {
  const c: string[] = [];
  if (i > 0) c.push("border-t");
  if (i === 1) c.push("sm:border-t-0");
  if (i % 2 === 1) c.push("sm:border-l");
  if (i === 2 || i === 3) c.push("lg:border-t-0");
  if (i % 4 !== 0) c.push("lg:border-l");
  return c.join(" ");
}

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-28 md:py-40">
      <div className="container-x">
        <ChapterHeader index="05" label={work.label} title={work.title} id="work-title" />

        <div className="mt-16 flex flex-col gap-10 md:mt-24 md:gap-16">
          {projects.map((p, i) => (
            <ProjectBlock key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div data-reveal className="mt-16 grid gap-6 border-t border-ink/15 pt-10 md:mt-24 md:grid-cols-12">
          <p className="label-mono text-muted-text md:col-span-3">Also built</p>
          <ul className="flex flex-col gap-3 md:col-span-9 md:flex-row md:flex-wrap md:gap-x-10">
            {alsoBuilt.map((a) => (
              <li key={a} className="flex items-center gap-3 font-display text-[clamp(1.15rem,1.8vw,1.5rem)] font-medium tracking-[-0.02em] text-ink">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blue" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProjectBlock({ project: p, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <article
      data-reveal
      aria-labelledby={`project-${p.slug}`}
      className="group overflow-hidden rounded-[28px] border border-border bg-white soft-shadow transition-[transform,border-color,box-shadow] duration-700 ease-premium hover:-translate-y-1 hover:border-blue/40 hover:shadow-[0_50px_90px_-50px_rgb(52_120_246/0.45)] md:rounded-[36px]"
    >
      {/* header */}
      <header className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:p-10">
        <div>
          <p className="label-mono text-muted-text">
            <span className="text-blue-text">Project {num}</span> · {p.subtitle}
          </p>
          <h3
            id={`project-${p.slug}`}
            className="mt-4 text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-ink"
          >
            {p.name}
          </h3>
        </div>
        <ul className="flex flex-wrap gap-2 lg:max-w-[46%] lg:justify-end" aria-label="Technology">
          {p.tech.map((t) => (
            <li key={t} className="rounded-full border border-border bg-bg px-3.5 py-1.5 text-[13px] text-ink">
              {t}
            </li>
          ))}
        </ul>
      </header>

      {/* visuals */}
      <div className="grid gap-4 px-4 pb-4 sm:px-8 sm:pb-8 lg:grid-cols-12 lg:gap-6 lg:px-10 lg:pb-10">
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-border bg-bg">
            <div className="flex items-center gap-3 border-b border-border bg-white px-4 py-2.5">
              <span aria-hidden className="flex gap-1.5">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-2.5 w-2.5 rounded-full bg-ink/10" />
                ))}
              </span>
              <span aria-hidden className="h-5 flex-1 rounded-md bg-bg" />
            </div>
            <CaptureSlot
              capture={p.screenshot}
              kind="SCREENSHOT"
              rows={6}
              className="aspect-[16/10]"
              sizes="(min-width: 1024px) 55vw, 92vw"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-5 lg:gap-6">
          <MiniDiagram project={p} />
          <Snippet project={p} />
        </div>
      </div>

      {/* case study */}
      <dl className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {SECTION_ORDER.map((s, i) => (
          <div
            key={s.key}
            className={`flex flex-col gap-3 border-border p-6 sm:p-8 ${cellBorders(i)} ${
              s.key === "role" ? "bg-section/60" : ""
            }`}
          >
            <dt className="label-mono text-ink">{s.label}</dt>
            <dd className="text-[15px] leading-relaxed text-muted-text">
              {s.key === "role" ? (
                <ul className="flex flex-col gap-2">
                  {p.role.map((r) => (
                    <li key={r} className="flex gap-2.5 text-ink">
                      <span aria-hidden className="mt-[9px] h-1 w-2.5 shrink-0 rounded-full bg-blue" />
                      {r}
                    </li>
                  ))}
                </ul>
              ) : s.key === "screenshots" ? (
                <PlaceholderTag kind="SCREENSHOT" label={`more ${p.name} screens`} />
              ) : p.sections[s.key] ? (
                p.sections[s.key]
              ) : (
                <PlaceholderTag kind="TO SUPPLY" label={p.hints[s.key]} />
              )}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function MiniDiagram({ project: p }: { project: Project }) {
  const W = 360;
  const H = 224;
  const cx = W / 2;
  const cy = H / 2 + 8;
  const pts = p.diagram.nodes.map((_, i, arr) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / arr.length + (arr.length === 3 ? Math.PI / 3 : 0);
    return { x: cx + Math.cos(a) * 132, y: cy + Math.sin(a) * 82 };
  });
  return (
    <figure className="flex flex-1 flex-col rounded-2xl border border-border bg-bg p-4">
      <figcaption className="label-mono text-[10px] text-muted-text">Architecture · mini</figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-2 w-full flex-1"
        role="img"
        aria-label={`${p.name}: ${p.diagram.center} connected to ${p.diagram.nodes.join(", ")}`}
      >
        {pts.map((pt, i) => (
          <line key={i} x1={cx} y1={cy} x2={pt.x} y2={pt.y} stroke="var(--blue)" strokeWidth="1.2" strokeDasharray="3 4" />
        ))}
        <rect x={cx - 76} y={cy - 17} width="152" height="34" rx="17" fill="var(--ink)" />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fill="#fff" fontFamily="var(--font-sans)">
          {p.diagram.center}
        </text>
        {pts.map((pt, i) => (
          <g key={i}>
            <rect x={pt.x - 56} y={pt.y - 14} width="112" height="28" rx="8" fill="#fff" stroke="var(--border)" />
            <text x={pt.x} y={pt.y + 4} textAnchor="middle" fontSize="10.5" fill="var(--ink)" fontFamily="var(--font-sans)">
              {p.diagram.nodes[i]}
            </text>
          </g>
        ))}
      </svg>
      {!p.diagram.confirmed ? (
        <PlaceholderTag kind="CONFIRM" label="drawn from the listed stack only" className="mt-2 self-start" />
      ) : null}
    </figure>
  );
}

function Snippet({ project: p }: { project: Project }) {
  if (p.snippet.code) {
    return (
      <figure className="overflow-hidden rounded-2xl border border-border bg-white">
        <figcaption className="label-mono border-b border-border px-4 py-2.5 text-[10px] text-muted-text">
          {p.snippet.label}
        </figcaption>
        <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-ink">
          <code>{p.snippet.code}</code>
        </pre>
      </figure>
    );
  }
  return (
    <figure className="rounded-2xl border border-border bg-white">
      <figcaption className="label-mono flex items-center justify-between border-b border-border px-4 py-2.5 text-[10px] text-muted-text">
        <span>Code · {p.snippet.language}</span>
        <span aria-hidden>{"</>"}</span>
      </figcaption>
      <div className="flex flex-col gap-3 p-4">
        <div>
          <Skeleton rows={4} />
        </div>
        <PlaceholderTag kind="SNIPPET" label={p.snippet.label} />
      </div>
    </figure>
  );
}
