"use client";

import { ChevronLeft, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export function OnboardingLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
          inverse ? "bg-white/15" : "bg-purple-100"
        }`}
      >
        <Sparkles
          className={`h-4 w-4 ${inverse ? "text-white" : "text-purple-700"}`}
          strokeWidth={2}
        />
      </span>
      <span
        className={`font-display text-heading-sm ${
          inverse ? "text-white" : "text-text-primary"
        }`}
      >
        Mentatrac
      </span>
    </div>
  );
}

export function OnboardingProgress({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
            i <= current ? "bg-purple-700" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export function OnboardingBackButton({ show }: { show: boolean }) {
  const router = useRouter();
  if (!show) return <span />;
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center gap-1 text-body-sm text-text-secondary transition-colors hover:text-text-primary"
    >
      <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
      Back
    </button>
  );
}
