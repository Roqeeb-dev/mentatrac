import { useMemo } from "react";
import { useJournalEntries } from "./useJournalEntries";
import { useJournalMutations } from "./useJournalMutations";
import { useJournalUiStore } from "@/stores/useJournalUiStore";
import {
  calculateJournalStats,
  filterEntries,
  sortEntriesByDateDesc,
} from "../lib/journalUtils";
import { CreateJournalInput, UpdateJournalInput } from "../types/journal";

export function useJournal() {
  const { data: rawEntries = [], isLoading, isError } = useJournalEntries();
  const { createEntry, updateEntry, deleteEntry } = useJournalMutations();

  const {
    searchQuery,
    activeFilter,
    selectedId,
    isCreating,
    setSearchQuery,
    setActiveFilter,
    selectEntry,
    startNewEntry,
    exitEditor,
  } = useJournalUiStore();

  const sortedEntries = useMemo(
    () => sortEntriesByDateDesc(rawEntries),
    [rawEntries],
  );

  const entries = useMemo(
    () => filterEntries(sortedEntries, activeFilter, searchQuery),
    [sortedEntries, activeFilter, searchQuery],
  );

  const stats = useMemo(() => calculateJournalStats(rawEntries), [rawEntries]);

  const selectedEntry = useMemo(
    () => sortedEntries.find((entry) => entry.id === selectedId) ?? null,
    [sortedEntries, selectedId],
  );

  const saveNewEntry = (input: CreateJournalInput) => {
    createEntry.mutate(input, {
      onSuccess: (created) => selectEntry(created.id),
    });
  };

  const updateExistingEntry = (id: string, updates: UpdateJournalInput) => {
    updateEntry.mutate({ id, updates });
  };

  const removeEntry = (id: string) => {
    deleteEntry.mutate(id, { onSuccess: exitEditor });
  };

  return {
    entries,
    selectedId,
    selectedEntry,
    isCreating,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    selectEntry,
    startNewEntry,
    exitEditor,
    stats,
    isLoading,
    isError,
    saveNewEntry,
    updateEntry: updateExistingEntry,
    deleteEntry: removeEntry,
  };
}
