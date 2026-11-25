"use client";

import { useRef, useState } from "react";
import { useLiveTicker } from "./useLiveTicker";

// Fixed first frame so the server and browser render the same bytes; after
// mount, a few bytes at a time are redrawn and briefly lit, echoing the hero's
// shimmering tiles.
const BYTE_COUNT = 64;
const HOT_COUNT = 10;

// Seeded generator (mulberry32) so the first frame is identical everywhere.
function seededBytes(count: number, seed: number) {
  let s = seed >>> 0;
  return Array.from({ length: count }, () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) & 0xff;
  });
}

const INITIAL = seededBytes(BYTE_COUNT, 0x5eed);

const hex = (b: number) => b.toString(16).padStart(2, "0");

export default function EntropyPreview() {
  const ref = useRef<HTMLElement>(null);
  const [bytes, setBytes] = useState(INITIAL);
  const [hot, setHot] = useState<number[]>([]);

  useLiveTicker(ref, 140, () => {
    const i = Math.floor(Math.random() * INITIAL.length);
    const value = crypto.getRandomValues(new Uint8Array(1))[0];
    setBytes((prev) => prev.map((b, k) => (k === i ? value : b)));
    setHot((prev) => [i, ...prev.filter((k) => k !== i)].slice(0, HOT_COUNT));
  });

  return (
    <figure ref={ref} className="default-radius bg-gray-800 p-6">
      <figcaption className="text-sm text-gray-200">{BYTE_COUNT} random bytes</figcaption>
      {/* 8x8 grid, one byte per cell. */}
      <div aria-hidden="true" className="mt-5 grid grid-cols-8 gap-x-3 gap-y-2 text-sm font-mono">
        {bytes.map((b, i) => (
          <span
            key={i}
            className={`text-center transition-colors duration-700 ${
              hot.includes(i) ? "text-[var(--brand-secondary)]" : "text-gray-200"
            }`}
          >
            {hex(b)}
          </span>
        ))}
      </div>
    </figure>
  );
}
