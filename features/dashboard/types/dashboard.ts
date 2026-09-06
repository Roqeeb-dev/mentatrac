import { MoodScore } from "@/features/check-in/types/checkIn";

export interface DayMoodSummary {
  day: string; // "T", "W", "T", "F", "S", "S", "M"
  emoji: string;
  moodScore: MoodScore;
}

export interface MoodTrendPoint {
  date: string; // "4 Aug", "7 Aug", etc.
  score: number; // 1 to 5
}

export interface QuickExercise {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  iconBg: string;
}
