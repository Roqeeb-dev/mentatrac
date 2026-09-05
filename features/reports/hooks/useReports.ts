"use client";

import { useState, useEffect, useCallback } from "react";
import { ReportsData, TimeRange } from "../types/reports";
import { reportsService } from "../services/reports.service";

export function useReports(initialRange: TimeRange = "30D") {
  const [timeRange, setTimeRange] = useState<TimeRange>(initialRange);
  const [data, setData] = useState<ReportsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async (range: TimeRange) => {
    setLoading(true);
    setError(null);
    try {
      const result = await reportsService.getReportsData(range);
      setData(result);
    } catch (err) {
      setError("Failed to fetch reports data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports(timeRange);
  }, [timeRange, fetchReports]);

  return {
    timeRange,
    setTimeRange,
    data,
    loading,
    error,
    refetch: () => fetchReports(timeRange),
  };
}
