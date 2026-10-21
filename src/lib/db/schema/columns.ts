import { integer } from "drizzle-orm/sqlite-core";

/** Shared column builders so every table stores time the same way. */
export const timestamp = (name: string) => integer(name, { mode: "timestamp_ms" });

export const createdAt = () =>
  timestamp("created_at")
    .notNull()
    .$defaultFn(() => new Date());

export const updatedAt = () =>
  timestamp("updated_at")
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date());
