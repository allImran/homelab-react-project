import "server-only";
import { getSessionUser, type SessionUser } from "@/lib/auth/server";
import { HttpError } from "./errors";
import { toErrorResponse } from "./responses";

type Handler<Ctx> = (request: Request, context: Ctx) => Promise<Response>;
type AuthedHandler<Ctx> = (request: Request, context: Ctx & { user: SessionUser }) => Promise<Response>;

/** Wraps a route handler with uniform error handling. */
export function route<Ctx>(handler: Handler<Ctx>): Handler<Ctx> {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (error) {
      return toErrorResponse(error);
    }
  };
}

/** Like `route`, but rejects unauthenticated requests and injects the signed-in user. */
export function authedRoute<Ctx>(handler: AuthedHandler<Ctx>): Handler<Ctx> {
  return route(async (request, context) => {
    const user = await getSessionUser(request.headers);
    if (!user) throw new HttpError(401, "unauthorized", "Sign in to continue");
    return handler(request, { ...context, user });
  });
}
