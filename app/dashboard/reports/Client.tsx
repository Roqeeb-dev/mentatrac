"use client";

import { useReports } from "@/features/reports/hooks/useReports";
import { ReportsSkeleton } from "@/features/reports/components/ReportsSkeleton";
import { ReportsErrorState } from "@/features/reports/components/ReportsErrorState";
import { ReportsHeader } from "@/features/reports/components/ReportsHeader";
import { MetricCards } from "@/features/reports/components/MetricCards";
import { MoodTrendChart } from "@/features/reports/components/MoodTrendChart";
import { MoodDistributionCard } from "@/features/reports/components/MoodDistributionCard";
import { MostFeltEmotionsCard } from "@/features/reports/components/MostFeltEmotionsCard";
import { TopTriggersCard } from "@/features/reports/components/TopTriggersCard";
import { MoodCalendar } from "@/features/reports/components/MoodCalendar";

export default function ReportsClient() {
  const { timeRange, setTimeRange, data, loading, error, refetch } =
    useReports();

  if (loading) return <ReportsSkeleton />;
  if (error || !data)
    return <ReportsErrorState message={error || undefined} onRetry={refetch} />;

  return (
    <div className="mx-auto max-w-7xl p-2 md:p-0 space-y-8">
      <ReportsHeader timeRange={timeRange} onTimeRangeChange={setTimeRange} />

      <MetricCards metrics={data.metrics} />

      <MoodTrendChart data={data.moodTrend} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MoodDistributionCard items={data.moodDistribution} />
        <MostFeltEmotionsCard emotions={data.mostFeltEmotions} />
        <TopTriggersCard triggers={data.topTriggers} />
      </div>

      {data.moodCalendar.length > 0 && (
        <MoodCalendar calendarDays={data.moodCalendar} />
      )}
    </div>
  );
}
