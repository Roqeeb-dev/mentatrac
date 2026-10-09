"use client";

import { useMemo, useState } from "react";
import { useCheckIns } from "@/features/check-in/hooks/useCheckInHistory";
import { useJournalEntries } from "@/features/journal/hooks/useJournalEntries";
import type { TimeRange } from "../types/reports";
import { buildReports } from "../utils/buildReports";

export function useReports(initialRange: TimeRange = "30D") {
  const [timeRange, setTimeRange] = useState<TimeRange>(initialRange);

  const checkInsQuery = useCheckIns();
  const { data: entries = [], isLoading: isLoadingJournal } =
    useJournalEntries();

  const data = useMemo(
    () =>
      checkInsQuery.data
        ? buildReports(checkInsQuery.data, entries, timeRange)
        : null,
    [checkInsQuery.data, entries, timeRange],
  );

  return {
    timeRange,
    setTimeRange,
    data,
    loading: checkInsQuery.isLoading || isLoadingJournal,
    error: checkInsQuery.error ? "Failed to fetch reports data." : null,
    refetch: () => {
      checkInsQuery.refetch();
    },
  };
}
