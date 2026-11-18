import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { uploadPrivateAsset } from "@/server/supabase-store";
import { ZodError } from "zod";
import { repository, dataDir } from "@/server/store";
import { isAdmin, sameOrigin, hashPassword } from "@/server/auth";
import { createSchema, demoSchema, prospectSchema } from "@/lib/validation";
import {
  createDemo,
  toAdmin,
  slugify,
  getTemplate,
  getIndustry,
} from "@/lib/catalogue";
import type { Database, Demo } from "@/lib/types";
export const runtime = "nodejs";
class HttpError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
function uniqueSlug(db: Database, base: string, except = "") {
  let slug = base,
    n = 2;
  while (db.demos.some((d) => d.id !== except && d.slug === slug))
    slug = `${base}-${n++}`;
  return slug;
}
function assetUsed(db: Database, url: string) {
  return db.demos.some((d) => JSON.stringify(d).includes(url));
}
async function handle(
  req: Request,
  ctx: { params: Promise<{ path: string[] }> },
) {
  try {
    if (!(await isAdmin()))
      throw new HttpError("Please sign in to continue.", 401);
    if (req.method !== "GET" && !sameOrigin(req))
      throw new HttpError("Invalid request origin", 403);
    const [resource, id, action] = (await ctx.params).path;
    const repo = repository();
    if (req.method === "GET" && resource === "snapshot") {
      const db = await repo.read();
      return NextResponse.json(
        { ...db, demos: db.demos.map(toAdmin) },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
    if (req.method === "POST" && resource === "assets") {
      const form = await req.formData();
      const file = form.get("file");
      if (!(file instanceof File))
        throw new HttpError("Choose an image to upload.");
      if (file.size > 5 * 1024 * 1024)
        throw new HttpError("Images must be 5 MB or smaller.");
      const bytes = Buffer.from(await file.arrayBuffer());
      let mime = "";
      if (
        bytes
          .subarray(0, 8)
          .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      )
        mime = "image/png";
      else if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255)
        mime = "image/jpeg";
      else if (
        bytes.subarray(0, 4).toString() === "RIFF" &&
        bytes.subarray(8, 12).toString() === "WEBP"
      )
        mime = "image/webp";
      if (!mime) throw new HttpError("Use a PNG, JPEG or WebP image.");
      const asset = {
        id: crypto.randomUUID(),
        name: file.name.slice(0, 160),
        url: "",
        folder: String(form.get("folder") || "General").slice(0, 80),
        mime,
        size: file.size,
        createdAt: new Date().toISOString(),
      };
      asset.url = `/api/media/${asset.id}`;
      if (process.env.DATA_PROVIDER === "supabase") {
        await uploadPrivateAsset(asset.id, bytes, mime);
      } else {
        await fs.mkdir(path.join(dataDir, "uploads"), { recursive: true });
        await fs.writeFile(path.join(dataDir, "uploads", asset.id), bytes);
      }
      await repo.transaction((db) => {
        db.assets.push(asset);
      });
      return NextResponse.json(asset, { status: 201 });
    }
    if (resource === "assets" && id) {
      const result = await repo.transaction(async (db) => {
        const a = db.assets.find((a) => a.id === id);
        if (!a) throw new HttpError("Image not found", 404);
        if (req.method === "DELETE") {
          if (assetUsed(db, a.url))
            throw new HttpError(
              "This image is used by a demo. Replace it in that demo before deleting.",
              409,
            );
          db.assets = db.assets.filter((a) => a.id !== id);
          if (process.env.DATA_PROVIDER !== "supabase")
            await fs.unlink(path.join(dataDir, "uploads", a.id)).catch(() => {});
          return { ok: true };
        }
        if (req.method === "PATCH") {
          const b = await req.json();
          if (typeof b.name === "string") a.name = b.name.slice(0, 160);
          if (typeof b.folder === "string") a.folder = b.folder.slice(0, 80);
          return a;
        }
        throw new HttpError("Unsupported action", 405);
      });
      return NextResponse.json(result);
    }
    if (resource === "demos") {
      if (req.method === "POST" && !id) {
        const b = createSchema.parse(await req.json());
        const d = createDemo(b.templateId, b.businessName);
        await repo.transaction((db) => {
          d.slug = uniqueSlug(db, d.slug);
          db.demos.push(d);
        });
        return NextResponse.json(toAdmin(d), { status: 201 });
      }
      const result = await repo.transaction(async (db) => {
        const d = db.demos.find((x) => x.id === id);
        if (!d) throw new HttpError("Demo not found", 404);
        if (req.method === "DELETE") {
          db.demos = db.demos.filter((x) => x.id !== id);
          db.enquiries = db.enquiries.filter((e) => e.demoId !== id);
          db.analytics = db.analytics.filter((e) => e.demoId !== id);
          db.prospects.forEach((p) => {
            if (p.demoId === id) p.demoId = "";
          });
          return { ok: true };
        }
        if (req.method === "POST" && action === "duplicate") {
          const copy = structuredClone(d);
          copy.id = crypto.randomUUID();
          copy.businessName += " (copy)";
          copy.slug = uniqueSlug(db, slugify(copy.businessName));
          copy.status = "draft";
          copy.createdAt = copy.updatedAt = new Date().toISOString();
          copy.revision = 1;
          copy.sections.forEach((s) => {
            s.id = crypto.randomUUID();
            s.items.forEach((i) => (i.id = crypto.randomUUID()));
          });
          db.demos.push(copy);
          return toAdmin(copy);
        }
        if (req.method === "PUT") {
          const b = demoSchema.parse(await req.json());
          if (b.revision !== d.revision)
            throw new HttpError(
              "This demo changed in another session. Reload before saving.",
              409,
            );
          if (db.demos.some((x) => x.id !== id && x.slug === b.slug))
            throw new HttpError("That demo URL is already in use.", 409);
          if (
            !getIndustry(b.industry) ||
            getTemplate(b.templateId)?.industry !== b.industry
          )
            throw new HttpError("Template and industry do not match.");
          const { password, clearPassword, settings, ...safe } = b;
          const updated: Demo = {
            ...d,
            ...safe,
            settings: {
              ...settings,
              passwordHash: clearPassword
                ? ""
                : password
                  ? hashPassword(password)
                  : d.settings.passwordHash,
            },
            updatedAt: new Date().toISOString(),
            revision: d.revision + 1,
          };
          db.demos[db.demos.indexOf(d)] = updated;
          return toAdmin(updated);
        }
        throw new HttpError("Unsupported demo action", 405);
      });
      return NextResponse.json(result);
    }
    if (resource === "prospects") {
      if (req.method === "DELETE") {
        await repo.transaction((db) => {
          db.prospects = db.prospects.filter((p) => p.id !== id);
        });
        return NextResponse.json({ ok: true });
      }
      if (req.method === "POST" || req.method === "PUT") {
        const b = prospectSchema.parse(await req.json());
        const p = await repo.transaction((db) => {
          if (b.industry && !getIndustry(b.industry))
            throw new HttpError("Unknown industry");
          if (b.demoId && !db.demos.some((d) => d.id === b.demoId))
            throw new HttpError("Linked demo not found");
          const old = db.prospects.find((p) => p.id === id);
          if (req.method === "PUT" && !old)
            throw new HttpError("Prospect not found", 404);
          const p = {
            ...b,
            id: old?.id || crypto.randomUUID(),
            createdAt: old?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          if (old) db.prospects[db.prospects.indexOf(old)] = p;
          else db.prospects.push(p);
          return p;
        });
        return NextResponse.json(p);
      }
    }
    if (resource === "enquiries" && id && req.method === "PATCH") {
      await repo.transaction((db) => {
        const e = db.enquiries.find((e) => e.id === id);
        if (!e) throw new HttpError("Enquiry not found", 404);
        e.status = "read";
      });
      return NextResponse.json({ ok: true });
    }
    if (resource === "enquiries" && id && req.method === "DELETE") {
      await repo.transaction((db) => {
        db.enquiries = db.enquiries.filter((e) => e.id !== id);
      });
      return NextResponse.json({ ok: true });
    }
    throw new HttpError("Not found", 404);
  } catch (e) {
    const status =
      e instanceof HttpError ? e.status : e instanceof ZodError ? 400 : 500;
    const error =
      e instanceof ZodError
        ? e.issues
            .map((i) => `${i.path.join(".")}: ${i.message}`)
            .slice(0, 3)
            .join("; ")
        : e instanceof Error
          ? e.message
          : "Request failed";
    return NextResponse.json(
      {
        error:
          status === 500
            ? "The request could not be completed. Check server configuration and logs."
            : error,
      },
      { status },
    );
  }
}
export {
  handle as GET,
  handle as POST,
  handle as PUT,
  handle as PATCH,
  handle as DELETE,
};
