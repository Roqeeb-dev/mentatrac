import type { LucideIcon } from "lucide-react";
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

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: number | string;
}

export interface UserProfileData {
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export interface TodayMoodData {
  emoji: string;
  label: string;
  streakDays: number;
}
