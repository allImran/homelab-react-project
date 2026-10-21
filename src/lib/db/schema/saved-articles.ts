import { index, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { timestamp } from "./columns";

export const savedArticle = sqliteTable(
  "saved_article",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    title: text("title").notNull(),
    summary: text("summary"),
    imageUrl: text("image_url"),
    sourceId: text("source_id").notNull(),
    sourceName: text("source_name").notNull(),
    publishedAt: timestamp("published_at"),
    savedAt: timestamp("saved_at")
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => [
    uniqueIndex("saved_article_user_url_uq").on(t.userId, t.url),
    // Backs the keyset pagination in the repository (user, saved_at desc, id desc).
    index("saved_article_user_saved_at_idx").on(t.userId, t.savedAt, t.id),
  ],
);

export type SavedArticleRow = typeof savedArticle.$inferSelect;
