import type { Gender } from "@/types/api";

export interface ProfilePreferences {
  theme?: string;
  dailyMoodReminder?: boolean;
  journalReminder?: boolean;
  streakAlerts?: boolean;
  reminderTime?: string;
}

export interface Profile {
  bio?: string | null;
  avatarUrl?: string | null;
  age?: number | null;
  gender?: Gender | string | null;
  goals?: string[];
  streakCount?: number;
  lastCheckInAt?: string | null;
  dayStreak?: number;
  lastJournalAt?: string | null;
  wellnessScore?: number;
  reminderEnabled?: boolean;
  reminderTime?: string;
  onboardingStep?: number;
  onboardingCompleted?: boolean;
  preferences?: ProfilePreferences;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileResponse {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
  profile?: Profile | null;
}

// ---- View model used by the profile components ----
export interface NotificationSettings {
  dailyMoodReminder: boolean;
  journalReminder: boolean;
  streakAlerts: boolean;
  reminderTime: string;
}

export interface PrivacySettings {
  appLock: boolean; // design-only, never sent to the backend
}

export interface MoodBreakdownItem {
  moodLabel: string;
  count: number;
  colorHex: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string | null;
  memberSince?: string;
  wellnessScore: number;
  totalCheckIns: number;
  currentStreakDays: number;
  totalJournalEntries: number;
  positiveDaysThisMonth: number;
  moodBreakdown: MoodBreakdownItem[];
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface UpdateProfileSettingsPayload {
  fullName?: string;
  notifications?: Partial<NotificationSettings>;
  // No privacy here: app lock stays local component state.
}
