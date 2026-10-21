/** An article as it appears in a feed. Dates are ISO strings so the shape is JSON-safe. */
export interface Article {
  url: string;
  title: string;
  summary: string | null;
  imageUrl: string | null;
  publishedAt: string | null;
  sourceId: string;
  sourceName: string;
}

export interface SavedArticle extends Article {
  id: string;
  savedAt: string;
}

export interface FeedSource {
  id: string;
  name: string;
  url: string;
  category: string;
  /** Accent used for the source's planet and chips. */
  color: string;
}
