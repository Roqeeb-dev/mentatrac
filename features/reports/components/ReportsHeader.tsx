import { TimeRange } from "../types/reports";

interface ReportsHeaderProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

export function ReportsHeader({
  timeRange,
  onTimeRangeChange,
}: ReportsHeaderProps) {
  const ranges: TimeRange[] = ["7D", "30D", "90D"];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Reports
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track your emotional wellness and behavioral patterns over time.
        </p>
      </div>

      <div className="inline-flex items-center rounded-full bg-slate-100 p-1 border border-slate-200/60 self-start sm:self-auto">
        {ranges.map((range) => (
          <button
            key={range}
            onClick={() => onTimeRangeChange(range)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              timeRange === range
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
}
