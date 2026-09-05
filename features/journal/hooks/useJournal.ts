"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  JournalEntry,
  JournalFilter,
  JournalStats,
  CreateJournalInput,
} from "../types/journal";
import { journalService } from "../services/journal.service";

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<JournalFilter>("All");
  const [isCreating, setIsCreating] = useState(false);
  const [stats, setStats] = useState<JournalStats>({
    totalEntries: 0,
    dayStreak: 0,
    totalWords: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load Initial Data
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedEntries, fetchedStats] = await Promise.all([
        journalService.fetchEntries(),
        journalService.fetchStats(),
      ]);
      setEntries(fetchedEntries);
      setStats(fetchedStats);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filtered entries list
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch =
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "All" || entry.moodTag === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [entries, searchQuery, activeFilter]);

  // Active selected entry
  const selectedEntry = useMemo(() => {
    return entries.find((e) => e.id === selectedId) || null;
  }, [entries, selectedId]);

  // Actions
  const handleSelectEntry = (id: string) => {
    setIsCreating(false);
    setSelectedId(id);
  };

  const handleStartNewEntry = () => {
    setSelectedId(null);
    setIsCreating(true);
  };

  const handleSaveNewEntry = async (input: CreateJournalInput) => {
    const created = await journalService.createEntry(input);
    await loadData();
    setIsCreating(false);
    setSelectedId(created.id);
  };

  const handleUpdateEntry = async (
    id: string,
    updates: Partial<CreateJournalInput>,
  ) => {
    await journalService.updateEntry(id, updates);
    await loadData();
  };

  const handleDeleteEntry = async (id: string) => {
    await journalService.deleteEntry(id);
    if (selectedId === id) setSelectedId(null);
    await loadData();
  };

  return {
    entries: filteredEntries,
    selectedEntry,
    selectedId,
    stats,
    isLoading,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    isCreating,
    selectEntry: handleSelectEntry,
    startNewEntry: handleStartNewEntry,
    saveNewEntry: handleSaveNewEntry,
    updateEntry: handleUpdateEntry,
    deleteEntry: handleDeleteEntry,
  };
}
