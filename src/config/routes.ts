export const ROUTES = {
  home: "/",
  feeds: "/feeds",
  dashboard: "/dashboard",
  signIn: "/sign-in",
  signUp: "/sign-up",
} as const;

export const PROTECTED_ROUTES = [ROUTES.dashboard];
export const AUTH_ROUTES = [ROUTES.signIn, ROUTES.signUp];

export const withNext = (path: string, next: string) => `${path}?next=${encodeURIComponent(next)}`;
