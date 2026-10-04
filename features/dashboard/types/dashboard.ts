import type { LucideIcon } from "lucide-react";
import { MoodScore } from "@/features/check-in/types/checkIn";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
}

export interface UserProfileData {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface TodayMoodData {
  emoji: string;
  label: string;
  streakDays: number;
}

export interface DayMoodSummary {
  day: string;
  emoji: string | null;
  moodScore: MoodScore | null;
}

export interface MoodTrendPoint {
  date: string;
  score: number;
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
  avatarUrl?: string;
}

export interface TodayMoodData {
  emoji: string;
  label: string;
  streakDays: number;
}
