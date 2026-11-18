import type { CSSProperties, ReactNode } from "react";

/** Mono "CH 01 — LABEL" marker with a short blue rule. */
export function ChapterLabel({
  index,
  label,
  tone = "light",
}: {
  index: string;
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`label-mono flex items-center gap-3 ${
        tone === "dark" ? "text-white/70" : "text-muted-text"
      }`}
    >
      <span className={tone === "dark" ? "text-white" : "text-ink"}>CH {index}</span>
      <span aria-hidden className="h-px w-8 bg-blue" />
      <span>{label}</span>
    </p>
  );
}

export function ChapterHeader({
  index,
  label,
  title,
  children,
  align = "left",
  id,
}: {
  index: string;
  label: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <header
      className={`flex flex-col gap-6 ${align === "center" ? "items-center text-center" : ""}`}
    >
      <div data-reveal>
        <ChapterLabel index={index} label={label} />
      </div>
      <h2
        id={id}
        data-reveal
        style={{ "--reveal-delay": "80ms" } as CSSProperties}
        className="max-w-[18ch] text-[clamp(2.4rem,5.2vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-ink"
      >
        {title}
      </h2>
      {children ? (
        <div data-reveal style={{ "--reveal-delay": "160ms" } as CSSProperties}>
          {children}
        </div>
      ) : null}
    </header>
  );
}
