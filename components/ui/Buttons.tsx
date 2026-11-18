import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "light";

const styles: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-[#1c3150] shadow-[0_18px_36px_-18px_rgb(20_36_58/0.55)]",
  outline:
    "border border-ink/20 bg-white/60 text-ink backdrop-blur hover:border-ink/45 hover:bg-white",
  light: "bg-white text-ink hover:bg-section",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium tracking-[-0.01em] transition-[background-color,border-color,box-shadow] duration-500 ease-premium ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      {arrow ? (
        <span aria-hidden className="cta-arrow">
          →
        </span>
      ) : null}
    </a>
  );
}

export function ControlBadge({
  control,
  tone = "light",
}: {
  control: "HUMAN" | "AI + HUMAN";
  tone?: "light" | "dark";
}) {
  const human = control === "HUMAN";
  return (
    <span
      className={`label-mono inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] ${
        tone === "dark"
          ? "border-white/25 text-white"
          : human
            ? "border-ink/15 bg-white text-ink"
            : "border-violet/30 bg-violet/[0.07] text-ink"
      }`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${human ? "bg-blue" : "bg-violet"}`}
      />
      {control}
    </span>
  );
}
