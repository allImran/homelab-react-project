import type { Article, SavedArticle } from "@/types/article";
import type { ApiErrorBody, ApiSuccess } from "@/types/api";

export class ApiClientError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<ApiSuccess<T>> {
  const response = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (response.status === 204) return { data: undefined as T };

  const body = (await response.json()) as ApiSuccess<T> | ApiErrorBody;
  if (!response.ok || "error" in body) {
    const message = "error" in body ? body.error.message : response.statusText;
    throw new ApiClientError(response.status, message);
  }
  return body;
}

export const SAVED_ARTICLES_KEY = "/api/v1/saved?limit=100";

export const savedArticlesApi = {
  list: (key: string = SAVED_ARTICLES_KEY) => request<SavedArticle[]>(key),
  save: (article: Article) =>
    request<SavedArticle>("/api/v1/saved", { method: "POST", body: JSON.stringify(article) }).then((r) => r.data),
  remove: (id: string) => request<void>(`/api/v1/saved/${id}`, { method: "DELETE" }),
};
