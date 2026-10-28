"use client";

import { useEffect, useRef } from "react";
import { mix, parseHex, perStep, type RGB } from "./canvasField";

// Grid geometry, in CSS pixels. Matches HeroCipherField.
const PITCH = 24;
const TILE = 12;
// Tile brightness for a set and an unset key bit.
const BIT_ON = 0.8;
const BIT_OFF = 0.3;
// FLIP_RATE: per-tile chance each frame that its key bit flips.
// FLIP_EASE: how quickly a tile fades to its new brightness.
const FLIP_RATE = 0.004;
const FLIP_EASE = 0.08;
// SPARK_RATE: chance each frame that one tile lights up in the brand colour.
// SPARK_FADE: how quickly a lit tile fades back to gray.
const SPARK_RATE = 0.02;
const SPARK_FADE = 0.025;
// Horizontal position of the padlock's centre, as a fraction of the canvas width.
const LOCK_X = 0.62;
const GRAY: RGB = [145, 145, 145];

// Padlock drawn one tile per character; "#" is a tile.
const LOCK = [
  "....#######....",
  "...#########...",
  "..###.....###..",
  "..##.......##..",
  "..##.......##..",
  "..##.......##..",
  "..##.......##..",
  "###############",
  "###############",
  "#######.#######",
  "######...######",
  "######...######",
  "#######.#######",
  "#######.#######",
  "###############",
  "###############",
  "###############",
];
const LOCK_COLS = LOCK[0].length;

// Right-side backdrop for the PQC hero: a gray padlock of tiles whose key bits
// shimmer, with the odd tile lighting up in the brand colour.
// Only shown at lg and above; masked away from the copy on its left edge.
export default function HeroLockField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const styles = getComputedStyle(canvas);
    const tertiary = parseHex(styles.getPropertyValue("--brand-tertiary"), [242, 103, 57]);
    const primary = parseHex(styles.getPropertyValue("--brand-primary"), [239, 59, 57]);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    // One entry per padlock tile.
    let tiles: { x: number; y: number; brand: RGB }[] = [];
    let level = new Float32Array(0);
    let spark = new Float32Array(0);
    let bits = new Uint8Array(0);

    let frame = 0;
    let visible = true;

    const randomBit = () => (Math.random() < 0.6 ? 1 : 0);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Snap the padlock to the same grid HeroCipherField uses.
      const cols = Math.floor(width / PITCH);
      const rows = Math.floor(height / PITCH);
      const offsetX = (width - cols * PITCH + PITCH - TILE) / 2;
      const offsetY = (height - rows * PITCH + PITCH - TILE) / 2;
      const left = Math.round(cols * LOCK_X - LOCK_COLS / 2);
      const top = Math.round((rows - LOCK.length) / 2);

      tiles = [];
      LOCK.forEach((line, r) => {
        for (let c = 0; c < LOCK_COLS; c++) {
          if (line[c] !== "#") continue;
          const t = c / (LOCK_COLS - 1);
          tiles.push({
            x: offsetX + (left + c) * PITCH,
            y: offsetY + (top + r) * PITCH,
            brand: tertiary.map((v, k) => Math.round(mix(v, primary[k], t))) as RGB,
          });
        }
      });

      bits = Uint8Array.from(tiles, randomBit);
      level = Float32Array.from(bits, (b) => (b ? BIT_ON : BIT_OFF));
      spark = new Float32Array(tiles.length);
    };

    const draw = (steps: number) => {
      if (steps > 0) {
        const flipChance = perStep(FLIP_RATE, steps);
        const flipEase = perStep(FLIP_EASE, steps);
        const sparkFade = perStep(SPARK_FADE, steps);

        if (tiles.length && Math.random() < perStep(SPARK_RATE, steps)) {
          spark[Math.floor(Math.random() * tiles.length)] = 1;
        }
        for (let i = 0; i < tiles.length; i++) {
          if (Math.random() < flipChance) bits[i] ^= 1;
          level[i] = mix(level[i], bits[i] ? BIT_ON : BIT_OFF, flipEase);
          spark[i] = mix(spark[i], 0, sparkFade);
        }
      }

      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < tiles.length; i++) {
        const { x, y, brand } = tiles[i];
        const s = spark[i];
        const rgb = GRAY.map((g, k) => Math.round(mix(g, brand[k], s)));
        ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${mix(level[i], 1, s)})`;
        ctx.fillRect(x, y, TILE, TILE);
      }
    };

    let lastTime = 0;
    const tick = (time: number) => {
      // Cap the step so a long pause (e.g. a background tab) doesn't jump the animation.
      const steps = lastTime ? Math.min((time - lastTime) / (1000 / 60), 4) : 1;
      lastTime = time;
      draw(steps);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduceMotion || frame || !visible || width === 0) return;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // The canvas is display:none below lg, so its size doubles as the breakpoint check.
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (width === 0) stop();
      else if (reduceMotion) draw(0);
      else start();
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-3/5 lg:block"
      style={{
        // Fades in from the left so the lock trails off if it reaches under the copy.
        maskImage: "linear-gradient(to right, transparent 0%, #000 35%)",
      }}
    />
  );
}
