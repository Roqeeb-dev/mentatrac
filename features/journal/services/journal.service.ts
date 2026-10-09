import {
  ApiJournalEntry,
  ApiJournalUpdateBody,
  journalApi,
} from "../api/journalApi";
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
    moodTag: entry.mood ? API_TO_MOOD[entry.mood] : undefined,
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
      ...(input.moodTag && { mood: MOOD_TO_API[input.moodTag] }),
    });
    return fromApiEntry(entry);
  },

  async updateEntry(
    id: string,
    input: UpdateJournalInput,
  ): Promise<JournalEntry> {
    const body: ApiJournalUpdateBody = {};
    if (input.title !== undefined) body.title = input.title;
    if (input.content !== undefined) body.content = input.content;
    if (input.moodTag) body.mood = MOOD_TO_API[input.moodTag];

    const entry = await journalApi.update(id, body);
    return fromApiEntry(entry);
  },

  async deleteEntry(id: string): Promise<void> {
    await journalApi.remove(id);
  },

  async getStats(): Promise<JournalStats> {
    const entries = await this.getEntries();
    const totalWords = entries.reduce((sum, entry) => {
      return sum + entry.content.trim().split(/\s+/).filter(Boolean).length;
    }, 0);

    return {
      totalEntries: entries.length,
      dayStreak: 0,
      totalWords,
    };
  },
};
