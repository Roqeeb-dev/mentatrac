import {
  JournalEntry,
  CreateJournalInput,
  UpdateJournalInput,
  JournalStats,
} from "../types/journal";
import { MOCK_JOURNAL_ENTRIES, MOCK_JOURNAL_STATS } from "../data/mockJournal";

// LocalStorage key for client-side persistence
const STORAGE_KEY = "mentatrac_journal_entries";

class JournalService {
  private getStoredEntries(): JournalEntry[] {
    if (typeof window === "undefined") return MOCK_JOURNAL_ENTRIES;
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : MOCK_JOURNAL_ENTRIES;
  }

  private saveStoredEntries(entries: JournalEntry[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }
  }

  async fetchEntries(): Promise<JournalEntry[]> {
    return this.getStoredEntries();
  }

  async createEntry(input: CreateJournalInput): Promise<JournalEntry> {
    const entries = this.getStoredEntries();
    const newEntry: JournalEntry = {
      ...input,
      id: `entry-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newEntry, ...entries];
    this.saveStoredEntries(updated);
    return newEntry;
  }

  async updateEntry(
    id: string,
    input: UpdateJournalInput,
  ): Promise<JournalEntry> {
    const entries = this.getStoredEntries();
    const index = entries.findIndex((e) => e.id === id);
    if (index === -1) throw new Error("Entry not found");

    const updatedEntry: JournalEntry = {
      ...entries[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    entries[index] = updatedEntry;
    this.saveStoredEntries(entries);
    return updatedEntry;
  }

  async deleteEntry(id: string): Promise<void> {
    const entries = this.getStoredEntries();
    const filtered = entries.filter((e) => e.id !== id);
    this.saveStoredEntries(filtered);
  }

  async fetchStats(): Promise<JournalStats> {
    const entries = this.getStoredEntries();
    const totalWords = entries.reduce((acc, curr) => {
      const words = curr.content.trim().split(/\s+/).filter(Boolean).length;
      return acc + words;
    }, 0);

    return {
      totalEntries: entries.length,
      dayStreak: MOCK_JOURNAL_STATS.dayStreak,
      totalWords,
    };
  }
}

export const journalService = new JournalService();
