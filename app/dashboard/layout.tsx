"use client";

import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  HeartPulse,
  User as UserIcon,
} from "lucide-react";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { CheckInModal } from "@/features/check-in/components/CheckInModal";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { useTodayMood } from "@/features/check-in/hooks/useCheckInHistory";
import type {
  NavItem,
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
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const { data: user } = useCurrentUser();
  const { mood } = useTodayMood();

  const profile: UserProfileData | null = useMemo(() => {
    if (!user) return null;
    return {
      name: user.name?.trim() || user.email.split("@")[0],
      email: user.email,
    };
  }, [user]);

  const handleOpenCheckIn = () => setIsCheckInOpen(true);

  return (
    <>
      <DashboardShell
        sidebarProps={{
          navItems: NAV_ITEMS,
          user: profile,
          todayMood: mood,
          onLogCheckIn: handleOpenCheckIn,
        }}
        topbarProps={{
          onCheckIn: handleOpenCheckIn,
        }}
      >
        {children}
      </DashboardShell>

      <CheckInModal
        isOpen={isCheckInOpen}
        onClose={() => setIsCheckInOpen(false)}
      />
    </>
  );
}
