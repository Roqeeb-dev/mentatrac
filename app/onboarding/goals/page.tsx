"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useOnboardingDraft } from "@/features/onboarding/hooks/useOnboardingDraft";
import type { OnboardingGoal } from "@/stores/useOnboardingStore";

const GOAL_OPTIONS: { id: OnboardingGoal; label: string }[] = [
  { id: "reduce_stress", label: "Reduce stress" },
  { id: "understand_patterns", label: "Understand my patterns" },
  { id: "build_self_awareness", label: "Build self-awareness" },
  { id: "track_anxiety", label: "Track anxiety" },
  { id: "improve_focus", label: "Improve focus" },
  { id: "practice_gratitude", label: "Practice gratitude" },
  { id: "manage_emotions", label: "Manage emotions" },
  { id: "build_healthy_habits", label: "Build healthy habits" },
];

export default function GoalsPage() {
  const router = useRouter();
  const { goals, toggleGoal, isHydrated } = useOnboardingDraft();

  const handleNext = () => {
    if (goals.length === 0) return;
    router.push("/onboarding/reminder");
  };

  const hasSelection = goals.length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <p className="text-overline font-semibold uppercase tracking-wider text-text-tertiary">
          Your Goals
        </p>
        <h1 className="font-display text-display-lg font-bold text-text-primary">
          What are your goals?
        </h1>
      </div>

      <p className="text-body-md text-text-secondary">
        Select all that apply. You can change these later.
      </p>

      {/* Multi-Select Goal Pills */}
      {!isHydrated ? (
        <div className="flex flex-wrap items-center gap-2.5 py-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-28 rounded-full" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2.5 py-1">
          {GOAL_OPTIONS.map((goal) => {
            const isSelected = goals.includes(goal.id);
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => toggleGoal(goal.id)}
                className={`rounded-full px-4 py-2 text-caption font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 ${
                  isSelected
                    ? "border border-purple-700 bg-purple-50 text-purple-700"
                    : "border border-gray-200 bg-white text-text-secondary hover:border-gray-300 hover:text-text-primary"
                }`}
              >
                {goal.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col pt-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!isHydrated || !hasSelection}
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
