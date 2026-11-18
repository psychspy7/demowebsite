import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = (process.env.APP_URL || "https://demo.thekittycorp.com").replace(
    /\/+$/,
    "",
  );
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/templates/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
