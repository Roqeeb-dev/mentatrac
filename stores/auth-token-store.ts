import { create } from "zustand";
import { persist } from "zustand/middleware";

type TokenState = {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  clearTokens: () => void;
};

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: "mentatrac-auth",
      // Access token stays in memory only — short-lived, not worth persisting.
      // Only the refresh token survives a reload.
      partialize: (state) => ({ refreshToken: state.refreshToken }),
    },
  ),
);
