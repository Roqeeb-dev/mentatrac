"use client";

import { Skeleton } from "@/components/ui/Skeleton";

interface GreetingBannerProps {
  name?: string;
  isLoading?: boolean;
}

export function GreetingBanner({
  name,
  isLoading = false,
}: GreetingBannerProps) {
  const formattedDate = new Date()
    .toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
    .toUpperCase();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const firstName = name ? name.split(" ")[0] : "there";

  return (
    <div className="bg-gradient-to-r from-violet-50/60 via-purple-50/30 to-slate-50/20 border border-violet-100/50 rounded-3xl p-4 space-y-1.5 shadow-2xs">
      <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
        {formattedDate}
      </span>
      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
        <span>{getGreeting()},</span>
        {isLoading ? (
          <Skeleton className="h-8 w-24 rounded-lg inline-block" />
        ) : (
          <span className="text-slate-900">{firstName}</span>
        )}
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 font-medium">
        Here&apos;s how your week is shaping up.
      </p>
    </div>
  );
}
