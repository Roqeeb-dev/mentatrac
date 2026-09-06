"use client";

import { Plus } from "lucide-react";

interface MoodBannerCTAProps {
  onCheckIn: () => void;
}

export function MoodBannerCTA({ onCheckIn }: MoodBannerCTAProps) {
  return (
    <button
      type="button"
      onClick={onCheckIn}
      className="w-full bg-[#6B66F6] hover:bg-[#5C56F5] text-white rounded-3xl p-6 flex items-center justify-between cursor-pointer transition-all shadow-sm group border-none outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
    >
      <div className="text-left">
        <h3 className="text-white font-bold text-xl tracking-tight">
          How are you feeling right now?
        </h3>
        <p className="text-xs text-violet-200/90 font-normal mt-1">
          Tap to log today's mood check-in
        </p>
      </div>

      <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-white/30 transition-colors flex-shrink-0">
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </div>
    </button>
  );
}
