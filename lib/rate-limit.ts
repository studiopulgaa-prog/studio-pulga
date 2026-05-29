type Entry = { count: number; reset: number };
const stores = new Map<string, Map<string, Entry>>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetIn: number;
};

export function rateLimit(
  bucket: string,
  key: string,
  max: number,
  windowMs: number
): RateLimitResult {
  if (!stores.has(bucket)) stores.set(bucket, new Map());
  const store = stores.get(bucket)!;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.reset < now) {
    store.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: max - 1, resetIn: Math.ceil(windowMs / 1000) };
  }

  entry.count++;
  const remaining = Math.max(0, max - entry.count);
  const resetIn = Math.max(0, Math.ceil((entry.reset - now) / 1000));
  return { ok: entry.count <= max, remaining, resetIn };
}

export function getClientIpFromHeaders(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return headers.get('x-real-ip') || 'unknown';
}
