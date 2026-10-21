import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import Parser from "rss-parser";
import { getFeedSource } from "@/config/feeds";
import type { Article } from "@/types/article";
import { normalizeFeedItem, type RawFeedItem } from "../rss/normalize";

const MAX_ARTICLES_PER_FEED = 30;

const parser = new Parser<Record<string, unknown>, RawFeedItem>({
  timeout: 10_000,
  headers: { "User-Agent": "OrbitNews/1.0 (+rss reader)" },
  customFields: {
    item: [
      ["media:content", "mediaContent", { keepArray: true }],
      ["media:thumbnail", "mediaThumbnail"],
    ],
  },
});

/** Fetches and normalizes a feed. Cached for a few minutes so we stay polite to publishers. */
export async function getFeedArticles(sourceId: string): Promise<Article[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`feed:${sourceId}`);

  const source = getFeedSource(sourceId);
  if (!source) return [];

  try {
    const feed = await parser.parseURL(source.url);
    return feed.items
      .map((item) => normalizeFeedItem(item, source))
      .filter((article): article is Article => article !== null)
      .slice(0, MAX_ARTICLES_PER_FEED);
  } catch (error) {
    console.error(`[feeds] failed to load ${source.id}:`, error);
    return [];
  }
}
