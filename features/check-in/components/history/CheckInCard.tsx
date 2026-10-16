"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MOOD_META } from "../../hooks/useCheckInHistory";
import { MOOD_STYLES } from "../../lib/historyUtils";
import type { CheckInRecord } from "../../types/checkIn";

export function CheckInCard({ record }: { record: CheckInRecord }) {
  const [open, setOpen] = useState(false);
  const meta = MOOD_META[record.mood];
  const style = MOOD_STYLES[record.mood];
  const time = new Date(record.createdAt).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const hasDetails =
    record.emotions.length > 0 ||
    record.influencers.length > 0 ||
    !!record.note;

  return (
    <div className="relative pl-12">
      {/* Emoji node sitting on the rail */}
      <span
        aria-hidden
        className="absolute left-0 top-3 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white text-lg shadow-sm"
        style={{ borderColor: style.color }}
      >
        {meta.emoji}
      </span>

      <div
        className="overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md"
        style={{ borderColor: style.border }}
      >
        <button
          type="button"
          onClick={() => hasDetails && setOpen((o) => !o)}
          aria-expanded={hasDetails ? open : undefined}
          className="flex w-full items-center justify-between gap-3 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5B4DFB]/40"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                style={{ backgroundColor: style.tint, color: style.color }}
              >
                {meta.label}
              </span>
              <span className="text-xs font-medium text-slate-400">{time}</span>
            </div>

            {!open && record.note && (
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
                {record.note}
              </p>
            )}
          </div>

          {hasDetails && (
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-slate-300 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {open && (
          <div className="space-y-3 border-t border-slate-100 px-4 pb-4 pt-3">
            {record.note && (
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                {record.note}
              </p>
            )}
            {record.emotions.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {record.emotions.map((e) => (
                  <span
                    key={e}
                    className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    style={{ backgroundColor: style.tint, color: style.color }}
                  >
                    {e}
                  </span>
                ))}
              </div>
            )}
            {record.influencers.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {record.influencers.map((i) => (
                  <span
                    key={i}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500"
                  >
                    {i}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
