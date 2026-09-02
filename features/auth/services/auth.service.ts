import { apiClient } from "@/lib/api/client";
import type { AuthResponse, LoginPayload, SignUpPayload } from "@/types/api";

export const authService = {
  signUp: (payload: SignUpPayload) =>
    apiClient.post<AuthResponse>("/auth/sign-up", payload),

  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>("/auth/login", payload),

  logout: () => apiClient.post<void>("/auth/logout"),

  getCurrentUser: () => apiClient.get<AuthResponse>("/auth/me"),
};
