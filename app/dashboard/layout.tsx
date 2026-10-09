"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  HeartPulse,
  User as UserIcon,
} from "lucide-react";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { useUserProfile } from "@/features/profile/hooks/useUserProfile";
import { useTodayMood } from "@/features/check-in/hooks/useCheckInHistory";
import type {
  NavItem,
  TodayMoodData,
  UserProfileData,
} from "@/features/dashboard/types/dashboard";

const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Journal", href: "/dashboard/journal", icon: BookOpen },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Wellness", href: "/dashboard/wellness", icon: HeartPulse },
  { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();
  const { profile: profileData } = useUserProfile();
  const { mood } = useTodayMood();

  // Redirect to login once we know there is no authenticated user
  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [isLoading, user, router]);

  const profile: UserProfileData | null = useMemo(() => {
    if (!user) return null;
    return {
      name: user.name?.trim() || user.email.split("@")[0],
      email: user.email,
      avatarUrl: profileData?.avatarUrl ?? null,
    };
  }, [user, profileData?.avatarUrl]);

  const todayMood: TodayMoodData | null = useMemo(
    () =>
      mood
        ? {
            ...mood,
            streakDays: profileData?.currentStreakDays ?? mood.streakDays,
          }
        : null,
    [mood, profileData?.currentStreakDays],
  );

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div
          role="status"
          aria-label="Loading"
          className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#5B4DFB]"
        />
      </div>
    );
  }

  // The check-in modal and its open handlers live in DashboardShell
  return (
    <DashboardShell
      sidebarProps={{
        navItems: NAV_ITEMS,
        user: profile,
        todayMood,
      }}
    >
      {children}
    </DashboardShell>
  );
}
