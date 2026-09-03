import { apiClient } from "@/lib/api/client";
import type {
  ServerUserProfileResponse,
  UserProfile,
  UpdateProfileSettingsPayload,
} from "../types/profile";

export function normalizeUserProfile(
  raw: ServerUserProfileResponse,
): UserProfile {
  return {
    id: raw.id,
    fullName: raw.full_name,
    email: raw.email,
    avatarUrl: raw.avatar_url,
    memberSince: raw.member_since,
    wellnessScore: raw.wellness_score,
    totalCheckIns: raw.total_check_ins,
    currentStreakDays: raw.current_streak_days,
    totalJournalEntries: raw.total_journal_entries,
    moodBreakdown: (raw.mood_breakdown || []).map((item) => ({
      moodLabel: item.mood_label,
      count: item.count,
      colorHex: item.color_hex,
    })),
    notifications: {
      dailyMoodReminder: raw.notifications?.daily_mood_reminder ?? false,
      journalReminder: raw.notifications?.journal_reminder ?? false,
      streakAlerts: raw.notifications?.streak_alerts ?? false,
      reminderTime: raw.notifications?.reminder_time ?? "09:00",
    },
    privacy: {
      appLock: raw.privacy?.app_lock ?? false,
    },
  };
}

export const profileService = {
  async getUserProfile(): Promise<UserProfile> {
    const response =
      await apiClient.get<ServerUserProfileResponse>("/user/profile");
    return normalizeUserProfile(response);
  },

  async updateProfileSettings(
    payload: UpdateProfileSettingsPayload,
  ): Promise<UserProfile> {
    const response = await apiClient.patch<ServerUserProfileResponse>(
      "/user/profile",
      payload,
    );
    return normalizeUserProfile(response);
  },
};
