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
      onClick={() => onSelect(entry.id)}
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
          {formatEntryDate(entry.createdAt)}
        </span>

        {entry.moodTag && (
          <span
            className={`px-2 py-0.5 rounded-full border text-[9px] font-semibold ${MOOD_TAG_STYLES[entry.moodTag]}`}
          >
            {entry.moodTag}
          </span>
        )}
      </div>
    </button>
  );
}
