import { getFeedSource } from "@/config/feeds";
import { notFound } from "@/lib/http/errors";
import { route } from "@/lib/http/handler";
import { ok } from "@/lib/http/responses";
import { getFeedArticles } from "@/server/services/feeds.service";

export const GET = route<RouteContext<"/api/v1/feeds/[sourceId]">>(async (_request, { params }) => {
  const { sourceId } = await params;
  if (!getFeedSource(sourceId)) throw notFound("Feed");
  return ok(await getFeedArticles(sourceId));
});
