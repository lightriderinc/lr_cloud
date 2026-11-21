"use client";

import SectionHeading from "@/components/solutions/SectionHeading";
import { productUrl } from "@/lib/solutions";
import { useState } from "react";
import { MdArrowOutward, MdRefresh } from "react-icons/md";

// Four of the ready-made circuits on the quantum platform
// (src/lib/circuits/templates.ts there), with the same gates. Results are
// sampled in the browser: "simulator" from each circuit's exact outcome
// probabilities, "hardware" from those plus a typical amount of error. They
// are illustrations, not recorded runs, and the caption says so.

type Gate =
  | { kind: "h" | "x" | "m"; q: number; col: number }
  | { kind: "cx"; control: number; target: number; col: number }
  | { kind: "cz"; a: number; b: number; col: number };

type Mode = "simulator" | "hardware";

interface Example {
  id: string;
  name: string;
  summary: string;
  explain: string;
  qubits: number;
  gates: Gate[];
  /** Chance of each outcome, highest qubit on the left as the platform shows it. */
  odds: Record<Mode, Record<string, number>>;
}

const SHOTS = 1000;

const h = (q: number, col: number): Gate => ({ kind: "h", q, col });
const x = (q: number, col: number): Gate => ({ kind: "x", q, col });
const m = (q: number, col: number): Gate => ({ kind: "m", q, col });

const EXAMPLES: Example[] = [
  {
    id: "coin",
    name: "Coin flip",
    summary: "One qubit put into an even mix of 0 and 1, then measured.",
    explain:
      "Each shot comes out 0 or 1 at random, close to half and half. Run it again and the split shifts a little, just as it would with a real coin.",
    qubits: 1,
    gates: [h(0, 0), m(0, 1)],
    odds: {
      simulator: { "0": 0.5, "1": 0.5 },
      hardware: { "0": 0.51, "1": 0.49 },
    },
  },
  {
    id: "pair",
    name: "Linked pair",
    summary: "Two qubits linked so that they always agree.",
    explain:
      "Each qubit on its own is still a coin flip, yet the pair should only ever read 00 or 11. This link is called entanglement, and most quantum programs depend on it.",
    qubits: 2,
    gates: [h(0, 0), { kind: "cx", control: 0, target: 1, col: 1 }, m(0, 2), m(1, 2)],
    odds: {
      simulator: { "00": 0.5, "11": 0.5 },
      hardware: { "00": 0.483, "01": 0.019, "10": 0.016, "11": 0.482 },
    },
  },
  {
    id: "three",
    name: "Three linked qubits",
    summary: "The same link, stretched across three qubits.",
    explain:
      "Every shot should read 000 or 111, never a mix. Each qubit added gives errors one more place to creep in, which shows on real hardware.",
    qubits: 3,
    gates: [
      h(0, 0),
      { kind: "cx", control: 0, target: 1, col: 1 },
      { kind: "cx", control: 1, target: 2, col: 2 },
      m(0, 3),
      m(1, 3),
      m(2, 3),
    ],
    odds: {
      simulator: { "000": 0.5, "111": 0.5 },
      hardware: {
        "000": 0.458,
        "001": 0.019,
        "010": 0.014,
        "011": 0.012,
        "100": 0.021,
        "101": 0.009,
        "110": 0.026,
        "111": 0.441,
      },
    },
  },
  {
    id: "search",
    name: "Search",
    summary: "Finds the one marked answer out of four in a single step.",
    explain:
      "Checking the four options one at a time can take three tries. This circuit, a small version of Grover's search, lands on the marked answer, 11, in one. On bigger searches the saving grows.",
    qubits: 2,
    gates: [
      h(0, 0), h(1, 0),
      { kind: "cz", a: 0, b: 1, col: 1 },
      h(0, 2), h(1, 2),
      x(0, 3), x(1, 3),
      { kind: "cz", a: 0, b: 1, col: 4 },
      x(0, 5), x(1, 5),
      h(0, 6), h(1, 6),
      m(0, 7), m(1, 7),
    ],
    odds: {
      simulator: { "11": 1 },
      hardware: { "00": 0.024, "01": 0.031, "10": 0.033, "11": 0.912 },
    },
  },
];

