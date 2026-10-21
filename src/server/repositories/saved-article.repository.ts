import type { Article, SavedArticle } from "@/types/article";
import type { Page } from "@/types/api";

/**
 * Persistence contract for saved articles. Services depend on this interface,
 * never on Drizzle directly, so the storage engine can change without touching callers.
 */
export interface SavedArticleRepository {
  listByUser(userId: string, options: { cursor?: string; limit: number }): Promise<Page<SavedArticle>>;
  /** Idempotent: saving the same URL twice returns the existing record. */
  upsert(userId: string, article: Article): Promise<SavedArticle>;
  remove(userId: string, id: string): Promise<boolean>;
}
