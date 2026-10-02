"use client";

import { useQuery } from "@tanstack/react-query";
import { checkInService } from "../services/checkIn.service";
import type { CheckInRecord, MoodScore } from "../types/checkIn";
import type { TodayMoodData } from "@/features/dashboard/types/dashboard";

export const CHECK_INS_QUERY_KEY = ["check-ins"] as const;

const MOOD_META: Record<MoodScore, { emoji: string; label: string }> = {
  5: { emoji: "✨", label: "Radiant" },
  4: { emoji: "😊", label: "Good" },
  3: { emoji: "😐", label: "Okay" },
  2: { emoji: "😔", label: "Tough" },
  1: { emoji: "😞", label: "Hard" },
};

function toDayKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function calcStreak(records: CheckInRecord[]) {
  const days = new Set(records.map((r) => r.date.slice(0, 10)));
  const cursor = new Date();

  // No check-in yet today? The streak is still alive if yesterday has one.
  if (!days.has(toDayKey(cursor))) cursor.setDate(cursor.getDate() - 1);

  let streak = 0;
  while (days.has(toDayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function useCheckIns() {
  return useQuery<CheckInRecord[]>({
    queryKey: CHECK_INS_QUERY_KEY,
    queryFn: () => checkInService.getCheckIns(),
    staleTime: 60 * 1000,
  });
}

export function useTodayMood() {
  const { data: records = [], isLoading } = useCheckIns();

  const todayKey = toDayKey(new Date());
  const latestToday = records
    .filter((r) => r.date.slice(0, 10) === todayKey)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];

  const streakDays = calcStreak(records);

  const mood: TodayMoodData | null = latestToday
    ? { ...MOOD_META[latestToday.mood], streakDays }
    : null;

  return {
    mood,
    streakDays,
    totalCheckIns: records.length,
    isLoading,
  };
}
