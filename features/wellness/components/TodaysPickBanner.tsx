"use client";

import { WellnessTip } from "../types/wellness";
import { Wind } from "lucide-react";

interface Props {
  pick: WellnessTip;
}

export function TodaysPickBanner({ pick }: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#5B46F6] p-6 text-white shadow-lg sm:p-8">
      <div className="relative z-10 max-w-xl">
        {/* Badges */}
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            TODAY'S PICK
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/90">
            • {pick.duration}
          </span>
        </div>

        {/* Category Label */}
        <span className="mt-4 block text-[10px] font-bold tracking-wider uppercase text-white/70">
          {pick.category}
        </span>

        {/* Title */}
        <h2 className="mt-1 text-xl font-bold sm:text-2xl">{pick.title}</h2>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-white/80 sm:text-sm">
          {pick.description}
        </p>
      </div>

      {/* Decorative Background Graphic */}
      <div className="pointer-events-none absolute -bottom-6 -right-6 opacity-20 sm:opacity-30">
        <Wind className="h-48 w-48 text-white" />
      </div>
    </div>
  );
}
