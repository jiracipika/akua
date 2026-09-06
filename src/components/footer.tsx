"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { artist } from "@/data/artist";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [logoClicks, setLogoClicks] = useState(0);
  const [remix, setRemix] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  // easter egg: 5 rapid logo clicks flip a visual remix
  const onLogo = () => {
    const n = logoClicks + 1;
    if (n >= 5) {
      setRemix((r) => !r);
      setLogoClicks(0);
    } else {
      setLogoClicks(n);
    }
  };

  return (
    <footer id="contact" ref={ref} className="relative pt-24 overflow-hidden border-t border-[var(--line)]">
      {/* about — verified facts only */}
      <div id="about" className="px-5 md:px-10 mb-28">
        <p className="text-[10px] tracking-[0.4em] text-[var(--dim)] mb-6">03 — ABOUT</p>
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
          <h2 className="display" style={{ fontSize: "clamp(48px, 10vw, 140px)" }}>
            AKUA
          </h2>
          <p className="font-mono text-xs text-[var(--dim)] leading-loose max-w-sm">
            ARTIST / MUSIC
            <br />
            STREAMING ON{" "}
            <a
              href={artist.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] underline underline-offset-4 hover:text-[var(--accent)]"
            >
              SPOTIFY ↗
            </a>
            <br />
            <br />
            OFFICIAL PAGE — ARTIST ID {artist.spotifyArtistId}
            <br />
            BIO COMING SOON — NOTHING INVENTED HERE.
          </p>
        </div>
      </div>

      {/* contact strip */}
      <div className="px-5 md:px-10 mb-24 flex flex-col md:flex-row gap-6 md:gap-16 items-start">
        <p className="text-[10px] tracking-[0.4em] text-[var(--dim)]">04 — CONTACT</p>
        {artist.contactEmail ? (
          <a href={`mailto:${artist.contactEmail}`} className="display text-2xl md:text-4xl hover:text-[var(--accent)]">
            {artist.contactEmail}
          </a>
        ) : (
          <p className="font-mono text-xs text-[var(--dim)] leading-loose">
            BOOKING / PRESS — COMING SOON.
            <br />
            UNTIL THEN: THE MUSIC IS THE MESSAGE.{" "}
            <a
              href={artist.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] underline underline-offset-4 hover:text-[var(--accent)]"
            >
              LISTEN ↗
            </a>
          </p>
        )}
      </div>

      {/* giant ending statement */}
      <motion.div
        className="relative select-none"
        style={{ y: reduce ? 0 : y, scale: reduce ? 1 : scale }}
      >
        <h2
          className="display text-center whitespace-nowrap"
          style={{
            fontSize: "clamp(90px, 21vw, 340px)",
            filter: remix
              ? "hue-rotate(90deg) saturate(2) contrast(1.3)"
              : undefined,
            transition: "filter 0.6s",
          }}
        >
          <span className={remix ? "outline-type-accent" : ""}>AKUA</span>
        </h2>
        <p
          aria-hidden="true"
          className="display text-center text-[var(--dim)]"
          style={{ fontSize: "clamp(14px, 2.4vw, 28px)", marginTop: "-0.4em" }}
        >
          {remix ? "OR THE BEGINNING" : "THE END / OR THE BEGINNING"}
        </p>
      </motion.div>

      {/* bottom bar */}
      <div className="mt-16 px-5 md:px-10 py-6 border-t border-[var(--line)] flex flex-col md:flex-row justify-between gap-3 text-[10px] tracking-[0.25em] text-[var(--dim)]">
        <button onClick={onLogo} className="text-left hover:text-[var(--ink)]" aria-label="AKUA">
          © {new Date().getFullYear()} AKUA — OFFICIAL
        </button>
        <span>SOURCE OF TRUTH: SPOTIFY / {artist.spotifyArtistId}</span>
        <a
          href={artist.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--ink)]"
        >
          SPOTIFY ↗
        </a>
      </div>
    </footer>
  );
}
