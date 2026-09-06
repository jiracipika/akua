"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { topTracks, artist } from "@/data/artist";
import { useCursor } from "./cursor";

/**
 * Pinned horizontal track gallery (desktop).
 * Mobile: natural vertical stack, no forced horizontal scroll.
 */
export default function TrackGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { setLabel } = useCursor();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // translate the inner rail across n-1 viewports
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((topTracks.length - 1) / topTracks.length) * 100}%`],
  );

  return (
    <>
      {/* ---------- desktop pinned horizontal ---------- */}
      <div ref={ref} className="hidden md:block relative" style={{ height: `${topTracks.length * 60}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          {/* oversized ghost word behind the rail */}
          <span
            aria-hidden="true"
            className="display outline-type absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.08] pointer-events-none select-none"
            style={{ fontSize: "44vh" }}
          >
            MUSIC MUSIC MUSIC
          </span>

          <motion.div style={{ x: reduce ? 0 : x }} className="flex h-full">
            {topTracks.map((t, i) => (
              <TrackCard key={t.title} track={t} index={i} setLabel={setLabel} vertical />
            ))}
          </motion.div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-[var(--dim)]">
            {String(topTracks.length).padStart(2, "0")} TRACKS — KEEP SCROLLING
          </div>
        </div>
      </div>

      {/* ---------- mobile vertical ---------- */}
      <div id="music" className="md:hidden flex flex-col">
        <MobileHeading />
        {topTracks.map((t, i) => (
          <TrackCard key={t.title} track={t} index={i} setLabel={setLabel} vertical={false} />
        ))}
      </div>
    </>
  );
}

function MobileHeading() {
  return (
    <div className="px-5 pt-24 pb-8">
      <p className="text-[10px] tracking-[0.4em] text-[var(--dim)] mb-3">01 — MUSIC</p>
      <h2 className="display" style={{ fontSize: "clamp(64px, 22vw, 120px)" }}>
        TRACKS
      </h2>
    </div>
  );
}

function TrackCard({
  track,
  index,
  vertical,
  setLabel,
}: {
  track: (typeof topTracks)[number];
  index: number;
  vertical: boolean;
  setLabel: (l: string | null) => void;
}) {
  const hue = 40 + track.tone * 160;
  const grainOpacity = 0.08 + track.tone * 0.1;

  return (
    <article
      className={
        vertical
          ? "w-screen h-full shrink-0 flex flex-col justify-center px-[8vw] relative"
          : "px-5 py-10 border-t border-[var(--line)]"
      }
    >
      <div className={vertical ? "flex items-center gap-[5vw]" : "flex items-start gap-6"}>
        {/* generative artwork card */}
        <motion.a
          href={artist.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block shrink-0 overflow-hidden group"
          style={
            vertical
              ? { width: "min(30vw, 260px)", aspectRatio: "1" }
              : { width: "88px", height: "88px" }
          }
          onMouseEnter={() => setLabel("PLAY")}
          onMouseLeave={() => setLabel(null)}
          aria-label={`Listen to ${track.title} by ${track.primary} on Spotify`}
          whileHover={vertical ? { scale: 1.03 } : undefined}
        >
          <span
            className="absolute inset-0"
            style={{
              background: `conic-gradient(from ${track.tone * 360}deg, hsl(${hue} 90% 55%), hsl(${(hue + 120) % 360} 90% 40%), #0a0a0c 65%, hsl(${hue} 90% 55%))`,
              filter: `saturate(${1.1 + track.tone}) contrast(1.15)`,
            }}
          />
          {/* halftone dots */}
          <span
            className="absolute inset-0 mix-blend-overlay"
            style={{
              opacity: grainOpacity * 6,
              backgroundImage:
                "radial-gradient(circle, rgba(0,0,0,0.9) 1px, transparent 1.6px)",
              backgroundSize: "7px 7px",
            }}
          />
          <span className="absolute inset-0 border border-white/10" />
          <span className="absolute bottom-1.5 left-2 text-[9px] tracking-[0.2em] text-white/80 font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
        </motion.a>

        <div className={vertical ? "min-w-0" : "min-w-0 flex-1"}>
          <p className="text-[10px] tracking-[0.35em] text-[var(--dim)] mb-2">
            {track.primary.toUpperCase()}
            {track.featured ? ` × ${track.featured.toUpperCase()}` : ""}
          </p>
          <h3
            className={`display ${track.tone > 0.5 ? "outline-type-accent" : ""}`}
            style={{ fontSize: vertical ? "clamp(44px, 7.5vw, 110px)" : "clamp(28px, 8vw, 44px)" }}
          >
            {track.title}
          </h3>
          <p className="font-mono text-xs text-[var(--dim)] mt-3">
            {track.duration} — <span className="underline underline-offset-4">LISTEN ↗</span>
          </p>
        </div>
      </div>
    </article>
  );
}
