"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { artist } from "@/data/artist";

/**
 * Giant rotating CTA circle with orbiting text ring.
 * Contains the official Spotify embed.
 */
export default function SpotifyCta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [angle, setAngle] = useState(0);

  // orbit text ring
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const loop = () => {
      setAngle((a) => a + 0.25);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const text = "LISTEN TO AKUA • ON SPOTIFY • ";
  const radius = 118;

  return (
    <section ref={ref} className="relative py-28 md:py-40 overflow-hidden">
      <div className="flex flex-col items-center gap-14 px-5">
        {/* rotating CTA + orbit ring */}
        <a
          href={artist.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block group"
          aria-label="Listen to AKUA on Spotify"
          style={{ width: 160, height: 160 }}
          onMouseEnter={(e) => e.currentTarget.style.setProperty("--spin", "0.2s")}
        >
          {/* orbiting ring text */}
          {!reduce && (
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              {Array.from(text).map((ch, i) => {
                const a = (i / text.length) * Math.PI * 2;
                return (
                  <span
                    key={i}
                    className="absolute text-[10px] tracking-[0.2em] font-mono text-[var(--dim)] left-1/2 top-1/2"
                    style={{
                      transform: `translate(${Math.cos(a) * radius}px, ${Math.sin(a) * radius}px) translate(-50%,-50%) rotate(${(a * 180) / Math.PI + 90}deg)`,
                    }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                );
              })}
            </div>
          )}

          {/* pulsing circle */}
          <motion.span
            className="absolute inset-0 rounded-full bg-[var(--accent)] grid place-items-center text-black"
            animate={reduce ? {} : { scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.2.4-.7.5-1 .3-2.9-1.8-6.5-2.2-10.8-1.2-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4.7-1.1 8.7-.6 11.9 1.4.3.2.4.7.2 1zm1.5-3.3c-.3.4-.8.6-1.3.3-3.3-2-8.3-2.6-12.2-1.4-.5.1-1-.1-1.2-.6-.1-.5.1-1 .6-1.2 4.4-1.3 9.9-.7 13.7 1.6.5.3.6.9.4 1.3zm.1-3.4C15.2 8.3 8.7 8.1 5 9.2c-.6.2-1.2-.2-1.4-.7-.2-.6.2-1.2.7-1.4 4.3-1.3 11.4-1 15.9 1.6.5.3.7 1 .4 1.5-.3.5-1 .7-1.5.4z" />
            </svg>
          </motion.span>
        </a>

        {/* official embed */}
        <div className="w-full max-w-xl">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] tracking-[0.35em] text-[var(--dim)]">
              02 — STREAM
            </p>
            <button
              className="text-[10px] tracking-[0.3em] border border-[var(--line)] px-3 py-1.5 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? "HIDE PLAYER" : "SHOW PLAYER"}
            </button>
          </div>
          {playing ? (
            <motion.iframe
              title="AKUA on Spotify — official embed"
              src={artist.spotifyEmbedUrl}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            />
          ) : (
            <p className="font-mono text-xs text-[var(--dim)] leading-relaxed">
              Press play to load the official Spotify player.
              <br />
              No account needed — full top tracks, right here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
