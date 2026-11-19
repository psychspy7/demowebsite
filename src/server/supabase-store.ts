import "server-only";
import type { Database, Demo, Prospect, Asset, Enquiry, Analytics } from "@/lib/types";
import { industries, templates } from "@/lib/catalogue";
import type { Repository } from "@/server/store";

const BUCKET = "demo-assets";
const REQUEST_TIMEOUT_MS = 15000;

export class SupabaseError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: string,
  ) {
    super(message);
    this.name = "SupabaseError";
  }
}

interface SupabaseConfig {
  url: string;
  key: string;
}

let cachedConfig: SupabaseConfig | null = null;

function config(): SupabaseConfig {
  if (cachedConfig) return cachedConfig;
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new SupabaseError(
      "Supabase server configuration is incomplete. Set SUPABASE_URL and SUPABASE_SECRET_KEY in hosting environment variables.",
      500,
    );
  }

  cachedConfig = {
    url: url.replace(/\/+$/, ""),
    key,
  };
  return cachedConfig;
}

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { url, key } = config();
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  if (key.startsWith("eyJ")) {
    headers.set("Authorization", `Bearer ${key}`);
  }
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${url}/rest/v1/${path}`, {
      ...init,
      headers,
      cache: "no-store",
      signal: controller.signal,
    });

    const body = await response.text();
    if (!response.ok) {
      let code: string | undefined;
      let message = `Supabase request failed (${response.status})`;
      let details: string | undefined;

      try {
        const parsed = JSON.parse(body);
        if (parsed.message) message = parsed.message;
        if (parsed.code) code = parsed.code;
        if (parsed.details) details = parsed.details;
      } catch {
        message = body.slice(0, 500) || message;
      }

      throw new SupabaseError(message, response.status, code, details);
    }

    return (body ? JSON.parse(body) : null) as T;
  } catch (err) {
    if (err instanceof SupabaseError) throw err;
    if ((err as Error).name === "AbortError") {
      throw new SupabaseError("Supabase connection timed out after 15 seconds.", 504);
    }
    throw new SupabaseError(`Supabase connection failed: ${(err as Error).message}`, 502);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function storage(path: string, init: RequestInit = {}): Promise<Response> {
  const { url, key } = config();
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  if (key.startsWith("eyJ")) {
    headers.set("Authorization", `Bearer ${key}`);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${url}/storage/v1/${path}`, {
      ...init,
      headers,
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new SupabaseError(`Supabase Storage failed (${response.status}): ${errorText.slice(0, 300)}`, response.status);
    }

    return response;
  } catch (err) {
    if (err instanceof SupabaseError) throw err;
    if ((err as Error).name === "AbortError") {
      throw new SupabaseError("Supabase Storage request timed out.", 504);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

function mapDemo(r: any, sections: any[]): Demo {
  const demoSections = sections
    .filter((s) => s.demo_id === r.id)
    .sort((a, b) => a.position - b.position)
    .map((s) => s.content);

  return {
    id: r.id,
    businessName: r.business_name,
    slug: r.slug,
    industry: r.industry_slug,
    templateId: r.template_key,
    status: r.status,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    revision: r.revision,
    notes: r.internal_notes || "",
    business: r.business,
    contact: r.contact,
    hero: r.hero,
    design: r.design,
    seo: r.seo,
    settings: {
      expiresAt: r.expires_at || "",
      passwordHash: r.password_hash || "",
      showDemoLabel: r.show_demo_label,
    },
    sections: demoSections,
    footer: r.footer || "",
  };
}

function demoPayload(d: Demo) {
  return {
    id: d.id,
    businessName: d.businessName,
    slug: d.slug,
    industry: d.industry,
    templateId: d.templateId,
    status: d.status,
    revision: d.revision,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
    notes: d.notes,
    business: d.business,
    contact: d.contact,
    hero: d.hero,
    design: d.design,
    seo: d.seo,
    settings: d.settings,
    sections: d.sections,
    footer: d.footer,
  };
}

class SupabaseRepository implements Repository {
  private seeded: Promise<void> | null = null;

  private seed() {
    if (!this.seeded) {
      this.seeded = (async () => {
        try {
          // Fast check: skip heavy catalogue upsert on cold starts once seeded
          const existingTemplates = await api<{ template_key: string }[]>(
            "templates?select=template_key",
          );
          const existingKeys = new Set(existingTemplates.map((t) => t.template_key));
          const allPresent = templates.every((t) => existingKeys.has(t.id));
          if (allPresent && existingTemplates.length === templates.length) {
            return;
          }

          await api("industries?on_conflict=slug", {
            method: "POST",
            headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
            body: JSON.stringify(
              industries.map((i) => ({ slug: i.id, name: i.name, definition: i })),
            ),
          });
          const rows = await api<any[]>("industries?select=id,slug");
          const ids = new Map(rows.map((x) => [x.slug, x.id]));
          const batchSize = 20;
          for (let i = 0; i < templates.length; i += batchSize) {
            const batch = templates.slice(i, i + batchSize);
            await api("templates?on_conflict=template_key", {
              method: "POST",
              headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
              body: JSON.stringify(
                batch.map((t) => ({
                  template_key: t.id,
                  industry_id: ids.get(t.industry),
                  name: t.name,
                  specialty: t.specialty,
                  layout: t.layout,
                  definition: t,
                })),
              ),
            });
          }
        } catch (err) {
          // Clear cached seed promise if initial seeding fails so retry works
          this.seeded = null;
          throw err;
        }
      })();
    }
    return this.seeded;
  }

  async ping(): Promise<void> {
    await this.seed();
    await api<any[]>("industries?select=id&limit=1");
  }

  async getAvailableDemos(): Promise<Demo[]> {
    await this.seed();
    const d = await api<any[]>(
      "demos?status=eq.published&select=*,industries!inner(slug),templates!inner(template_key)",
    );
    if (!d || d.length === 0) return [];
    const ids = d.map((r) => r.id).join(",");
    const s = await api<any[]>(
      `demo_sections?demo_id=in.(${ids})&order=position.asc`,
    );
    const sectionsByDemo = new Map<string, any[]>();
    for (const sec of s) {
      let list = sectionsByDemo.get(sec.demo_id);
      if (!list) {
        list = [];
        sectionsByDemo.set(sec.demo_id, list);
      }
      list.push(sec);
    }
    return d.map((r) =>
      mapDemo(
        {
          ...r,
          industry_slug: r.industries.slug,
          template_key: r.templates.template_key,
        },
        sectionsByDemo.get(r.id) || [],
      ),
    );
  }

  async read(): Promise<Database> {
    await this.seed();
    const [d, s, p, a, e, x] = await Promise.all([
      api<any[]>("demos?select=*,industries!inner(slug),templates!inner(template_key)&order=updated_at.desc"),
      api<any[]>("demo_sections?select=*&order=position.asc"),
      api<any[]>("prospects?select=*,industries(slug)&order=updated_at.desc"),
      api<any[]>("demo_assets?select=*&order=created_at.desc"),
      api<any[]>("demo_enquiries?select=*&order=created_at.desc"),
      api<any[]>("demo_analytics?select=*&order=created_at.desc"),
    ]);

    // Fast indexed grouping of sections by demo_id
    const sectionsByDemo = new Map<string, any[]>();
    for (const sec of s) {
      let list = sectionsByDemo.get(sec.demo_id);
      if (!list) {
        list = [];
        sectionsByDemo.set(sec.demo_id, list);
      }
      list.push(sec);
    }

    const demos = d.map((r) =>
      mapDemo(
        {
          ...r,
          industry_slug: r.industries.slug,
          template_key: r.templates.template_key,
        },
        sectionsByDemo.get(r.id) || [],
      ),
    );

    const prospects: Prospect[] = p.map((r) => ({
      id: r.id,
      businessName: r.business_name,
      contactPerson: r.contact_person,
      phone: r.phone,
      email: r.email,
      industry: r.industries?.slug || "",
      demoId: r.demo_id || "",
      status: r.status,
      followUp: r.follow_up || "",
      notes: r.internal_notes,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));

    const assets: Asset[] = a.map((r) => ({
      id: r.id,
      name: r.name,
      url: `/api/media/${r.id}`,
      folder: r.folder,
      mime: r.mime_type,
      size: Number(r.size_bytes),
      createdAt: r.created_at,
    }));

    const enquiries: Enquiry[] = e.map((r) => ({
      id: r.id,
      demoId: r.demo_id || "",
      name: r.name,
      email: r.email,
      phone: r.phone,
      message: r.message,
      kind: r.kind,
      status: r.status,
      createdAt: r.created_at,
    }));

    const analytics: Analytics[] = x.map((r) => ({
      id: r.id,
      demoId: r.demo_id,
      type: r.event_type,
      createdAt: r.created_at,
    }));

    return { version: 1, demos, prospects, assets, enquiries, analytics };
  }

  async getDemoBySlug(slug: string): Promise<Demo | null> {
    await this.seed();
    const rows = await api<any[]>(
      `demos?slug=eq.${encodeURIComponent(slug)}&select=*,industries!inner(slug),templates!inner(template_key)&limit=1`,
    );
    if (!rows || rows.length === 0) return null;
    const r = rows[0];

    const sections = await api<any[]>(
      `demo_sections?demo_id=eq.${r.id}&order=position.asc`,
    );

    return mapDemo(
      {
        ...r,
        industry_slug: r.industries.slug,
        template_key: r.templates.template_key,
      },
      sections,
    );
  }

  async getDemoById(id: string): Promise<Demo | null> {
    await this.seed();
    const rows = await api<any[]>(
      `demos?id=eq.${id}&select=*,industries!inner(slug),templates!inner(template_key)&limit=1`,
    );
    if (!rows || rows.length === 0) return null;
    const r = rows[0];

    const sections = await api<any[]>(
      `demo_sections?demo_id=eq.${r.id}&order=position.asc`,
    );

    return mapDemo(
      {
        ...r,
        industry_slug: r.industries.slug,
        template_key: r.templates.template_key,
      },
      sections,
    );
  }

  async getAssetById(id: string): Promise<Asset | null> {
    const rows = await api<any[]>(`demo_assets?id=eq.${id}&limit=1`);
    if (!rows || rows.length === 0) return null;
    const r = rows[0];
    return {
      id: r.id,
      name: r.name,
      url: `/api/media/${r.id}`,
      folder: r.folder,
      mime: r.mime_type,
      size: Number(r.size_bytes),
      createdAt: r.created_at,
    };
  }

  async recordAnalytics(demoId: string, type: "visit" | "whatsapp" | "enquiry"): Promise<void> {
    await api("demo_analytics", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        demo_id: demoId,
        event_type: type,
        created_at: new Date().toISOString(),
      }),
    });
  }

  async captureEnquiry(enquiry: Omit<Enquiry, "id" | "status" | "createdAt">): Promise<Enquiry> {
    const id = crypto.randomUUID();
    const eventId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await api("rpc/studio_capture_enquiry", {
      method: "POST",
      body: JSON.stringify({
        p_enquiry: {
          id,
          demo_id: enquiry.demoId || null,
          name: enquiry.name,
          email: enquiry.email || "",
          phone: enquiry.phone || "",
          message: enquiry.message,
          kind: enquiry.kind,
          status: "new",
          created_at: createdAt,
          consent_at: createdAt,
        },
        p_event: enquiry.demoId
          ? {
              id: eventId,
              demo_id: enquiry.demoId,
              event_type: "enquiry",
              created_at: createdAt,
            }
          : null,
      }),
    });

    return {
      ...enquiry,
      id,
      status: "new",
      createdAt,
    };
  }

  async transaction<T>(mutate: (db: Database) => T | Promise<T>): Promise<T> {
    const before = await this.read();
    const after = structuredClone(before);
    const result = await mutate(after);

    const oldD = new Map(before.demos.map((x) => [x.id, x])),
      newD = new Map(after.demos.map((x) => [x.id, x]));

    for (const [id, d] of newD) {
      const old = oldD.get(id);
      if (!old) {
        try {
          await api("rpc/studio_create_demo", {
            method: "POST",
            body: JSON.stringify({ p_demo: demoPayload(d) }),
          });
        } catch (e) {
          if (e instanceof SupabaseError && e.code === "23505") {
            throw new SupabaseError(
              "That demo URL is already in use.",
              409,
              "23505",
            );
          }
          throw e;
        }
      } else if (JSON.stringify(old) !== JSON.stringify(d)) {
        const { passwordHash, ...settings } = d.settings;
        const payload = demoPayload({
          ...d,
          settings: { ...settings, passwordHash: d.settings.passwordHash },
        });
        try {
          await api("rpc/studio_save_demo", {
            method: "POST",
            body: JSON.stringify({
              p_demo: payload,
              p_expected_revision: old.revision,
            }),
          });
        } catch (e) {
          if (
            String(e).includes("REVISION_CONFLICT") ||
            String(e).includes("40001") ||
            (e instanceof SupabaseError && e.code === "40001")
          ) {
            throw new SupabaseError(
              "This demo changed in another session. Reload before saving.",
              409,
              "40001",
            );
          }
          if (e instanceof SupabaseError && e.code === "23505") {
            throw new SupabaseError(
              "That demo URL is already in use.",
              409,
              "23505",
            );
          }
          throw e;
        }
      }
    }

    for (const id of oldD.keys()) {
      if (!newD.has(id)) {
        await api("rpc/studio_delete_demo", {
          method: "POST",
          body: JSON.stringify({ p_id: id }),
        });
      }
    }

    const oldP = new Map(before.prospects.map((x) => [x.id, x])),
      newP = new Map(after.prospects.map((x) => [x.id, x]));

    const changedProspects: Array<[string, Prospect]> = [];
    for (const [id, p] of newP) {
      if (JSON.stringify(oldP.get(id)) !== JSON.stringify(p)) {
        changedProspects.push([id, p]);
      }
    }

    if (changedProspects.length > 0) {
      const indRows = await api<any[]>("industries?select=id,slug");
      const indIds = new Map(indRows.map((x) => [x.slug, x.id]));

      for (const [id, p] of changedProspects) {
        await api("prospects?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify({
            id,
            business_name: p.businessName,
            contact_person: p.contactPerson,
            phone: p.phone,
            email: p.email,
            industry_id: indIds.get(p.industry) || null,
            demo_id: p.demoId || null,
            status: p.status,
            follow_up: p.followUp || null,
            internal_notes: p.notes,
            created_at: p.createdAt,
            updated_at: p.updatedAt,
          }),
        });
      }
    }

    for (const id of oldP.keys()) {
      if (!newP.has(id)) {
        await api(`prospects?id=eq.${id}`, { method: "DELETE" });
      }
    }

    const oldE = new Map(before.enquiries.map((x) => [x.id, x])),
      newE = new Map(after.enquiries.map((x) => [x.id, x]));

    const capturedEventIds = new Set<string>();
    for (const [id, e] of newE) {
      if (!oldE.has(id)) {
        const event = after.analytics.find(
          (x) =>
            x.demoId === e.demoId &&
            x.type === "enquiry" &&
            x.createdAt === e.createdAt &&
            !before.analytics.some((y) => y.id === x.id),
        );
        if (event) {
          await api("rpc/studio_capture_enquiry", {
            method: "POST",
            body: JSON.stringify({
              p_enquiry: {
                id,
                demo_id: e.demoId,
                name: e.name,
                email: e.email,
                phone: e.phone,
                message: e.message,
                kind: e.kind,
                status: e.status,
                created_at: e.createdAt,
                consent_at: e.createdAt,
              },
              p_event: {
                id: event.id,
                demo_id: event.demoId,
                event_type: event.type,
                created_at: event.createdAt,
              },
            }),
          });
          capturedEventIds.add(event.id);
        } else {
          await api("demo_enquiries", {
            method: "POST",
            headers: { Prefer: "return=minimal" },
            body: JSON.stringify({
              id,
              demo_id: e.demoId,
              name: e.name,
              email: e.email,
              phone: e.phone,
              message: e.message,
              kind: e.kind,
              status: e.status,
              created_at: e.createdAt,
              consent_at: e.createdAt,
            }),
          });
        }
      } else if (oldE.get(id)?.status !== e.status) {
        await api(`demo_enquiries?id=eq.${id}`, {
          method: "PATCH",
          headers: { Prefer: "return=minimal" },
          body: JSON.stringify({ status: e.status }),
        });
      }
    }

    for (const id of oldE.keys()) {
      if (!newE.has(id)) {
        await api(`demo_enquiries?id=eq.${id}`, { method: "DELETE" });
      }
    }

    const oldX = new Set(before.analytics.map((x) => x.id));
    for (const x of after.analytics) {
      if (!oldX.has(x.id) && !capturedEventIds.has(x.id)) {
        await api("demo_analytics", {
          method: "POST",
          headers: { Prefer: "return=minimal" },
          body: JSON.stringify({
            id: x.id,
            demo_id: x.demoId,
            event_type: x.type,
            created_at: x.createdAt,
          }),
        });
      }
    }

    const oldA = new Map(before.assets.map((x) => [x.id, x])),
      newA = new Map(after.assets.map((x) => [x.id, x]));

    for (const [id, a] of newA) {
      if (JSON.stringify(oldA.get(id)) !== JSON.stringify(a)) {
        await api("demo_assets?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify({
            id,
            name: a.name,
            folder: a.folder,
            bucket: BUCKET,
            storage_path: id,
            mime_type: a.mime,
            size_bytes: a.size,
            created_at: a.createdAt,
          }),
        });
      }
    }

    for (const id of oldA.keys()) {
      if (!newA.has(id)) {
        try {
          await storage(`object/${BUCKET}/${id}`, { method: "DELETE" });
        } catch (err) {
          if (!(err instanceof SupabaseError && err.status === 404)) throw err;
        }
        await api(`demo_assets?id=eq.${id}`, { method: "DELETE" });
      }
    }

    return result;
  }
}

export function supabaseRepository(): Repository {
  return new SupabaseRepository();
}

export async function uploadPrivateAsset(
  id: string,
  bytes: Buffer,
  mime: string,
) {
  await storage(`object/${BUCKET}/${id}`, {
    method: "POST",
    headers: { "Content-Type": mime, "x-upsert": "false" },
    body: new Uint8Array(bytes),
  });
}

export async function downloadPrivateAsset(id: string) {
  return storage(`object/${BUCKET}/${id}`, { method: "GET" });
}
