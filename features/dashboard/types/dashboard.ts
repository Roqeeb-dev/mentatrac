import { LucideIcon } from "lucide-react";

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
