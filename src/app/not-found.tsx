import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[100svh] flex flex-col items-center justify-center gap-6 px-5 text-center">
      <h1 className="display outline-type" style={{ fontSize: "clamp(60px, 16vw, 180px)" }}>
        404
      </h1>
      <p className="font-mono text-xs tracking-[0.3em] text-[var(--dim)]">
        THIS TRACK DOESN&apos;T EXIST.
      </p>
      <Link
        href="/"
        className="border border-[var(--line)] px-8 py-4 text-xs tracking-[0.3em] hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] transition-colors"
      >
        BACK TO AKUA
      </Link>
    </div>
  );
}
