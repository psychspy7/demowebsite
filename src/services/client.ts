import type { AdminDemo, Asset, Prospect, Snapshot } from "@/lib/types";
/** Browser contract. Components never read/write the persistence provider directly. */
async function request<T>(
  path: string,
  method = "GET",
  body?: unknown,
): Promise<T> {
  const r = await fetch(`/api/admin/${path}`, {
    method,
    headers:
      body instanceof FormData ? {} : { "Content-Type": "application/json" },
    body:
      body === undefined
        ? undefined
        : body instanceof FormData
          ? body
          : JSON.stringify(body),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || "Request failed");
  return data;
}
export interface PlatformService {
  snapshot(): Promise<Snapshot>;
  createDemo(templateId: string, businessName: string): Promise<AdminDemo>;
  saveDemo(demo: AdminDemo): Promise<AdminDemo>;
  duplicateDemo(id: string): Promise<AdminDemo>;
  deleteDemo(id: string): Promise<unknown>;
  upload(file: File, folder?: string): Promise<Asset>;
  updateAsset(id: string, patch: Partial<Asset>): Promise<Asset>;
  deleteAsset(id: string): Promise<unknown>;
  saveProspect(prospect: Partial<Prospect>): Promise<Prospect>;
  deleteProspect(id: string): Promise<unknown>;
  readEnquiry(id: string): Promise<unknown>;
  deleteEnquiry(id: string): Promise<unknown>;
}
export const platform: PlatformService = {
  snapshot: () => request("snapshot"),
  createDemo: (templateId, businessName) =>
    request("demos", "POST", { templateId, businessName }),
  saveDemo: (d) => request(`demos/${d.id}`, "PUT", d),
  duplicateDemo: (id) => request(`demos/${id}/duplicate`, "POST"),
  deleteDemo: (id) => request(`demos/${id}`, "DELETE"),
  upload: (file, folder = "General") => {
    const form = new FormData();
    form.set("file", file);
    form.set("folder", folder);
    return request("assets", "POST", form);
  },
  updateAsset: (id, patch) => request(`assets/${id}`, "PATCH", patch),
  deleteAsset: (id) => request(`assets/${id}`, "DELETE"),
  saveProspect: (p) =>
    request(p.id ? `prospects/${p.id}` : "prospects", p.id ? "PUT" : "POST", p),
  deleteProspect: (id) => request(`prospects/${id}`, "DELETE"),
  readEnquiry: (id) => request(`enquiries/${id}`, "PATCH"),
  deleteEnquiry: (id) => request(`enquiries/${id}`, "DELETE"),
};
