import type { FeedSource } from "@/types/article";

export const FEED_SOURCES = [
  {
    id: "bbc-world",
    name: "BBC World",
    url: "https://feeds.bbci.co.uk/news/world/rss.xml",
    category: "World",
    color: "#e5806a",
  },
  {
    id: "guardian-world",
    name: "The Guardian",
    url: "https://www.theguardian.com/world/rss",
    category: "World",
    color: "#e8a25c",
  },
  {
    id: "npr",
    name: "NPR News",
    url: "https://feeds.npr.org/1001/rss.xml",
    category: "World",
    color: "#c9b8e8",
  },
  {
    id: "the-verge",
    name: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
    category: "Technology",
    color: "#86c9a8",
  },
  {
    id: "wired",
    name: "Wired",
    url: "https://www.wired.com/feed/rss",
    category: "Technology",
    color: "#7fb4e0",
  },
  {
    id: "nasa",
    name: "NASA",
    url: "https://www.nasa.gov/news-release/feed/",
    category: "Science",
    color: "#efe8dc",
  },
  {
    id: "science-daily",
    name: "ScienceDaily",
    url: "https://www.sciencedaily.com/rss/all.xml",
    category: "Science",
    color: "#a09fa6",
  },
] as const satisfies readonly FeedSource[];

export type FeedSourceId = (typeof FEED_SOURCES)[number]["id"];

export const FEED_SOURCE_IDS = FEED_SOURCES.map((s) => s.id) as [FeedSourceId, ...FeedSourceId[]];

export const DEFAULT_FEED_SOURCE_ID: FeedSourceId = FEED_SOURCES[0].id;

export function getFeedSource(id: string): FeedSource | undefined {
  return FEED_SOURCES.find((source) => source.id === id);
}

export const feedPath = (id: string) => `/feeds/${id}`;
