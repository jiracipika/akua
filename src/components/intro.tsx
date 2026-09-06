"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STEPS = [0, 17, 42, 68, 91, 100];

export default function Intro() {
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (
      sessionStorage.getItem("akua-intro") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    // rAF deferral: avoids hydration mismatch and satisfies the
    // no-setState-in-effect-body lint rule
    const showId = requestAnimationFrame(() => setShow(true));
    document.body.style.overflow = "hidden";
    const timers: ReturnType<typeof setTimeout>[] = [showId as unknown as ReturnType<typeof setTimeout>];
    STEPS.forEach((v, idx) => {
      timers.push(
        setTimeout(() => {
          setPct(v);
          if (v === 100) {
            timers.push(
              setTimeout(() => setExiting(true), 350),
              setTimeout(() => {
                setShow(false);
                sessionStorage.setItem("akua-intro", "1");
                document.body.style.overflow = "";
              }, 1350),
            );
          }
        }, idx * 260),
      );
    });
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[120] bg-[#060608] flex items-center justify-center"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* percentage counter */}
      <AnimatePresence mode="wait">
        {!exiting && (
          <motion.div
            key="pct"
            className="font-mono text-sm tracking-[0.3em] text-[var(--dim)] absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {String(pct).padStart(3, "0")}%
          </motion.div>
        )}
      </AnimatePresence>

      {exiting && (
        <div className="display flex items-baseline overflow-hidden" style={{ fontSize: "clamp(64px, 16vw, 220px)" }}>
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

      {/* wipe reveal */}
      <AnimatePresence>
        {exiting && (
          <motion.div
            key="wipe"
            className="absolute inset-x-0 bottom-0 bg-[var(--accent)] origin-bottom"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, delay: 0.55, times: [0, 0.6, 1] }}
            style={{ height: "100vh", top: 0, bottom: "auto", zIndex: -1 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
