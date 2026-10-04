import { apiClient } from "@/lib/api/client";
import { checkInService } from "@/features/check-in/services/checkIn.service";
import { MOOD_META } from "@/features/check-in/hooks/useCheckInHistory";
import type { MoodScore } from "@/features/check-in/types/checkIn";
import type {
  UserProfile,
  UpdateProfileSettingsPayload,
} from "../types/profile";

interface ApiProfileResponse {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  profile?: {
    bio?: string | null;
    avatarUrl?: string | null;
    streakCount?: number;
    lastCheckInAt?: string | null;
    preferences?: {
      theme?: string;
      notificationsEnabled?: boolean;
    };
  } | null;
}

const MOOD_COLORS: Record<MoodScore, string> = {
  5: "#f97316",
  4: "#10b981",
  3: "#3b82f6",
  2: "#8b5cf6",
  1: "#ef4444",
};
const MOOD_ORDER: MoodScore[] = [5, 4, 3, 2, 1];

export const profileService = {
  async getUserProfile(): Promise<UserProfile> {
    const [raw, records] = await Promise.all([
      apiClient.get<ApiProfileResponse>("/profile"),
      checkInService.getCheckIns(),
    ]);

    const average = records.length
      ? records.reduce((sum, r) => sum + r.mood, 0) / records.length
      : 0;

    return {
      id: raw.id,
      fullName: raw.name,
      email: raw.email,
      avatarUrl: raw.profile?.avatarUrl ?? null,
      memberSince: new Date(raw.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      wellnessScore: Math.round((average / 5) * 100),
      totalCheckIns: records.length,
      currentStreakDays: raw.profile?.streakCount ?? 0,
      totalJournalEntries: 0, // no journal service yet
      moodBreakdown: MOOD_ORDER.map((score) => ({
        moodLabel: MOOD_META[score].emoji,
        count: records.filter((r) => r.mood === score).length,
        colorHex: MOOD_COLORS[score],
      })),
      notifications: {
        dailyMoodReminder:
          raw.profile?.preferences?.notificationsEnabled ?? false,
        journalReminder: false, // not in the backend yet
        streakAlerts: false, // not in the backend yet
        reminderTime: "9:00 PM", // not in the profile response
      },
      privacy: { appLock: false }, // not in the backend yet
    };
  },

  async updateProfileSettings(
    payload: UpdateProfileSettingsPayload,
  ): Promise<UserProfile> {
    // Name lives on the user: PATCH /users/me accepts { name, email }
    if (payload.full_name !== undefined) {
      await apiClient.patch("/users/me", { name: payload.full_name });
    }

    // Notification toggle lives on the profile settings endpoint
    if (payload.notifications?.daily_mood_reminder !== undefined) {
      await apiClient.patch("/profile/settings", {
        notificationsEnabled: payload.notifications.daily_mood_reminder,
      });
    }

    return this.getUserProfile();
  },
};
