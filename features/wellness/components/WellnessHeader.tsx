"use client";

import { WellnessCategory } from "../types/wellness";

interface Props {
  categories: WellnessCategory[];
  activeCategory: WellnessCategory;
  onSelectCategory: (category: WellnessCategory) => void;
}

export function WellnessHeader({
  categories,
  activeCategory,
  onSelectCategory,
}: Props) {
  return (
    <div className="space-y-5">
      {/* Page Title & Description */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Wellness
        </h1>
        <p className="mt-1 text-xs text-slate-400 font-medium sm:text-sm">
          Practical tools for a calmer, clearer mind
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#E6F4EA] text-[#1E7E34] ring-1 ring-[#B8E2C6]"
                  : "bg-[#F7F7F8] text-slate-500 hover:bg-slate-100"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
