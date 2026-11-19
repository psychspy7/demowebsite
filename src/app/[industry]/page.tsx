import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { getIndustry, industries } from "@/lib/catalogue";
import { SiteNav, SiteFooter, WHATSAPP_URL, WHATSAPP_NUMBER } from "@/components/brand";
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
  const isLibrary = industry === "library";
  const ind = getIndustry(industry);

  return {
    title: isLibrary
      ? "Master Template Library (88 Blueprints)"
      : `${ind?.name || "Industry"} Blueprints`,
    description: isLibrary
      ? "Explore 88 production blueprints across 18 major industries."
      : ind?.description || "Bespoke digital architecture for your business.",
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const isLibrary = industry === "library";
  const ind = getIndustry(industry);

  if (!ind && !isLibrary) notFound();

  return (
    <>
      <SiteNav />
      <main className="section-wrap industry-collection-page">
        {/* Breadcrumb Navigation */}
        <nav className="industry-breadcrumb" aria-label="Breadcrumb">
          <Link href="/#industries" className="breadcrumb-back">
            <ArrowLeft size={15} /> All Industries
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">
            {ind ? ind.name : "Master Library"}
          </span>
        </nav>

        {/* Collection Header */}
        <div className="library-title-container">
          <div className="collection-meta-badge">
            <span className="meta-badge-dot" />
            <span>
              {ind
                ? `COLLECTION / ${ind.name.toUpperCase()}`
                : "MASTER COLLECTION / 88 BLUEPRINTS"}
            </span>
          </div>

          <h1 className="collection-heading">
            {ind ? ind.name : "Bespoke Digital Blueprints"}
            <br />
            <span className="collection-subheading">
              {ind ? ind.eyebrow : "Engineered for category leaders."}
            </span>
          </h1>

          <p className="collection-description">
            {ind?.description ||
              "Explore 88 production-grade prototypes across 18 specialized industries. Every concept includes live viewport testing, sub-400ms edge speeds, and conversion-ready inquiry flows."}
          </p>

          <div className="collection-actions-bar">
            <a
              className="button dark collection-whatsapp-cta"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={16} />
              <span>Discuss a Custom {ind ? ind.name : "Website"} on WhatsApp</span>
            </a>
            <span className="collection-badge-note">
              <Sparkles size={14} /> Sub-400ms Edge Latency SLA
            </span>
          </div>
        </div>

        {/* Interactive Template Library with Live Preview Modal */}
        <TemplateLibrary industryId={ind?.id} />
      </main>
      <SiteFooter />
    </>
  );
}
