"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { artist } from "@/data/artist";

const LINKS = [
  { label: "MUSIC", href: "#music" },
  { label: "VISUALS", href: "#visual" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-0 left-0 right-0 z-[80] mix-blend-difference"
      >
        <div className="flex items-center justify-between px-5 md:px-10 py-5">
          <a
            href="#top"
            className="display text-xl tracking-[0.18em] text-white"
            aria-label="AKUA — back to top"
          >
            AKUA
          </a>
          <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.22em] text-white">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} className="group relative">
                {l.label}
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href={artist.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/70 px-4 py-2 hover:bg-white hover:text-black transition-colors"
            >
              LISTEN ↗
            </a>
          </div>
          <button
            className="md:hidden display text-lg tracking-[0.18em] text-white"
            aria-expanded={open}
            aria-controls="menu-overlay"
            onClick={() => setOpen(true)}
          >
            MENU
          </button>
          <button
            className="hidden md:block display text-lg tracking-[0.18em] text-white"
            aria-expanded={open}
            aria-controls="menu-overlay"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            ○
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-overlay"
            className="fixed inset-0 z-[110] bg-[#0a0a0c] flex flex-col"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex justify-between items-center px-5 md:px-10 py-5">
              <span className="display text-xl tracking-[0.18em]">AKUA</span>
              <button
                className="display text-lg tracking-[0.18em]"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-5 md:px-10 gap-2">
              {[...LINKS, { label: "SPOTIFY ↗", href: artist.spotifyUrl, ext: true }].map(
                (l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    {...("ext" in l && l.ext
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="display outline-type hover:text-[var(--accent)] hover:[-webkit-text-stroke:0] transition-colors"
                    style={{ fontSize: "clamp(48px, 11vw, 130px)" }}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </motion.a>
                ),
              )}
            </div>
            <p className="px-5 md:px-10 pb-8 text-[10px] tracking-[0.3em] text-[var(--dim)]">
              AKUA — OFFICIAL ARTIST WEBSITE
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
