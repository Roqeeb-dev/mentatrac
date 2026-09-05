import { JournalEntry, JournalStats } from "../types/journal";

export const MOCK_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "entry-1",
    title: "Morning reflections",
    content:
      "Woke up feeling unusually clear-headed today. The morning light was soft and calming as I had my coffee.",
    emoji: "😊",
    moodTag: "Good",
    moodScore: 4,
    createdAt: "2026-08-19T08:30:00Z",
    updatedAt: "2026-08-19T08:30:00Z",
  },
  {
    id: "entry-2",
    title: "Processing a hard conversation",
    content:
      "Had a difficult talk with my manager today. It was uncomfortable, but necessary to set boundaries.",
    emoji: "😔",
    moodTag: "Tough",
    moodScore: 2,
    createdAt: "2026-08-18T17:15:00Z",
    updatedAt: "2026-08-18T17:15:00Z",
  },
  {
    id: "entry-3",
    title: "Small wins add up",
    content:
      "Completed three tasks I'd been avoiding all week. Crossed them off my list and felt an instant wave of relief.",
    emoji: "✨",
    moodTag: "Radiant",
    moodScore: 5,
    createdAt: "2026-08-17T14:00:00Z",
    updatedAt: "2026-08-17T14:00:00Z",
  },
  {
    id: "entry-4",
    title: "On overthinking",
    content:
      "Spent most of today inside my head. The spiral started around noon, but taking a walk helped ground me.",
    emoji: "😐",
    moodTag: "Okay",
    moodScore: 3,
    createdAt: "2026-08-15T19:45:00Z",
    updatedAt: "2026-08-15T19:45:00Z",
  },
  {
    id: "entry-5",
    title: "Gratitude list",
    content:
      "Morning pages: 1. The smell of rain on dry earth. 2. A friend who reached out out of nowhere. 3. Good food.",
    emoji: "✨",
    moodTag: "Radiant",
    moodScore: 5,
    createdAt: "2026-08-12T09:10:00Z",
    updatedAt: "2026-08-12T09:10:00Z",
  },
];

export const MOCK_JOURNAL_STATS: JournalStats = {
  totalEntries: 6,
  dayStreak: 12,
  totalWords: 1240,
};
