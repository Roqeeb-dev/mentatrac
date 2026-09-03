"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type {
  NavItem,
  UserProfileData,
  TodayMoodData,
} from "../types/dashboard";

export interface SidebarProps {
  navItems: NavItem[];
  user?: UserProfileData | null;
  todayMood?: TodayMoodData | null;
  isOpen?: boolean;
  onClose?: () => void;
  onLogCheckIn?: () => void;
}

export function Sidebar({
  navItems,
  user,
  todayMood,
  isOpen = false,
  onClose,
  onLogCheckIn,
}: SidebarProps) {
  const pathname = usePathname();

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sidebarContent = (
    <aside className="flex h-full w-64 flex-col justify-between bg-[#1C1F3B] p-5 text-white">
      <div className="flex flex-col gap-6">
        {/* Logo & Mobile Close Button */}
        <div className="flex items-center justify-between">
          <Logo variant="light" />
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Dynamic Today's Mood Card Widget */}
        {todayMood && (
          <div className="flex flex-col gap-2 rounded-2xl bg-white/5 p-4 border border-white/10 backdrop-blur-md">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Today&apos;s Mood
            </p>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{todayMood.emoji}</span>
              <div className="flex flex-col">
                <span className="text-body-sm font-bold text-white">
                  {todayMood.label}
                </span>
                <span className="text-[11px] text-purple-300">
                  Day {todayMood.streakDays} streak 🔥
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Navigation Links */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-body-sm font-medium transition-colors",
                  isActive
                    ? "bg-purple-600 font-semibold text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="rounded-full bg-purple-500/30 px-2 py-0.5 text-[10px] font-bold text-purple-200">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Dynamic User Profile & Action */}
      <div className="flex flex-col gap-4">
        {onLogCheckIn && (
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={onLogCheckIn}
            className="border-none bg-purple-600/80 text-white hover:bg-purple-600"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Log mood check-in
          </Button>
        )}

        {user && (
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-2.5">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500 text-caption font-bold text-white">
                {getInitials(user.name)}
              </div>
            )}
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-body-sm font-semibold text-white">
                {user.name}
              </span>
              <span className="truncate text-[11px] text-slate-400">
                {user.email}
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block lg:h-screen lg:shrink-0">
        {sidebarContent}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative z-10 h-full">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}
