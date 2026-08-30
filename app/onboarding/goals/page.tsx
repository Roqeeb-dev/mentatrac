"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const GOAL_OPTIONS = [
  "Reduce stress",
  "Understand my patterns",
  "Build self-awareness",
  "Track anxiety",
  "Improve focus",
  "Practice gratitude",
  "Manage emotions",
  "Build healthy habits",
];

export default function GoalsPage() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((item) => item !== goal)
        : [...prev, goal],
    );
  };

  const handleNext = () => {
    if (selectedGoals.length === 0) return;
    router.push("/onboarding/reminder");
  };

  const hasSelection = selectedGoals.length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-2">
        <p className="text-overline font-semibold uppercase tracking-wider text-text-tertiary">
          Your Goals
        </p>
        <h1 className="font-display text-display-lg font-bold text-text-primary">
          What are your goals?
        </h1>
      </div>

      {/* 2. Subtitle Copy */}
      <p className="text-body-md text-text-secondary">
        Select all that apply. You can change these later.
      </p>

      {/* 3. Multi-Select Goal Pills */}
      <div className="flex flex-wrap items-center gap-2.5 py-1">
        {GOAL_OPTIONS.map((goal) => {
          const isSelected = selectedGoals.includes(goal);
          return (
            <button
              key={goal}
              type="button"
              onClick={() => toggleGoal(goal)}
              className={`rounded-full px-4 py-2 text-caption font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 ${
                isSelected
                  ? "border border-purple-700 bg-purple-50 text-purple-700"
                  : "border border-gray-200 bg-white text-text-secondary hover:border-gray-300 hover:text-text-primary"
              }`}
            >
              {goal}
            </button>
          );
        })}
      </div>

      {/* 4. Actions */}
      <div className="flex flex-col pt-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!hasSelection}
          onClick={handleNext}
          rightIcon={
            hasSelection ? <ArrowRight className="h-4 w-4" /> : undefined
          }
        >
          {hasSelection ? "Continue" : "Select at least one goal"}
        </Button>
      </div>
    </div>
  );
}
