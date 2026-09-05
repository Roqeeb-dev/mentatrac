"use client";

import { MoodScore } from "../types/checkIn";
import { MOODS } from "../types/checkInOptions";
import { Button } from "@/components/ui/Button";

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
    <div className="space-y-5">
      <div>
        <h2 className="text-[22px] font-bold text-slate-900 font-serif leading-tight">
          How are you feeling?
        </h2>
        <p className="mt-1 text-xs text-slate-500 font-medium">
          Be honest — this is your private space.
        </p>
      </div>

      <div className="space-y-2.5">
        {MOODS.map(({ value, emoji, label, subtitle }) => {
          const isSelected = selectedMood === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelectMood(value)}
              className={`w-full flex items-center px-3.5 py-2.5 rounded-2xl text-left border transition-all ${
                isSelected
                  ? "border-violet-500 bg-violet-50/20 ring-1 ring-violet-500"
                  : "border-slate-200/60 bg-[#FAFAFC] hover:bg-slate-100/60"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className="text-2xl leading-none">{emoji}</span>
                <div>
                  <p className="text-sm font-bold text-slate-800 leading-snug">
                    {label}
                  </p>
                  <p className="text-[11px] text-slate-400 font-normal">
                    {subtitle}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-1">
        <Button
          type="button"
          onClick={onContinue}
          disabled={!selectedMood}
          className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
            selectedMood
              ? "bg-violet-600 text-white hover:bg-violet-700 shadow-sm"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          Continue &rarr;
        </Button>
      </div>
    </div>
  );
}
