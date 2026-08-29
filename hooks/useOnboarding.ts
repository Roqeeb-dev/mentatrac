"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onboardingService } from "@/services/onboarding.service";
import { AUTH_QUERY_KEY } from "@/hooks/useAuth";
import type { UpdateOnboardingPayload } from "@/types/api";
import type { OnboardingStepSlug } from "@/lib/onboarding/step-order";

export function useSaveOnboardingStep() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      step,
      patch,
    }: {
      step: OnboardingStepSlug;
      patch?: UpdateOnboardingPayload;
    }) => onboardingService.saveStep(step, patch),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
    },
  });
}

export function useCompleteOnboarding() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patch?: UpdateOnboardingPayload) =>
      onboardingService.complete(patch),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
    },
  });
}
