"use client";

import { useState, useMemo } from "react";
import { Flame, Check, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useJournal } from "@/features/journal/hooks/useJournal";
import { useUserProfile } from "@/features/profile/hooks/useUserProfile";
import { checkInService } from "@/features/check-in/services/checkIn.service";

import { GreetingBanner } from "@/features/dashboard/components/GreetingBanner";
import { TodayMoodCard } from "@/features/dashboard/components/TodayMoodCard";
import { WeeklyMoodStrip } from "@/features/dashboard/components/WeeklyMoodStrip";
import { MoodBannerCTA } from "@/features/dashboard/components/MoodBannerCta";
import { MoodTrendChart } from "@/features/dashboard/components/MoodTrendChart";
import { QuickExerciseCard } from "@/features/dashboard/components/QuickExerciseCard";
import { RecentJournalWidget } from "@/features/dashboard/components/RecentJournalWidget";
import { CheckInModal } from "@/features/check-in/components/CheckInModal";
import { StatCard } from "@/features/dashboard/components/StatCard";

import {
  MOCK_WEEKLY_MOODS,
  MOCK_MOOD_TREND,
  MOCK_QUICK_EXERCISE,
} from "@/features/dashboard/data/mockDashboard";

export default function DashboardClient() {
  const {
    entries = [],
    isLoading: isLoadingJournal,
    isError: isJournalError,
  } = useJournal();
  const { profile, isLoading: isLoadingProfile } = useUserProfile();

  const { data: checkIns = [], isLoading: isLoadingCheckIns } = useQuery({
    queryKey: ["checkIns"],
    queryFn: () => checkInService.getCheckIns?.() ?? [],
  });

  const [isCheckInOpen, setIsCheckInOpen] = useState(false);

  const stats = useMemo(() => {
    return {
      dayStreak: profile?.streak ?? profile?.streak ?? 0,
      totalCheckIns:
        checkIns?.length ?? (entries.length > 0 ? entries.length + 24 : 0),
      totalEntries: entries?.length ?? 0,
    };
  }, [profile, checkIns, entries]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left / Main Section (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Greeting Banner inside Left Column */}
          <GreetingBanner
            name={profile?.fullName ?? "User"}
            isLoading={isLoadingProfile}
          />

          {/* Mood Overview Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TodayMoodCard
              emoji="😊"
              label="Good"
              subtitle="Doing well"
              onLogAgain={() => setIsCheckInOpen(true)}
            />
            <WeeklyMoodStrip days={MOCK_WEEKLY_MOODS} />
          </div>

          <MoodBannerCTA onCheckIn={() => setIsCheckInOpen(true)} />
          <MoodTrendChart data={MOCK_MOOD_TREND} />
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
            onNewEntry={() => setIsCheckInOpen(true)}
          />
        </div>
      </div>

      <CheckInModal
        isOpen={isCheckInOpen}
        onClose={() => setIsCheckInOpen(false)}
      />
    </div>
  );
}
