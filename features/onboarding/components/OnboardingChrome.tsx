"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function OnboardingLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative h-7 w-7 shrink-0 transition-transform hover:scale-105">
        <Image
          src="/logo.png"
          alt="Mentatrac Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <span
        className={`font-serif text-xl font-bold tracking-tight ${
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
