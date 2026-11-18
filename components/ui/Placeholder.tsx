import Image from "next/image";
import type { Capture } from "@/content/media";

type Kind = "CAPTURE" | "SCREENSHOT" | "DIAGRAM" | "SNIPPET" | "SCENE" | "TO SUPPLY" | "CONFIRM";

/** The visible "[KIND: label]" tag used everywhere real content is still missing. */
export function PlaceholderTag({
  kind,
  label,
  className = "",
  tone = "light",
}: {
  kind: Kind;
  label: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`label-mono inline-block max-w-full rounded-md border px-2 py-1 text-[10px] leading-snug tracking-[0.12em] ${
        tone === "dark"
          ? "border-white/20 bg-white/10 text-white/80"
          : "border-blue/25 bg-white/80 text-blue-text"
      } ${className}`}
    >
      [{kind}: {label}]
    </span>
  );
}

/** Abstract skeleton rows — clearly not a real interface. */
export function Skeleton({ rows = 4, tone = "light" }: { rows?: number; tone?: "light" | "dark" }) {
  const widths = ["86%", "64%", "92%", "48%", "74%", "58%", "81%", "40%"];
  return (
    <div aria-hidden className="flex flex-col gap-2">
      {Array.from({ length: rows }).map((_, i) => (
        <span
          key={i}
          className={`block h-[7px] rounded-full ${tone === "dark" ? "bg-white/12" : "bg-ink/[0.07]"}`}
          style={{ width: widths[i % widths.length] }}
        />
      ))}
    </div>
  );
}

/**
 * Renders a real capture when `capture.src` is set, otherwise a glass
 * placeholder with skeleton rows and a "[CAPTURE: …]" label.
 */
export function CaptureSlot({
  capture,
  kind = "CAPTURE",
  rows = 4,
  className = "",
  sizes = "(min-width: 1024px) 40vw, 90vw",
  tone = "light",
  compact = false,
}: {
  capture: Capture;
  kind?: Kind;
  rows?: number;
  className?: string;
  sizes?: string;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  if (capture.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={capture.src}
          alt={capture.alt ?? capture.label}
          width={capture.width ?? 1600}
          height={capture.height ?? 1000}
          sizes={sizes}
          className="h-full w-full object-cover object-top"
        />
      </div>
    );
  }
  return (
    <div
      className={`relative flex flex-col justify-between gap-3 overflow-hidden ${
        compact ? "p-3" : "p-4"
      } ${className}`}
    >
      <Skeleton rows={rows} tone={tone} />
      <PlaceholderTag kind={kind} label={capture.label} tone={tone} />
    </div>
  );
}
