import { MoodTrendPoint } from "../types/reports";

interface MoodTrendChartProps {
  data: MoodTrendPoint[];
}

export function MoodTrendChart({ data }: MoodTrendChartProps) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">Mood trend</h3>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-300" /> Difficult
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Radiant
          </span>
        </div>
      </div>

      {/* Trendline Placeholder Visual Container */}
      <div className="relative h-48 w-full flex items-end justify-between pt-8 px-2">
        {data.map((point, index) => {
          const heightPercent = (point.score / 5) * 100;
          return (
            <div key={index} className="flex flex-col items-center gap-2 group">
              <div className="relative w-2 bg-slate-100 rounded-full h-32 flex items-end">
                <div
                  className="w-full bg-indigo-500/80 group-hover:bg-indigo-600 rounded-full transition-all"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-medium text-slate-400">
                {point.date}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
