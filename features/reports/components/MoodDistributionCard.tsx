import { PieChart } from "lucide-react";
import { MoodDistributionItem } from "../types/reports";
import { EmptyState } from "./EmptyState";

interface MoodDistributionCardProps {
  items: MoodDistributionItem[];
}

function buildGradient(items: MoodDistributionItem[]) {
  const total = items.reduce((sum, i) => sum + i.percentage, 0) || 1;
  let acc = 0;
  const stops = items.map((i) => {
    const start = (acc / total) * 100;
    acc += i.percentage;
    const end = (acc / total) * 100;
    return `${i.color} ${start}% ${end}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

export function MoodDistributionCard({ items }: MoodDistributionCardProps) {
  const top = items.length
    ? items.reduce((a, b) => (b.percentage > a.percentage ? b : a))
    : null;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col min-h-[280px]">
      <h3 className="text-sm font-bold text-slate-800">Mood distribution</h3>

      {!top ? (
        <EmptyState
          className="flex-1 py-6"
          icon={PieChart}
          title="Nothing to show yet"
          description="Your mood split appears after your first check-in."
        />
      ) : (
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex justify-center py-3">
            <div
              className="relative flex h-28 w-28 items-center justify-center rounded-full"
              style={{ background: buildGradient(items) }}
            >
              <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-white">
                <span className="text-sm font-bold text-slate-700">
                  {top.percentage}%
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  {top.label}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-slate-600">
                    {item.label}
                  </span>
                </div>
                <span className="font-bold text-slate-800">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
