import { JournalEntry, JournalStats } from "../types/journal";

export const MOCK_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "entry-1",
    userId: "id-1234-67hF",
    title: "Morning reflections",
    content:
      "Woke up feeling unusually clear-headed today. The morning light was soft and calming as I had my coffee.",
    moodTag: "Good",
    createdAt: "2026-08-19T08:30:00Z",
    updatedAt: "2026-08-19T08:30:00Z",
  },
  {
    id: "entry-2",
    userId: "id-1234-67hF",
    title: "Processing a hard conversation",
    content:
      "Had a difficult talk with my manager today. It was uncomfortable, but necessary to set boundaries.",
    moodTag: "Tough",
    createdAt: "2026-08-18T17:15:00Z",
    updatedAt: "2026-08-18T17:15:00Z",
  },
  {
    id: "entry-3",
    userId: "id-1234-67hF",
    title: "Small wins add up",
    content:
      "Completed three tasks I'd been avoiding all week. Crossed them off my list and felt an instant wave of relief.",
    moodTag: "Radiant",
    createdAt: "2026-08-17T14:00:00Z",
    updatedAt: "2026-08-17T14:00:00Z",
  },
  {
    id: "entry-4",
    userId: "id-1234-67hF",
    title: "On overthinking",
    content:
      "Spent most of today inside my head. The spiral started around noon, but taking a walk helped ground me.",
    moodTag: "Okay",
    createdAt: "2026-08-15T19:45:00Z",
    updatedAt: "2026-08-15T19:45:00Z",
  },
  {
    id: "entry-5",
    userId: "id-1234-67hF",
    title: "Gratitude list",
    content:
      "Morning pages: 1. The smell of rain on dry earth. 2. A friend who reached out out of nowhere. 3. Good food.",
    moodTag: "Radiant",
    createdAt: "2026-08-12T09:10:00Z",
    updatedAt: "2026-08-12T09:10:00Z",
  },
];

export const MOCK_JOURNAL_STATS: JournalStats = {
  totalEntries: 6,
  dayStreak: 12,
  totalWords: 1240,
};
