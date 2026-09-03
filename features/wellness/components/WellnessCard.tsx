"use client";

import { WellnessTip } from "../types/wellness";
import { WellnessCategoryIcon } from "./WellnessCategoryIcon";

interface Props {
  tip: WellnessTip;
}

export function WellnessCard({ tip }: Props) {
  return (
    <div className="group relative flex flex-col justify-between rounded-3xl bg-white p-5 shadow-xs border border-slate-100 transition-all hover:shadow-md">
      <div>
        {/* Header Badge & Duration */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50">
              <WellnessCategoryIcon category={tip.category} />
            </div>
          </div>
          <span className="rounded-full bg-indigo-50/60 px-2.5 py-0.5 text-[10px] font-medium text-indigo-600">
            {tip.duration}
          </span>
        </div>

        {/* Category Label */}
        <span className="mt-4 block text-[10px] font-bold tracking-wider uppercase text-slate-400">
          {tip.category}
        </span>

        {/* Title */}
        <h3 className="mt-1 text-sm font-bold text-slate-900 group-hover:text-[#5B46F6] transition-colors">
          {tip.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-3">
          {tip.description}
        </p>
      </div>

      {/* Read More Link */}
      <div className="mt-4 pt-2">
        <button
          type="button"
          className="text-xs font-semibold text-[#5B46F6] hover:underline"
        >
          Read more +
        </button>
      </div>
    </div>
  );
}
