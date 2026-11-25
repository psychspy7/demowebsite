import type { MetadataRoute } from "next";
import { industries } from "@/lib/catalogue";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://business.thekittycorp.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/library`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms-and-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/refund-cancellation`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...industries.map((industry) => ({
      url: `${base}/${industry.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
