"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { artist } from "@/data/artist";
import { useCursor } from "./cursor";
import Ambient from "./ambient";

/**
 * Hero: giant AKUA type sandwiching the portrait.
 * Foreground A + trailing A overlap the image; background KU
 * sits behind it. Mouse parallax + scroll separation.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { setLabel } = useCursor();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fgX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };

  const size = "clamp(120px, 26vw, 380px)";

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      <Ambient />

      {/* background KU — behind image, pushed up so it clears the portrait */}
      <motion.div
        aria-hidden="true"
        style={{ x: reduce ? 0 : bgX }}
        className="absolute inset-0 flex items-start justify-center pt-[4svh] pointer-events-none"
      >
        <motion.span
          className="display outline-type"
          style={{
            fontSize: size,
            x: reduce ? 0 : mouse.x * -46,
            y: reduce ? 0 : mouse.y * -26,
          }}
        >
          KU
        </motion.span>
      </motion.div>

      {/* portrait — sits lower so type stays visible */}
      <motion.div
        style={{ scale: reduce ? 1 : imgScale, y: imgY }}
        className="relative z-10 mt-[16svh] md:mt-[26svh]"
      >
        <motion.div
          style={{ rotate: reduce ? 0 : rotate }}
          animate={reduce ? {} : { rotateX: [0, 0], rotateY: [0, 0] }}
        >
          <motion.img
            src={artist.portrait}
            alt="AKUA — official artist portrait from Spotify"
            width={537}
            height={640}
            fetchPriority="high"
            className="w-[clamp(180px,34vw,420px)] h-auto object-cover grayscale contrast-125"
            style={{
              x: reduce ? 0 : mouse.x * 18,
              y: reduce ? 0 : mouse.y * 12,
              maskImage:
                "linear-gradient(to bottom, black 78%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 78%, transparent 100%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* foreground A ... A — over image */}
      <motion.div
        aria-hidden="true"
        style={{ x: reduce ? 0 : fgX }}
        className="absolute inset-0 flex items-center justify-center gap-[0.12em] pointer-events-none z-20"
      >
        <motion.span
          className="display"
          style={{
            fontSize: size,
            x: reduce ? 0 : mouse.x * 52,
            y: reduce ? 0 : mouse.y * 30,
          }}
        >
          A
        </motion.span>
        <span className="inline-block" style={{ width: "clamp(120px, 26vw, 380px)" }} />
        <motion.span
          className="display text-[var(--accent)]"
          style={{
            fontSize: size,
            x: reduce ? 0 : mouse.x * 70,
            y: reduce ? 0 : mouse.y * 40,
          }}
        >
          A
        </motion.span>
      </motion.div>

      {/* vertical side labels */}
      <motion.div style={{ opacity: fade }} className="contents">
        <span
          aria-hidden="true"
          className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[10px] tracking-[0.5em] text-[var(--dim)]"
        >
          OFFICIAL — {new Date().getFullYear()}
        </span>
        <span
          aria-hidden="true"
          className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[10px] tracking-[0.5em] text-[var(--dim)]"
        >
          MUSIC / VISUAL / AKUA
        </span>
      </motion.div>

      {/* CTA */}
      <motion.a
        href={artist.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 group border border-[var(--line)] px-8 py-4 text-xs tracking-[0.3em] hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] transition-colors"
        onMouseEnter={() => setLabel("LISTEN")}
        onMouseLeave={() => setLabel(null)}
        style={{ opacity: fade }}
      >
        LISTEN ON SPOTIFY ↗
      </motion.a>

      {/* scroll hint */}
      <motion.span
        aria-hidden="true"
        className="absolute bottom-4 left-5 text-[10px] tracking-[0.4em] text-[var(--dim)]"
        animate={reduce ? {} : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        SCROLL
      </motion.span>
    </section>
  );
}
