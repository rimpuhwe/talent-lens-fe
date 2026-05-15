const mainApiUrl =
  process.env.NEXT_PUBLIC_MAIN_API_URL ??
  process.env.MAIN_API_URL ??
  "https://talent-lens-be-production.up.railway.app";

const aiApiUrl =
  process.env.NEXT_PUBLIC_AI_API_URL ??
  process.env.AI_API_URL ??
  "https://talent-ai-production-1975.up.railway.app";

/** Browser-facing proxy paths (see next.config.mjs rewrites) */
export const apiProxyPaths = {
  main: "/api/proxy/main",
  ai: "/api/proxy/ai",
} as const;

/** Direct backend URL for server-side calls (auth, RSC, route handlers). */
export const apiEnv = {
  mainApiUrl,
  aiApiUrl,
  authSecret: process.env.AUTH_SECRET,
  isDev: process.env.NODE_ENV === "development",
} as const;

/** Resolves API base URL: browser uses same-origin proxy; server uses direct URL. */
export function resolveMainApiUrl() {
  if (typeof window !== "undefined") return apiProxyPaths.main;
  return apiEnv.mainApiUrl;
}

export function resolveAiApiUrl() {
  if (typeof window !== "undefined") return apiProxyPaths.ai;
  return apiEnv.aiApiUrl;
}
