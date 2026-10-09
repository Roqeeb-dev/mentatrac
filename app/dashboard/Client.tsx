"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Flame, Check, BookOpen } from "lucide-react";

import { useJournalEntries } from "@/features/journal/hooks/useJournalEntries";
import { useJournalUiStore } from "@/features/journal/hooks/useJournalUiStore";
import { sortEntriesByDateDesc } from "@/features/journal/lib/journalUtils";
import { useUserProfile } from "@/features/profile/hooks/useUserProfile";
import { useCheckIns } from "@/features/check-in/hooks/useCheckInHistory";
import { useDashboardMoods } from "@/features/dashboard/hooks/useDashboardMoods";
import { useCheckInModalStore } from "@/stores/check-in-modal-store";

import { GreetingBanner } from "@/features/dashboard/components/GreetingBanner";
import { TodayMoodCard } from "@/features/dashboard/components/TodayMoodCard";
import { WeeklyMoodStrip } from "@/features/dashboard/components/WeeklyMoodStrip";
import { MoodBannerCTA } from "@/features/dashboard/components/MoodBannerCta";
import { MoodTrendChart } from "@/features/dashboard/components/MoodTrendChart";
import { QuickExerciseCard } from "@/features/dashboard/components/QuickExerciseCard";
import { RecentJournalWidget } from "@/features/dashboard/components/RecentJournalWidget";
import { StatCard } from "@/features/dashboard/components/StatCard";

import { MOCK_QUICK_EXERCISE } from "@/features/dashboard/data/mockDashboard";

export default function DashboardClient() {
  const router = useRouter();

  const {
    data: rawEntries = [],
    isLoading: isLoadingJournal,
    isError: isJournalError,
  } = useJournalEntries();
  const entries = useMemo(
    () => sortEntriesByDateDesc(rawEntries),
    [rawEntries],
  );

  const { profile, isLoading: isLoadingProfile } = useUserProfile();
  const { data: checkIns = [], isLoading: isLoadingCheckIns } = useCheckIns();
  const { todayMood, week, trend } = useDashboardMoods();
  const { startNewEntry } = useJournalUiStore();
  const openCheckIn = useCheckInModalStore((s) => s.open);

  const stats = useMemo(
    () => ({
      dayStreak: profile?.currentStreakDays ?? 0,
      totalCheckIns: checkIns.length,
      totalEntries: entries.length,
    }),
    [profile, checkIns, entries],
  );

  const handleNewJournalEntry = () => {
    startNewEntry();
    router.push("/dashboard/journal");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left / Main Section (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <GreetingBanner
            name={profile?.fullName ?? "there"}
            isLoading={isLoadingProfile}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {todayMood ? (
              <TodayMoodCard
                emoji={todayMood.emoji}
                label={todayMood.label}
                subtitle={todayMood.subtitle}
                onLogAgain={openCheckIn}
              />
            ) : (
              <div className="flex flex-col justify-center gap-3 rounded-3xl border border-slate-100 bg-white p-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Today&apos;s mood
                </p>
                <p className="text-sm text-slate-500">
                  You haven&apos;t checked in yet today.
                </p>
                <button
                  type="button"
                  onClick={openCheckIn}
                  className="w-fit rounded-full bg-[#5B4DFB] px-4 py-2 text-xs font-semibold text-white"
                >
                  Check in now
                </button>
              </div>
            )}
            <WeeklyMoodStrip days={week} />
          </div>

          <MoodBannerCTA onCheckIn={openCheckIn} />
          <MoodTrendChart data={trend} />
        </div>

        {/* Right Sidebar Section (1 Col) */}
        <div className="space-y-3.5">
          <StatCard
            icon={<Flame className="w-5 h-5 fill-amber-400 stroke-amber-500" />}
            iconBg="bg-amber-50/80"
            iconColor="text-amber-500"
            value={stats.dayStreak}
            valueColor="text-[#5B4DFB]"
            label="Day streak"
            isLoading={isLoadingProfile}
          />

          <StatCard
            icon={<Check className="w-5 h-5 stroke-[2.5]" />}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-500"
            value={stats.totalCheckIns}
            valueColor="text-emerald-500"
            label="Check-ins total"
            isLoading={isLoadingCheckIns}
          />

          <StatCard
            icon={<BookOpen className="w-4 h-4 stroke-[2.2]" />}
            iconBg="bg-amber-50/80"
            iconColor="text-slate-700"
            value={stats.totalEntries}
            valueColor="text-orange-400"
            label="Journal entries"
            isLoading={isLoadingJournal}
          />

          <QuickExerciseCard exercise={MOCK_QUICK_EXERCISE} />

          <RecentJournalWidget
            entries={entries}
            isLoading={isLoadingJournal}
            isError={isJournalError}
            onNewEntry={handleNewJournalEntry}
          />
        </div>
      </div>
    </div>
  );
}
