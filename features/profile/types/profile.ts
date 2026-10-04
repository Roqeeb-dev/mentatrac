import type { Gender, OnboardingGoal } from "@/types/api";
import type { OnboardingStepSlug } from "@/lib/onboarding/step-order";

// ---- Backend shape: GET /api/v1/profile ----
export interface ProfilePreferences {
  theme?: string;
  dailyMoodReminder?: boolean;
  journalReminder?: boolean;
  streakAlerts?: boolean;
  reminderTime?: string;
  /** Old single flag. Remove once Swagger confirms it's gone. */
  notificationsEnabled?: boolean;
}

export interface Profile {
  bio?: string | null;
  avatarUrl?: string | null;
  streakCount?: number;
  lastCheckInAt?: string | null;
  wellnessScore?: number;
  age?: number;
  gender?: Gender;
  goals?: OnboardingGoal[];
  reminderEnabled?: boolean;
  reminderTime?: string;
  onboardingStep?: OnboardingStepSlug;
  onboardingCompleted?: boolean;
  preferences?: ProfilePreferences;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileResponse {
  id: string;
  email: string;
  name: string;
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
