"use client";

import { Search, Plus } from "lucide-react";
import {
  JournalEntry,
  JournalFilter,
  JournalStats,
  MoodLabel,
} from "../types/journal";

interface JournalSidebarProps {
  entries: JournalEntry[];
  selectedId: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: JournalFilter;
  onFilterChange: (filter: JournalFilter) => void;
  onSelectEntry: (id: string) => void;
  onStartNewEntry: () => void;
  stats: JournalStats;
}

const FILTER_OPTIONS: { label: JournalFilter; emoji?: string }[] = [
  { label: "All" },
  { label: "Radiant", emoji: "✨" },
  { label: "Good", emoji: "😊" },
  { label: "Okay", emoji: "😐" },
  { label: "Tough", emoji: "😔" },
  { label: "Hard", emoji: "😫" },
];

const MOOD_TAG_STYLES: Record<MoodLabel, string> = {
  Radiant: "bg-amber-50 text-amber-600 border-amber-200/60",
  Good: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  Okay: "bg-amber-50/80 text-amber-700 border-amber-200/60",
  Tough: "bg-purple-50 text-purple-600 border-purple-200/60",
  Hard: "bg-rose-50 text-rose-600 border-rose-200/60",
};

export function JournalSidebar({
  entries,
  selectedId,
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  onSelectEntry,
  onStartNewEntry,
  stats,
}: JournalSidebarProps) {
  return (
    <aside className="w-[320px] flex-shrink-0 border-r border-slate-100 bg-[#FAFAFC] flex flex-col h-full">
      {/* Top Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-100/80">
        <h1 className="text-xl font-bold font-serif text-slate-900">Journal</h1>
        <button
          onClick={onStartNewEntry}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 text-white rounded-full text-xs font-semibold hover:bg-violet-700 transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New entry</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="p-4 space-y-3 border-b border-slate-100/80">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search entries..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200/80 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500"
          />
        </div>

        {/* Filter Pills */}
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
                {filter.emoji && (
                  <span className="text-xs">{filter.emoji}</span>
                )}
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable Entry Cards */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {entries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-slate-400 font-medium">
              No entries found
            </p>
          </div>
        ) : (
          entries.map((entry) => {
            const isSelected = selectedId === entry.id;
            return (
              <button
                key={entry.id}
                onClick={() => onSelectEntry(entry.id)}
                className={`w-full text-left p-3.5 rounded-xl transition-all border ${
                  isSelected
                    ? "bg-white border-slate-200 shadow-xs ring-1 ring-slate-200"
                    : "border-transparent hover:bg-white/60"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-xs font-bold text-slate-900 truncate">
                    {entry.title}
                  </h3>
                  {entry.emoji && (
                    <span className="text-xs flex-shrink-0">{entry.emoji}</span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-2.5">
                  {entry.content}
                </p>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">
                    {new Date(entry.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    }) ===
                    new Date().toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })
                      ? "Today"
                      : "Yesterday"}
                  </span>

                  {entry.moodTag && (
                    <span
                      className={`px-2 py-0.5 rounded-full border text-[9px] font-semibold ${
                        MOOD_TAG_STYLES[entry.moodTag]
                      }`}
                    >
                      {entry.moodTag}
                    </span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Stats Footer */}
      <div className="p-4 border-t border-slate-100 bg-white grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-sm font-bold text-slate-900">
            {stats.totalEntries}
          </p>
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
    </aside>
  );
}
