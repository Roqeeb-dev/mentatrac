"use client";

import { useUserProfile } from "@/features/profile/hooks/useUserProfile";
import ProfileOverviewCard from "@/features/profile/components/ProfileOverviewCard";
import ProfileSettingsSection from "@/features/profile/components/ProfileSettingsSection";

export default function ProfilePage() {
  const { profile, isLoading, error } = useUserProfile();

  if (isLoading)
    return <div className="p-8 text-slate-400">Loading profile...</div>;
  if (error || !profile)
    return <div className="p-8 text-red-400">Failed to load profile.</div>;

  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-8">
      {/* 2-Column Responsive Layout Shell */}
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
