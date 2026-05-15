import type { ProfileStatus } from "./types/backend";

export function isProfileComplete(status?: ProfileStatus | null) {
  if (!status) return false;
  return Boolean(
    status.profileCompleted ??
      status.completed ??
      status.isCompleted ??
      status.completionPercentage === 100
  );
}

export function getPostAuthRedirect(
  role: string | null | undefined,
  status?: ProfileStatus | null
) {
  if (role === "CANDIDATE") {
    return isProfileComplete(status) ? "/dashboard" : "/onboarding";
  }
  if (role === "RECRUITER") return "/r-dashboard";
  if (role === "ADMIN") return "/admin-dashboard";
  return "/login";
}
