"use client";

import { useRef, useState } from "react";
import { useLiveTicker, useReducedMotion } from "./useLiveTicker";

// "Recorded now, read later" in one picture: captured messages under today's
// encryption, which a future quantum computer breaks open one after another,
// and under post-quantum encryption, which stay scrambled. An illustration,
// not real ciphertext.

const MESSAGES = [
  "Contract: $4.2M, signs 3 May",
  "Patient 4471: results clear",
  "Wire $380K to acct ending 7731",
  "Board vote moved to Friday",
  "Admin login: j.ortiz / Harbor#19",
];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
// Fixed first frame so the server and browser render the same text; long
// enough for the longest message.
const INITIAL_GLYPHS = "q7Rz+Kd2LwP0x9/mTb4VhYc1NsJeG8uA".split("");

// One cycle per message under today's encryption: scrambled, then read a
// character at a time, then held open before the next message.
const SCRAMBLE_TICKS = 18;
const HOLD_TICKS = 30;
const cycleLength = (msg: number) =>
  SCRAMBLE_TICKS + MESSAGES[msg].length + HOLD_TICKS;

const MODES = {
  today: {
    label: "Today's encryption",
    algorithm: "RSA-2048",
    note: "Recorded today, readable once large quantum computers arrive.",
    noteClass: "text-red-600",
  },
  pqc: {
    label: "Post-quantum",
    algorithm: "ML-KEM-768",
    note: "Recorded today, still private when they arrive.",
    noteClass: "text-green-700",
  },
} as const;
type Mode = keyof typeof MODES;

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

export default function PqcPreview() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>("today");
  const [{ msg, frame }, setCycle] = useState({ msg: 0, frame: 0 });
  const [glyphs, setGlyphs] = useState(INITIAL_GLYPHS);

  useLiveTicker(ref, 70, () => {
    setCycle(({ msg, frame }) =>
      frame + 1 < cycleLength(msg)
        ? { msg, frame: frame + 1 }
        : { msg: (msg + 1) % MESSAGES.length, frame: 0 },
    );
    setGlyphs((prev) => prev.map((g) => (Math.random() < 0.35 ? randomGlyph() : g)));
  });

  const message = MESSAGES[msg];
  // Without motion, today's encryption is shown already broken open.
  const read =
    mode === "pqc"
      ? 0
      : reduced
        ? message.length
        : Math.min(Math.max(frame - SCRAMBLE_TICKS, 0), message.length);
  const status =
    mode === "pqc" || read === 0
      ? "encrypted"
      : read < message.length
        ? "being broken"
        : "readable";
  const { algorithm, note, noteClass } = MODES[mode];

  const choose = (m: Mode) => {
    setMode(m);
    setCycle(({ msg }) => ({ msg, frame: 0 }));
  };

  return (
    <figure ref={ref} className="default-radius bg-gray-50 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-gray-700">
          Messages recorded today
          <span className="ml-2 font-normal text-gray-400">
            {msg + 1} of {MESSAGES.length}
          </span>
        </span>
        <div role="group" aria-label="Encryption" className="flex default-radius bg-white p-0.5">
          {(Object.keys(MODES) as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => choose(m)}
              className={`cursor-pointer default-radius px-2.5 py-1 font-medium transition-colors ${
                mode === m ? "bg-gray-800 text-white" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {MODES[m].label}
            </button>
          ))}
        </div>
      </div>

      <p
        aria-label={read === message.length ? message : "Encrypted message"}
        className="mt-5 break-all default-radius bg-white px-4 py-6 text-center font-mono text-lg leading-relaxed"
      >
        {message.split("").map((char, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={i < read ? "text-gray-800" : "text-gray-200"}
          >
            {i < read ? char : glyphs[i]}
          </span>
        ))}
      </p>

      <div className="mt-5 border-t border-gray-100 pt-4 font-mono text-xs">
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">encryption</span>
          <span className="text-gray-700">{algorithm}</span>
        </div>
        <div className="mt-1.5 flex justify-between gap-4">
          <span className="text-gray-400">status</span>
          <span className={status === "encrypted" ? "text-gray-700" : "text-red-600"}>
            {status}
          </span>
        </div>
      </div>
      <figcaption aria-live="polite" className={`mt-4 text-sm ${noteClass}`}>
        {note}
      </figcaption>
    </figure>
  );
}
