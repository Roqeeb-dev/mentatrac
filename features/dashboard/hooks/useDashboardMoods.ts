"use client";

import { useMemo } from "react";
import {
  useCheckIns,
  MOOD_META,
} from "@/features/check-in/hooks/useCheckInHistory";
import type {
  CheckInRecord,
  MoodScore,
} from "@/features/check-in/types/checkIn";
import type {
  DayMoodSummary,
  MoodTrendPoint,
} from "@/features/dashboard/types/dashboard";

const WEEKDAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];

const SUBTITLES: Record<MoodScore, string> = {
  5: "Feeling great",
  4: "Doing well",
  3: "Taking it easy",
  2: "Hang in there",
  1: "Be gentle with yourself",
};

function dayKey(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function latestOf(list: CheckInRecord[]) {
  return [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
}

export function useDashboardMoods() {
  const { data: records = [], isLoading } = useCheckIns();

  return useMemo(() => {
    const byDay = new Map<string, CheckInRecord[]>();
    for (const r of records) {
      const key = r.date.slice(0, 10);
      byDay.set(key, [...(byDay.get(key) ?? []), r]);
    }

    const today = new Date();
    const daysAgo = (n: number) => {
      const d = new Date(today);
      d.setDate(d.getDate() - n);
      return d;
    };

    // Today's mood card
    const todayList = byDay.get(dayKey(today));
    const todayRecord = todayList ? latestOf(todayList) : undefined;
    const todayMood = todayRecord
      ? {
          ...MOOD_META[todayRecord.mood],
          subtitle: SUBTITLES[todayRecord.mood],
        }
      : null;

    // Weekly strip: last 7 days, oldest first
    const week: DayMoodSummary[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = daysAgo(i);
      const list = byDay.get(dayKey(d));
      const rec = list ? latestOf(list) : undefined;
      week.push({
        day: WEEKDAY_INITIALS[d.getDay()],
        emoji: rec ? MOOD_META[rec.mood].emoji : null,
        moodScore: rec ? rec.mood : null,
      });
    }

    // 14-day trend: one point per day that has a check-in (average if several)
    const trend: MoodTrendPoint[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = daysAgo(i);
      const list = byDay.get(dayKey(d));
      if (!list) continue;
      const avg = list.reduce((sum, r) => sum + r.mood, 0) / list.length;
      trend.push({
        date: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
        score: Math.round(avg * 10) / 10,
      });
    }

    return { todayMood, week, trend, isLoading };
  }, [records, isLoading]);
}
