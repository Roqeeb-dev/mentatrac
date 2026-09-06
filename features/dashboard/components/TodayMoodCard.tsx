"use client";

import Link from "next/link";

interface TodayMoodCardProps {
  emoji?: string;
  label?: string;
  subtitle?: string;
  onLogAgain?: () => void;
}

export function TodayMoodCard({
  emoji = "😊",
  label = "Good",
  subtitle = "Doing well",
  onLogAgain,
}: TodayMoodCardProps) {
  return (
    <div className="bg-[#EBF6F0] border border-[#D5ECDF] rounded-3xl p-5 flex flex-col justify-between space-y-4">
      {/* Category Header */}
      <span className="text-[10px] font-bold text-[#1F6E43] tracking-wider uppercase">
        TODAY&apos;S MOOD
      </span>

      {/* Mood Display */}
      <div className="flex items-center gap-3.5 my-1">
        <span className="text-4xl leading-none select-none">{emoji}</span>
        <div className="space-y-0.5">
          <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight">
            {label}
          </h3>
          <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          onClick={onLogAgain}
          className="px-4 py-2 bg-white rounded-full text-xs font-bold text-[#1F6E43] hover:bg-slate-50 transition-colors shadow-2xs"
        >
          Log again
        </button>

        <Link
          href="/dashboard/journal"
          className="text-xs font-bold text-[#1F6E43] hover:underline transition-all flex items-center gap-1"
        >
          <span>Write about it</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
