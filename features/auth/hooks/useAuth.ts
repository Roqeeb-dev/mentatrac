"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/features/auth/services/auth.service";
import { toast } from "@/stores/toast-store";
import type {
  LoginPayload,
  SignUpPayload,
  User,
  AuthResponse,
} from "@/types/api";

export const AUTH_QUERY_KEY = ["auth", "me"] as const;

// The backend returns `name`; fall back to the email prefix if it's empty.
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
