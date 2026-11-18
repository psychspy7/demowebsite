import { NextResponse } from "next/server";
import {
  authConfigured,
  checkCredentials,
  setAdminSession,
  clearSession,
  sameOrigin,
  rateLimit,
  clientKey,
} from "@/server/auth";
export async function POST(req: Request) {
  if (!sameOrigin(req))
    return NextResponse.json(
      { error: "Invalid request origin" },
      { status: 403 },
    );
  if (!authConfigured())
    return NextResponse.json(
      {
        error: "Admin access is not configured. Run pnpm setup on the server.",
      },
      { status: 503 },
    );
  if (!rateLimit("login:" + clientKey(req), 8, 60000))
    return NextResponse.json(
      { error: "Too many attempts. Try again in a minute." },
      { status: 429 },
    );
  const data = await req.json().catch(() => ({}));
  if (
    typeof data.username !== "string" ||
    typeof data.password !== "string" ||
    !checkCredentials(data.username, data.password)
  )
    return NextResponse.json(
      { error: "The admin ID or password is incorrect." },
      { status: 401 },
    );
  await setAdminSession();
  return NextResponse.json({ ok: true });
}
export async function DELETE(req: Request) {
  if (!sameOrigin(req))
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  await clearSession();
  return NextResponse.json({ ok: true });
}
