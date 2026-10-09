import { MOOD_META } from "@/features/check-in/hooks/useCheckInHistory";
import type {
  CheckInRecord,
  MoodScore,
} from "@/features/check-in/types/checkIn";
import type { ReportsData, TimeRange } from "../types/reports";

const RANGE_DAYS: Record<TimeRange, number> = { "7D": 7, "30D": 30, "90D": 90 };

const MOOD_COLORS: Record<MoodScore, string> = {
  5: "#F97316",
  4: "#10B981",
  3: "#3B82F6",
  2: "#8B5CF6",
  1: "#EF4444",
};

const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

const avg = (nums: number[]) =>
  nums.reduce((s, n) => s + n, 0) / (nums.length || 1);

function groupByDay(records: CheckInRecord[]) {
  const map = new Map<string, CheckInRecord[]>();
  for (const r of records) {
    const key = r.date.slice(0, 10);
    map.set(key, [...(map.get(key) ?? []), r]);
  }
  return map;
}

function countBy(items: string[]) {
  const map = new Map<string, number>();
  for (const i of items) map.set(i, (map.get(i) ?? 0) + 1);
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function buildReports(
  allRecords: CheckInRecord[],
  journalEntries: { createdAt: string }[],
  timeRange: TimeRange,
): ReportsData {
  const span = RANGE_DAYS[timeRange];
  const start = dayKey(daysAgo(span - 1));
  const prevStart = dayKey(daysAgo(span * 2 - 1));
  const prevEnd = dayKey(daysAgo(span));

  const inRange = allRecords.filter((r) => r.date.slice(0, 10) >= start);
  const byDay = groupByDay(inRange);
  const dayKeys = [...byDay.keys()].sort();

  // Avg mood
  const avgScore = inRange.length ? avg(inRange.map((r) => r.mood)) : 0;
  const avgMeta = inRange.length
    ? MOOD_META[Math.min(5, Math.max(1, Math.round(avgScore))) as MoodScore]
    : { label: "No data", emoji: "–" };

  // Positive streak (days in a row with a Good or better day, ending today or yesterday)
  const allByDay = groupByDay(allRecords);
  const isPositive = (key: string) => {
    const list = allByDay.get(key);
    return !!list && avg(list.map((r) => r.mood)) >= 4;
  };
  const cursor = new Date();
  if (!isPositive(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (isPositive(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Change = positive days this range minus positive days in the previous range
  const positiveDays = (from: string, to: string) =>
    [...allByDay.keys()].filter((k) => k >= from && k <= to && isPositive(k))
      .length;
  const diff =
    positiveDays(start, dayKey(new Date())) - positiveDays(prevStart, prevEnd);

  const journalInRange = journalEntries.filter(
    (e) => dayKey(new Date(e.createdAt)) >= start,
  ).length;

  // Trend: one averaged point per day with a check-in
  const moodTrend = dayKeys.map((key) => ({
    date: new Date(`${key}T00:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    }),
    score: Math.round(avg(byDay.get(key)!.map((r) => r.mood)) * 10) / 10,
  }));

  // Distribution
  const moodDistribution = ([5, 4, 3, 2, 1] as MoodScore[])
    .map((score) => ({
      label: MOOD_META[score].label,
      percentage: Math.round(
        (inRange.filter((r) => r.mood === score).length /
          (inRange.length || 1)) *
          100,
      ),
      color: MOOD_COLORS[score],
    }))
    .filter((item) => item.percentage > 0) as ReportsData["moodDistribution"];

  // Emotions and triggers
  const mostFeltEmotions = countBy(inRange.flatMap((r) => r.emotions))
    .slice(0, 10)
    .map((e) => ({ id: e.name, ...e }));
  const topTriggers = countBy(inRange.flatMap((r) => r.influencers)).slice(
    0,
    5,
  );

  // Calendar: latest check-in of each day
  const moodCalendar = dayKeys.map((key) => {
    const latest = [...byDay.get(key)!].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    )[0];
    const meta = MOOD_META[latest.mood];
    return {
      date: key,
      emoji: meta.emoji,
      type: meta.label as ReportsData["moodCalendar"][number]["type"],
    };
  });

  return {
    timeRange,
    metrics: {
      avgMood: { label: avgMeta.label, emoji: avgMeta.emoji },
      positiveStreak: {
        days: streak,
        change: `${diff > 0 ? "+" : ""}${diff}`,
      },
      checkIns: { count: inRange.length, label: "logged" },
      journalEntries: { count: journalInRange, label: "written" },
    },
    moodTrend,
    moodDistribution,
    mostFeltEmotions,
    topTriggers,
    moodCalendar,
  };
}
