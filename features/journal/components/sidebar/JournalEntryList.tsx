"use client";

import { useState } from "react";
import { JournalEntry } from "../../types/journal";
import { JournalEntryCard } from "./JournalEntryCard";
import { ConfirmDeleteModal } from "../ConfirmDeleteModal";

interface JournalEntryListProps {
  entries: JournalEntry[];
  selectedId: string | null;
  onSelectEntry: (id: string) => void;
  onDeleteEntry: (id: string, onDone?: () => void) => void;
  isDeleting?: boolean;
}

export function JournalEntryList({
  entries,
  selectedId,
  onSelectEntry,
  onDeleteEntry,
  isDeleting = false,
}: JournalEntryListProps) {
  const [pendingDelete, setPendingDelete] = useState<JournalEntry | null>(null);

  const handleConfirm = () => {
    if (!pendingDelete) return;
    onDeleteEntry(pendingDelete.id, () => setPendingDelete(null));
  };

  return (
    <>
      {entries.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-xs font-medium text-slate-400">No entries found</p>
        </div>
      ) : (
        entries.map((entry) => (
          <JournalEntryCard
            key={entry.id}
            entry={entry}
            isSelected={selectedId === entry.id}
            onSelect={onSelectEntry}
            onDelete={setPendingDelete}
          />
        ))
      )}

      <ConfirmDeleteModal
        isOpen={pendingDelete !== null}
        title={pendingDelete?.title ?? ""}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleConfirm}
        loading={isDeleting}
      />
    </>
  );
}
