"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Gender = "prefer_not_to_say" | "male" | "female";

export type OnboardingGoal =
  | "reduce_stress"
  | "understand_patterns"
  | "build_self_awareness"
  | "track_anxiety"
  | "improve_focus"
  | "practice_gratitude"
  | "manage_emotions"
  | "build_healthy_habits";

type OnboardingDraft = {
  firstName: string;
  age: string;
  gender: Gender | null;
  goals: OnboardingGoal[];
  reminderEnabled: boolean;
  reminderTime: string;
};

type OnboardingState = OnboardingDraft & {
  setField: <K extends keyof OnboardingDraft>(
    key: K,
    value: OnboardingDraft[K],
  ) => void;
  toggleGoal: (goal: OnboardingGoal) => void;
  reset: () => void;
};

const initialDraft: OnboardingDraft = {
  firstName: "",
  age: "",
  gender: null,
  goals: [],
  reminderEnabled: true,
  reminderTime: "21:00",
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialDraft,

      setField: (key, value) =>
        set({ [key]: value } as Pick<OnboardingDraft, typeof key>),

      toggleGoal: (goal) =>
        set((state) => ({
          goals: state.goals.includes(goal)
            ? state.goals.filter((g) => g !== goal)
            : [...state.goals, goal],
        })),

      reset: () => set(initialDraft),
    }),
    {
      name: "mentatrac-onboarding-draft",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        firstName: state.firstName,
        age: state.age,
        gender: state.gender,
        goals: state.goals,
        reminderEnabled: state.reminderEnabled,
        reminderTime: state.reminderTime,
      }),
    },
  ),
);
