import type { Article, FeedSource } from "@/types/article";
import { toSafeHttpUrl } from "@/lib/url";

const SUMMARY_MAX_LENGTH = 280;

interface MediaNode {
  $?: { url?: string; medium?: string; type?: string };
}

export interface RawFeedItem {
  link?: string;
  title?: string;
  contentSnippet?: string;
  content?: string;
  isoDate?: string;
  enclosure?: { url?: string; type?: string };
  mediaContent?: MediaNode[];
  mediaThumbnail?: MediaNode | MediaNode[];
}

const first = <T>(value: T | T[] | undefined): T | undefined => (Array.isArray(value) ? value[0] : value);

function truncate(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

function extractImage(item: RawFeedItem): string | null {
  const enclosure = item.enclosure?.type?.startsWith("image/") ? item.enclosure.url : undefined;
  const imageFromHtml = item.content?.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
  const candidates = [first(item.mediaContent)?.$?.url, first(item.mediaThumbnail)?.$?.url, enclosure, imageFromHtml];
  return candidates.map(toSafeHttpUrl).find(Boolean) ?? null;
}

function extractSummary(item: RawFeedItem): string | null {
  const text = item.contentSnippet?.replace(/\s+/g, " ").trim();
  return text ? truncate(text, SUMMARY_MAX_LENGTH) : null;
}

function toIsoDate(value: string | undefined): string | null {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toISOString() : null;
}

/** Maps a raw parser item to our Article shape, or null if it lacks a usable link/title. */
export function normalizeFeedItem(item: RawFeedItem, source: FeedSource): Article | null {
  const url = toSafeHttpUrl(item.link);
  const title = item.title?.trim();
  if (!url || !title) return null;

  return {
    url,
    title,
    summary: extractSummary(item),
    imageUrl: extractImage(item),
    publishedAt: toIsoDate(item.isoDate),
    sourceId: source.id,
    sourceName: source.name,
  };
}
