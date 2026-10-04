import { apiClient } from "@/lib/api/client";
import { checkInService } from "@/features/check-in/services/checkIn.service";
import { MOOD_META } from "@/features/check-in/hooks/useCheckInHistory";
import type {
  CheckInRecord,
  MoodScore,
} from "@/features/check-in/types/checkIn";
import type {
  ProfileResponse,
  UpdateProfileSettingsPayload,
  UserProfile,
} from "../types/profile";

const MOOD_COLORS: Record<MoodScore, string> = {
  5: "#f97316",
  4: "#10b981",
  3: "#3b82f6",
  2: "#8b5cf6",
  1: "#ef4444",
};
const MOOD_ORDER: MoodScore[] = [5, 4, 3, 2, 1];

function to12h(time?: string) {
  if (!time) return "9:00 PM";
  const m = /^(\d{1,2}):(\d{2})/.exec(time);
  if (!m || /am|pm/i.test(time)) return time;
  const h = Number(m[1]);
  return `${h % 12 === 0 ? 12 : h % 12}:${m[2]} ${h >= 12 ? "PM" : "AM"}`;
}

function to24h(time: string) {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i.exec(time.trim());
  if (!m) return time;
  let h = Number(m[1]);
  const suffix = m[3]?.toUpperCase();
  if (suffix === "PM" && h < 12) h += 12;
  if (suffix === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${m[2]}`;
}

function countPositiveDaysThisMonth(records: CheckInRecord[]) {
  const now = new Date();
  const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const days = new Set<string>();
  for (const r of records) {
    if (r.mood >= 4 && r.date.startsWith(prefix)) days.add(r.date.slice(0, 10));
  }
  return days.size;
}

export const profileService = {
  async getUserProfile(): Promise<UserProfile> {
    const [raw, records] = await Promise.all([
      apiClient.get<ProfileResponse>("/profile"),
      checkInService.getCheckIns(),
    ]);

    const profile = raw.profile ?? {};
    const prefs = profile.preferences ?? {};

    return {
      id: raw.id,
      fullName: raw.name,
      email: raw.email,
      avatarUrl: profile.avatarUrl ?? null,
      memberSince: new Date(raw.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      wellnessScore: profile.wellnessScore ?? 0, // computed server-side
      currentStreakDays: profile.streakCount ?? 0,

      // Computed client-side from the check-in list
      totalCheckIns: records.length,
      positiveDaysThisMonth: countPositiveDaysThisMonth(records),
      moodBreakdown: MOOD_ORDER.map((score) => ({
        moodLabel: MOOD_META[score].emoji,
        count: records.filter((r) => r.mood === score).length,
        colorHex: MOOD_COLORS[score],
      })),

      totalJournalEntries: 0,

      notifications: {
        dailyMoodReminder:
          prefs.dailyMoodReminder ?? prefs.notificationsEnabled ?? false,
        journalReminder: prefs.journalReminder ?? false,
        streakAlerts: prefs.streakAlerts ?? false,
        reminderTime: to12h(prefs.reminderTime ?? profile.reminderTime),
      },
      privacy: { appLock: false },
    };
  },

  async updateProfileSettings(
    payload: UpdateProfileSettingsPayload,
  ): Promise<UserProfile> {
    // Name lives on the user: PATCH /users/me { name }
    if (payload.fullName !== undefined) {
      await apiClient.patch("/users/me", { name: payload.fullName });
    }

    // Notifications live in profile.preferences: PATCH /profile/settings
    const n = payload.notifications;
    if (n) {
      const preferences: Record<string, boolean | string> = {};
      if (n.dailyMoodReminder !== undefined)
        preferences.dailyMoodReminder = n.dailyMoodReminder;
      if (n.journalReminder !== undefined)
        preferences.journalReminder = n.journalReminder;
      if (n.streakAlerts !== undefined)
        preferences.streakAlerts = n.streakAlerts;
      if (n.reminderTime !== undefined)
        preferences.reminderTime = to24h(n.reminderTime);

      if (Object.keys(preferences).length > 0) {
        await apiClient.patch("/profile/settings", { preferences });
      }
    }

    return profileService.getUserProfile();
  },
};
