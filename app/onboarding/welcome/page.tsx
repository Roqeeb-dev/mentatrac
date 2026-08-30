"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Frown, Meh, Smile, Sparkles, HeartHandshake } from "lucide-react";

const MOODS = [
  {
    label: "Awful",
    icon: Frown,
    bg: "bg-mood-hard-light",
    text: "text-mood-hard",
  },
  {
    label: "Low",
    icon: Meh,
    bg: "bg-mood-tough-light",
    text: "text-mood-tough",
  },
  {
    label: "Okay",
    icon: Smile,
    bg: "bg-mood-okay-light",
    text: "text-mood-okay",
  },
  {
    label: "Good",
    icon: HeartHandshake,
    bg: "bg-mood-good-light",
    text: "text-mood-good",
  },
  {
    label: "Great",
    icon: Sparkles,
    bg: "bg-mood-radiant-light",
    text: "text-mood-radiant",
  },
];

export default function WelcomePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-2">
        <p className="text-overline font-semibold uppercase tracking-wider text-text-tertiary">
          Welcome
        </p>
        <h1 className="font-display text-display-lg font-bold text-text-primary">
          Welcome to Mentatrac
        </h1>
      </div>

      {/* 2. Interactive Mood Badges */}
      <div className="flex items-center gap-4 sm:gap-5">
        {MOODS.map((mood) => {
          const Icon = mood.icon;
          return (
            <div key={mood.label} className="flex flex-col items-center gap-2">
              <button
                type="button"
                className={`flex h-12 w-12 items-center justify-center rounded-full ${mood.bg} ${mood.text} transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-700/40`}
                aria-label={mood.label}
              >
                <Icon className="h-6 w-6 stroke-[2]" />
              </button>
              <span className="text-caption font-medium text-text-tertiary">
                {mood.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3. Description Copy */}
      <p className="text-body-md leading-relaxed text-text-secondary">
        Mentatrac helps you build emotional awareness through daily mood
        check-ins, private journaling, and beautiful insights — all in one calm,
        private space.
      </p>

      {/* 4. Actions */}
      <div className="flex flex-col gap-3 pt-2">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          Get started
        </Button>

        <Link
          href="/login"
          className="text-body-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
        >
          I already have an account
        </Link>
      </div>
    </div>
  );
}
