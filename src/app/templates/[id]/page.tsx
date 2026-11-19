import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BusinessSite } from "@/components/business-site";
import { getTemplate, createDemo, toPublic, templates, OFFICIAL } from "@/lib/catalogue";
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
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = getTemplate(id);
  if (!t) notFound();
  const d = createDemo(id, `${t.specialty} / Your business`);
  return (
    <>
      <div className="template-toolbar">
        <Link href={`/${t.industry}`}>
          <ArrowLeft size={16} /> Back to collection
        </Link>
        <span>{t.name}</span>
        <a
          className="button small dark"
          href={`${OFFICIAL}/projects?service=Website`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Build this with KITTY CORP <ArrowUpRight size={16} />
        </a>
      </div>
      <BusinessSite demo={toPublic(d)} mode="template" />
    </>
  );
}
