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
  return {
    title:
      industry === "library"
        ? "Template library"
        : getIndustry(industry)?.name || "Not found",
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
