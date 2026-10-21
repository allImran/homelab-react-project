import "server-only";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { env } from "@/lib/env";
import * as schema from "./schema";

/**
 * The only file that knows which database driver is in use.
 * To move to Postgres: swap this driver for `drizzle-orm/node-postgres`,
 * switch the schema builders from `sqlite-core` to `pg-core`, and set DB_PROVIDER to "pg".
 */
export const DB_PROVIDER = "sqlite" as const;

function createDb() {
  const sqlite = new Database(env.DATABASE_URL);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  return drizzle(sqlite, { schema });
}

// Reuse one connection across hot reloads in development.
const globalForDb = globalThis as unknown as { db?: ReturnType<typeof createDb> };

export const db = globalForDb.db ?? createDb();

if (process.env.NODE_ENV !== "production") globalForDb.db = db;

export type Db = typeof db;
