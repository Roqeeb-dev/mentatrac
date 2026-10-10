import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export const CONTACT_EMAIL = "support@mentatrac.com";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
];

export function LegalLayout({
  title,
  subtitle,
  updated,
  children,
}: {
  title: string;
  subtitle?: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-[760px] max-w-full">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Logo variant="dark" showIcon={true} />
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to app
          </Link>
        </div>

        <article className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-base leading-relaxed text-slate-500">
              {subtitle}
            </p>
          )}
          {updated && (
            <p className="mt-3 text-xs font-medium text-slate-400">
              Last updated: {updated}
            </p>
          )}
          <div className="mt-8 space-y-8">{children}</div>
        </article>

        <nav
          aria-label="Legal"
          className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2"
        >
          {FOOTER_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-semibold text-slate-400 transition-colors hover:text-slate-700"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-600">
        {children}
      </div>
    </section>
  );
}

export function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
