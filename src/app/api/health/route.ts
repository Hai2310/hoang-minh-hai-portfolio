import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Lightweight health check for Docker and uptime probes. */
export function GET() {
  return NextResponse.json(
    { status: "ok", service: "hmh-portfolio", timestamp: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } },
  );
}
