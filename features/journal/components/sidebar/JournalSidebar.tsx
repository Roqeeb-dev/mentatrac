"use client";

import { JournalEntry, JournalFilter, JournalStats } from "../../types/journal";
import { SidebarHeader } from "./SidebarHeader";
import { EntrySearchInput } from "./EntrySearchInput";
import { MoodFilterPills } from "./MoodFilterPills";
import { JournalEntryList } from "./JournalEntryList";
import { SidebarStats } from "./SidebarStats";

interface JournalSidebarProps {
  className?: string;
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

export function JournalSidebar({
  className = "flex flex-col",
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
    <aside
      className={`w-full md:w-[300px] flex-shrink-0 border-r border-slate-100 bg-[#FAFAFC] h-full ${className}`}
    >
      <SidebarHeader onStartNewEntry={onStartNewEntry} />

      <div className="p-2 space-y-2 border-b border-slate-100/80">
        <EntrySearchInput value={searchQuery} onChange={onSearchChange} />
        <MoodFilterPills
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <JournalEntryList
          entries={entries}
          selectedId={selectedId}
          onSelectEntry={onSelectEntry}
        />
      </div>

      <SidebarStats stats={stats} />
    </aside>
  );
}
