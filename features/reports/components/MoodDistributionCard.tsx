import { MoodDistributionItem } from "../types/reports";

interface MoodDistributionCardProps {
  items: MoodDistributionItem[];
}

export function MoodDistributionCard({ items }: MoodDistributionCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between min-h-[280px]">
      <h3 className="text-sm font-bold text-slate-800">Mood distribution</h3>

      {/* CSS Donut Visual Representation */}
      <div className="flex justify-center py-2">
        <div className="relative h-28 w-28 rounded-full border-[10px] border-emerald-400 border-t-amber-400 border-r-blue-400 flex items-center justify-center">
          <span className="text-xs font-bold text-slate-600">100%</span>
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
              <span className="font-medium text-slate-600">{item.label}</span>
            </div>
            <span className="font-bold text-slate-800">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
