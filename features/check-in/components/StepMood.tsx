"use client";

import { MoodScore } from "../types/checkIn";
import { MOODS } from "../types/checkInOptions";

interface StepMoodProps {
  selectedMood: MoodScore;
  onSelectMood: (mood: MoodScore) => void;
  onContinue: () => void;
}

export function StepMood({
  selectedMood,
  onSelectMood,
  onContinue,
}: StepMoodProps) {
  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">
          How are you feeling?
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Be honest — this is your private space.
        </p>
      </div>

      <div className="space-y-3">
        {MOODS.map((m) => {
          const isSelected = selectedMood === m.value;
          return (
            <button
              key={m.value}
              type="button"
              onClick={() => onSelectMood(m.value)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 ${
                isSelected
                  ? "border-violet-500 bg-violet-50/50 ring-2 ring-violet-500/20"
                  : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{m.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {m.label}
                  </p>
                  <p className="text-xs text-slate-500">{m.subtitle}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onContinue}
          className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 transition-colors shadow-xs"
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}
