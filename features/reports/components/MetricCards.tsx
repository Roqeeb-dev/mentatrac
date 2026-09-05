import { MetricCardData } from "../types/reports";

interface MetricCardsProps {
  metrics: MetricCardData;
}

export function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Avg Mood */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Avg Mood
        </span>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-2xl">{metrics.avgMood.emoji}</span>
          <span className="text-xl font-bold text-slate-800">
            {metrics.avgMood.label}
          </span>
        </div>
      </div>

      {/* Positive Streak */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Positive Streak
        </span>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-emerald-500">
            {metrics.positiveStreak.days}
          </span>
          <span className="text-xs font-medium text-emerald-600">
            {metrics.positiveStreak.change}
          </span>
        </div>
      </div>

      {/* Check-ins */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Check-ins
        </span>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-indigo-600">
            {metrics.checkIns.count}
          </span>
          <span className="text-xs font-medium text-slate-500">
            {metrics.checkIns.label}
          </span>
        </div>
      </div>

      {/* Journal Entries */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Journal Entries
        </span>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-amber-500">
            {metrics.journalEntries.count}
          </span>
          <span className="text-xs font-medium text-slate-500">
            {metrics.journalEntries.label}
          </span>
        </div>
      </div>
    </div>
  );
}
