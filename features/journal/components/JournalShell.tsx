"use client";

import { useJournal } from "../hooks/useJournal";
import { JournalSidebar } from "./sidebar/JournalSidebar";
import { JournalEditor } from "./editor/JournalEditor";
import { JournalEmptyState } from "./JournalEmptyState";

export function JournalShell() {
  const journal = useJournal();

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <JournalSidebar
        entries={journal.entries}
        selectedId={journal.selectedId}
        searchQuery={journal.searchQuery}
        onSearchChange={journal.setSearchQuery}
        activeFilter={journal.activeFilter}
        onFilterChange={journal.setActiveFilter}
        onSelectEntry={journal.selectEntry}
        onStartNewEntry={journal.startNewEntry}
        stats={journal.stats}
      />

      <main className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
        {journal.selectedEntry || journal.isCreating ? (
          <JournalEditor
            entry={journal.selectedEntry}
            isCreating={journal.isCreating}
            onSave={journal.saveNewEntry}
            onUpdate={journal.updateEntry}
            onCancel={journal.exitEditor}
            onDelete={journal.deleteEntry}
          />
        ) : (
          <JournalEmptyState onStartNew={journal.startNewEntry} />
        )}
      </main>
    </div>
  );
}
