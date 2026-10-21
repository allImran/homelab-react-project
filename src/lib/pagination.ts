/** Opaque keyset cursor: works identically on SQLite and Postgres (no OFFSET scans). */
export interface Cursor {
  timestamp: number;
  id: string;
}

export function encodeCursor(cursor: Cursor): string {
  return Buffer.from(`${cursor.timestamp}:${cursor.id}`).toString("base64url");
}

export function decodeCursor(value: string | undefined): Cursor | null {
  if (!value) return null;
  const [timestamp, id] = Buffer.from(value, "base64url").toString().split(":");
  const ms = Number(timestamp);
  return Number.isFinite(ms) && id ? { timestamp: ms, id } : null;
}
