"use client";

import { useEffect, useState } from "react";

/**
 * Easter egg: typing A-K-U-A triggers a brief full-page
 * chromatic-distortion pulse. Never blocks interaction.
 */
export default function Konami() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toUpperCase()).slice(-4);
      if (buf === "AKUA") {
        setActive(true);
        buf = "";
        setTimeout(() => setActive(false), 1200);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!active) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[130] pointer-events-none mix-blend-screen">
      <style>{`
        @keyframes akua-glitch {
          0% { backdrop-filter: none; }
          25% { backdrop-filter: hue-rotate(120deg) saturate(3) contrast(1.4); transform: translateX(6px) skewX(-1deg); }
          50% { backdrop-filter: hue-rotate(-90deg) invert(0.12); transform: translateX(-8px) skewX(1.2deg); }
          75% { backdrop-filter: hue-rotate(45deg) saturate(2); transform: translateY(4px); }
          100% { backdrop-filter: none; transform: none; }
        }
      `}</style>
      <div
        className="absolute inset-0"
        style={{ animation: "akua-glitch 1.2s steps(4) 1", background: "rgba(200,255,46,0.04)" }}
      />
    </div>
  );
}
