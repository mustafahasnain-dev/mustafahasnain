"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const frosted = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-700 ease-premium ${
        frosted
          ? "border-b border-border bg-white/75 shadow-[0_10px_30px_-24px_rgb(20_36_58/0.35)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6">
        <a
          href="#top"
          className="whitespace-nowrap font-display text-[15px] font-semibold tracking-[0.14em] text-ink"
          aria-label={`${site.name} — back to top`}
        >
          {site.wordmark}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-full px-3 text-[14px] text-muted-text transition-colors duration-300 hover:text-ink xl:px-4"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <span className="label-mono hidden items-center gap-2 whitespace-nowrap text-[10px] text-muted-text xl:flex">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="pulse-ring absolute inset-0 rounded-full bg-blue" />
              <span className="relative h-2 w-2 rounded-full bg-blue" />
            </span>
            {site.availability}
          </span>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-medium text-white transition-colors duration-500 hover:bg-[#1c3150]"
          >
            Contact <span aria-hidden className="cta-arrow">→</span>
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="relative -mr-2 flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-5 bg-ink transition-transform duration-500 ease-premium ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-ink transition-transform duration-500 ease-premium ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100svh-var(--nav-h))] overflow-y-auto border-t border-border bg-white/95 backdrop-blur-xl lg:hidden"
      >
        <div className="container-x flex flex-col gap-10 py-8">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-border">
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-16 items-center justify-between font-display text-[28px] font-medium tracking-[-0.02em] text-ink"
                >
                  {item.label}
                  <span aria-hidden className="label-mono text-muted-text">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-5">
            <span className="label-mono flex items-center gap-2 text-muted-text">
              <span aria-hidden className="h-2 w-2 rounded-full bg-blue" />
              {site.availability}
            </span>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-white"
            >
              Contact <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
