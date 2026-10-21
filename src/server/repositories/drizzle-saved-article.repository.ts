import "server-only";
import { and, desc, eq, lt, or } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import type { SavedArticleRow } from "@/lib/db/schema";
import { decodeCursor, encodeCursor } from "@/lib/pagination";
import type { SavedArticle } from "@/types/article";
import type { SavedArticleRepository } from "./saved-article.repository";

const { savedArticle } = schema;

function toSavedArticle(row: SavedArticleRow): SavedArticle {
  return {
    id: row.id,
    url: row.url,
    title: row.title,
    summary: row.summary,
    imageUrl: row.imageUrl,
    sourceId: row.sourceId,
    sourceName: row.sourceName,
    publishedAt: row.publishedAt?.toISOString() ?? null,
    savedAt: row.savedAt.toISOString(),
  };
}

function afterCursor(rawCursor: string | undefined) {
  const cursor = decodeCursor(rawCursor);
  if (!cursor) return undefined;
  const savedAt = new Date(cursor.timestamp);
  return or(
    lt(savedArticle.savedAt, savedAt),
    and(eq(savedArticle.savedAt, savedAt), lt(savedArticle.id, cursor.id)),
  );
}

export const drizzleSavedArticleRepository: SavedArticleRepository = {
  async listByUser(userId, { cursor, limit }) {
    const rows = await db
      .select()
      .from(savedArticle)
      .where(and(eq(savedArticle.userId, userId), afterCursor(cursor)))
      .orderBy(desc(savedArticle.savedAt), desc(savedArticle.id))
      .limit(limit + 1);

    const hasMore = rows.length > limit;
    const items = rows.slice(0, limit).map(toSavedArticle);
    const last = rows[limit - 1];

    return {
      items,
      nextCursor: hasMore ? encodeCursor({ timestamp: last.savedAt.getTime(), id: last.id }) : null,
    };
  },

  async upsert(userId, article) {
    const values = {
      ...article,
      userId,
      publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
    };
    const [row] = await db
      .insert(savedArticle)
      .values(values)
      .onConflictDoUpdate({
        target: [savedArticle.userId, savedArticle.url],
        set: { title: values.title, summary: values.summary, imageUrl: values.imageUrl },
      })
      .returning();
    return toSavedArticle(row);
  },

  async remove(userId, id) {
    const deleted = await db
      .delete(savedArticle)
      .where(and(eq(savedArticle.id, id), eq(savedArticle.userId, userId)))
      .returning({ id: savedArticle.id });
    return deleted.length > 0;
  },
};
