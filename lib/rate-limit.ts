const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

// In-memory rate limit store — resets on server restart.
// For production, consider using Redis or Supabase-based tracking.
const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS;
}
