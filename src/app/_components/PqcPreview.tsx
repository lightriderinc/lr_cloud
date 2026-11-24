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

// Each message, under today's encryption: scrambled for a moment (while the
// line grows or shrinks to the new message's length), read one character at
// a time, held open, then scrambled again one character at a time before the
// next message. Reading and re-scrambling each take one tick per character.
const SCRAMBLED_TICKS = 18;
const HOLD_TICKS = 30;
const cycleLength = (msg: number) =>
  SCRAMBLED_TICKS + 2 * MESSAGES[msg].length + HOLD_TICKS;

type Phase = "encrypted" | "being broken" | "readable";

/** Which characters are readable at this point in the cycle: lo <= i < hi. */
function readable(frame: number, length: number): { lo: number; hi: number; phase: Phase } {
  let t = frame - SCRAMBLED_TICKS;
  if (t < 0) return { lo: 0, hi: 0, phase: "encrypted" };
  if (t < length) return { lo: 0, hi: t, phase: "being broken" };
  t -= length;
  if (t < HOLD_TICKS) return { lo: 0, hi: length, phase: "readable" };
  t -= HOLD_TICKS;
  return { lo: Math.min(t, length), hi: length, phase: "encrypted" };
}

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
  // `len` is how many characters the line shows; it steps toward the current
  // message's length while the line is scrambled, so the width never jumps.
  const [{ msg, frame, len }, setCycle] = useState({
    msg: 0,
    frame: 0,
    len: MESSAGES[0].length,
  });
  const [glyphs, setGlyphs] = useState(INITIAL_GLYPHS);

  useLiveTicker(ref, 70, () => {
    setCycle(({ msg, frame, len }) => {
      const target = MESSAGES[msg].length;
      const nextLen = len + Math.sign(target - len);
      return frame + 1 < cycleLength(msg)
        ? { msg, frame: frame + 1, len: nextLen }
        : { msg: (msg + 1) % MESSAGES.length, frame: 0, len: nextLen };
    });
    setGlyphs((prev) => prev.map((g) => (Math.random() < 0.35 ? randomGlyph() : g)));
  });

  const message = MESSAGES[msg];
  const shown = reduced ? message.length : len;
  // Without motion, today's encryption is shown already broken open.
  const { lo, hi, phase } =
    mode === "pqc"
      ? { lo: 0, hi: 0, phase: "encrypted" as Phase }
      : reduced
        ? { lo: 0, hi: message.length, phase: "readable" as Phase }
        : readable(frame, message.length);
  const { algorithm, note, noteClass } = MODES[mode];

  const choose = (m: Mode) => {
    setMode(m);
    setCycle((c) => ({ ...c, frame: 0 }));
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
        aria-label={phase === "readable" ? message : "Encrypted message"}
        className="mt-5 break-all default-radius bg-white px-4 py-6 text-center font-mono text-lg leading-relaxed"
      >
        {Array.from({ length: shown }, (_, i) => {
          const open = i >= lo && i < hi;
          return (
            <span
              key={i}
              aria-hidden="true"
              className={`transition-colors duration-300 ${open ? "text-gray-800" : "text-gray-200"}`}
            >
              {open ? message[i] : glyphs[i]}
            </span>
          );
        })}
      </p>

      <div className="mt-5 border-t border-gray-100 pt-4 font-mono text-xs">
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">encryption</span>
          <span className="text-gray-700">{algorithm}</span>
        </div>
        <div className="mt-1.5 flex justify-between gap-4">
          <span className="text-gray-400">status</span>
          <span
            className={
              phase === "being broken" || phase === "readable"
                ? "text-red-600"
                : "text-gray-700"
            }
          >
            {phase}
          </span>
        </div>
      </div>
      <figcaption aria-live="polite" className={`mt-4 text-sm ${noteClass}`}>
        {note}
      </figcaption>
    </figure>
  );
}
