const mainApiUrl =
  process.env.NEXT_PUBLIC_MAIN_API_URL ??
  process.env.MAIN_API_URL ??
  "https://talent-lens-be-production.up.railway.app";

const aiApiUrl =
  process.env.NEXT_PUBLIC_AI_API_URL ??
  process.env.AI_API_URL ??
  "https://talent-ai-production-1975.up.railway.app";

export const apiEnv = {
  mainApiUrl,
  aiApiUrl,
  authSecret: process.env.AUTH_SECRET,
  isDev: process.env.NODE_ENV === "development",
} as const;
