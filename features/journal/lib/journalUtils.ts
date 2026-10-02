import { JournalEntry, JournalFilter, JournalStats } from "../types/journal";

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function sortEntriesByDateDesc(entries: JournalEntry[]): JournalEntry[] {
  return [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function filterEntries(
  entries: JournalEntry[],
  filter: JournalFilter,
  searchQuery: string,
): JournalEntry[] {
  const query = searchQuery.trim().toLowerCase();

  return entries.filter((entry) => {
    const matchesFilter = filter === "All" || entry.moodTag === filter;
    const matchesSearch =
      !query ||
      entry.title.toLowerCase().includes(query) ||
      entry.content.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });
}

export function calculateDayStreak(entries: JournalEntry[]): number {
  if (entries.length === 0) return 0;

  const entryDays = new Set(
    entries.map((entry) => new Date(entry.createdAt).toDateString()),
  );
  const cursor = new Date();

  if (!entryDays.has(cursor.toDateString())) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (entryDays.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function calculateJournalStats(entries: JournalEntry[]): JournalStats {
  return {
    totalEntries: entries.length,
    dayStreak: calculateDayStreak(entries),
    totalWords: entries.reduce(
      (sum, entry) => sum + countWords(entry.content),
      0,
    ),
  };
}

export function formatEntryDate(createdAt: string): string {
  const date = new Date(createdAt);
  const now = new Date();

  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round(
    (startOfDay(now).getTime() - startOfDay(date).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays > 1 && diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
