// Shared helpers for the canvas tile-field hero backdrops.

export type RGB = [number, number, number];

export function parseHex(value: string, fallback: RGB): RGB {
  const hex = value.trim().replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback;
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as RGB;
}

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

// Per-frame rates (easing factors and flip probabilities) are tuned for 60fps.
// This rescales one to `steps` 60fps frames, so the pace holds on any refresh rate.
export const perStep = (rate: number, steps: number) => 1 - (1 - Math.min(rate, 1)) ** steps;
