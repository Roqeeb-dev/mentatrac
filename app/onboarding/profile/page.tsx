"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useOnboardingDraft } from "@/features/onboarding/hooks/useOnboardingDraft";
import type { Gender } from "@/stores/useOnboardingStore";

const GENDER_OPTIONS: { id: Gender; label: string }[] = [
  { id: "prefer_not_to_say", label: "Prefer not to say" },
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { firstName, age, gender, setField, isHydrated } = useOnboardingDraft();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setError("Please enter your first name");
      return;
    }

    router.push("/onboarding/goals");
  };

  if (!isHydrated) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="flex flex-col gap-5">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <p className="text-overline font-semibold uppercase tracking-wider text-text-tertiary">
          Your Profile
        </p>
        <h1 className="font-display text-display-lg font-bold text-text-primary">
          Tell us about yourself
        </h1>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Your first name"
          type="text"
          placeholder="e.g. Alex"
          value={firstName}
          onChange={(e) => {
            setField("firstName", e.target.value);
            if (error) setError("");
          }}
          error={error}
          required
        />

        <Input
          label="Age (optional)"
          type="number"
          placeholder="e.g. 28"
          value={age}
          onChange={(e) => setField("age", e.target.value)}
        />

        {/* Gender Pill Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-body-sm font-medium text-text-primary">
            Gender (optional)
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {GENDER_OPTIONS.map((option) => {
              const isSelected = gender === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setField("gender", option.id)}
                  className={`rounded-full px-4 py-2 text-caption font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 ${
                    isSelected
                      ? "border border-purple-700 bg-purple-50 text-purple-700"
                      : "border border-gray-200 bg-white text-text-secondary hover:border-gray-300 hover:text-text-primary"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col pt-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={!firstName.trim()}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
