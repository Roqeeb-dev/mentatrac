import { apiClient } from "@/lib/api/client";
import { useTokenStore } from "@/stores/auth-token-store";
import type {
  AuthResponse,
  LoginPayload,
  RefreshResponse,
  SignUpPayload,
  User,
} from "@/types/api";

export const authService = {
  async signUp(payload: SignUpPayload) {
    const data = await apiClient.post<AuthResponse>(
      "/api/v1/auth/register",
      payload,
    );
    useTokenStore.getState().setTokens(data);
    return data;
  },

  async login(payload: LoginPayload) {
    const data = await apiClient.post<AuthResponse>(
      "/api/v1/auth/login",
      payload,
    );
    useTokenStore.getState().setTokens(data);
    return data;
  },

  async logout() {
    try {
      await apiClient.post<void>("/api/v1/auth/logout");
    } finally {
      useTokenStore.getState().clearTokens();
    }
  },

  async refresh() {
    const { refreshToken, setTokens, clearTokens } = useTokenStore.getState();
    if (!refreshToken) return null;

    try {
      const data = await apiClient.post<RefreshResponse>(
        "/api/v1/auth/refresh",
        { refreshToken },
      );
      setTokens(data);
      return data;
    } catch {
      clearTokens();
      return null;
    }
  },

  getCurrentUser: () => apiClient.get<User>("/api/v1/users/me"),
};
