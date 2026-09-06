"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type CursorCtx = { setLabel: (label: string | null) => void };
const Ctx = createContext<CursorCtx>({ setLabel: () => {} });
export const useCursor = () => useContext(Ctx);

export default function Cursor({ children }: { children: React.ReactNode }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabelState] = useState<string | null>(null);
  const labelRef = useRef<string | null>(null);

  const setLabel = useCallback((l: string | null) => {
    labelRef.current = l;
    setLabelState(l);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("custom-cursor-active");
    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x - 3}px, ${pos.y - 3}px)`;
      }
    };

    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (ringRef.current) {
        const size = labelRef.current ? 42 : 20;
        ringRef.current.style.transform = `translate(${ring.x - size}px, ${ring.y - size}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <Ctx.Provider value={{ setLabel }}>
      {children}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        data-label={label ?? undefined}
      />
    </Ctx.Provider>
  );
}
