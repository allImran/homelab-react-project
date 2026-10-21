import { FEED_SOURCES } from "@/config/feeds";
import { ok } from "@/lib/http/responses";

export function GET() {
  return ok(FEED_SOURCES.map(({ id, name, category, color }) => ({ id, name, category, color })));
}
