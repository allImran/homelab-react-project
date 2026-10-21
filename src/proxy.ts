import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";
import { AUTH_ROUTES, PROTECTED_ROUTES, ROUTES, withNext } from "@/config/routes";

const matches = (pathname: string, routes: readonly string[]) =>
  routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

/**
 * Optimistic redirects based on cookie presence only (no DB hit).
 * Real authorization happens in the API handlers via `authedRoute`.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(getSessionCookie(request));

  if (!hasSession && matches(pathname, PROTECTED_ROUTES)) {
    return NextResponse.redirect(new URL(withNext(ROUTES.signIn, pathname), request.url));
  }
  if (hasSession && matches(pathname, AUTH_ROUTES)) {
    return NextResponse.redirect(new URL(ROUTES.dashboard, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
