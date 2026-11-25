import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = "https://business.thekittycorp.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/templates/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
