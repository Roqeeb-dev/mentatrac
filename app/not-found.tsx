import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Page not found",
};

const FACES = [
  { emoji: "✨", bg: "bg-[#FFF8EE]", border: "border-[#FFEAD0]" },
  { emoji: "😊", bg: "bg-[#EBF6F0]", border: "border-[#D5ECDF]" },
  { emoji: "😐", bg: "bg-[#EDF3FA]", border: "border-[#DCE7F5]" },
  { emoji: "😔", bg: "bg-[#F1EDFA]", border: "border-[#E2DAF5]" },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F7F4] px-6 py-16">
      {/* Soft background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#5B4DFB]/10 blur-3xl"
      />

      <div className="relative flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-10">
          <Logo variant="dark" showIcon={true} />
        </div>

        {/* Mood faces */}
        <div className="mb-8 flex items-center gap-2.5" aria-hidden>
          {FACES.map((face, i) => (
            <div
              key={face.emoji}
              className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-xl shadow-sm ${face.bg} ${face.border} ${
                i % 2 === 0 ? "-translate-y-1" : "translate-y-1"
              }`}
            >
              {face.emoji}
            </div>
          ))}
        </div>

        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
          Error 404
        </p>

        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Lost your way?
        </h1>

        <p className="mt-4 w-[340px] max-w-full text-sm leading-relaxed text-slate-500">
          We couldn&apos;t find the page you were looking for. It may have
          moved, or the link might be wrong. Let&apos;s get you back to
          somewhere familiar.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5B4DFB] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-colors hover:bg-[#4A3CE2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4DFB]/40"
          >
            Go to dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
