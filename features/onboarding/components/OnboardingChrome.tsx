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
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i <= current;
        return (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              isActive ? "w-6 bg-purple-600" : "w-1.5 bg-gray-200"
            }`}
          />
        );
      })}
    </div>
  );
}

export function OnboardingHeader({
  total,
  current,
  showBack,
}: {
  total: number;
  current: number;
  showBack: boolean;
}) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <OnboardingProgress total={total} current={current} />

      <div className="flex items-center gap-4">
        {showBack && (
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1 text-body-sm font-medium text-text-secondary transition-colors hover:text-text-primary border border-gray-300 py-1 px-3 rounded-sm"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
            Back
          </button>
        )}
        <span className="text-caption font-medium text-text-tertiary">
          {current + 1} of {total}
        </span>
      </div>
    </div>
  );
}
