"use client";

import { useRef, useState } from "react";
import { useLiveTicker } from "./useLiveTicker";

// A slowly turning Q-sphere for three qubits, stepping through a few states.
// Each dot is one possible result: results with more 1s sit lower on the
// sphere, and a dot's size shows how likely that result is. Between states,
// dot sizes blend smoothly. All states here have the same phase, so dots
// share one colour. An illustration, not a recorded run.

const N = 3;
const OUTCOMES = Array.from({ length: 2 ** N }, (_, i) => i.toString(2).padStart(N, "0"));
const weight = (s: string) => s.split("").filter((c) => c === "1").length;

// Q-sphere layout: latitude by number of 1s, spread evenly around each ring.
const POINTS = OUTCOMES.map((label) => {
  const k = weight(label);
  const ring = OUTCOMES.filter((o) => weight(o) === k);
  const j = ring.indexOf(label);
  const theta = (Math.PI * k) / N;
  const phi = (2 * Math.PI * j) / ring.length + (k % 2 ? 0 : Math.PI / 3);
  return {
    label,
    x: Math.sin(theta) * Math.cos(phi),
    y: Math.cos(theta),
    z: Math.sin(theta) * Math.sin(phi),
  };
});

const STATES: { name: string; odds: Record<string, number> }[] = [
  { name: "starting point", odds: { "000": 1 } },
  { name: "one qubit undecided", odds: { "000": 0.5, "001": 0.5 } },
  { name: "linked qubits", odds: { "000": 0.5, "111": 0.5 } },
  { name: "all qubits undecided", odds: Object.fromEntries(OUTCOMES.map((o) => [o, 1 / 8])) },
];

const TICK_MS = 33;
const STATE_TICKS = 130; // about 4.3 s per state
const BLEND_TICKS = 36; // about 1.2 s to blend into it
const TURN_PER_TICK = 0.006; // one turn about every 35 s
const TILT = 0.38;

// Drawing geometry, in SVG units.
const SIZE = 260;
const C = SIZE / 2;
const R = 96;

type Vec = { x: number; y: number; z: number };

/** Turn about the vertical axis, tilt toward the viewer, project to the page. */
function project({ x, y, z }: Vec, turn: number) {
  const x1 = x * Math.cos(turn) + z * Math.sin(turn);
  const z1 = -x * Math.sin(turn) + z * Math.cos(turn);
  const y2 = y * Math.cos(TILT) - z1 * Math.sin(TILT);
  const z2 = y * Math.sin(TILT) + z1 * Math.cos(TILT);
  const r2 = (n: number) => Math.round(n * 100) / 100;
  return { sx: r2(C + R * x1), sy: r2(C - R * y2), depth: z2 };
}

function circlePath(at: (s: number) => Vec, turn: number): string {
  const steps = 48;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const { sx, sy } = project(at((2 * Math.PI * i) / steps), turn);
    return `${i ? "L" : "M"}${sx} ${sy}`;
  }).join("");
}

const latitude = (theta: number) => (s: number) => ({
  x: Math.sin(theta) * Math.cos(s),
  y: Math.cos(theta),
  z: Math.sin(theta) * Math.sin(s),
});
const meridian = (phi: number) => (s: number) => ({
  x: Math.sin(s) * Math.cos(phi),
  y: Math.cos(s),
  z: Math.sin(s) * Math.sin(phi),
});

const ease = (p: number) => p * p * (3 - 2 * p);

/** Each outcome's likelihood at tick t, blending from the previous state. */
function oddsAt(t: number): { name: string; odds: number[] } {
  const index = Math.floor(t / STATE_TICKS) % STATES.length;
  const prev = STATES[(index + STATES.length - 1) % STATES.length];
  const cur = STATES[index];
  const p = ease(Math.min((t % STATE_TICKS) / BLEND_TICKS, 1));
  return {
    name: cur.name,
    odds: OUTCOMES.map((o) => (prev.odds[o] ?? 0) * (1 - p) + (cur.odds[o] ?? 0) * p),
  };
}

// Start fully on the linked state, which is also what reduced motion shows.
const INITIAL_TICK = 2 * STATE_TICKS + BLEND_TICKS;

export default function QuantumPreview() {
  const ref = useRef<HTMLElement>(null);
  const [t, setT] = useState(INITIAL_TICK);
  useLiveTicker(ref, TICK_MS, () => setT((n) => n + 1));

  const turn = t * TURN_PER_TICK;
  const { name, odds } = oddsAt(t);
  const { odds: target } = oddsAt(Math.floor(t / STATE_TICKS) * STATE_TICKS + BLEND_TICKS);

  const dots = POINTS.map((point, i) => ({ ...point, ...project(point, turn), p: odds[i] }))
    .filter((d) => d.p > 0.004)
    .sort((a, b) => a.depth - b.depth);

  const likely = OUTCOMES.map((o, i) => ({ o, p: target[i] })).filter((r) => r.p > 0.004);

  return (
    <figure ref={ref} className="default-radius bg-gray-50 p-6">
      <div className="flex items-baseline justify-end gap-4 text-sm">
        <span className="text-gray-500">3 qubits on a Q-sphere</span>
      </div>

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
        className="mx-auto mt-2 block w-full max-w-xs overflow-visible"
      >
        <circle cx={C} cy={C} r={R} fill="white" className="stroke-[var(--gray-100)]" strokeWidth={1.5} />
        {[Math.PI / 3, Math.PI / 2, (2 * Math.PI) / 3].map((theta) => (
          <path
            key={theta}
            d={circlePath(latitude(theta), turn)}
            fill="none"
            className="stroke-[var(--gray-100)]"
            strokeWidth={1}
          />
        ))}
        {[0, Math.PI / 3, (2 * Math.PI) / 3].map((phi) => (
          <path
            key={phi}
            d={circlePath(meridian(phi), turn)}
            fill="none"
            className="stroke-[var(--gray-100)]"
            strokeWidth={1}
          />
        ))}

        {dots.map(({ label, sx, sy, depth, p }) => {
          const near = 0.45 + 0.55 * ((depth + 1) / 2);
          const r = 2 + 13 * Math.sqrt(p);
          return (
            <g key={label} opacity={near}>
              <line
                x1={C}
                y1={C}
                x2={sx}
                y2={sy}
                className="stroke-[var(--brand-tertiary)]"
                strokeWidth={1.25}
                opacity={Math.min(p * 4, 0.7)}
              />
              <circle cx={sx} cy={sy} r={r} className="fill-[var(--brand-primary)]" />
              <text
                x={sx + r + 4}
                y={sy + 3}
                opacity={Math.min(p * 8, 1)}
                className="fill-[var(--gray-400)] font-mono text-[10px]"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* <div className="mt-3 border-t border-gray-100 pt-4 font-mono text-xs">
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">state</span>
          <span className="text-gray-700">{name}</span>
        </div>
        <div className="mt-1.5 flex justify-between gap-4">
          <span className="shrink-0 text-gray-400">possible results</span>
          <span className="text-right text-gray-700">
            {likely.length > 4
              ? `all ${likely.length}, equally likely`
              : likely.map(({ o, p }) => `${o} ${Math.round(p * 100)}%`).join(", ")}
          </span>
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-gray-600">
        Each dot is a possible result. The bigger the dot, the more likely it is.
      </figcaption> */}
    </figure>
  );
}
