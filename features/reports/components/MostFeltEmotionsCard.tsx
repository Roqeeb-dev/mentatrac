import { Heart } from "lucide-react";
import { EmotionTag } from "../types/reports";
import { EmptyState } from "./EmptyState";

interface MostFeltEmotionsCardProps {
  emotions: EmotionTag[];
}

export function MostFeltEmotionsCard({ emotions }: MostFeltEmotionsCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col min-h-[280px]">
      <h3 className="text-sm font-bold text-slate-800">Most felt emotions</h3>

      {emotions.length === 0 ? (
        <EmptyState
          className="flex-1 py-6"
          icon={Heart}
          title="No emotions tagged"
          description="Pick a few emotions when you check in to see them here."
        />
      ) : (
        <div className="flex flex-wrap gap-2 my-auto pt-4">
          {emotions.map((item) => (
            <div
              key={item.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50/60 px-3 py-1 text-xs font-medium text-slate-700"
            >
              <span>{item.name}</span>
              <span className="rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
