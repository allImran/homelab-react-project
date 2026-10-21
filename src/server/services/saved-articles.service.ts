import "server-only";
import { getFeedSource } from "@/config/feeds";
import type { ListSavedArticlesQuery, SaveArticleInput } from "@/lib/validation/saved-articles";
import { drizzleSavedArticleRepository } from "../repositories/drizzle-saved-article.repository";
import type { SavedArticleRepository } from "../repositories/saved-article.repository";

export function createSavedArticlesService(repository: SavedArticleRepository) {
  return {
    list: (userId: string, query: ListSavedArticlesQuery) => repository.listByUser(userId, query),

    save(userId: string, input: SaveArticleInput) {
      // The display name comes from our config, never from the client.
      const sourceName = getFeedSource(input.sourceId)?.name ?? input.sourceId;
      return repository.upsert(userId, { ...input, sourceName });
    },

    remove: (userId: string, id: string) => repository.remove(userId, id),
  };
}

export const savedArticlesService = createSavedArticlesService(drizzleSavedArticleRepository);
