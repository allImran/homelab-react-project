/** Returns the URL only if it is an absolute http(s) URL; blocks `javascript:` and friends. */
export function toSafeHttpUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

/** Accepts only same-origin relative paths, preventing open redirects via `?next=`. */
export function toSafeRedirectPath(value: string | null | undefined, fallback = "/dashboard"): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}
