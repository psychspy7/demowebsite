import { NextResponse } from "next/server";
import { healthCheck } from "@/server/store";

export const runtime = "nodejs";

export async function GET() {
  const result = await healthCheck();
  return NextResponse.json(
    {
      status: result.ok ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      provider: result.provider,
      ...(result.details ? { error: result.details } : {}),
    },
    { status: result.ok ? 200 : 503 },
  );
}
