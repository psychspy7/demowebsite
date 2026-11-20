import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MessageCircle, Wand2 } from "lucide-react";
import { BusinessSite } from "@/components/business-site";
import { getTemplate, createDemo, toPublic, templates } from "@/lib/catalogue";

export function generateStaticParams() {
  return templates.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: getTemplate(id)?.name,
    robots: { index: false, follow: false },
  };
}

export default async function TemplatePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ embed?: string }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const isEmbed = resolvedSearchParams?.embed === "1";

  const t = getTemplate(id);
  if (!t) notFound();
  const d = createDemo(id, `${t.specialty} / Your business`);

  const whatsappHref = `https://wa.me/919241619573?text=${encodeURIComponent(
    `Hello Kitty Corp, I would like to discuss the "${t.name}" blueprint for my business.`
  )}`;

  return (
    <>
      {!isEmbed && (
        <div className="template-toolbar">
          <Link href={`/${t.industry}`} className="template-back-link">
            <ArrowLeft size={16} /> Back to collection
          </Link>
          <span className="template-toolbar-name">{t.name}</span>
          <div className="template-toolbar-actions">
            <Link
              className="button small dark template-customize-cta"
              href={`/admin/demos/new?template=${t.id}`}
              title="Customize and generate client prototype"
            >
              <Wand2 size={14} />
              <span>Customize Blueprint</span>
            </Link>
            <a
              className="button small whatsapp-button template-enquiry-cta"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
      <BusinessSite demo={toPublic(d)} mode="template" />
    </>
  );
}
