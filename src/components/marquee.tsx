"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useScroll } from "framer-motion";

/**
 * Kinetic marquee strip. Speed subtly reacts to scroll velocity.
 */
export default function Marquee({
  text,
  reverse = false,
  duration = 22,
  accent = false,
  size = "clamp(40px, 8vw, 110px)",
}: {
  text: string;
  reverse?: boolean;
  duration?: number;
  accent?: boolean;
  size?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [vel, setVel] = useState(0);

  // sample scroll velocity; clamp so it never gets silly
  useEffect(() => {
    if (reduce) return;
    let last = scrollY.get();
    let lastT = performance.now();
    let raf = 0;
    const tick = () => {
      const now = performance.now();
      const y = scrollY.get();
      const v = Math.min(Math.abs(y - last) / Math.max(now - lastT, 1), 4);
      setVel((prev: number) => prev * 0.9 + v * 0.1);
      last = y;
      lastT = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollY, reduce]);

  const dur = Math.max(duration / (1 + vel * 2), 4);
  const row = `${text} • ${text} • ${text} • ${text} • `;

  return (
    <div ref={ref} className="overflow-hidden py-4 border-y border-[var(--line)] select-none" aria-hidden="true">
      <div
        className={`marquee-track ${reverse ? "marquee-r" : "marquee-l"}`}
        style={{ ["--mq-dur" as string]: `${dur}s` }}
      >
        {[0, 1].map((half) => (
          <span
            key={half}
            className={`display whitespace-nowrap ${accent ? "text-[var(--accent)]" : "outline-type"}`}
            style={{ fontSize: size }}
          >
            {row}
          </span>
        ))}
      </div>
    </div>
  );
}
