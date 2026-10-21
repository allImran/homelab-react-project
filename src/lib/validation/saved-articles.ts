import { z } from "zod";
import { FEED_SOURCE_IDS } from "@/config/feeds";

const httpUrl = z.url({ protocol: /^https?$/ }).max(2048);

export const saveArticleSchema = z.object({
  url: httpUrl,
  title: z.string().trim().min(1).max(500),
  summary: z.string().trim().max(2000).nullable().default(null),
  imageUrl: httpUrl.nullable().default(null),
  publishedAt: z.iso.datetime({ offset: true }).nullable().default(null),
  sourceId: z.enum(FEED_SOURCE_IDS),
});

export type SaveArticleInput = z.infer<typeof saveArticleSchema>;

export const listSavedArticlesSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(30),
});

export type ListSavedArticlesQuery = z.infer<typeof listSavedArticlesSchema>;
