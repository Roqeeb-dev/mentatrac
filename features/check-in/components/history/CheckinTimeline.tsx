import { CheckInCard } from "./CheckInCard";
import type { CheckInRecord } from "../../types/checkIn";

type Group = { key: string; label: string; records: CheckInRecord[] };

export function CheckInTimeline({ groups }: { groups: Group[] }) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.key} aria-label={group.label}>
          <div className="mb-3 flex items-baseline gap-2">
            <h3 className="text-sm font-bold text-slate-900">{group.label}</h3>
            <span className="text-xs font-medium text-slate-400">
              {group.records.length}{" "}
              {group.records.length === 1 ? "check-in" : "check-ins"}
            </span>
          </div>

          <div className="relative space-y-3">
            {/* Vertical rail */}
            <span
              aria-hidden
              className="absolute bottom-4 left-5 top-4 w-px bg-slate-200"
            />
            {group.records.map((record) => (
              <CheckInCard key={record.id} record={record} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
