export const ONBOARDING_STEP_SLUGS = [
  "welcome",
  "privacy",
  "features",
  "create-account",
  "profile",
  "goals",
  "reminders",
  "ready",
] as const;

export type OnboardingStepSlug = (typeof ONBOARDING_STEP_SLUGS)[number];

export const AUTH_REQUIRED_FROM_INDEX =
  ONBOARDING_STEP_SLUGS.indexOf("profile");

export function isValidStepSlug(slug: string): slug is OnboardingStepSlug {
  return (ONBOARDING_STEP_SLUGS as readonly string[]).includes(slug);
}
