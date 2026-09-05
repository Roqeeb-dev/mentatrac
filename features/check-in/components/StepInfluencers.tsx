"use client";

import { InfluencerCategory } from "../types/checkIn";
import { INFLUENCERS } from "../types/checkInOptions";
import { Button } from "@/components/ui/Button";

interface StepInfluencersProps {
  selectedInfluencers: InfluencerCategory[];
  onToggleInfluencer: (influencer: InfluencerCategory) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function StepInfluencers({
  selectedInfluencers,
  onToggleInfluencer,
  onBack,
  onContinue,
}: StepInfluencersProps) {
  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">
          What influenced this?
        </h2>
        <p className="mt-1 text-sm text-slate-500">Common factors today.</p>
      </div>

      <div className="flex flex-wrap gap-2.5 max-h-[260px] overflow-y-auto pr-1">
        {INFLUENCERS.map((factor) => {
          const isSelected = selectedInfluencers.includes(factor);
          return (
            <button
              key={factor}
              type="button"
              onClick={() => onToggleInfluencer(factor)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                isSelected
                  ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-400"
                  : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              {factor}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <Button
          type="button"
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="!text-slate-400 hover:!text-slate-600"
        >
          &larr; Back
        </Button>
        <Button
          type="button"
          onClick={onContinue}
          variant="primary"
          disabled={selectedInfluencers.length === 0}
        >
          Continue ({selectedInfluencers.length}) &rarr;
        </Button>
      </div>
    </div>
  );
}
