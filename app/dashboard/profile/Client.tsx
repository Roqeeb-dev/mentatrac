"use client";

import { useState, useEffect, useCallback } from "react";
import { useUserProfile } from "@/features/profile/hooks/useUserProfile";
import ProfileOverviewCard from "@/features/profile/components/ProfileOverviewCard";
import ProfileSettingsSection from "@/features/profile/components/ProfileSettingsSection";
import { ProfileSkeleton } from "@/features/profile/components/ProfileSkeleton";
import { ProfileErrorState } from "@/features/profile/components/ProfileErrorState";
import { UserProfile } from "@/features/profile/types/profile";

const mockProfileData: UserProfile = {
  id: "usr_123456",
  fullName: "Alex Johnson",
  email: "alex@example.com",
  avatarUrl: "",
  memberSince: "January 2025",
  wellnessScore: 78,
  totalCheckIns: 30,
  totalJournalEntries: 6,
  currentStreakDays: 12,
  moodBreakdown: [
    { moodLabel: "😊", count: 5, colorHex: "#f97316" }, // Orange
    { moodLabel: "😀", count: 15, colorHex: "#10b981" }, // Emerald
    { moodLabel: "😐", count: 8, colorHex: "#3b82f6" }, // Blue
    { moodLabel: "😔", count: 2, colorHex: "#8b5cf6" }, // Purple
    { moodLabel: "😫", count: 0, colorHex: "#ef4444" }, // Red
  ],
  notifications: {
    dailyMoodReminder: true,
    journalReminder: true,
    streakAlerts: true,
    reminderTime: "9:00 PM",
  },
  privacy: {
    appLock: false,
  },
};

export default function ProfilePage() {
  const USE_MOCK_DATA = true;

  const hookData = useUserProfile();

  // Simulated mock loading state
  const [isMockLoading, setIsMockLoading] = useState(USE_MOCK_DATA);

  const triggerMockFetch = useCallback(() => {
    setIsMockLoading(true);
    const timer = setTimeout(() => {
      setIsMockLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (USE_MOCK_DATA) {
      const cleanup = triggerMockFetch();
      return cleanup;
    }
  }, [USE_MOCK_DATA, triggerMockFetch]);

  const profile = USE_MOCK_DATA ? mockProfileData : hookData.profile;
  const isLoading = USE_MOCK_DATA ? isMockLoading : hookData.isLoading;
  const error = USE_MOCK_DATA ? null : hookData.error;

  const handleRetry = () => {
    if (USE_MOCK_DATA) {
      triggerMockFetch();
    } else {
      hookData.refetchProfile?.();
    }
  };

  if (isLoading) return <ProfileSkeleton />;

  if (error || !profile) {
    return <ProfileErrorState message={error?.message} onRetry={handleRetry} />;
  }

  return (
    <div className="mx-auto max-w-7xl p-3 md:p-0">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[340px_1fr]">
        {/* Left Column: User Overview */}
        <aside className="flex flex-col gap-6">
          <ProfileOverviewCard profile={profile} />
        </aside>

        {/* Right Column: Settings & Preferences */}
        <main className="flex flex-col gap-6">
          <ProfileSettingsSection profile={profile} />
        </main>
      </div>
    </div>
  );
}
