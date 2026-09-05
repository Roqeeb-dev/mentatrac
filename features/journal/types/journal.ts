import { MoodScore } from "@/features/check-in/types/checkIn";

export type MoodLabel = "Radiant" | "Good" | "Okay" | "Tough" | "Hard";

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  emoji?: string;
  moodTag?: MoodLabel;
  moodScore?: MoodScore;
  createdAt: string;
  updatedAt: string;
}

export type JournalFilter = "All" | MoodLabel;

export interface JournalStats {
  totalEntries: number;
  dayStreak: number;
  totalWords: number;
}

export type CreateJournalInput = Omit<
  JournalEntry,
  "id" | "createdAt" | "updatedAt"
>;
export type UpdateJournalInput = Partial<CreateJournalInput>;
