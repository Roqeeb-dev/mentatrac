"use client";

import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  HeartPulse,
  User,
} from "lucide-react";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import type { NavItem } from "@/features/dashboard/types/dashboard";

const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Wellness", href: "/wellness", icon: HeartPulse },
  { name: "Profile", href: "/profile", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Plug in hooks here once API endpoints are ready:
  // const { data: user } = useUser();
  // const { data: mood } = useTodayMood();

  const mockUser = {
    name: "Alex Johnson",
    email: "alex@example.com",
  };

  const mockMood = {
    emoji: "😊",
    label: "Good",
    streakDays: 30,
  };

  const handleOpenCheckIn = () => {
    // Open check-in modal or navigate
  };

  return (
    <DashboardShell
      sidebarProps={{
        navItems: NAV_ITEMS,
        user: mockUser,
        todayMood: mockMood,
        onLogCheckIn: handleOpenCheckIn,
      }}
      topbarProps={{
        title: "Dashboard",
        dateDisplay: "Mon 17 Aug",
        onCheckIn: handleOpenCheckIn,
      }}
    >
      {children}
    </DashboardShell>
  );
}
