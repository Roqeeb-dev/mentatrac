"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const GENDER_OPTIONS = ["Prefer not to say", "Male", "Female", "Non-binary"];

export default function ProfilePage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Prefer not to say");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setError("Please enter your first name");
      return;
    }

    // Process profile submission / cache data
    router.push("/onboarding/goals"); // Step 6 route
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-2">
        <p className="text-overline font-semibold uppercase tracking-wider text-text-tertiary">
          Your Profile
        </p>
        <h1 className="font-display text-display-lg font-bold text-text-primary">
          Tell us about yourself
        </h1>
      </div>

      {/* 2. Profile Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Your first name"
          type="text"
          placeholder="e.g. Alex"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
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
          onChange={(e) => setAge(e.target.value)}
        />

        {/* 3. Gender Pill Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-body-sm font-medium text-text-primary">
            Gender (optional)
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {GENDER_OPTIONS.map((option) => {
              const isSelected = gender === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setGender(option)}
                  className={`rounded-full px-4 py-2 text-caption font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 ${
                    isSelected
                      ? "border border-purple-700 bg-purple-50 text-purple-700"
                      : "border border-gray-200 bg-white text-text-secondary hover:border-gray-300 hover:text-text-primary"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Actions */}
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
