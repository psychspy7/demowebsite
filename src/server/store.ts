import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Database, Demo, Asset, Enquiry } from "@/lib/types";

/**
 * Server-side Repository interface.
 * Implements full database snapshots as well as granular operations
 * for high-concurrency and production performance.
 */
export interface Repository {
  read(): Promise<Database>;
  transaction<T>(mutate: (db: Database) => T | Promise<T>): Promise<T>;
  getDemoBySlug?(slug: string): Promise<Demo | null>;
  getDemoById?(id: string): Promise<Demo | null>;
  getAssetById?(id: string): Promise<Asset | null>;
  recordAnalytics?(demoId: string, type: "visit" | "whatsapp" | "enquiry"): Promise<void>;
  captureEnquiry?(enquiry: Omit<Enquiry, "id" | "status" | "createdAt">): Promise<Enquiry>;
}

// Runtime-only files are deliberately excluded from production file tracing.
export const dataDir = path.resolve(
  /* turbopackIgnore: true */ process.env.DATA_DIR || ".data",
);

const globalStore = globalThis as unknown as { kittyQueue?: Promise<unknown> };

function empty(): Database {
  return {
    version: 1,
    demos: [],
    prospects: [],
    assets: [],
    enquiries: [],
    analytics: [],
  };
}

class LocalRepository implements Repository {
  private file = path.join(dataDir, "database.json");

  async read(): Promise<Database> {
    if (process.env.VERCEL) {
      throw new Error(
        "Local storage cannot run on Vercel. Install the Supabase adapter before deployment.",
      );
    }
    try {
      return JSON.parse(await fs.readFile(this.file, "utf8"));
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return empty();
      throw e;
    }
  }

  async transaction<T>(mutate: (db: Database) => T | Promise<T>): Promise<T> {
    const pending = (globalStore.kittyQueue || Promise.resolve()).then(
      async () => {
        const db = await this.read();
        const result = await mutate(db);
        await fs.mkdir(dataDir, { recursive: true });
        const tmp = this.file + "." + crypto.randomUUID() + ".tmp";
        await fs.writeFile(tmp, JSON.stringify(db, null, 2));
        await fs.rename(tmp, this.file);
        return result;
      },
    );
    globalStore.kittyQueue = pending.catch(() => {});
    return pending;
  }

  async getDemoBySlug(slug: string): Promise<Demo | null> {
    const db = await this.read();
    return db.demos.find((d) => d.slug === slug) ?? null;
  }

  async getDemoById(id: string): Promise<Demo | null> {
    const db = await this.read();
    return db.demos.find((d) => d.id === id) ?? null;
  }

  async getAssetById(id: string): Promise<Asset | null> {
    const db = await this.read();
    return db.assets.find((a) => a.id === id) ?? null;
  }

  async recordAnalytics(demoId: string, type: "visit" | "whatsapp" | "enquiry"): Promise<void> {
    await this.transaction((db) => {
      db.analytics.push({
        id: crypto.randomUUID(),
        demoId,
        type,
        createdAt: new Date().toISOString(),
      });
    });
  }

  async captureEnquiry(enquiry: Omit<Enquiry, "id" | "status" | "createdAt">): Promise<Enquiry> {
    return this.transaction((db) => {
      const createdAt = new Date().toISOString();
      const newEnquiry: Enquiry = {
        ...enquiry,
        id: crypto.randomUUID(),
        status: "new",
        createdAt,
      };
      db.enquiries.push(newEnquiry);
      db.analytics.push({
        id: crypto.randomUUID(),
        demoId: enquiry.demoId,
        type: "enquiry",
        createdAt,
      });
      return newEnquiry;
    });
  }
}

export function repository(): Repository {
  if (process.env.DATA_PROVIDER === "supabase") {
    // Lazy server-only import keeps the local development path dependency-free.
    return supabaseRepository();
  }
  if (process.env.DATA_PROVIDER && process.env.DATA_PROVIDER !== "local") {
    throw new Error("Unsupported DATA_PROVIDER. Use local or supabase.");
  }
  return new LocalRepository();
}

/**
 * Health check helper for platform observability.
 */
export async function healthCheck(): Promise<{ ok: boolean; provider: string; details?: string }> {
  const provider = process.env.DATA_PROVIDER || "local";
  try {
    const repo = repository();
    await repo.read();
    return { ok: true, provider };
  } catch (err) {
    return { ok: false, provider, details: (err as Error).message };
  }
}

import { supabaseRepository } from "@/server/supabase-store";
