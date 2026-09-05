export type TimeRange = "7D" | "30D" | "90D";

export interface MetricCardData {
  avgMood: {
    label: string;
    emoji: string;
  };
  positiveStreak: {
    days: number;
    change: string;
  };
  checkIns: {
    count: number;
    label: string;
  };
  journalEntries: {
    count: number;
    label: string;
  };
}

export interface MoodTrendPoint {
  date: string;
  score: number;
}

export interface MoodDistributionItem {
  label: "Radiant" | "Good" | "Okay" | "Tough";
  percentage: number;
  color: string;
}

export interface EmotionTag {
  id: string;
  name: string;
  count: number;
}

export interface TriggerItem {
  name: string;
  count: number;
}

export interface CalendarDayMood {
  date: string;
  emoji: string;
  type: "Radiant" | "Good" | "Okay" | "Tough" | "Hard";
}

export interface ReportsData {
  timeRange: TimeRange;
  metrics: MetricCardData;
  moodTrend: MoodTrendPoint[];
  moodDistribution: MoodDistributionItem[];
  mostFeltEmotions: EmotionTag[];
  topTriggers: TriggerItem[];
  moodCalendar: CalendarDayMood[];
}
