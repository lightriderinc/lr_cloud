"use client";

import { useEffect, useRef } from "react";

// Grid geometry, in CSS pixels. Echoes the square tiles of LR-grid-bg.svg.
const PITCH = 18;
const TILE = 9;
// How far the cursor's "encryption" field reaches.
const RADIUS = 150;
// Idle noise stays faint so the hero copy keeps the focus.
const NOISE_MAX = 0.3;
// Speed multipliers (1 = default, 2 = twice as fast, 0.5 = half speed).
// IDLE_SPEED: how often and how quickly tiles shimmer to new random levels.
const IDLE_SPEED = 1.5;
// CURSOR_FOLLOW_SPEED: how quickly the field fades in, trails and fades out with the cursor.
const CURSOR_FOLLOW_SPEED = 2;
// CURSOR_SCRAMBLE_SPEED: how often the key bits under the cursor flip.
const CURSOR_SCRAMBLE_SPEED = 0.5;
const GRAY: RGB = [145, 145, 145];

type RGB = [number, number, number];

function parseHex(value: string, fallback: RGB): RGB {
  const hex = value.trim().replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback;
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as RGB;
}

const mix = (a: number, b: number, t: number) => a + (b - a) * t;

// Per-frame rates (easing factors and flip probabilities) are tuned for 60fps.
// This rescales one to `steps` 60fps frames, so the pace holds on any refresh rate.
const perStep = (rate: number, steps: number) => 1 - (1 - Math.min(rate, 1)) ** steps;

// Side-panel backdrop for the landing hero: a field of tiles flickering with
// random noise that resolves into a shifting brand-coloured bit pattern
// around the cursor. Only shown at lg and above; masked away from the copy.
export default function HeroCipherField() {
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
    let cols = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;
    let noise = new Float32Array(0);
    let target = new Float32Array(0);
    let heat = new Float32Array(0);
    let bits = new Uint8Array(0);

    const pointer = { x: -1e4, y: -1e4, inside: false, strength: 0 };
    let frame = 0;
    let visible = true;

    const randomNoise = () => Math.random() ** 3 * NOISE_MAX;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.floor(width / PITCH);
      rows = Math.floor(height / PITCH);
      offsetX = (width - cols * PITCH + PITCH - TILE) / 2;
      offsetY = (height - rows * PITCH + PITCH - TILE) / 2;

      const count = cols * rows;
      noise = Float32Array.from({ length: count }, randomNoise);
      target = Float32Array.from({ length: count }, randomNoise);
      heat = new Float32Array(count);
      bits = Uint8Array.from({ length: count }, () => (Math.random() < 0.5 ? 1 : 0));
    };

    const draw = (steps: number) => {
      const animate = steps > 0;
      const idleChance = perStep(0.015 * IDLE_SPEED, steps);
      const idleEase = perStep(0.06 * IDLE_SPEED, steps);
      const strengthEase = perStep(0.06 * CURSOR_FOLLOW_SPEED, steps);
      const heatEase = perStep(0.1 * CURSOR_FOLLOW_SPEED, steps);

      ctx.clearRect(0, 0, width, height);
      pointer.strength = mix(pointer.strength, pointer.inside ? 1 : 0, strengthEase);

      for (let r = 0; r < rows; r++) {
        const y = offsetY + r * PITCH;
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const x = offsetX + c * PITCH;

          if (animate) {
            // Randomness: each tile drifts toward a new random brightness now and then.
            if (Math.random() < idleChance) target[i] = randomNoise();
            noise[i] = mix(noise[i], target[i], idleEase);

            // Encryption: near the cursor the noise settles into key bits.
            const dx = x + TILE / 2 - pointer.x;
            const dy = y + TILE / 2 - pointer.y;
            const falloff = Math.max(0, 1 - Math.hypot(dx, dy) / RADIUS);
            heat[i] = mix(heat[i], falloff * falloff * pointer.strength, heatEase);
            if (Math.random() < perStep(heat[i] * 0.04 * CURSOR_SCRAMBLE_SPEED, steps)) bits[i] ^= 1;
          }

          const h = heat[i];
          const alpha = mix(noise[i], bits[i] ? 0.75 : 0.1, h);
          if (alpha < 0.01) continue;

          const brand = c / Math.max(cols - 1, 1);
          const tint = h * bits[i];
          const rgb = GRAY.map((g, k) =>
            Math.round(mix(g, mix(tertiary[k], primary[k], brand), tint)),
          );
          ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
          ctx.fillRect(x, y, TILE, TILE);
        }
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

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.inside =
        e.pointerType === "mouse" &&
        pointer.x >= 0 &&
        pointer.y >= 0 &&
        pointer.x <= rect.width &&
        pointer.y <= rect.height;
    };

    const onPointerLeave = () => {
      pointer.inside = false;
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
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full lg:block"
      style={{
        // Visible on the outer thirds, fading out under the centred copy and at the bottom edge.
        maskImage:
          "linear-gradient(to right, #000 0%, #000 14%, transparent 34%, transparent 66%, #000 86%, #000 100%), linear-gradient(to bottom, #000 70%, transparent 100%)",
        maskComposite: "intersect",
      }}
    />
  );
}
