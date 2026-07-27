import { siteConfig } from "@/config/siteConfig";

const MAX_JSON_BYTES = 16_384;

export function getClientIp(request: Request): string {
  const candidates = [
    request.headers.get("x-vercel-forwarded-for"),
    request.headers.get("x-forwarded-for"),
    request.headers.get("x-real-ip"),
  ];
  const value = candidates.find(Boolean);
  return value?.split(",")[0]?.trim() || "unknown";
}

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const configured = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim().replace(/\/$/, ""))
    .filter(Boolean);

  const allowed = new Set([siteConfig.url, ...configured]);
  if (process.env.NODE_ENV !== "production") {
    allowed.add("http://localhost:3000");
    allowed.add("http://127.0.0.1:3000");
  }

  return allowed.has(origin.replace(/\/$/, ""));
}

export async function readJsonBody(request: Request): Promise<
  | { ok: true; value: unknown }
  | { ok: false; status: 400 | 413 | 415; message: string }
> {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    return { ok: false, status: 415, message: "Content-Type must be application/json." };
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_JSON_BYTES) {
    return { ok: false, status: 413, message: "Request body is too large." };
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_JSON_BYTES) {
    return { ok: false, status: 413, message: "Request body is too large." };
  }

  try {
    return { ok: true, value: JSON.parse(text) as unknown };
  } catch {
    return { ok: false, status: 400, message: "Invalid JSON request body." };
  }
}
