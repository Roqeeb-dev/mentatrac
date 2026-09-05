import { TriggerItem } from "../types/reports";

interface TopTriggersCardProps {
  triggers: TriggerItem[];
}

export function TopTriggersCard({ triggers }: TopTriggersCardProps) {
  const maxCount = Math.max(...triggers.map((t) => t.count), 1);

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between min-h-[280px]">
      <h3 className="text-sm font-bold text-slate-800">Top triggers</h3>

      <div className="space-y-4 my-auto py-2">
        {triggers.map((trigger) => {
          const widthPercent = (trigger.count / maxCount) * 100;
          return (
            <div key={trigger.name} className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-600">
                <span>{trigger.name}</span>
                <span className="font-bold text-slate-800">
                  {trigger.count}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
