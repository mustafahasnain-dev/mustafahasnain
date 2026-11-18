"use client";

import { useEffect } from "react";

/**
 * Adds `.is-in` to every [data-reveal] element as it enters the viewport.
 * Stagger with style={{ "--reveal-delay": "120ms" }}.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.revealReady = "1";

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
