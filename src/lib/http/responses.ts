import "server-only";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import type { ApiErrorBody, ApiSuccess, PageMeta } from "@/types/api";
import { HttpError } from "./errors";

export function ok<T>(data: T, init?: { status?: number; meta?: PageMeta }) {
  const body: ApiSuccess<T> = init?.meta ? { data, meta: init.meta } : { data };
  return NextResponse.json(body, { status: init?.status ?? 200 });
}

export const noContent = () => new NextResponse(null, { status: 204 });

function errorResponse(status: number, code: string, message: string, details?: unknown) {
  const body: ApiErrorBody = { error: { code, message, ...(details ? { details } : {}) } };
  return NextResponse.json(body, { status });
}

export function toErrorResponse(error: unknown) {
  if (error instanceof HttpError) return errorResponse(error.status, error.code, error.message, error.details);
  if (error instanceof ZodError) {
    return errorResponse(400, "validation_error", "Invalid request", error.flatten().fieldErrors);
  }
  if (error instanceof SyntaxError) return errorResponse(400, "invalid_json", "Request body must be valid JSON");

  console.error("[api] unhandled error:", error);
  return errorResponse(500, "internal_error", "Something went wrong");
}
