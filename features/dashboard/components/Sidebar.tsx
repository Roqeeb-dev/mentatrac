"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, Plus, X } from "lucide-react";
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
    <aside className="flex h-full w-64 flex-col justify-between bg-gradient-to-b from-[#212456] via-[#1E2E4B] to-[#122A2B] p-5 text-white shadow-xl">
      <div className="flex flex-col gap-5">
        {/* Logo Header & Toggle Button */}
        <div className="flex items-center justify-between">
          <Logo variant="light" />
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-slate-300 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white lg:hidden"
                aria-label="Close sidebar"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Today's Mood Widget Card */}
        {todayMood && (
          <div className="flex flex-col gap-1.5 rounded-2xl bg-white/[0.07] p-3.5 border border-white/10 backdrop-blur-md">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300/80">
              Today&apos;s Mood
            </p>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{todayMood.emoji}</span>
              <div className="flex flex-col">
                <span className="text-body-sm font-bold text-white">
                  {todayMood.label}
                </span>
                <span className="text-[11px] font-medium text-slate-300">
                  Day {todayMood.streakDays} streak 🔥
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Navigation Links */}
        <nav className="flex flex-col gap-1 pt-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-body-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-white/15 text-white font-semibold backdrop-blur-md shadow-sm border border-white/10"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-white",
                    )}
                  />
                  <span>{item.name}</span>
                </div>

                {/* Active Indicator Dot or Badge */}
                {isActive ? (
                  <span className="h-2 w-2 rounded-full bg-white shadow-glow" />
                ) : item.badge !== undefined ? (
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Dynamic Action Button & User Profile */}
      <div className="flex flex-col gap-3">
        {onLogCheckIn && (
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={onLogCheckIn}
            className="border border-white/10 bg-white/10 text-white font-medium hover:bg-white/20 transition-all shadow-none"
            leftIcon={<Plus className="h-4 w-4 text-slate-300" />}
          >
            Log mood check-in
          </Button>
        )}

        {user && (
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.07] p-2.5 border border-white/10">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-caption font-bold text-white shadow-sm">
                {getInitials(user.name)}
              </div>
            )}
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-body-sm font-bold text-white">
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative z-10 h-full">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}
