export interface ServerNotificationSettings {
  daily_mood_reminder: boolean;
  journal_reminder: boolean;
  streak_alerts: boolean;
  reminder_time: string;
}

export interface ServerPrivacySettings {
  app_lock: boolean;
}

export interface ServerMoodBreakdownItem {
  mood_label: string;
  count: number;
  color_hex: string;
}

export interface ServerUserProfileResponse {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string | null;
  member_since?: string;
  wellness_score: number;
  total_check_ins: number;
  current_streak_days: number;
  total_journal_entries: number;
  mood_breakdown: ServerMoodBreakdownItem[];
  notifications: ServerNotificationSettings;
  privacy: ServerPrivacySettings;
}

export interface NotificationSettings {
  dailyMoodReminder: boolean;
  journalReminder: boolean;
  streakAlerts: boolean;
  reminderTime: string;
}

export interface PrivacySettings {
  appLock: boolean;
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
  moodBreakdown: MoodBreakdownItem[];
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

// Payload type for updating profile settings
export interface UpdateProfileSettingsPayload {
  notifications?: Partial<ServerNotificationSettings>;
  privacy?: Partial<ServerPrivacySettings>;
  full_name?: string;
}
