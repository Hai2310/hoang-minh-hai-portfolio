import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";
import { getClientIp, isAllowedOrigin, readJsonBody } from "@/lib/requestSecurity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const jsonHeaders = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { ok: false, message: "Origin is not allowed." },
      { status: 403, headers: jsonHeaders },
    );
  }

  const ip = getClientIp(request);
  const limit = await rateLimit(`portfolio:contact:${ip}`, 5, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          ...jsonHeaders,
          "Retry-After": String(limit.retryAfterSeconds),
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  const body = await readJsonBody(request);
  if (!body.ok) {
    return NextResponse.json(
      { ok: false, message: body.message },
      { status: body.status, headers: jsonHeaders },
    );
  }

  // Honeypot: silently accept bot submissions without sending anything.
  if (typeof body.value === "object" && body.value !== null && "website" in body.value) {
    const honeypot = (body.value as Record<string, unknown>).website;
    if (typeof honeypot === "string" && honeypot.length > 0) {
      return NextResponse.json({ ok: true }, { headers: jsonHeaders });
    }
  }

  const parsed = contactSchema.safeParse(body.value);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the form fields and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400, headers: jsonHeaders },
    );
  }

  const result = await sendContactEmail(parsed.data);

  if (result.ok) {
    return NextResponse.json(
      { ok: true },
      {
        headers: {
          ...jsonHeaders,
          "X-RateLimit-Remaining": String(limit.remaining),
        },
      },
    );
  }

  if (result.reason === "not-configured") {
    return NextResponse.json(
      { ok: false, code: "EMAIL_NOT_CONFIGURED", message: "Email service is not configured." },
      { status: 503, headers: jsonHeaders },
    );
  }

  console.error("Contact provider error:", result.detail ?? "unknown provider error");
  return NextResponse.json(
    { ok: false, message: "The email provider rejected the message." },
    { status: 502, headers: jsonHeaders },
  );
}
