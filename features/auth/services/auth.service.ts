import { apiClient } from "@/lib/api/client";
import { useTokenStore } from "@/stores/auth-token-store";
import type {
  AuthResponse,
  LoginPayload,
  RefreshResponse,
  SignUpPayload,
  ChangePasswordPayload,
  UpdateMePayload,
  UpdateMeResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  User,
} from "@/types/api";

export const authService = {
  async signUp(payload: SignUpPayload) {
    const data = await apiClient.post<AuthResponse>("/auth/register", payload);
    useTokenStore.getState().setTokens(data);
    return data;
  },

  async login(payload: LoginPayload) {
    const data = await apiClient.post<AuthResponse>("/auth/login", payload);
    useTokenStore.getState().setTokens(data);
    return data;
  },

  async logout() {
    try {
      await apiClient.post<void>("/auth/logout");
    } finally {
      useTokenStore.getState().clearTokens();
    }
  },

  async deleteAccount() {
    const data = await apiClient.delete<{ message: string }>("/users/me");
    useTokenStore.getState().clearTokens();
    return data;
  },

  async refresh() {
    const { refreshToken, setTokens, clearTokens } = useTokenStore.getState();
    if (!refreshToken) return null;

    try {
      const data = await apiClient.post<RefreshResponse>("/auth/refresh", {
        refreshToken,
      });
      setTokens(data);
      return data;
    } catch {
      clearTokens();
      return null;
    }
  },

  getCurrentUser: () => apiClient.get<User>("/users/me"),

  updateMe: (payload: UpdateMePayload) =>
    apiClient.patch<UpdateMeResponse>("/users/me", payload),

  changePassword: (payload: ChangePasswordPayload) =>
    apiClient.patch<{ message: string }>("/users/me/password", payload),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    apiClient.post<{ message: string }>("/auth/forgot-password", payload),

  resetPassword: (payload: ResetPasswordPayload) =>
    apiClient.post<{ message: string }>("/auth/reset-password", payload),
};
