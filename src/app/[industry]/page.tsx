import { notFound } from "next/navigation";
import { getIndustry, industries } from "@/lib/catalogue";
import { SiteNav, SiteFooter } from "@/components/brand";
import { TemplateLibrary } from "@/components/template-library";
export function generateStaticParams() {
  return [
    ...industries.map((i) => ({ industry: i.id })),
    { industry: "library" },
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const i = getIndustry(industry);
  const base = process.env.APP_URL || "https://demo.thekittycorp.com";

  if (industry === "library") {
    return {
      title: "Commercial Template Library & Designs",
      description:
        "Explore 54 curated commercial website templates across 18 key industries.",
      alternates: { canonical: `${base}/library` },
    };
  }

  return {
    title: i
      ? `${i.name} Website Solutions & Demos`
      : "Industry Template Not Found",
    description: i
      ? `Tailored commercial websites, booking flows, and automation solutions for ${i.name} businesses. Explore interactive previews with transparent INR pricing.`
      : "Commercial website solutions by KITTY CORP.",
    alternates: {
      canonical: `${base}/${industry}`,
    },
  };
}
export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const i = getIndustry(industry);
  if (!i && industry !== "library") notFound();
  return (
    <>
      <SiteNav />
      <main className="section-wrap">
        <div className="library-title">
          <span className="eyebrow">
            THE TEMPLATE COLLECTION / {i?.name || "ALL INDUSTRIES"}
          </span>
          <h1>
            {i ? i.name : "A starting point for"}
            <br />
            <em>{i ? "A new perspective." : "every kind of business."}</em>
          </h1>
          <p>
            {i?.description ||
              "Explore considered designs across 18 industries. Make the details your own."}
          </p>
        </div>
        <TemplateLibrary industryId={i?.id} />
      </main>
      <SiteFooter />
    </>
  );
}
