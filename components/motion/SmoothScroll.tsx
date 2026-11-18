"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { getGsap, prefersReducedMotion, setLenis } from "@/lib/motion";

/** Lenis smooth scroll, kept in sync with GSAP ScrollTrigger. Off for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = getGsap();

    const lenis = new Lenis({
      lerp: 0.1,
      anchors: { offset: -88 },
      autoRaf: false,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
