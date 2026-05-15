export type UserRole = "CANDIDATE" | "RECRUITER" | "ADMIN";
export type BackendUserRole =
  | UserRole
  | "SUPER_ADMIN"
  | "HR_MANAGER"
  | "VIEWER";

export const roleHome: Record<UserRole, string> = {
  CANDIDATE: "/dashboard",
  RECRUITER: "/r-dashboard",
  ADMIN: "/admin-dashboard",
};

export const roleRoutes: Record<UserRole, string[]> = {
  CANDIDATE: ["/dashboard", "/missions", "/passport", "/gap-report", "/onboarding"],
  RECRUITER: ["/r-dashboard", "/signals", "/shortlist"],
  ADMIN: ["/admin-dashboard", "/admin-candidates", "/admin-recruiters", "/admin-insights"],
};

export const publicRoutes = ["/", "/login", "/register", "/verify-otp"];

export function getRoleHome(role?: string | null) {
  return role && role in roleHome ? roleHome[role as UserRole] : "/login";
}

export function normalizeRole(role?: string | null): UserRole | null {
  if (role === "SUPER_ADMIN") return "ADMIN";
  if (role === "CANDIDATE" || role === "RECRUITER" || role === "ADMIN") return role;
  return null;
}

export function getRouteRole(pathname: string) {
  return (Object.entries(roleRoutes) as [UserRole, string[]][]).find(([, routes]) =>
    routes.some((route) => pathname === route || pathname.startsWith(`${route}/`))
  )?.[0];
}

export function isPublicRoute(pathname: string) {
  return publicRoutes.some((route) => pathname === route);
}
