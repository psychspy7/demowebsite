import { repository, dataDir } from "@/server/store";
import { isAdmin, demoUnlocked } from "@/server/auth";
import { isAvailable } from "@/lib/catalogue";
import { promises as fs } from "node:fs";
import path from "node:path";
import { downloadPrivateAsset } from "@/server/supabase-store";

export const runtime = "nodejs";

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const repo = repository();

  const a = repo.getAssetById
    ? await repo.getAssetById(id)
    : (await repo.read()).assets.find((a) => a.id === id);

  if (!a) return new Response("Not found", { status: 404 });

  let allowed = await isAdmin();
  if (!allowed) {
    const demos = repo.getAvailableDemos
      ? await repo.getAvailableDemos()
      : (await repo.read()).demos;
    for (const d of demos) {
      if (
        isAvailable(d) &&
        JSON.stringify(d).includes(a.url) &&
        (await demoUnlocked(d))
      ) {
        allowed = true;
        break;
      }
    }
  }

  if (!allowed) return new Response("Not found", { status: 404 });

  try {
    const body =
      process.env.DATA_PROVIDER === "supabase"
        ? await (await downloadPrivateAsset(a.id)).arrayBuffer()
        : await fs.readFile(path.join(dataDir, "uploads", a.id));

    return new Response(body, {
      headers: {
        "Content-Type": a.mime,
        "Cache-Control": "private, max-age=3600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
