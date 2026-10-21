import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db, DB_PROVIDER, schema } from "@/lib/db";
import { env } from "@/lib/env";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: DB_PROVIDER, schema }),
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  // Must stay last: lets server actions set auth cookies.
  plugins: [nextCookies()],
});

export type SessionUser = typeof auth.$Infer.Session.user;

export async function getSessionUser(headers: Headers): Promise<SessionUser | null> {
  const session = await auth.api.getSession({ headers });
  return session?.user ?? null;
}
