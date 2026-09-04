import { NextResponse } from "next/server";
import { catalogSource } from "@/lib/catalog";

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
      catalog: catalogSource,
      ts: new Date().toISOString(),
    },
    {
      headers: { "Cache-Control": "no-store" },
    },
  );
}