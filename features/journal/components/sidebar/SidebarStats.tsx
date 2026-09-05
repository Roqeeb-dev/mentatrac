"use client";

import { JournalStats } from "../../types/journal";

interface SidebarStatsProps {
  stats: JournalStats;
}

export function SidebarStats({ stats }: SidebarStatsProps) {
  return (
    <div className="p-4 border-t border-slate-100 bg-white grid grid-cols-3 gap-2 text-center">
      <div>
        <p className="text-sm font-bold text-slate-900">{stats.totalEntries}</p>
        <p className="text-[10px] text-slate-400 font-medium">entries</p>
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900">{stats.dayStreak}</p>
        <p className="text-[10px] text-slate-400 font-medium">day streak</p>
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900">
          {stats.totalWords.toLocaleString()}
        </p>
        <p className="text-[10px] text-slate-400 font-medium">words</p>
      </div>
    </div>
  );
}
