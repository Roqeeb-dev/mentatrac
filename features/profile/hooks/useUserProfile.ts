import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../services/profile.service";
import type {
  UserProfile,
  UpdateProfileSettingsPayload,
} from "../types/profile";
import { AUTH_QUERY_KEY } from "@/features/auth/hooks/useAuth";

export const profileKeys = {
  all: ["profile"] as const,
  details: () => [...profileKeys.all, "detail"] as const,
};

export function useUserProfile() {
  const queryClient = useQueryClient();

  const query = useQuery<UserProfile>({
    queryKey: profileKeys.details(),
    queryFn: profileService.getUserProfile,
    staleTime: 1000 * 60 * 5,
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (payload: UpdateProfileSettingsPayload) =>
      profileService.updateProfileSettings(payload),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(profileKeys.details(), updatedProfile);
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });

  return {
    profile: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetchProfile: query.refetch,
    updateSettings: updateSettingsMutation.mutateAsync,
    isUpdating: updateSettingsMutation.isPending,
  };
}
