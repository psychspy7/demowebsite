"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  SlidersHorizontal,
  Eye,
  Sparkles,
  ArrowUpDown,
  Wand2,
} from "lucide-react";
import { templates, industries, getIndustry } from "@/lib/catalogue";
import type { Template } from "@/lib/types";
import { LivePreviewModal } from "./live-preview-modal";

export function TemplateThumbnail({
  template: t,
  onPreview,
}: {
  template: Template;
  onPreview?: () => void;
}) {
  const industry = getIndustry(t.industry);

  return (
    <div
      className={`template-art-card art-${t.layout}`}
      style={{ "--art-color": t.color } as React.CSSProperties}
      onClick={(e) => {
        if (onPreview) {
          e.preventDefault();
          onPreview();
        }
      }}
    >
      <div className="thumbnail-topbar">
        <span className="thumbnail-badge">{t.layout}</span>
        <span className="thumbnail-industry">{industry?.name}</span>
      </div>

      <div className="thumbnail-canvas">
        <img
          src={t.image}
          alt={t.name}
          loading="lazy"
          className="thumbnail-photo"
        />
        <div className="thumbnail-scrim" />
        <div className="thumbnail-content">
          <small className="thumbnail-eyebrow">
            {industry?.eyebrow || "Precision Blueprint"}
          </small>
          <strong className="thumbnail-title">{t.specialty}</strong>
        </div>

        <div className="thumbnail-hover-action">
          <span className="thumbnail-preview-pill">
            <Eye size={14} /> Quick Preview
          </span>
        </div>
      </div>

      <div className="thumbnail-footer-bar">
        <span>BLUEPRINT KC/{t.id.slice(0, 8).toUpperCase()}</span>
        <span>LIVE DEMO ↗</span>
      </div>
    </div>
  );
}