function outcomes(qubits: number): string[] {
  return Array.from({ length: 2 ** qubits }, (_, i) => i.toString(2).padStart(qubits, "0"));
}

// Seeded so the first render matches on the server and in the browser.
function seeded(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sample(odds: Record<string, number>, random: () => number): Record<string, number> {
  const entries = Object.entries(odds);
  const counts: Record<string, number> = {};
  for (let shot = 0; shot < SHOTS; shot++) {
    let r = random();
    let pick = entries[entries.length - 1][0];
    for (const [outcome, p] of entries) {
      if (r < p) {
        pick = outcome;
        break;
      }
      r -= p;
    }
    counts[pick] = (counts[pick] ?? 0) + 1;
  }
  return counts;
}

// --- Circuit drawing ---------------------------------------------------------

const COL = 40;
const ROW = 36;
const LEFT = 36;
const BOX = 24;

function CircuitDrawing({ example }: { example: Example }) {
  const cols = Math.max(...example.gates.map((g) => g.col)) + 1;
  const width = LEFT + cols * COL + 8;
  const height = example.qubits * ROW;
  const cx = (col: number) => LEFT + col * COL + COL / 2;
  const cy = (q: number) => q * ROW + ROW / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={`Circuit diagram: ${example.summary}`}
      className="max-w-full"
    >
      {Array.from({ length: example.qubits }, (_, q) => (
        <g key={q}>
          <text x={0} y={cy(q) + 4} className="fill-gray-400 font-mono text-[11px]">
            q{q}
          </text>
          <line x1={LEFT - 6} x2={width} y1={cy(q)} y2={cy(q)} className="stroke-gray-200" strokeWidth={1.5} />
        </g>
      ))}

      {example.gates.map((g, i) => {
        const x0 = cx(g.col);
        if (g.kind === "cx") {
          return (
            <g key={i}>
              <line x1={x0} x2={x0} y1={cy(g.control)} y2={cy(g.target)} className="stroke-gray-800" strokeWidth={1.5} />
              <circle cx={x0} cy={cy(g.control)} r={4} className="fill-gray-800" />
              <circle cx={x0} cy={cy(g.target)} r={9} className="fill-white stroke-gray-800" strokeWidth={1.5} />
              <line x1={x0 - 9} x2={x0 + 9} y1={cy(g.target)} y2={cy(g.target)} className="stroke-gray-800" strokeWidth={1.5} />
              <line x1={x0} x2={x0} y1={cy(g.target) - 9} y2={cy(g.target) + 9} className="stroke-gray-800" strokeWidth={1.5} />
            </g>
          );
        }
        if (g.kind === "cz") {
          return (
            <g key={i}>
              <line x1={x0} x2={x0} y1={cy(g.a)} y2={cy(g.b)} className="stroke-gray-800" strokeWidth={1.5} />
              <circle cx={x0} cy={cy(g.a)} r={4} className="fill-gray-800" />
              <circle cx={x0} cy={cy(g.b)} r={4} className="fill-gray-800" />
            </g>
          );
        }
        const measure = g.kind === "m";
        return (
          <g key={i}>
            <rect
              x={x0 - BOX / 2}
              y={cy(g.q) - BOX / 2}
              width={BOX}
              height={BOX}
              rx={3}
              className={measure ? "fill-white stroke-gray-300" : "fill-gray-800"}
              strokeWidth={1.5}
            />
            <text
              x={x0}
              y={cy(g.q) + 4}
              textAnchor="middle"
              className={`font-mono text-[11px] font-semibold ${measure ? "fill-gray-600" : "fill-white"}`}
            >
              {g.kind === "m" ? "M" : g.kind.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// --- Section -----------------------------------------------------------------

export default function QuantumRun() {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<Mode>("simulator");
  const [counts, setCounts] = useState(() => sample(EXAMPLES[0].odds.simulator, seeded(2)));

  const example = EXAMPLES[active];
  const expected = example.odds.simulator;
  const tallest = Math.max(1, ...Object.values(counts));

  function run(index: number, nextMode: Mode) {
    setActive(index);
    setMode(nextMode);
    setCounts(sample(EXAMPLES[index].odds[nextMode], Math.random));
  }

  return (
    <section>
      <SectionHeading title="What running a program looks like">
        Programs for quantum computers are called circuits: a few steps
        applied to qubits, then a measurement. Because each measurement is
        partly random, a circuit is run many times, and each run is called a
        shot. The result is the tally of all of them. Pick a circuit to see
        1,000 shots.
      </SectionHeading>

      <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        <div className="flex flex-col gap-1">
          {EXAMPLES.map(({ id, name, summary }, i) => {
            const on = i === active;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => run(i, mode)}
                className={`cursor-pointer default-radius border-l-2 px-4 py-3 text-left transition-colors ${
                  on
                    ? "border-[var(--brand-primary)] bg-gray-50"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                <span className="font-semibold text-gray-800">{name}</span>
                <span className="mt-1 block text-sm text-gray-600">{summary}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-5 default-radius bg-gray-50 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              role="group"
              aria-label="Where to run"
              className="inline-flex default-radius border border-gray-200 bg-white p-0.5"
            >
              {(["simulator", "hardware"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={mode === option}
                  onClick={() => run(active, option)}
                  className={`cursor-pointer default-radius px-3 py-1 text-sm transition-colors ${
                    mode === option ? "bg-gray-800 text-white" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {option === "simulator" ? "Simulator" : "Quantum computer"}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => run(active, mode)}
              className="inline-flex cursor-pointer items-center gap-1 text-sm text-gray-600 transition-colors hover:text-[var(--brand-primary)]"
            >
              <MdRefresh /> Run again
            </button>
          </div>

          <div className="overflow-x-auto">
            <CircuitDrawing example={example} />
          </div>

          <figure>
            <div
              className="flex h-40 items-end gap-2 border-b border-gray-200"
              aria-live="polite"
            >
              {outcomes(example.qubits).map((outcome) => {
                const count = counts[outcome] ?? 0;
                const isError = !(outcome in expected);
                return (
                  <div key={outcome} className="flex h-full flex-1 flex-col justify-end">
                    <span className="mb-1 text-center font-mono text-xs text-gray-500">
                      {count}
                    </span>
                    <div
                      className={`default-radius rounded-b-none motion-safe:transition-[height] motion-safe:duration-500 ${
                        isError ? "bg-gray-300" : "bg-[var(--brand-tertiary)]"
                      }`}
                      style={{ height: `${(count / tallest) * 85}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-1 flex gap-2" aria-hidden="true">
              {outcomes(example.qubits).map((outcome) => (
                <span key={outcome} className="flex-1 text-center font-mono text-xs text-gray-600">
                  {outcome}
                </span>
              ))}
            </div>
            <figcaption className="sr-only">
              Results of {SHOTS} shots:{" "}
              {outcomes(example.qubits)
                .map((o) => `${o}: ${counts[o] ?? 0}`)
                .join(", ")}
            </figcaption>
          </figure>

          <div className="flex flex-col gap-2 text-sm">
            <p className="text-gray-700">{example.explain}</p>
            {mode === "hardware" && (
              <p className="text-gray-600">
                Gray bars are errors. Real qubits are disturbed by heat and
                stray signals, so a few shots land where they shouldn&apos;t.
                That&apos;s why circuits are tested on a simulator first and
                run with many shots.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4">
        <p className="text-xs text-gray-400">
          Results here are generated in your browser to show typical
          behaviour. On the platform they come from the machine you choose.
        </p>
        <a
          href={productUrl("quantum", "/composer")}
          target="_blank"
          rel="noopener noreferrer"
          className="brand-link inline-flex items-center gap-1 text-sm"
        >
          Build your own in the Composer <MdArrowOutward />
        </a>
      </div>
    </section>
  );
}
