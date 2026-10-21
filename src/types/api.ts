export interface PageMeta {
  nextCursor: string | null;
}

export interface Page<T> extends PageMeta {
  items: T[];
}

export interface ApiSuccess<T> {
  data: T;
  meta?: PageMeta;
}

export interface ApiErrorBody {
  error: { code: string; message: string; details?: unknown };
}
