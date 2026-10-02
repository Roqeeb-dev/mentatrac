import { ApiJournalEntry, journalApi } from "../api/journalApi";
import {
  CreateJournalInput,
  JournalEntry,
  JournalStats,
  MoodLabel,
  UpdateJournalInput,
} from "../types/journal";

const MOOD_TO_API: Record<MoodLabel, string> = {
  Radiant: "FIVE",
  Good: "FOUR",
  Okay: "THREE",
  Tough: "TWO",
  Hard: "ONE",
};

const API_TO_MOOD: Record<string, MoodLabel> = {
  FIVE: "Radiant",
  FOUR: "Good",
  THREE: "Okay",
  TWO: "Tough",
  ONE: "Hard",
};

function fromApiEntry(entry: ApiJournalEntry): JournalEntry {
  return {
    id: entry.id,
    userId: entry.userId,
    title: entry.title,
    content: entry.content,
    moodTag: API_TO_MOOD[entry.mood],
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
  };
}

export const journalService = {
  async getEntries(): Promise<JournalEntry[]> {
    const data = await journalApi.list();
    return data.map(fromApiEntry);
  },

  async createEntry(input: CreateJournalInput): Promise<JournalEntry> {
    const entry = await journalApi.create({
      title: input.title,
      content: input.content,
      mood: input.moodTag ? MOOD_TO_API[input.moodTag] : undefined,
    });
    return fromApiEntry(entry);
  },

  async updateEntry(
    id: string,
    input: UpdateJournalInput,
  ): Promise<JournalEntry> {
    const entry = await journalApi.update(id, {
      title: input.title,
      content: input.content,
      mood: input.moodTag ? MOOD_TO_API[input.moodTag] : undefined,
    });
    return fromApiEntry(entry);
  },

  async deleteEntry(id: string): Promise<void> {
    await journalApi.remove(id);
  },

  /**
   * totalEntries/totalWords are derived from the real entries list.
   * dayStreak has no backend source yet — held at 0 until that's answered
   * (see journal-api-changes.md, item 5).
   */
  async getStats(): Promise<JournalStats> {
    const entries = await this.getEntries();
    const totalWords = entries.reduce((sum, entry) => {
      return sum + entry.content.trim().split(/\s+/).filter(Boolean).length;
    }, 0);

    return {
      totalEntries: entries.length,
      dayStreak: 0, // TODO: wire up once backend confirms journal streak tracking
      totalWords,
    };
  },
};
