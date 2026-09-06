import {
  DayMoodSummary,
  MoodTrendPoint,
  QuickExercise,
} from "../types/dashboard";

export const MOCK_WEEKLY_MOODS: DayMoodSummary[] = [
  { day: "T", emoji: "😔", moodScore: 2 },
  { day: "W", emoji: "😊", moodScore: 4 },
  { day: "T", emoji: "✨", moodScore: 5 },
  { day: "F", emoji: "😐", moodScore: 3 },
  { day: "S", emoji: "😊", moodScore: 4 },
  { day: "S", emoji: "😊", moodScore: 4 },
  { day: "M", emoji: "😊", moodScore: 4 },
];

export const MOCK_MOOD_TREND: MoodTrendPoint[] = [
  { date: "4 Aug", score: 2.3 },
  { date: "5 Aug", score: 3.2 },
  { date: "6 Aug", score: 3.2 },
  { date: "7 Aug", score: 4.1 },
  { date: "8 Aug", score: 3.5 },
  { date: "9 Aug", score: 3.5 },
  { date: "10 Aug", score: 2.8 },
  { date: "11 Aug", score: 3.4 },
  { date: "12 Aug", score: 4.2 },
  { date: "13 Aug", score: 3.5 },
  { date: "14 Aug", score: 3.5 },
  { date: "15 Aug", score: 2.6 },
  { date: "16 Aug", score: 3.3 },
];

export const MOCK_QUICK_EXERCISE: QuickExercise = {
  id: "ex-1",
  category: "BREATHING",
  duration: "3 min",
  title: "4-7-8 Breathing Technique",
  subtitle:
    "Inhale for 4 counts, hold for 7, exhale slowly for 8. This activates your parasympathetic nervous system.",
  iconBg: "bg-indigo-500",
};
