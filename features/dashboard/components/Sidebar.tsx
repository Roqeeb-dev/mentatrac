"use client";

import { useState } from "react";
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
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <aside
      className={cn(
        "flex h-full flex-col justify-between bg-gradient-to-b from-[#212456] via-[#1E2E4B] to-[#122A2B] text-white shadow-xl transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20 p-3" : "w-64 p-5",
      )}
    >
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div
          className={cn(
            "flex items-center transition-all duration-300",
            isCollapsed ? "flex-col gap-3 justify-center" : "justify-between",
          )}
        >
          <Logo variant="light" showIcon={true} isCollapsed={isCollapsed} />

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-slate-300 transition-all hover:bg-white/20 hover:text-white lg:flex"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isCollapsed && "rotate-180",
                )}
              />
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

        {/* Mood Widget */}
        {todayMood && (
          <div
            className={cn(
              "flex flex-col gap-1.5 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-md transition-all duration-300 overflow-hidden",
              isCollapsed ? "p-2 items-center text-center" : "p-3.5",
            )}
          >
            {!isCollapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300/80">
                Today&apos;s Mood
              </p>
            )}
            <div
              className={cn(
                "flex items-center",
                isCollapsed ? "justify-center" : "gap-3",
              )}
            >
              <span
                className={cn(
                  "transition-all duration-300",
                  isCollapsed ? "text-xl" : "text-2xl",
                )}
              >
                {todayMood.emoji}
              </span>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-body-sm font-bold text-white">
                    {todayMood.label}
                  </span>
                  <span className="text-[11px] font-medium text-slate-300">
                    Day {todayMood.streakDays} streak 🔥
                  </span>
                </div>
              )}
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
                title={isCollapsed ? item.name : undefined}
                className={cn(
                  "group relative flex items-center rounded-xl py-1.5 text-body-sm font-medium transition-all duration-300 ease-in-out",
                  isCollapsed
                    ? "justify-center px-0"
                    : "justify-between px-3.5",
                  isActive
                    ? "bg-white/15 text-white font-semibold backdrop-blur-md shadow-sm border border-white/10"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
                )}
              >
                <div
                  className={cn(
                    "flex items-center",
                    isCollapsed ? "justify-center" : "gap-3",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors shrink-0",
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-white",
                    )}
                  />
                  {!isCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </div>

                {/* Active Indicator or Badge */}
                {!isCollapsed &&
                  (isActive ? (
                    <span className="h-2 w-2 rounded-full bg-white shadow-glow shrink-0" />
                  ) : item.badge !== undefined ? (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-300 shrink-0">
                      {item.badge}
                    </span>
                  ) : null)}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Action Button & User Profile */}
      <div className="flex flex-col gap-3">
        {onLogCheckIn && (
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={onLogCheckIn}
            className={cn(
              "border border-white/10 bg-white/10 text-white font-medium hover:bg-white/20 transition-all shadow-none",
              isCollapsed && "px-0 justify-center",
            )}
            leftIcon={<Plus className="h-4 w-4 text-slate-300 shrink-0" />}
          >
            {!isCollapsed && (
              <span className="truncate">Log mood check-in</span>
            )}
          </Button>
        )}

        {user && (
          <div
            className={cn(
              "flex items-center rounded-2xl bg-white/[0.07] border border-white/10 transition-all duration-300",
              isCollapsed ? "p-1.5 justify-center" : "gap-3 p-2.5",
            )}
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-9 w-9 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-caption font-bold text-white shadow-sm shrink-0">
                {getInitials(user.name)}
              </div>
            )}
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-body-sm font-bold text-white">
                  {user.name}
                </span>
                <span className="truncate text-[11px] text-slate-400">
                  {user.email}
                </span>
              </div>
            )}
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
          />
          <div className="relative z-10 h-full">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}
