import { JournalFilter, MoodLabel } from "../types/journal";

export const FILTER_OPTIONS: { label: JournalFilter; emoji?: string }[] = [
  { label: "All" },
  { label: "Radiant", emoji: "✨" },
  { label: "Good", emoji: "😊" },
  { label: "Okay", emoji: "😐" },
  { label: "Tough", emoji: "😔" },
  { label: "Hard", emoji: "😫" },
];

export const MOOD_TAG_STYLES: Record<MoodLabel, string> = {
  Radiant: "bg-amber-50 text-amber-600 border-amber-200/60",
  Good: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  Okay: "bg-amber-50/80 text-amber-700 border-amber-200/60",
  Tough: "bg-purple-50 text-purple-600 border-purple-200/60",
  Hard: "bg-rose-50 text-rose-600 border-rose-200/60",
};
