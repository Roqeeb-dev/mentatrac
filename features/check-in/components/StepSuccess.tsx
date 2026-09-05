"use client";

import { CheckInRecord } from "../types/checkIn";
import { MOODS } from "../types/checkInOptions";

interface StepSuccessProps {
  record: CheckInRecord | null;
  onClose: () => void;
}

export function StepSuccess({ record, onClose }: StepSuccessProps) {
  const moodObj = MOODS.find((m) => m.value === record?.mood) || MOODS[2];

  return (
    <div className="text-center space-y-6 py-2">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-4xl shadow-inner">
        {moodObj.emoji}
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">
          Check-in saved
        </h2>
        <p className="mt-1 text-xs text-slate-500 max-w-xs mx-auto">
          You felt{" "}
          <span className="font-semibold text-slate-700">{moodObj.label}</span>.
          Showing up for yourself daily makes a real difference.
        </p>
      </div>

      {/* Selected Tag Badges */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-xs mx-auto">
        {record?.emotions.map((e) => (
          <span
            key={e}
            className="px-2.5 py-1 rounded-md bg-violet-50 text-[11px] font-medium text-violet-700"
          >
            {e}
          </span>
        ))}
        {record?.influencers.map((i) => (
          <span
            key={i}
            className="px-2.5 py-1 rounded-md bg-emerald-50 text-[11px] font-medium text-emerald-700"
          >
            {i}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-full sm:w-auto px-8 py-2.5 rounded-2xl bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 transition-colors shadow-xs"
      >
        Done
      </button>
    </div>
  );
}
