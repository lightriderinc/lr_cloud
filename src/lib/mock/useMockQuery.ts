"use client";

import { mockDelay } from "@/lib/mock/delay";
import { useEffect, useState } from "react";

/**
 * Tiny stand-in for react-query's useQuery: loads `loader(key)` after a short
 * mock delay so skeletons render (and nothing date/locale-dependent renders
 * during SSR), keeps the previous data on screen while a new key loads, and
 * optionally re-reads when a mock store notifies `subscribe`.
 *
 * `loader` and `subscribe` must be stable (module-level) functions.
 */
export function useMockQuery<T>(
  loader: (key: string) => T,
  key = "",
  subscribe?: (listener: () => void) => () => void,
  ms = 400,
) {
  const [result, setResult] = useState<{ key: string; data: T } | null>(null);

  useEffect(() => {
    let cancelled = false;
    mockDelay(ms).then(() => {
      if (!cancelled) setResult({ key, data: loader(key) });
    });
    const unsubscribe = subscribe?.(() => {
      if (!cancelled) setResult({ key, data: loader(key) });
    });
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [loader, key, subscribe, ms]);

  return {
    data: result?.data,
    isLoading: result === null,
    isFetching: result === null || result.key !== key,
    isSuccess: result !== null,
  };
}