export function TemplateCard({
  template: t,
  onSelect,
  onPreview,
}: {
  template: Template;
  onSelect?: (t: Template) => void;
  onPreview?: (t: Template) => void;
}) {
  const industry = getIndustry(t.industry);

  return (
    <article className="template-card">
      <div
        className="template-card-media"
        onClick={() => onPreview && onPreview(t)}
      >
        <TemplateThumbnail template={t} onPreview={() => onPreview && onPreview(t)} />
      </div>

      <div className="template-card-caption">
        <div>
          <span className="eyebrow">
            {t.layout} · {industry?.name}
          </span>
          <h3>{t.name}</h3>
          <p className="template-card-specialty">{t.specialty}</p>
        </div>

        <div className="template-card-cta-group">
          <button
            type="button"
            className="button small quick-preview-btn"
            onClick={() => onPreview && onPreview(t)}
            title={`Quick preview of ${t.name}`}
          >
            <Eye size={14} />
            <span>Preview</span>
          </button>

          <Link
            href={`/admin/demos/new?template=${t.id}`}
            className="button small dark customize-btn"
            title={`Customize ${t.specialty} for client`}
          >
            <Wand2 size={13} />
            <span className="desktop-only-text">Customize</span>
          </Link>

          {onSelect ? (
            <button
              className="icon-button"
              title={`Use ${t.specialty}`}
              onClick={() => onSelect(t)}
              type="button"
            >
              <ArrowRight size={18} />
            </button>
          ) : (
            <Link
              className="icon-button"
              href={`/templates/${t.id}`}
              aria-label={`Open ${t.name} standalone`}
              title="Open full page"
            >
              <ArrowUpRight size={18} />
            </Link>
          )}
        </div>
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
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(industryId || "all");
  const [layout, setLayout] = useState("all");
  const [sortBy, setSortBy] = useState<"recommended" | "name" | "industry">(
    "recommended"
  );
  const [activeModalTemplate, setActiveModalTemplate] = useState<Template | null>(
    null
  );

  const filteredList = useMemo(() => {
    let list = templates.filter((t) => {
      const matchesCategory =
        category === "all" || t.industry === category;
      const matchesLayout = layout === "all" || t.layout === layout;
      const industryName = getIndustry(t.industry)?.name || "";
      const searchTarget = `${t.name} ${t.specialty} ${industryName} ${t.layout}`.toLowerCase();
      const matchesQuery = !query || searchTarget.includes(query.toLowerCase().trim());
      return matchesCategory && matchesLayout && matchesQuery;
    });

    if (sortBy === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "industry") {
      list = [...list].sort((a, b) =>
        (getIndustry(a.industry)?.name || "").localeCompare(
          getIndustry(b.industry)?.name || ""
        )
      );
    }
    return list;
  }, [category, layout, query, sortBy]);

  return (
    <div className={compact ? "library compact" : "library"}>
      {/* Category Horizontal Segmented Pill Bar */}
      {!industryId && (
        <div className="category-pill-container" role="tablist" aria-label="Industry filter">
          <button
            type="button"
            role="tab"
            aria-selected={category === "all"}
            className={`category-pill ${category === "all" ? "active" : ""}`}
            onClick={() => setCategory("all")}
          >
            <span>All Industries</span>
            <small>{templates.length}</small>
          </button>
          {industries.map((ind) => {
            const count = templates.filter((t) => t.industry === ind.id).length;
            return (
              <button
                key={ind.id}
                type="button"
                role="tab"
                aria-selected={category === ind.id}
                className={`category-pill ${
                  category === ind.id ? "active" : ""
                }`}
                onClick={() => setCategory(ind.id)}
              >
                <span>{ind.name}</span>
                <small>{count}</small>
              </button>
            );
          })}
        </div>
      )}

      {/* Filter and Control Strip */}
      <div className="library-filters">
        <label className="search-box">
          <Search size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 88 blueprints by specialty, name, or industry…"
            aria-label="Search templates"
          />
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setQuery("")}
            >
              Clear
            </button>
          )}
        </label>

        <div className="filter-select-group">
          <label className="select-with-icon" aria-label="Filter by layout style">
            <SlidersHorizontal size={15} />
            <select
              aria-label="Design style"
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
            >
              <option value="all">All Styles</option>
              {["editorial", "split", "immersive", "minimal", "structured"].map(
                (l) => (
                  <option key={l} value={l}>
                    Style: {l.charAt(0).toUpperCase() + l.slice(1)}
                  </option>
                )
              )}
            </select>
          </label>

          <label className="select-with-icon" aria-label="Sort templates">
            <ArrowUpDown size={15} />
            <select
              aria-label="Sort options"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "recommended" | "name" | "industry")
              }
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="name">Sort: Name (A-Z)</option>
              <option value="industry">Sort: Industry</option>
            </select>
          </label>
        </div>
      </div>

      {/* Results Header Bar */}
      <div className="results-header-bar">
        <p className="result-count">
          Showing <strong>{filteredList.length}</strong> specialty blueprints
          {category !== "all" && ` in ${getIndustry(category)?.name}`}
          {layout !== "all" && ` (${layout} style)`}
        </p>
        <span className="results-verified-badge">
          <Sparkles size={13} /> Sub-400ms Edge Verified
        </span>
      </div>

      {/* Grid of Templates */}
      <div className="template-grid">
        {filteredList.map((t) => (
          <TemplateCard
            key={t.id}
            template={t}
            onSelect={onSelect}
            onPreview={(tmpl) => setActiveModalTemplate(tmpl)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredList.length === 0 && (
        <div className="empty-state">
          <Search size={32} />
          <h3>No matching blueprints found</h3>
          <p>
            No templates match &quot;{query}&quot;. Try adjusting your search keywords
            or reset the filters.
          </p>
          <button
            type="button"
            className="button dark"
            onClick={() => {
              setQuery("");
              setCategory(industryId || "all");
              setLayout("all");
            }}
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* Apple-Grade Live Preview Modal */}
      {activeModalTemplate && (
        <LivePreviewModal
          template={activeModalTemplate}
          onClose={() => setActiveModalTemplate(null)}
        />
      )}
    </div>
  );
}
