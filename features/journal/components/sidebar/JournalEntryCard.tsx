"use client";

import { JournalEntry } from "../../types/journal";
import { MOOD_TAG_STYLES } from "../../lib/journalConstants";
import { formatEntryDate } from "../../lib/journalUtils";

interface JournalEntryCardProps {
  entry: JournalEntry;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function JournalEntryCard({
  entry,
  isSelected,
  onSelect,
}: JournalEntryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(entry.id)}
      aria-pressed={isSelected}
      className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4DFB]/40 ${
        isSelected
          ? "border-[#5B4DFB]/30 bg-white shadow-md shadow-indigo-100 ring-1 ring-[#5B4DFB]/20"
          : "border-slate-200/80 bg-white shadow-sm hover:-translate-y-px hover:border-slate-300 hover:shadow-md"
      }`}
    >
      {/* Accent bar on the selected card */}
      <span
        aria-hidden
        className={`absolute inset-y-3 left-0 w-1 rounded-r-full bg-[#5B4DFB] transition-opacity duration-200 ${
          isSelected ? "opacity-100" : "opacity-0"
        }`}
      />

      <h3 className="mb-1 truncate text-sm font-bold text-slate-900">
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
  );
}
