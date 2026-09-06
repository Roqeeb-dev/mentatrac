"use client";

import Link from "next/link";
import { DayMoodSummary } from "../types/dashboard";

interface WeeklyMoodStripProps {
  days: DayMoodSummary[];
}

export function WeeklyMoodStrip({ days }: WeeklyMoodStripProps) {
  const getBadgeStyle = (item: DayMoodSummary) => {
    if (item.emoji === "✨" || item.moodScore === 5) {
      return "bg-[#FFF8EE] border-[#FFEAD0]";
    }
    if (item.emoji === "😐" || item.emoji === "😔" || item.moodScore <= 3) {
      return "bg-[#EDF3FA] border-[#DCE7F5]";
    }
    // Default good mood (😊)
    return "bg-[#EBF6F0] border-[#D5ECDF]";
  };

  return (
    <div className="bg-white border border-slate-100/80 rounded-3xl p-5 flex flex-col justify-between space-y-4 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">This week</h3>
        <Link
          href="/dashboard/reports"
          className="text-xs font-semibold text-[#5B4DFB] hover:text-[#4A3CE2] transition-colors flex items-center gap-1"
        >
          <span>See reports</span>
          <span>&rarr;</span>
        </Link>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-1">
        {days.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-medium text-slate-400">
              {item.day}
            </span>
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[14px] border flex items-center justify-center text-lg select-none transition-transform hover:scale-105 ${getBadgeStyle(
                item,
              )}`}
            >
              {item.emoji}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
