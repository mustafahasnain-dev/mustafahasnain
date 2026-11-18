"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

let registered = false;

/** GSAP with ScrollTrigger registered exactly once (client only). */
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power3.out", duration: 1 });
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const EASE = "cubic-bezier(.2,.7,.1,1)";

let lenis: Lenis | null = null;
export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Scroll to an absolute Y, using Lenis when it is running. */
export function scrollToY(y: number) {
  if (lenis) {
    lenis.scrollTo(y, { duration: 1.1 });
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  }
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
