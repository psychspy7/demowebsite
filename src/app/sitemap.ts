import type { MetadataRoute } from "next";
import { industries } from "@/lib/catalogue";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.APP_URL || "https://demo.thekittycorp.com").replace(
    /\/+$/,
    "",
  );
  const now = new Date();
  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/library`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...industries.map((i) => ({
      url: `${base}/${i.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
