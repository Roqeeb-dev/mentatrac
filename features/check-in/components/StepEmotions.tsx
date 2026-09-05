"use client";

import { EmotionCategory } from "../types/checkIn";
import { EMOTIONS } from "../types/checkInOptions";

interface StepEmotionsProps {
  selectedEmotions: EmotionCategory[];
  onToggleEmotion: (emotion: EmotionCategory) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function StepEmotions({
  selectedEmotions,
  onToggleEmotion,
  onBack,
  onContinue,
}: StepEmotionsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">
          Which emotions resonate?
        </h2>
        <p className="mt-1 text-sm text-slate-500">Select all that apply.</p>
      </div>

      <div className="flex flex-wrap gap-2.5 max-h-[260px] overflow-y-auto pr-1">
        {EMOTIONS.map((emotion) => {
          const isSelected = selectedEmotions.includes(emotion);
          return (
            <button
              key={emotion}
              type="button"
              onClick={() => onToggleEmotion(emotion)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                isSelected
                  ? "bg-violet-100 text-violet-700 ring-1 ring-violet-400"
                  : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              {emotion}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
        >
          &larr; Back
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="px-6 py-2.5 rounded-2xl bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 transition-colors shadow-xs"
        >
          Continue ({selectedEmotions.length}) &rarr;
        </button>
      </div>
    </div>
  );
}
