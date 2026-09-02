import { apiClient } from "@/lib/api/client";
import type { AuthResponse, UpdateOnboardingPayload } from "@/types/api";
import type { OnboardingStepSlug } from "@/lib/onboarding/step-order";

export const onboardingService = {
  saveStep: (step: OnboardingStepSlug, patch: UpdateOnboardingPayload = {}) =>
    apiClient.patch<AuthResponse>("/users/me/onboarding", {
      onboardingStep: step,
      ...patch,
    }),

  complete: (patch: UpdateOnboardingPayload = {}) =>
    apiClient.patch<AuthResponse>("/users/me/onboarding", {
      onboardingStep: "ready",
      onboardingCompleted: true,
      ...patch,
    }),
};
