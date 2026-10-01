export type MoodLabel = "Radiant" | "Good" | "Okay" | "Tough" | "Hard";

export type JournalFilter = "All" | MoodLabel;

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  moodTag?: MoodLabel;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateJournalInput {
  title: string;
  content: string;
  moodTag?: MoodLabel;
}

export type UpdateJournalInput = Partial<CreateJournalInput>;

export interface JournalStats {
  totalEntries: number;
  dayStreak: number;
  totalWords: number;
}
