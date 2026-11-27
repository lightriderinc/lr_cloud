"use client";

import { useEffect, useRef, useSyncExternalStore, type RefObject } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** True when the visitor asked for reduced motion. False on the server. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/**
 * Calls `tick` every `ms` while the element is on screen, for the landing
 * page's live previews. Never runs under prefers-reduced-motion.
 */
export function useLiveTicker(
  ref: RefObject<Element | null>,
  ms: number,
  tick: () => void,
) {
  const reduced = useReducedMotion();
  const latest = useRef(tick);
  useEffect(() => {
    latest.current = tick;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let timer = 0;
    const observer = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      timer = entry.isIntersecting
        ? window.setInterval(() => latest.current(), ms)
        : 0;
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [ref, ms, reduced]);
}
