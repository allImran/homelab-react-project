"use client";

import { useCallback, useMemo } from "react";
import useSWR from "swr";
import { SAVED_ARTICLES_KEY, savedArticlesApi } from "@/lib/api-client";
import { useSession } from "@/lib/auth/client";
import type { Article, SavedArticle } from "@/types/article";

type SavedList = Awaited<ReturnType<typeof savedArticlesApi.list>>;

const withList = (current: SavedList | undefined, update: (items: SavedArticle[]) => SavedArticle[]): SavedList => ({
  ...current,
  data: update(current?.data ?? []),
});

/**
 * Single source of truth for the signed-in user's saved articles.
 * SWR dedupes the request, so every SaveButton on a page shares one fetch.
 */
export function useSavedArticles() {
  const { data: session, isPending: isSessionPending } = useSession();
  const { data, error, isLoading, mutate } = useSWR(session ? SAVED_ARTICLES_KEY : null, savedArticlesApi.list);

  const articles = useMemo(() => data?.data ?? [], [data]);
  const byUrl = useMemo(() => new Map(articles.map((article) => [article.url, article])), [articles]);

  const save = useCallback(
    (article: Article) => {
      const optimistic: SavedArticle = { ...article, id: `pending:${article.url}`, savedAt: new Date().toISOString() };
      return mutate(
        async (current) => {
          const saved = await savedArticlesApi.save(article);
          return withList(current, (items) => [saved, ...items.filter((a) => a.url !== saved.url)]);
        },
        {
          optimisticData: (current) => withList(current, (items) => [optimistic, ...items]),
          rollbackOnError: true,
          revalidate: false,
        },
      );
    },
    [mutate],
  );

  const remove = useCallback(
    (url: string) => {
      const target = byUrl.get(url);
      if (!target) return Promise.resolve();
      const without = (current: SavedList | undefined) => withList(current, (items) => items.filter((a) => a.url !== url));
      return mutate(
        async (current) => {
          await savedArticlesApi.remove(target.id);
          return without(current);
        },
        { optimisticData: without, rollbackOnError: true, revalidate: false },
      );
    },
    [byUrl, mutate],
  );

  return {
    articles,
    error,
    isLoading: isSessionPending || isLoading,
    isSignedIn: Boolean(session),
    isSaved: (url: string) => byUrl.has(url),
    save,
    remove,
  };
}
