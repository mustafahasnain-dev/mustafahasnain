"use client";

import { useSyncExternalStore } from "react";

/** SSR-safe media query hook. Returns `serverValue` until hydrated. */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
