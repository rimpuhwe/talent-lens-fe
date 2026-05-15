import type { UserRole } from "@/lib/auth-routes";

const TOKEN_KEY = "tl_access_token";
const REFRESH_KEY = "tl_refresh_token";
const ROLE_KEY = "tl_role";

export function getStoredAccessToken() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token || token === "undefined" || token === "null") return null;
  return token;
}

export function getStoredRefreshToken() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(REFRESH_KEY);
  if (!token || token === "undefined" || token === "null") return null;
  return token;
}

export function getStoredRole(): UserRole | null {
  if (typeof window === "undefined") return null;
  const role = localStorage.getItem(ROLE_KEY);
  if (!role || role === "undefined" || role === "null") return null;
  return role as UserRole;
}

export function setAuthStorage(tokens: {
  accessToken: string;
  refreshToken?: string | null;
  role?: UserRole | null;
}) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, tokens.accessToken);
  if (tokens.refreshToken) {
    localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
  }
  if (tokens.role) {
    localStorage.setItem(ROLE_KEY, tokens.role);
  }
  // Legacy keys used by older pages
  localStorage.setItem("token", tokens.accessToken);
  if (tokens.role) localStorage.setItem("role", tokens.role);
}

export function clearAuthStorage() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
}
