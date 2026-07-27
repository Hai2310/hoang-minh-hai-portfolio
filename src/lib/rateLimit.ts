/**
 * Rate limiting with an optional shared Upstash Redis REST backend.
 * Falls back to a bounded in-memory fixed window for local/single-instance deployments.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const SWEEP_INTERVAL_MS = 60_000;
const MAX_LOCAL_BUCKETS = 10_000;
let lastSweep = Date.now();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
  backend: "redis" | "memory";
}

function sweep(now: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS && buckets.size < MAX_LOCAL_BUCKETS) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  if (buckets.size > MAX_LOCAL_BUCKETS) {
    const overflow = buckets.size - MAX_LOCAL_BUCKETS;
    for (const key of [...buckets.keys()].slice(0, overflow)) buckets.delete(key);
  }
}

function memoryRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: Math.max(0, limit - 1), retryAfterSeconds: 0, backend: "memory" };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
      backend: "memory",
    };
  }

  bucket.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, limit - bucket.count),
    retryAfterSeconds: 0,
    backend: "memory",
  };
}

async function redisRateLimit(key: string, limit: number, windowMs: number): Promise<RateLimitResult | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const script = [
    'local count = redis.call("INCR", KEYS[1])',
    'if count == 1 then redis.call("PEXPIRE", KEYS[1], ARGV[1]) end',
    'local ttl = redis.call("PTTL", KEYS[1])',
    'return {count, ttl}',
  ].join("\n");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["EVAL", script, "1", key, String(windowMs)]),
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });
    if (!response.ok) return null;

    const payload = (await response.json()) as { result?: [number | string, number | string] };
    if (!Array.isArray(payload.result) || payload.result.length < 2) return null;

    const count = Number(payload.result[0]);
    const ttlMs = Number(payload.result[1]);
    if (!Number.isFinite(count) || !Number.isFinite(ttlMs)) return null;

    return {
      allowed: count <= limit,
      remaining: Math.max(0, limit - count),
      retryAfterSeconds: count <= limit ? 0 : Math.max(1, Math.ceil(ttlMs / 1000)),
      backend: "redis",
    };
  } catch {
    return null;
  }
}

export async function rateLimit(key: string, limit = 5, windowMs = 60_000): Promise<RateLimitResult> {
  return (await redisRateLimit(key, limit, windowMs)) ?? memoryRateLimit(key, limit, windowMs);
}
