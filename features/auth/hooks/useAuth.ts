"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/features/auth/services/auth.service";
import type {
  LoginPayload,
  SignUpPayload,
  User,
  AuthResponse,
} from "@/types/api";

export const AUTH_QUERY_KEY = ["auth", "me"] as const;

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
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: (payload) => authService.login(payload),
    onSuccess: ({ user }) => {
      queryClient.setQueryData<User>(AUTH_QUERY_KEY, user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, void>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
