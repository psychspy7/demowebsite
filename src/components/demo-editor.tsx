"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Save,
  Globe,
  Monitor,
  Smartphone,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Upload,
  Copy,
  Check,
} from "lucide-react";
import type {
  AdminDemo,
  Asset,
  Section,
  SectionKind,
  PublicDemo,
} from "@/lib/types";
import { platform } from "@/services/client";
import { makeSection } from "@/lib/catalogue";
import { Field, Badge } from "./ui";
import { BusinessSite } from "./business-site";
export function DemoEditor({
  initial,
  assets,
  onSaved,
  notify,
}: {
  initial: AdminDemo;
  assets: Asset[];
  onSaved: () => Promise<void>;
  notify: (s: string) => void;
}) {
  const [d, setD] = useState(initial),
    [tab, setTab] = useState("Content"),
    [device, setDevice] = useState("desktop"),
    [dirty, setDirty] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [media, setMedia] = useState(assets),
    [sectionKind, setSectionKind] = useState<SectionKind>("services");
  useEffect(() => {
    const leave = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", leave);
    return () => window.removeEventListener("beforeunload", leave);
  }, [dirty]);
  const change = (patch: Partial<AdminDemo>) => {
    setD((prev) => ({ ...prev, ...patch }));
    setDirty(true);
  };
  async function save(status = d.status) {
    setBusy(true);
    setError("");
    try {
      const saved = await platform.saveDemo({ ...d, status });
      setD(saved);
      setDirty(false);
      await onSaved();
      notify(
        status === "published"
          ? "Demo published. Your shareable URL is ready."
          : "Draft saved.",
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const sectionChange = (id: string, patch: Partial<Section>) =>
    change({
      sections: d.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  async function upload(file: File) {
    const a = await platform.upload(file, d.businessName);
    setMedia((m) => [...m, a]);
    return a.url;
  }
  function move(index: number, delta: number) {
    const s = [...d.sections];
    [s[index], s[index + delta]] = [s[index + delta], s[index]];
    change({ sections: s });
  }
  const tabs = ["Content", "Sections", "Design", "Contact", "Publishing"];
  return (
    <div className="editor">
      <header className="editor-header">
        <div>
          <Link
            href="/admin/demos"
            className="icon-button"
            aria-label="Back to demos"
            onClick={(e) => {
              if (dirty && !confirm("Leave without saving your changes?"))
                e.preventDefault();
            }}
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1>{d.businessName}</h1>
            <span>
              {dirty ? "Unsaved changes" : "All changes saved"} ·{" "}
              <Badge value={d.status} />
            </span>
          </div>
        </div>
        <div className="button-row">
          <a
            className="button small"
            href={`/preview/${d.slug}`}
            target="_blank"
            rel="noreferrer"
          >
            Saved preview
            <ArrowUpRight size={15} />
          </a>
          <button
            className="button small"
            disabled={busy}
            onClick={() => save()}
          >
            <Save size={16} />
            Save
          </button>
          <button
            className="button small dark"
            disabled={busy}
            onClick={() =>
              save(d.status === "published" ? "draft" : "published")
            }
          >
            <Globe size={16} />
            {d.status === "published" ? "Unpublish" : "Publish demo"}
          </button>
        </div>
      </header>
      {error && (
        <div role="alert" className="error-banner">
          {error}
        </div>
      )}
      <div className="editor-layout">
        <aside className="editor-controls">
          <nav className="editor-tabs">
            {tabs.map((t) => (
              <button
                key={t}
                className={tab === t ? "active" : ""}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </nav>
          <div className="editor-fields">
            {tab === "Content" && (
              <>
                <div className="field-group-heading">
                  <span className="eyebrow">THE ESSENTIALS</span>
                  <h2>Make it their own.</h2>
                </div>
                <Field
                  label="Business name"
                  value={d.businessName}
                  onChange={(businessName) => change({ businessName })}
                />
                <Field
                  label="Business category"
                  value={d.business.category}
                  onChange={(category) =>
                    change({ business: { ...d.business, category } })
                  }
                />
                <Field
                  label="Tagline / eyebrow"
                  value={d.business.tagline}
                  onChange={(tagline) =>
                    change({ business: { ...d.business, tagline } })
                  }
                />
                <ImageField
                  label="Business logo"
                  value={d.business.logo}
                  onChange={(logo) =>
                    change({ business: { ...d.business, logo } })
                  }
                  assets={media}
                  upload={upload}
                />
                <hr />
                <Field
                  label="Hero heading"
                  value={d.hero.heading}
                  onChange={(heading) =>
                    change({ hero: { ...d.hero, heading } })
                  }
                  textarea
                />
                <Field
                  label="Hero description"
                  value={d.hero.description}
                  onChange={(description) =>
                    change({ hero: { ...d.hero, description } })
                  }
                  textarea
                />
                <ImageField
                  label="Hero image"
                  value={d.hero.image}
                  onChange={(image) => change({ hero: { ...d.hero, image } })}
                  assets={media}
                  upload={upload}
                />
                <Field
                  label="Primary button label"
                  value={d.hero.ctaLabel}
                  onChange={(ctaLabel) =>
                    change({ hero: { ...d.hero, ctaLabel } })
                  }
                />
                <Field
                  label="Primary button link"
                  value={d.hero.ctaLink}
                  onChange={(ctaLink) =>
                    change({ hero: { ...d.hero, ctaLink } })
                  }
                  help="Use #enquire, an https URL, tel: or mailto:."
                />
                <hr />
                <Field
                  label="About the business"
                  value={d.business.description}
                  onChange={(description) =>
                    change({ business: { ...d.business, description } })
                  }
                  textarea
                />
                <Field
                  label="Footer text"
                  value={d.footer}
                  onChange={(footer) => change({ footer })}
                  textarea
                />
              </>
            )}
            {tab === "Sections" && (
              <>
                <div className="field-group-heading">
                  <span className="eyebrow">BUILD THE STORY</span>
                  <h2>Every detail, in order.</h2>
                  <p>Edit, reorder, show or hide each part of the website.</p>
                </div>
                {d.sections.map((s, n) => (
                  <details className="section-editor" key={s.id}>
                    <summary>
                      <span>{String(n + 1).padStart(2, "0")}</span>
                      {s.heading}
                      {!s.visible && <EyeOff size={14} />}
                    </summary>
                    <div className="section-editor-body">
                      <div className="section-actions">
                        <button
                          className="icon-button"
                          title="Move section up"
                          disabled={n === 0}
                          onClick={() => move(n, -1)}
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          className="icon-button"
                          title="Move section down"
                          disabled={n === d.sections.length - 1}
                          onClick={() => move(n, 1)}
                        >
                          <ChevronDown size={16} />
                        </button>
                        <button
                          className="icon-button"
                          title={s.visible ? "Hide section" : "Show section"}
                          onClick={() =>
                            sectionChange(s.id, { visible: !s.visible })
                          }
                        >
                          {s.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button
                          className="icon-button danger"
                          title="Delete section"
                          onClick={() => {
                            if (confirm("Delete this section?"))
                              change({
                                sections: d.sections.filter(
                                  (x) => x.id !== s.id,
                                ),
                              });
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <Field
                        label="Section heading"
                        value={s.heading}
                        onChange={(heading) => sectionChange(s.id, { heading })}
                      />
                      <Field
                        label="Section description"
                        value={s.description}
                        onChange={(description) =>
                          sectionChange(s.id, { description })
                        }
                        textarea
                      />
                      <Field
                        label="Section button label"
                        value={s.ctaLabel}
                        onChange={(ctaLabel) =>
                          sectionChange(s.id, { ctaLabel })
                        }
                      />
                      <Field
                        label="Section button link"
                        value={s.ctaLink}
                        onChange={(ctaLink) => sectionChange(s.id, { ctaLink })}
                      />
                      {s.items.map((item, i) => (
                        <div key={item.id} className="item-editor">
                          <div className="item-editor-title">
                            <strong>Item {i + 1}</strong>
                            <button
                              className="icon-button danger"
                              title="Remove item"
                              onClick={() =>
                                sectionChange(s.id, {
                                  items: s.items.filter(
                                    (x) => x.id !== item.id,
                                  ),
                                })
                              }
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          {(
                            [
                              "title",
                              "text",
                              "price",
                              "category",
                              "link",
                            ] as const
                          ).map((k) => (
                            <Field
                              key={k}
                              label={
                                {
                                  title: "Title / name",
                                  text: "Description / answer",
                                  price: "Price (optional)",
                                  category: "Filter category",
                                  link: "Item link (optional)",
                                }[k]
                              }
                              value={item[k]}
                              textarea={k === "text"}
                              onChange={(v) =>
                                sectionChange(s.id, {
                                  items: s.items.map((x) =>
                                    x.id === item.id ? { ...x, [k]: v } : x,
                                  ),
                                })
                              }
                            />
                          ))}
                          <ImageField
                            label="Item image"
                            value={item.image}
                            assets={media}
                            upload={upload}
                            onChange={(image) =>
                              sectionChange(s.id, {
                                items: s.items.map((x) =>
                                  x.id === item.id ? { ...x, image } : x,
                                ),
                              })
                            }
                          />
                        </div>
                      ))}
                      {!["about", "contact"].includes(s.kind) && (
                        <button
                          className="button small full"
                          onClick={() =>
                            sectionChange(s.id, {
                              items: [
                                ...s.items,
                                {
                                  id: crypto.randomUUID(),
                                  title: "New item",
                                  text: "",
                                  price: "",
                                  category: "",
                                  image: "",
                                  link: "",
                                },
                              ],
                            })
                          }
                        >
                          <Plus size={16} />
                          Add item
                        </button>
                      )}
                    </div>
                  </details>
                ))}
                <div className="add-section">
                  <select
                    aria-label="New section type"
                    value={sectionKind}
                    onChange={(e) =>
                      setSectionKind(e.target.value as SectionKind)
                    }
                  >
                    {[
                      "about",
                      "services",
                      "catalogue",
                      "team",
                      "gallery",
                      "pricing",
                      "faq",
                      "hours",
                      "testimonials",
                      "contact",
                    ].map((k) => (
                      <option key={k}>{k}</option>
                    ))}
                  </select>
                  <button
                    className="button small dark"
                    onClick={() =>
                      change({
                        sections: [
                          ...d.sections,
                          makeSection(
                            sectionKind,
                            `New ${sectionKind} section`,
                          ),
                        ],
                      })
                    }
                  >
                    <Plus size={16} />
                    Add section
                  </button>
                </div>
                <p className="hint">
                  Only add verified team details, testimonials and business
                  claims. Empty team and testimonial sections are hidden.
                </p>
              </>
            )}
            {tab === "Design" && (
              <>
                <div className="field-group-heading">
                  <span className="eyebrow">SET THE TONE</span>
                  <h2>A distinct point of view.</h2>
                </div>
                {(["primary", "secondary", "accent"] as const).map((k) => (
                  <Field
                    key={k}
                    type="color"
                    label={`${k[0].toUpperCase() + k.slice(1)} colour`}
                    value={d.design[k]}
                    onChange={(v) =>
                      change({ design: { ...d.design, [k]: v } })
                    }
                  />
                ))}
                <Field
                  label="Typography"
                  value={d.design.font}
                  options={[
                    { value: "serif", label: "Editorial serif" },
                    { value: "sans", label: "Modern sans serif" },
                    { value: "mono", label: "Technical monospace" },
                  ]}
                  onChange={(font) => change({ design: { ...d.design, font } })}
                />
                <Field
                  label="Layout"
                  value={d.design.layout}
                  options={[
                    "editorial",
                    "split",
                    "immersive",
                    "minimal",
                    "structured",
                  ].map((value) => ({ value, label: value }))}
                  onChange={(layout) =>
                    change({
                      design: {
                        ...d.design,
                        layout: layout as AdminDemo["design"]["layout"],
                      },
                    })
                  }
                />
                <Field
                  label="Theme"
                  value={d.design.theme}
                  options={["light", "dark"].map((value) => ({
                    value,
                    label: value,
                  }))}
                  onChange={(theme) =>
                    change({
                      design: { ...d.design, theme: theme as "light" | "dark" },
                    })
                  }
                />
                <Field
                  label="Button shape"
                  value={d.design.buttonStyle}
                  options={["square", "soft", "pill"].map((value) => ({
                    value,
                    label: value,
                  }))}
                  onChange={(buttonStyle) =>
                    change({
                      design: {
                        ...d.design,
                        buttonStyle:
                          buttonStyle as AdminDemo["design"]["buttonStyle"],
                      },
                    })
                  }
                />
              </>
            )}
            {tab === "Contact" && (
              <>
                <div className="field-group-heading">
                  <span className="eyebrow">OPEN A CONVERSATION</span>
                  <h2>Put people in touch.</h2>
                  <p>Only configured contact details appear on the demo.</p>
                </div>
                {Object.entries({
                  phone: "Phone number",
                  whatsapp: "WhatsApp number (with country code)",
                  whatsappMessage: "WhatsApp message",
                  email: "Email",
                  address: "Street address",
                  city: "City",
                  state: "State",
                  postalCode: "Postal code",
                  maps: "Google Maps URL",
                  instagram: "Instagram URL",
                  facebook: "Facebook URL",
                  linkedin: "LinkedIn URL",
                }).map(([key, label]) => (
                  <Field
                    key={key}
                    label={label}
                    value={d.contact[key as keyof typeof d.contact]}
                    onChange={(v) =>
                      change({ contact: { ...d.contact, [key]: v } })
                    }
                    textarea={key === "whatsappMessage"}
                  />
                ))}
              </>
            )}
            {tab === "Publishing" && (
              <>
                <div className="field-group-heading">
                  <span className="eyebrow">READY FOR THE WORLD</span>
                  <h2>The finishing touches.</h2>
                </div>
                <Field
                  label="Demo URL slug"
                  value={d.slug}
                  onChange={(slug) => change({ slug })}
                  help="Lowercase letters, numbers and hyphens. Changing this breaks the old link."
                />
                <div className="url-box">
                  /preview/{d.slug}
                  <button
                    className="icon-button"
                    title="Copy demo URL"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(
                          `${location.origin}/preview/${d.slug}`,
                        );
                        notify("Demo URL copied.");
                      } catch {
                        notify(
                          "Copy failed. Use the address shown in the saved preview.",
                        );
                      }
                    }}
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <Field
                  label="Page title"
                  value={d.seo.title}
                  onChange={(title) => change({ seo: { ...d.seo, title } })}
                />
                <Field
                  label="Meta description"
                  value={d.seo.description}
                  onChange={(description) =>
                    change({ seo: { ...d.seo, description } })
                  }
                  textarea
                />
                <Field
                  label="Canonical URL (optional)"
                  value={d.seo.canonical}
                  onChange={(canonical) =>
                    change({ seo: { ...d.seo, canonical } })
                  }
                />
                <ImageField
                  label="Social sharing image"
                  value={d.seo.ogImage}
                  assets={media}
                  upload={upload}
                  onChange={(ogImage) => change({ seo: { ...d.seo, ogImage } })}
                />
                <ImageField
                  label="Favicon (PNG)"
                  value={d.business.favicon}
                  assets={media}
                  upload={upload}
                  onChange={(favicon) =>
                    change({ business: { ...d.business, favicon } })
                  }
                />
                <label className="check-label">
                  <input
                    type="checkbox"
                    checked={d.seo.noindex}
                    onChange={(e) =>
                      change({ seo: { ...d.seo, noindex: e.target.checked } })
                    }
                  />
                  Ask search engines not to index this demo
                </label>
                <label className="check-label">
                  <input
                    type="checkbox"
                    checked={d.settings.showDemoLabel}
                    onChange={(e) =>
                      change({
                        settings: {
                          ...d.settings,
                          showDemoLabel: e.target.checked,
                        },
                      })
                    }
                  />
                  Show “Demo preview” label
                </label>
                <Field
                  label="Expiry (local time, optional)"
                  type="datetime-local"
                  value={
                    d.settings.expiresAt ? localDate(d.settings.expiresAt) : ""
                  }
                  onChange={(v) =>
                    change({
                      settings: {
                        ...d.settings,
                        expiresAt: v ? new Date(v).toISOString() : "",
                      },
                    })
                  }
                />
                <Field
                  label={
                    d.hasPassword
                      ? "Replace demo password"
                      : "Demo password (optional)"
                  }
                  type="password"
                  value={d.password || ""}
                  onChange={(password) =>
                    change({
                      password: password || undefined,
                      clearPassword: false,
                    })
                  }
                  help="Minimum 8 characters. Passwords are hashed on the server."
                />
                {d.hasPassword && (
                  <label className="check-label">
                    <input
                      type="checkbox"
                      checked={d.clearPassword || false}
                      onChange={(e) =>
                        change({
                          clearPassword: e.target.checked,
                          password: undefined,
                        })
                      }
                    />
                    Remove existing password protection
                  </label>
                )}
                <Field
                  label="Internal notes"
                  value={d.notes}
                  onChange={(notes) => change({ notes })}
                  textarea
                  help="Private. Never included in public page data."
                />
              </>
            )}
          </div>
        </aside>
        <section className="editor-preview">
          <div className="preview-toolbar">
            <span>
              <span className="status-dot" /> LIVE PREVIEW
            </span>
            <div>
              <button
                className={`icon-button ${device === "desktop" ? "selected" : ""}`}
                aria-label="Desktop preview"
                onClick={() => setDevice("desktop")}
              >
                <Monitor size={18} />
              </button>
              <button
                className={`icon-button ${device === "mobile" ? "selected" : ""}`}
                aria-label="Mobile preview"
                onClick={() => setDevice("mobile")}
              >
                <Smartphone size={18} />
              </button>
            </div>
            <span>{device === "desktop" ? "1100px" : "390px"}</span>
          </div>
          <div className={`preview-stage ${device}`}>
            <LiveFrame demo={d} device={device} />
          </div>
          <p className="preview-caption">
            Changes appear instantly. Save to update the shared preview.
          </p>
        </section>
      </div>
    </div>
  );
}
function localDate(value: string) {
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}
export function ImageField({
  label,
  value,
  onChange,
  assets,
  upload,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  assets: Asset[];
  upload: (file: File) => Promise<string>;
}) {
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  return (
    <div className="image-field">
      <Field
        label={label}
        value={value}
        onChange={onChange}
        placeholder="Image URL or select from the library"
      />
      {value && <img src={value} alt={label} />}
      <div className="image-actions">
        <select
          aria-label={`Choose ${label}`}
          value=""
          onChange={(e) => {
            if (e.target.value) onChange(e.target.value);
          }}
        >
          <option value="">Choose from library</option>
          {assets.map((a) => (
            <option key={a.id} value={a.url}>
              {a.folder} / {a.name}
            </option>
          ))}
        </select>
        <label className="button small upload-label">
          <Upload size={15} />
          {busy ? "Uploading…" : "Upload"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            disabled={busy}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setBusy(true);
              setError("");
              try {
                onChange(await upload(file));
              } catch (e) {
                setError((e as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          />
        </label>
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
function LiveFrame({ demo, device }: { demo: AdminDemo; device: string }) {
  const ref = useRef<HTMLIFrameElement>(null),
    [mount, setMount] = useState<HTMLElement | null>(null);
  function loaded() {
    const doc = ref.current?.contentDocument;
    if (!doc) return;
    document
      .querySelectorAll('link[rel="stylesheet"],style')
      .forEach((node) => doc.head.appendChild(node.cloneNode(true)));
    setMount(doc.body);
  }
  const { notes, revision, hasPassword, password, clearPassword, ...safe } =
    demo;
  return (
    <iframe
      ref={ref}
      title="Live website preview"
      className={`live-frame ${device}`}
      srcDoc="<!doctype html><html lang='en'><head><meta name='viewport' content='width=device-width, initial-scale=1'></head><body></body></html>"
      onLoad={loaded}
    >
      {mount &&
        createPortal(
          <BusinessSite demo={safe as PublicDemo} mode="editor" />,
          mount,
        )}
    </iframe>
  );
}
