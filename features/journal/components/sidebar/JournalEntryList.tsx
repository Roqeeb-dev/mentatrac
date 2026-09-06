"use client";

import { JournalEntry } from "../../types/journal";
import { JournalEntryCard } from "./JournalEntryCard";

interface JournalEntryListProps {
  entries: JournalEntry[];
  selectedId: string | null;
  onSelectEntry: (id: string) => void;
}

export function JournalEntryList({
  entries,
  selectedId,
  onSelectEntry,
}: JournalEntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xs text-slate-400 font-medium">No entries found</p>
      </div>
    );
  }

  return (
    <>
      {entries.map((entry) => (
        <JournalEntryCard
          key={entry.id}
          entry={entry}
          isSelected={selectedId === entry.id}
          onSelect={onSelectEntry}
        />
      ))}
    </>
  );
}
