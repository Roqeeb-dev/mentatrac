"use client";

import { useState } from "react";
import { WellnessCategory } from "@/features/wellness/types/wellness";
import {
  WellnessCategories,
  todaysPick,
  wellnessTips,
} from "@/features/wellness/data/wellnessData";
import { WellnessHeader } from "@/features/wellness/components/WellnessHeader";
import { TodaysPickBanner } from "@/features/wellness/components/TodaysPickBanner";
import { WellnessCard } from "@/features/wellness/components/WellnessCard";

export default function WellnessClient() {
  const [activeCategory, setActiveCategory] = useState<WellnessCategory>("All");

  // Filter content based on active tab
  const filteredTips =
    activeCategory === "All"
      ? wellnessTips
      : wellnessTips.filter((tip) => tip.category === activeCategory);

  const showHero = activeCategory === "All";

  return (
    <div className="mx-auto max-w-[1400px] space-y-8 p-6 sm:p-8">
      {/* Header & Filter Tabs */}
      <WellnessHeader
        categories={WellnessCategories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Hero "Today's Pick" (Shown on 'All' tab) */}
      {showHero && <TodaysPickBanner pick={todaysPick} />}

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTips.map((tip) => (
          <WellnessCard key={tip.id} tip={tip} />
        ))}
      </div>

      {/* Footer Medical Disclaimer */}
      <div className="pt-4 text-center">
        <p className="text-[11px] text-slate-400">
          These tips support wellness but are not medical advice. If you're
          struggling, please reach out to a qualified mental health
          professional.
        </p>
      </div>
    </div>
  );
}
