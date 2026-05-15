import { auth } from "@/auth";
import { apiEnv } from "@/lib/api/env";
import { isProfileComplete } from "@/lib/api/onboarding";
import type { ProfileStatus } from "@/lib/api/types/backend";
import {
  getRoleHome,
  getRouteRole,
  isPublicRoute,
  roleRoutes,
} from "@/lib/auth-routes";
import { NextResponse } from "next/server";

async function fetchCandidateProfileStatus(
  accessToken: string
): Promise<ProfileStatus | null> {
  try {
    const response = await fetch(`${apiEnv.mainApiUrl}/api/profile/status`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) return null;
    return (await response.json()) as ProfileStatus;
  } catch {
    return null;
  }
}

export default auth(async (req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role;
  const routeRole = getRouteRole(pathname);
  const accessToken = req.auth?.accessToken;

  if (!role && routeRole) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  if (role && isPublicRoute(pathname)) {
    return NextResponse.redirect(new URL(getRoleHome(role), req.url));
  }

  if (role && routeRole && routeRole !== role) {
    return NextResponse.redirect(new URL(getRoleHome(role), req.url));
  }

  if (role === "CANDIDATE" && accessToken) {
    const isOnboardingRoute =
      pathname === "/onboarding" || pathname.startsWith("/onboarding/");
    const isCandidateProtectedRoute = roleRoutes.CANDIDATE.some(
      (route) =>
        route !== "/onboarding" &&
        (pathname === route || pathname.startsWith(`${route}/`))
    );

    if (isOnboardingRoute || isCandidateProtectedRoute) {
      const status = await fetchCandidateProfileStatus(accessToken);
      const complete = isProfileComplete(status);

      if (isCandidateProtectedRoute && !complete) {
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }

      if (isOnboardingRoute && complete) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
