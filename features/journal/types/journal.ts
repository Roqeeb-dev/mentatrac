export type MoodLabel = "Radiant" | "Good" | "Okay" | "Tough" | "Hard";

export type JournalFilter = "All" | MoodLabel;

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  emoji?: string;
  moodTag?: MoodLabel;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateJournalInput {
  title: string;
  content: string;
  emoji?: string;
}

export type UpdateJournalInput = Partial<CreateJournalInput>;

export interface JournalStats {
  totalEntries: number;
  dayStreak: number;
  totalWords: number;
}
