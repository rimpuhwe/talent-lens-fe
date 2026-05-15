"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { setRefreshHandler, setTokenResolver } from "@/lib/api/interceptors/auth.interceptor";
import { setUnauthorizedHandler } from "@/lib/api/interceptors/error.interceptor";
import { getStoredRefreshToken } from "@/lib/api/auth/token";
import { authApi } from "@/lib/api/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { useOnboardingStore } from "@/stores/onboarding.store";

export function AuthBootstrap() {
  const { data: session, status } = useSession();
  const hydrate = useAuthStore((s) => s.hydrate);
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);
  const resetOnboarding = useOnboardingStore((s) => s.reset);

  useEffect(() => {
    hydrate();

    setTokenResolver(() => session?.accessToken ?? useAuthStore.getState().accessToken);
    setUnauthorizedHandler(() => {
      clearSession();
      resetOnboarding();
      window.location.href = "/login";
    });

    setRefreshHandler(async () => {
      const refreshToken = getStoredRefreshToken();
      if (!refreshToken) return null;
      try {
        const result = await authApi.refreshToken(refreshToken);
        const token = (result as { token?: string }).token;
        if (!token) return null;
        useAuthStore.getState().setSession({
          accessToken: token,
          role: useAuthStore.getState().role!,
          refreshToken,
        });
        return token;
      } catch {
        return null;
      }
    });
  }, [session?.accessToken, hydrate, clearSession, resetOnboarding]);

  useEffect(() => {
    if (status === "loading") return;

    if (session?.accessToken && session.user?.role) {
      setSession({
        accessToken: session.accessToken,
        role: session.user.role,
      });
      return;
    }

    if (status === "unauthenticated") {
      clearSession();
      resetOnboarding();
    }
  }, [session, status, setSession, clearSession, resetOnboarding]);

  return null;
}
