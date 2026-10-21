import { authedRoute } from "@/lib/http/handler";
import { ok } from "@/lib/http/responses";
import { listSavedArticlesSchema, saveArticleSchema } from "@/lib/validation/saved-articles";
import { savedArticlesService } from "@/server/services/saved-articles.service";

export const GET = authedRoute(async (request, { user }) => {
  const searchParams = Object.fromEntries(new URL(request.url).searchParams);
  const query = listSavedArticlesSchema.parse(searchParams);
  const { items, nextCursor } = await savedArticlesService.list(user.id, query);
  return ok(items, { meta: { nextCursor } });
});

export const POST = authedRoute(async (request, { user }) => {
  const input = saveArticleSchema.parse(await request.json());
  return ok(await savedArticlesService.save(user.id, input), { status: 201 });
});
