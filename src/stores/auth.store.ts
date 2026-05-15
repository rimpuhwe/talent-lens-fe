import { create } from "zustand";
import type { UserRole } from "@/lib/auth-routes";
import {
  clearAuthStorage,
  getStoredAccessToken,
  getStoredRole,
  setAuthStorage,
} from "@/lib/api/auth/token";

interface AuthState {
  accessToken: string | null;
  role: UserRole | null;
  hydrated: boolean;
  hydrate: () => void;
  setSession: (session: { accessToken: string; role: UserRole; refreshToken?: string }) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  role: null,
  hydrated: false,
  hydrate: () =>
    set({
      accessToken: getStoredAccessToken(),
      role: getStoredRole(),
      hydrated: true,
    }),
  setSession: ({ accessToken, role, refreshToken }) => {
    setAuthStorage({ accessToken, role, refreshToken });
    set({ accessToken, role, hydrated: true });
  },
  clearSession: () => {
    clearAuthStorage();
    set({ accessToken: null, role: null, hydrated: true });
  },
}));
