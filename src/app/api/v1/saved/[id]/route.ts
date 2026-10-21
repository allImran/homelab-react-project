import { notFound } from "@/lib/http/errors";
import { authedRoute } from "@/lib/http/handler";
import { noContent } from "@/lib/http/responses";
import { savedArticlesService } from "@/server/services/saved-articles.service";

export const DELETE = authedRoute<RouteContext<"/api/v1/saved/[id]">>(async (_request, { params, user }) => {
  const { id } = await params;
  const removed = await savedArticlesService.remove(user.id, id);
  if (!removed) throw notFound("Saved article");
  return noContent();
});
