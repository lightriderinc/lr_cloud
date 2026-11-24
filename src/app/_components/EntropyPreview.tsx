"use client";

import { useRef, useState } from "react";
import { useLiveTicker } from "./useLiveTicker";

// Fixed first frame so the server and browser render the same bytes; after
// mount, a few bytes at a time are redrawn and briefly lit, echoing the hero's
// shimmering tiles.
const INITIAL = [
  0xa3, 0x1f, 0x9c, 0x07, 0x5e, 0xd2, 0x48, 0xb1, 0x6a, 0xf0, 0x13, 0x8e,
  0xc7, 0x2d, 0x94, 0x3b, 0xe5, 0x70, 0x0c, 0x81, 0xbf, 0x56, 0x29, 0xda,
  0x47, 0x9e, 0x15, 0x6c, 0xf3, 0x08, 0xa1, 0x7d,
];
const HOT_COUNT = 6;

const RECEIPT = [
  ["sources", "anu_aws_001, cisco_qrng_001"],
  ["health checks", "passed"],
  ["signature", "Ed25519, valid"],
];

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
    <figure ref={ref} className="default-radius bg-gray-800 p-6 font-mono">
      <div className="flex items-baseline justify-between gap-4 text-xs">
        <span className="font-semibold text-white">32 random bytes</span>
        <span className="text-gray-300">live example</span>
      </div>
      <div aria-hidden="true" className="mt-5 grid grid-cols-8 gap-x-3 gap-y-2 text-sm">
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
      <dl className="mt-6 flex flex-col gap-1.5 border-t border-gray-600 pt-4 text-xs">
        {RECEIPT.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-gray-300">{label}</dt>
            <dd className="text-right text-gray-100">{value}</dd>
          </div>
        ))}
      </dl>
      <figcaption className="sr-only">
        Example of random bytes with the receipt that comes with them.
      </figcaption>
    </figure>
  );
}
