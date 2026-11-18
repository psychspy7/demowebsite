import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { repository } from "@/server/store";
import { isAdmin, demoUnlocked } from "@/server/auth";
import { isAvailable, toPublic } from "@/lib/catalogue";
import { BusinessSite, PasswordGate } from "@/components/business-site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const repo = repository();
  const d = repo.getDemoBySlug
    ? await repo.getDemoBySlug(slug)
    : (await repo.read()).demos.find((d) => d.slug === slug);

  if (!d || !isAvailable(d) || d.settings.passwordHash)
    return {
      title: "Private website preview",
      robots: { index: false, follow: false },
    };

  const base = process.env.APP_URL || "http://localhost:3000";
  return {
    title: { absolute: d.seo.title || d.businessName },
    description: d.seo.description,
    robots: { index: !d.seo.noindex, follow: !d.seo.noindex },
    alternates: { canonical: d.seo.canonical || `${base}/preview/${d.slug}` },
    icons: d.business.favicon ? { icon: d.business.favicon } : undefined,
    openGraph: {
      title: d.seo.title || d.businessName,
      description: d.seo.description,
      images: d.seo.ogImage ? [new URL(d.seo.ogImage, base).href] : [],
    },
  };
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const repo = repository();
  const d = repo.getDemoBySlug
    ? await repo.getDemoBySlug(slug)
    : (await repo.read()).demos.find((d) => d.slug === slug);

  const admin = await isAdmin();
  if (!d || (!admin && !isAvailable(d))) notFound();
  if (!admin && !(await demoUnlocked(d))) return <PasswordGate slug={slug} />;

  return (
    <>
      {admin && d.status === "draft" && (
        <div className="draft-ribbon">
          DRAFT · Only signed-in administrators can see this page.
        </div>
      )}
      <BusinessSite
        demo={toPublic(d)}
        mode={isAvailable(d) ? "public" : "editor"}
      />
    </>
  );
}
