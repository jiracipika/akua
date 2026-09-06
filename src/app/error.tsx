"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[100svh] flex flex-col items-center justify-center gap-6 px-5 text-center">
      <h1 className="display outline-type" style={{ fontSize: "clamp(60px, 16vw, 180px)" }}>
        500
      </h1>
      <p className="font-mono text-xs tracking-[0.3em] text-[var(--dim)]">
        SOMETHING BROKE THE FREQUENCY.
      </p>
      <button
        onClick={reset}
        className="border border-[var(--line)] px-8 py-4 text-xs tracking-[0.3em] hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] transition-colors"
      >
        RETRY
      </button>
    </div>
  );
}
