"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";

const FEATURE_POINTS = [
  "Log your mood in under 30 seconds",
  "See patterns across days, weeks & months",
  "Private journal with mood association",
  "Personalised wellness tips based on your data",
];

export default function FeaturesPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/onboarding/create-account");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-2">
        <p className="text-overline font-semibold uppercase tracking-wider text-text-tertiary">
          Features
        </p>
        <h1 className="font-display text-display-lg font-bold text-text-primary">
          Everything you need
        </h1>
      </div>

      {/* 2. Subtitle / Intro Copy */}
      <p className="text-body-md leading-relaxed text-text-secondary">
        Mentatrac is designed around your real needs — no clutter, no clinical
        jargon, just the tools that actually help.
      </p>

      {/* 3. Checklist Items */}
      <div className="flex flex-col gap-3 py-1">
        {FEATURE_POINTS.map((point) => (
          <div key={point} className="flex items-center gap-3">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-500">
              <CheckSquare className="h-4 w-4 stroke-[2.5]" />
            </div>
            <span className="text-body-md font-medium text-text-primary">
              {point}
            </span>
          </div>
        ))}
      </div>

      {/* 4. Actions */}
      <div className="flex flex-col pt-2">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleNext}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          Sounds good
        </Button>
      </div>
    </div>
  );
}
