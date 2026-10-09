"use client";

import { Trash2 } from "lucide-react";
import { JournalEntry } from "../../types/journal";
import { MOOD_TAG_STYLES } from "../../lib/journalConstants";
import { formatEntryDate } from "../../lib/journalUtils";

interface JournalEntryCardProps {
  entry: JournalEntry;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (entry: JournalEntry) => void;
}

export function JournalEntryCard({
  entry,
  isSelected,
  onSelect,
  onDelete,
}: JournalEntryCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 ${
        isSelected
          ? "border-[#5B4DFB]/30 bg-white shadow-md shadow-indigo-100 ring-1 ring-[#5B4DFB]/20"
          : "border-slate-200/80 bg-white shadow-sm hover:-translate-y-px hover:border-slate-300 hover:shadow-md"
      }`}
    >
      {/* Accent bar on the selected card */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-y-3 left-0 w-1 rounded-r-full bg-[#5B4DFB] transition-opacity duration-200 ${
          isSelected ? "opacity-100" : "opacity-0"
        }`}
      />

      <button
        type="button"
        onClick={() => onSelect(entry.id)}
        aria-pressed={isSelected}
        className="w-full rounded-2xl p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4DFB]/40"
      >
        <h3 className="mb-1 truncate pr-8 text-sm font-bold text-slate-900">
          {entry.title}
        </h3>

        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-slate-500">
          {entry.content}
        </p>

        <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px]">
          <span className="font-medium text-slate-400">
            {formatEntryDate(entry.createdAt)}
          </span>

          {entry.moodTag && (
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${MOOD_TAG_STYLES[entry.moodTag]}`}
            >
              {entry.moodTag}
            </span>
          )}
        </div>
      </button>

      {/* Always visible on mobile, revealed on hover/focus on desktop */}
      <button
        type="button"
        onClick={() => onDelete(entry)}
        aria-label={`Delete "${entry.title}"`}
        className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-300 transition-all hover:bg-rose-50 hover:text-rose-500 focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-rose-300 md:opacity-0 md:group-hover:opacity-100"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
