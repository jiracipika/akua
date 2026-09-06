"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { artist } from "@/data/artist";

/**
 * Full-bleed editorial image break — duotone-treated portrait
 * with a huge statement scrolling over it.
 */
export default function VisualBreak() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.02, 1.15]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["8%", "-14%"]);

  return (
    <section
      id="visual"
      ref={ref}
      className="relative min-h-[110svh] overflow-hidden flex items-center justify-center"
    >
      {/* treated image */}
      <motion.div style={{ y: reduce ? 0 : y, scale: reduce ? 1 : scale }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artist.portrait}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-top opacity-60"
          style={{
            filter: "grayscale(1) contrast(1.4) brightness(0.75)",
          }}
        />
        {/* duotone wash */}
        <div className="absolute inset-0 mix-blend-multiply bg-[#1a0f3c]" />
        <div className="absolute inset-0 mix-blend-color bg-[#c8ff2e]/20" />
      </motion.div>

      {/* statement type crossing the image */}
      <div className="relative z-10 text-center px-5">
        <motion.p
          className="display outline-type whitespace-nowrap"
          style={{ fontSize: "clamp(56px, 14vw, 200px)", x: reduce ? 0 : wordX }}
          aria-hidden="true"
        >
          SOUND / VISION
        </motion.p>
        <p className="mt-6 font-mono text-xs md:text-sm tracking-[0.3em] text-white/85 max-w-xl mx-auto leading-relaxed">
          NO BIOGRAPHY WRITTEN YET.
          <br />
          THE MUSIC SPEAKS FIRST.
        </p>
        <a
          href={artist.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 text-[11px] tracking-[0.35em] border-b border-[var(--accent)] pb-1 text-white hover:text-[var(--accent)] transition-colors"
        >
          HEAR IT ON SPOTIFY ↗
        </a>
      </div>
    </section>
  );
}
