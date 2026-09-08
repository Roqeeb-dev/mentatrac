"use client";

import { useJournal } from "../hooks/useJournal";
import { JournalSidebar } from "./sidebar/JournalSidebar";
import { JournalEditor } from "./editor/JournalEditor";
import { JournalEmptyState } from "./JournalEmptyState";

export function JournalShell() {
  const journal = useJournal();

  // On mobile, only one pane is visible at a time. Selecting or creating
  // an entry switches the view to the editor; cancelling/deleting switches
  // back to the list. On md+ screens both panes stay visible side by side.
  const isEditorActive = !!journal.selectedEntry || journal.isCreating;

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <JournalSidebar
        className={
          isEditorActive ? "hidden md:flex md:flex-col" : "flex flex-col"
        }
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

      <main
        className={`${
          isEditorActive ? "flex flex-col" : "hidden md:flex md:flex-col"
        } flex-1 h-full bg-white overflow-y-auto`}
      >
        {isEditorActive ? (
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
