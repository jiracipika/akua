"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STEPS = [0, 17, 42, 68, 91, 100];

/**
 * Intro: black screen -> percentage counter -> AKUA letters -> wipe.
 *
 * The critical exit path is driven purely by setTimeout with
 * conditional rendering (no AnimatePresence / rAF dependency),
 * so the overlay can never trap a visitor — even if the tab is
 * backgrounded and requestAnimationFrame is throttled to zero.
 * A 4s display:none failsafe is the final backstop.
 */
export default function Intro() {
  // phase: hidden -> counting -> letters -> out -> done
  const [phase, setPhase] = useState<"hidden" | "counting" | "letters" | "out" | "done">(
    "hidden",
  );
  const [pct, setPct] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (
      sessionStorage.getItem("akua-intro") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const showId = requestAnimationFrame(() => setPhase("counting"));
    document.body.style.overflow = "hidden";

    const timers: ReturnType<typeof setTimeout>[] = [
      showId as unknown as ReturnType<typeof setTimeout>,
    ];
    const at = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

    STEPS.forEach((v, idx) => at(() => setPct(v), idx * 260));
    // letters appear right after 100%
    at(() => setPhase("letters"), STEPS.length * 260 + 150);
    // wipe out
    at(() => setPhase("out"), STEPS.length * 260 + 800);
    // fully done — unmount unconditionally
    at(() => {
      setPhase("done");
      sessionStorage.setItem("akua-intro", "1");
      document.body.style.overflow = "";
    }, STEPS.length * 260 + 2000);

    // failsafe: nothing keeps this overlay alive past 4.5s, ever
    at(() => {
      const el = document.getElementById("akua-intro");
      if (el) el.style.display = "none";
      document.body.style.overflow = "";
    }, 4500);

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "hidden" || phase === "done") return null;

  const out = phase === "out";

  return (
    <div
      id="akua-intro"
      className="fixed inset-0 z-[120] bg-[#060608] flex items-center justify-center"
      aria-hidden="true"
      style={{ opacity: out ? 0 : 1, transition: "opacity 0.45s ease 0.35s" }}
    >
      {/* percentage counter */}
      {phase === "counting" && (
        <div className="font-mono text-sm tracking-[0.3em] text-[var(--dim)] absolute bottom-10 left-1/2 -translate-x-1/2">
          {String(pct).padStart(3, "0")}%
        </div>
      )}

      {phase === "letters" && (
        <div
          className="display flex items-baseline overflow-hidden"
          style={{ fontSize: "clamp(64px, 16vw, 220px)" }}
        >
          {["A", "K", "U", "A"].map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: "110%", opacity: 0, scaleY: 2.4 }}
              animate={
                reduce
                  ? { y: 0, opacity: 1, scaleY: 1 }
                  : {
                      y: [0, -14, 0, 8, 0],
                      opacity: 1,
                      scaleY: [2.4, 1, 1, 1.25, 1],
                      x: i % 2 === 0 ? [0, -8, 0] : [0, 8, 0],
                    }
              }
              transition={{ duration: 0.9, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
      )}

      {/* lime wipe reveals the site underneath */}
      {(phase === "out" || phase === "letters") && (
        <div
          className="absolute inset-0 bg-[var(--accent)] origin-bottom pointer-events-none"
          style={
            out
              ? { animation: "akua-wipe 0.8s cubic-bezier(0.76,0,0.24,1) forwards" }
              : { transform: "scaleY(0)" }
          }
        />
      )}

      <style>{`
        @keyframes akua-wipe {
          0% { transform: scaleY(0); }
          45% { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
