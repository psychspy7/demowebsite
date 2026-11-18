"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { templates, industries, getIndustry } from "@/lib/catalogue";
import type { Template } from "@/lib/types";
export function TemplateThumbnail({ template: t }: { template: Template }) {
  return (
    <div
      className={`template-art art-${t.layout}`}
      style={{ "--art-color": t.color } as React.CSSProperties}
    >
      <div className="art-nav">
        <span>{t.specialty}</span>
        <span>ABOUT &nbsp; EXPLORE &nbsp; CONTACT</span>
      </div>
      <div className="art-body">
        <div className="art-copy">
          <small>{getIndustry(t.industry)?.eyebrow}</small>
          <strong>
            {(
              {
                medico: "Care that starts with you.",
                restaurant: "Good food. Better company.",
                "real-estate": "A place to call your own.",
                institute: "Your next chapter.",
              } as Record<string, string>
            )[t.industry] || "Thoughtfully made. For you."}
          </strong>
          <span className="art-cta">Discover more ↗</span>
        </div>
        <img src={t.image} alt="" loading="lazy" />
      </div>
      <div className="art-footer">
        A NEW PERSPECTIVE <span>01 — {t.layout.toUpperCase()}</span>
      </div>
    </div>
  );
}
export function TemplateCard({
  template: t,
  onSelect,
}: {
  template: Template;
  onSelect?: (t: Template) => void;
}) {
  return (
    <article className="template-card">
      <Link href={`/templates/${t.id}`} aria-label={`Preview ${t.name}`}>
        <TemplateThumbnail template={t} />
      </Link>
      <div className="template-card-caption">
        <div>
          <span className="eyebrow">
            {t.layout} · {getIndustry(t.industry)?.name}
          </span>
          <h3>{t.specialty}</h3>
        </div>
        {onSelect ? (
          <button
            className="icon-button"
            title={`Use ${t.specialty}`}
            onClick={() => onSelect(t)}
          >
            <ArrowRight size={20} />
          </button>
        ) : (
          <Link
            className="icon-button"
            href={`/templates/${t.id}`}
            aria-label={`Preview ${t.specialty}`}
          >
            <ArrowUpRight size={20} />
          </Link>
        )}
      </div>
    </article>
  );
}
export function TemplateLibrary({
  industryId,
  onSelect,
  compact = false,
}: {
  industryId?: string;
  onSelect?: (t: Template) => void;
  compact?: boolean;
}) {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState(industryId || "all"),
    [layout, setLayout] = useState("all");
  const list = templates.filter(
    (t) =>
      (category === "all" || t.industry === category) &&
      (layout === "all" || t.layout === layout) &&
      `${t.name} ${getIndustry(t.industry)?.name}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className={compact ? "library compact" : "library"}>
      <div className="library-filters">
        <label className="search-box">
          <Search size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find the right starting point…"
            aria-label="Search templates"
          />
        </label>
        {!industryId && (
          <select
            aria-label="Industry"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All industries</option>
            {industries.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        )}
        <label className="select-with-icon">
          <SlidersHorizontal size={16} />
          <select
            aria-label="Design style"
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
          >
            <option value="all">All styles</option>
            {["editorial", "split", "immersive", "minimal", "structured"].map(
              (l) => (
                <option key={l}>{l}</option>
              ),
            )}
          </select>
        </label>
      </div>
      <p className="result-count">
        {list.length} carefully considered starting points
      </p>
      <div className="template-grid">
        {list.map((t) => (
          <TemplateCard key={t.id} template={t} onSelect={onSelect} />
        ))}
      </div>
      {list.length === 0 && (
        <div className="empty-state">
          <Search />
          <h3>No templates found</h3>
          <p>Try another search or change the filters.</p>
        </div>
      )}
    </div>
  );
}
