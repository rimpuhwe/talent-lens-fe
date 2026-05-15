import { auth } from "@/auth";
import { getRoleHome, getRouteRole, isPublicRoute } from "@/lib/auth-routes";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role;
  const routeRole = getRouteRole(pathname);

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

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
