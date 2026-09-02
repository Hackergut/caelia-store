import { NextResponse } from "next/server";

/**
 * Lightweight healthcheck. Used by uptime monitors.
 *
 *   curl -fsS https://caelia.com/api/health
 *
 * Returns 200 + small JSON payload. No auth, no rate limit.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "caelia-storefront",
      ts: new Date().toISOString(),
    },
    {
      headers: { "Cache-Control": "no-store" },
    },
  );
}