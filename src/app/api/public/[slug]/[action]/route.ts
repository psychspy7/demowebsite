import { NextResponse } from "next/server";
import { repository } from "@/server/store";
import { isAvailable } from "@/lib/catalogue";
import {
  demoUnlocked,
  unlockDemo,
  verifyPassword,
  sameOrigin,
  clientKey,
  rateLimit,
} from "@/server/auth";
import { enquirySchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(
  req: Request,
  ctx: { params: Promise<{ slug: string; action: string }> },
) {
  if (!sameOrigin(req))
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });

  const { slug, action } = await ctx.params;
  const repo = repository();

  // Granular demo fetch avoids loading full workspace snapshot
  const d = repo.getDemoBySlug
    ? await repo.getDemoBySlug(slug)
    : (await repo.read()).demos.find((x) => x.slug === slug);

  if (!d || !isAvailable(d))
    return NextResponse.json(
      { error: "This demo is unavailable." },
      { status: 404 },
    );

  const key = clientKey(req) + ":" + d.id + ":" + action;
  if (!rateLimit(key, action === "events" ? 50 : 5, 60000))
    return NextResponse.json(
      { error: "Please wait a minute before trying again." },
      { status: 429 },
    );

  const data = await req.json().catch(() => null);
  if (!data)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  if (action === "unlock") {
    if (
      typeof data.password !== "string" ||
      data.password.length > 128 ||
      !verifyPassword(data.password, d.settings.passwordHash)
    )
      return NextResponse.json(
        { error: "Incorrect demo password." },
        { status: 401 },
      );
    await unlockDemo(d);
    return NextResponse.json({ ok: true });
  }

  if (!(await demoUnlocked(d)))
    return NextResponse.json(
      { error: "Enter the demo password first." },
      { status: 403 },
    );

  if (action === "events") {
    if (!["visit", "whatsapp"].includes(data.type))
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });

    if (repo.recordAnalytics) {
      await repo.recordAnalytics(d.id, data.type);
    } else {
      await repo.transaction((db) => {
        db.analytics.push({
          id: crypto.randomUUID(),
          demoId: d.id,
          type: data.type,
          createdAt: new Date().toISOString(),
        });
      });
    }
    return NextResponse.json({ ok: true });
  }

  if (action === "enquiries") {
    const b = enquirySchema.safeParse(data);
    if (!b.success)
      return NextResponse.json(
        { error: b.error.issues[0].message },
        { status: 400 },
      );

    if (
      b.data.website ||
      Date.now() - b.data.startedAt < 2000 ||
      Date.now() - b.data.startedAt > 86400000
    )
      return NextResponse.json(
        { error: "Please wait a moment, then submit again." },
        { status: 400 },
      );

    const { name, email, phone, message, kind } = b.data;

    if (repo.captureEnquiry) {
      await repo.captureEnquiry({
        demoId: d.id,
        name,
        email: email || "",
        phone: phone || "",
        message,
        kind,
      });
    } else {
      await repo.transaction((db) => {
        const createdAt = new Date().toISOString();
        db.enquiries.push({
          id: crypto.randomUUID(),
          demoId: d.id,
          name,
          email,
          phone,
          message,
          kind,
          status: "new",
          createdAt,
        });
        db.analytics.push({
          id: crypto.randomUUID(),
          demoId: d.id,
          type: "enquiry",
          createdAt,
        });
      });
    }

    return NextResponse.json(
      {
        ok: true,
        message:
          "Your enquiry has been recorded for the demo administrator. This is not a confirmed booking.",
      },
      { status: 201 },
    );
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
