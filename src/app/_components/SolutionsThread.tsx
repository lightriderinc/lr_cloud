"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Wraps the solutions list and keeps the glow on the thread (the connector
// lines and panel borders, marked with `.thread-line` / `.thread-border`)
// centred on the middle of the viewport. Each element gets `--glow-y`: the
// viewport's centre measured from that element's own top edge, which its
// gradient uses to place the bright band. Writes go straight to the DOM
// once per frame, so scrolling never re-renders React.
export default function SolutionsThread({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const parts = root.querySelectorAll<HTMLElement>(
      ".thread-line, .thread-border",
    );

    // The page scrolls inside the layout's <main>, not the window, so find
    // the nearest scrolling ancestor and track that (falling back to the
    // window if the layout ever changes).
    const scroller = findScroller(root);

    let frame = 0;
    const update = () => {
      frame = 0;
      // Centre of the visible part of the scroller (below the header).
      const view = scroller
        ? scroller.getBoundingClientRect()
        : { top: 0, height: window.innerHeight };
      const centre = view.top + view.height / 5;
      parts.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        el.style.setProperty("--glow-y", `${centre - top}px`);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const target: HTMLElement | Window = scroller ?? window;
    update();
    target.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      target.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="flex flex-col">
      {children}
    </div>
  );
}

function findScroller(el: HTMLElement): HTMLElement | null {
  for (let node = el.parentElement; node; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node);
    if (overflowY === "auto" || overflowY === "scroll") return node;
  }
  return null;
}
