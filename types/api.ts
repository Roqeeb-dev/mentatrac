import type { OnboardingStepSlug } from "@/lib/onboarding/step-order";

export type Gender = "prefer_not_to_say" | "male" | "female" | "non_binary";

export type OnboardingGoal =
  | "reduce_stress"
  | "understand_patterns"
  | "build_self_awareness"
  | "track_anxiety"
  | "improve_focus"
  | "practice_gratitude"
  | "manage_emotions"
  | "build_healthy_habits";

export type User = {
  id: string;
  email: string;
  firstName?: string;
  age?: number;
  gender?: Gender;
  goals?: OnboardingGoal[];
  reminderEnabled?: boolean;
  reminderTime?: string;
  onboardingStep: OnboardingStepSlug;
  onboardingCompleted: boolean;
  createdAt: string;
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export type SignUpPayload = AuthCredentials;
export type LoginPayload = AuthCredentials;

export type AuthResponse = {
  user: User;
};

export type UpdateOnboardingPayload = Partial<
  Pick<
    User,
    | "firstName"
    | "age"
    | "gender"
    | "goals"
    | "reminderEnabled"
    | "reminderTime"
  >
> & {
  onboardingStep?: OnboardingStepSlug;
  onboardingCompleted?: boolean;
};
