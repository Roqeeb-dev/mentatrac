"use client";

import { FILTER_OPTIONS } from "../../lib/journalConstants";
import { JournalFilter } from "../../types/journal";

interface MoodFilterPillsProps {
  activeFilter: JournalFilter;
  onFilterChange: (filter: JournalFilter) => void;
}

export function MoodFilterPills({
  activeFilter,
  onFilterChange,
}: MoodFilterPillsProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
      {FILTER_OPTIONS.map((filter) => {
        const isActive = activeFilter === filter.label;
        return (
          <button
            key={filter.label}
            onClick={() => onFilterChange(filter.label)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
              isActive
                ? "bg-violet-600 text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200/60 hover:bg-slate-50"
            }`}
          >
            {filter.emoji && <span className="text-xs">{filter.emoji}</span>}
            <span>{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}
