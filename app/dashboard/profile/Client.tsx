"use client";

import { useRouter } from "next/navigation";
import { useUserProfile } from "@/features/profile/hooks/useUserProfile";
import { useLogout, useChangePassword } from "@/features/auth/hooks/useAuth";
import ProfileOverviewCard from "@/features/profile/components/ProfileOverviewCard";
import ProfileSettingsSection from "@/features/profile/components/ProfileSettingsSection";
import { ProfileSkeleton } from "@/features/profile/components/ProfileSkeleton";
import { ProfileErrorState } from "@/features/profile/components/ProfileErrorState";
import type { NotificationSettings } from "@/features/profile/types/profile";
import { toast } from "@/stores/toast-store";

export default function ProfilePage() {
  const router = useRouter();
  const logout = useLogout();
  const { profile, isLoading, error, refetchProfile, updateSettings } =
    useUserProfile();

  const handleToggleNotification = async (key: string, value: boolean) => {
    await updateSettings({
      notifications: { [key]: value } as Partial<NotificationSettings>,
    });
  };

  const handleSignOut = async () => {
    try {
      await logout.mutateAsync();
      router.replace("/login");
    } catch {
      toast.error("Couldn't sign you out. Try again.");
      throw new Error("sign-out failed"); // keeps the modal open
    }
  };

  if (isLoading) return <ProfileSkeleton />;

  if (error || !profile) {
    return (
      <ProfileErrorState
        message={error?.message}
        onRetry={() => refetchProfile()}
      />
    );
  }

  const changePassword = useChangePassword();

  const handleChangePassword = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    await changePassword.mutateAsync(data);
  };

  return (
    <div className="mx-auto max-w-7xl p-3 md:p-0">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[340px_1fr]">
        {/* Left Column: User Overview */}
        <aside className="flex flex-col gap-6">
          <ProfileOverviewCard profile={profile} />
        </aside>

        {/* Right Column: Settings & Preferences */}
        <main className="flex flex-col gap-6">
          <ProfileSettingsSection
            profile={profile}
            onToggleNotification={handleToggleNotification}
            onSignOut={handleSignOut}
            onChangePassword={handleChangePassword}
          />
        </main>
      </div>
    </div>
  );
}
