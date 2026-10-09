"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/features/auth/services/auth.service";
import { toast } from "@/stores/toast-store";
import { ApiError } from "@/lib/api/errors";
import type { ChangePasswordPayload } from "@/types/api";
import type {
  LoginPayload,
  SignUpPayload,
  User,
  AuthResponse,
  UpdateMePayload,
  UpdateMeResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  WellnessGoalsPayload,
  WellnessGoalsResponse,
} from "@/types/api";

export const AUTH_QUERY_KEY = ["auth", "me"] as const;

function getDisplayName(user: User) {
  const name = (user as { name?: string | null }).name?.trim();
  return name || user.email.split("@")[0];
}

export function useCurrentUser() {
  return useQuery<User | null>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      try {
        return await authService.getCurrentUser();
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation<AuthResponse, Error, SignUpPayload>({
    mutationFn: (payload) => authService.signUp(payload),
    onSuccess: ({ user }) => {
      queryClient.setQueryData<User>(AUTH_QUERY_KEY, user);
      toast.success("Welcome to Mentatrac!");
    },
    onError: (error) => {
      toast.error(error.message || "Couldn't create your account. Try again.");
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: (payload) => authService.login(payload),
    onSuccess: ({ user }) => {
      queryClient.setQueryData<User>(AUTH_QUERY_KEY, user);
      toast.success(`Welcome back, ${getDisplayName(user)}!`);
    },
    onError: (error) => {
      toast.error(error.message || "Couldn't sign you in. Check your details.");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, void>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      toast.success("You have been logged out.");
    },
  });
}

export function useChangePassword() {
  return useMutation<{ message: string }, Error, ChangePasswordPayload>({
    mutationFn: (payload) => authService.changePassword(payload),
    onSuccess: () => {
      toast.success("Password changed successfully.");
    },
    onError: (error) => {
      const status = error instanceof ApiError ? error.status : undefined;
      if (status === 401) {
        toast.error("Your current password is incorrect.");
      } else if (status === 409) {
        toast.error(
          "Your new password must be different from the current one.",
        );
      } else {
        toast.error(error.message || "Couldn't change your password.");
      }
    },
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, void>({
    mutationFn: () => authService.deleteAccount(),
    onSuccess: () => {
      queryClient.clear();
      toast.success("Your account has been deleted.");
    },
    onError: (error) => {
      toast.error(error.message || "Couldn't delete your account. Try again.");
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation<UpdateMeResponse, Error, UpdateMePayload>({
    mutationFn: (payload) => authService.updateMe(payload),
    onSuccess: (updated) => {
      queryClient.setQueryData<User | null>(AUTH_QUERY_KEY, (old) =>
        old ? { ...old, ...updated } : old,
      );
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(error.message || "Couldn't save your name. Try again.");
    },
  });
}

export function useForgotPassword() {
  return useMutation<{ message: string }, Error, ForgotPasswordPayload>({
    mutationFn: (payload) => authService.forgotPassword(payload),
    onError: (error) => {
      toast.error(error.message || "Couldn't send the reset link. Try again.");
    },
  });
}

export function useResetPassword() {
  return useMutation<{ message: string }, Error, ResetPasswordPayload>({
    mutationFn: (payload) => authService.resetPassword(payload),
    onSuccess: () => {
      toast.success("Password reset. You can log in now.");
    },
    onError: (error) => {
      const status = error instanceof ApiError ? error.status : undefined;
      if (status === 401) {
        toast.error(
          "This reset link is invalid or has expired. Request a new one.",
        );
      } else {
        toast.error(error.message || "Couldn't reset your password.");
      }
    },
  });
}

export function useSaveWellnessGoals() {
  const queryClient = useQueryClient();
  return useMutation<WellnessGoalsResponse, Error, WellnessGoalsPayload>({
    mutationFn: (payload) => authService.saveWellnessGoals(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(error.message || "Couldn't save your goals. Try again.");
    },
  });
}
