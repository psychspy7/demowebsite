"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import QRCode from "qrcode";
import {
  LayoutDashboard,
  Layers,
  PanelsTopLeft,
  Image as ImageIcon,
  Users,
  Inbox,
  Settings,
  Plus,
  ArrowUpRight,
  ArrowRight,
  Search,
  Copy,
  Trash2,
  ExternalLink,
  Globe,
  FileText,
  LogOut,
  Menu,
  X,
  QrCode,
  Download,
  Check,
  BarChart3,
  Upload,
} from "lucide-react";
import { Brand } from "./brand";
import { TemplateLibrary, TemplateThumbnail } from "./template-library";
import { DemoEditor } from "./demo-editor";
import { Field, Modal, Busy, Badge } from "./ui";
import { platform } from "@/services/client";
import {
  industries,
  templates,
  getIndustry,
  getTemplate,
  OFFICIAL,
} from "@/lib/catalogue";
import { prospectStatuses } from "@/lib/types";
import type {
  Snapshot,
  AdminDemo,
  Template,
  Prospect,
  Asset,
} from "@/lib/types";
const nav = [
  ["", "Overview", LayoutDashboard],
  ["demos", "My demos", PanelsTopLeft],
  ["templates", "Template library", Layers],
  ["media", "Media library", ImageIcon],
  ["prospects", "Prospects", Users],
  ["enquiries", "Enquiries", Inbox],
  ["settings", "Settings", Settings],
] as const;
export function AdminApp() {
  const path = usePathname().split("/").filter(Boolean).slice(1),
    router = useRouter(),
    query = useSearchParams();
  const page = path[0] || "";
  const [data, setData] = useState<Snapshot | null>(null),
    [error, setError] = useState(""),
    [toast, setToast] = useState(""),
    [mobile, setMobile] = useState(false),
    [selected, setSelected] = useState<Template | null>(null),
    [businessName, setBusinessName] = useState(""),
    [busy, setBusy] = useState(false),
    [creatingError, setCreatingError] = useState(""),
    [share, setShare] = useState<AdminDemo | null>(null),
    [qr, setQr] = useState("");
  const refresh = useCallback(async () => {
    try {
      setData(await platform.snapshot());
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4500);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    setMobile(false);
    if (page === "demos" && path[1] === "new" && query.get("template")) {
      const t = getTemplate(query.get("template")!);
      if (t) setSelected(t);
    }
  }, [page, path[1], query]);
  useEffect(() => {
    if (share)
      QRCode.toDataURL(`${location.origin}/preview/${share.slug}`, {
        width: 480,
        margin: 2,
        color: { dark: "#212821", light: "#ffffff" },
      })
        .then(setQr)
        .catch(() => setToast("Unable to generate QR code."));
  }, [share]);
  async function action(fn: () => Promise<unknown>, message: string) {
    try {
      await fn();
      await refresh();
      setToast(message);
    } catch (e) {
      setToast((e as Error).message);
    }
  }
  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setBusy(true);
    setCreatingError("");
    try {
      const d = await platform.createDemo(selected.id, businessName);
      await refresh();
      setSelected(null);
      setBusinessName("");
      router.push(`/admin/demos/${d.id}`);
    } catch (e) {
      setCreatingError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function copy(d: AdminDemo) {
    try {
      await navigator.clipboard.writeText(
        `${location.origin}/preview/${d.slug}`,
      );
      setToast(
        d.status === "published"
          ? "Demo URL copied."
          : "Draft URL copied. Publish it before sharing externally.",
      );
    } catch {
      setShare(d);
    }
  }
  const editDemo =
    page === "demos" && path[1] && path[1] !== "new"
      ? data?.demos.find((d) => d.id === path[1])
      : null;
  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${mobile ? "open" : ""}`}>
        <Brand />
        <button
          className="sidebar-close icon-button"
          onClick={() => setMobile(false)}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
        <div className="workspace-badge">
          <span>KC</span>
          <div>
            <strong>KITTY CORP</strong>
            <small>Internal workspace</small>
          </div>
          <i />
        </div>
        <span className="nav-section-label">WORKSPACE</span>
        <nav aria-label="Studio navigation">
          {nav.map(([url, label, Icon]) => (
            <Link
              key={url}
              href={`/admin${url ? "/" + url : ""}`}
              className={page === url ? "active" : ""}
            >
              <Icon size={18} />
              {label}
              {url === "enquiries" &&
                !!data?.enquiries.filter((e) => e.status === "new").length && (
                  <span className="nav-count">
                    {data.enquiries.filter((e) => e.status === "new").length}
                  </span>
                )}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <span className="eyebrow">A LITTLE INSPIRATION</span>
            <p>The next great website starts with a conversation.</p>
            <a href={OFFICIAL} target="_blank" rel="noreferrer">
              Visit KITTY CORP <ArrowUpRight size={15} />
            </a>
          </div>
          <button
            onClick={async () => {
              await fetch("/api/auth", { method: "DELETE" });
              location.href = "/admin";
            }}
          >
            <span className="avatar">KC</span>
            <span>
              Studio administrator<small>Sign out</small>
            </span>
            <LogOut size={16} />
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <button
              className="mobile-nav icon-button"
              aria-label="Open studio navigation"
              onClick={() => setMobile(true)}
            >
              <Menu size={20} />
            </button>
            <span>
              Workspace <span>/</span>{" "}
              {nav.find((n) => n[0] === page)?.[1] || "Overview"}
            </span>
          </div>
          <div>
            <span className="environment-label">
              <i />
              LOCAL DEVELOPMENT
            </span>
            <Link href="/" className="text-link">
              View platform <ArrowUpRight size={15} />
            </Link>
          </div>
        </header>
        {error ? (
          <div className="empty-state">
            <h2>Workspace unavailable</h2>
            <p role="alert">{error}</p>
            <button className="button dark" onClick={refresh}>
              Try again
            </button>
          </div>
        ) : !data ? (
          <Busy />
        ) : editDemo ? (
          <DemoEditor
            key={editDemo.id}
            initial={editDemo}
            assets={data.assets}
            onSaved={refresh}
            notify={setToast}
          />
        ) : (
          <main className="admin-content">
            {page === "" && <Overview data={data} />}
            {page === "demos" && !path[1] && (
              <DemoList
                data={data}
                action={action}
                copy={copy}
                share={setShare}
              />
            )}
            {(page === "templates" ||
              (page === "demos" && path[1] === "new")) && (
              <>
                <PageHeading
                  eyebrow="START WITH A STRONG FOUNDATION"
                  title={
                    page === "templates"
                      ? "The template collection."
                      : "What are we building?"
                  }
                  description="Choose an industry and a design. Make every detail their own."
                />
                <TemplateLibrary
                  compact
                  onSelect={(t) => {
                    setCreatingError("");
                    setSelected(t);
                  }}
                />
              </>
            )}
            {page === "demos" && path[1] && path[1] !== "new" && !editDemo && (
              <div className="empty-state">
                <h2>Demo not found</h2>
                <Link href="/admin/demos" className="button dark">
                  Return to demos
                </Link>
              </div>
            )}
            {page === "media" && (
              <MediaLibrary
                assets={data.assets}
                action={action}
                refresh={refresh}
                notify={setToast}
              />
            )}
            {page === "prospects" && (
              <Prospects
                data={data}
                action={action}
                refresh={refresh}
                notify={setToast}
              />
            )}
            {page === "enquiries" && <Enquiries data={data} action={action} />}
            {page === "settings" && <SettingsPage data={data} />}
            {![
              "",
              "demos",
              "templates",
              "media",
              "prospects",
              "enquiries",
              "settings",
            ].includes(page) && (
              <div className="empty-state">
                <h2>Page not found</h2>
                <Link href="/admin">Return to overview</Link>
              </div>
            )}
          </main>
        )}
      </div>
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
          <button
            aria-label="Dismiss notification"
            onClick={() => setToast("")}
          >
            <X size={14} />
          </button>
        </div>
      )}
      {selected && (
        <Modal title="A new possibility." onClose={() => setSelected(null)}>
          <TemplateThumbnail template={selected} />
          <form onSubmit={create}>
            <p className="hint">
              {selected.name} · {getIndustry(selected.industry)?.name}
            </p>
            <Field
              label="Business name"
              value={businessName}
              onChange={setBusinessName}
              placeholder="e.g. The Corner Café"
              required
            />
            <p className="hint">
              We’ll create an independent draft. You can customise all content
              before publishing.
            </p>
            {creatingError && (
              <p className="error-text" role="alert">
                {creatingError}
              </p>
            )}
            <button
              className="button dark full"
              disabled={busy || businessName.trim().length < 2}
            >
              {busy ? "Creating…" : "Create & open editor"}
              <ArrowRight size={18} />
            </button>
          </form>
        </Modal>
      )}
      {share && (
        <Modal
          title="Ready to make an impression."
          onClose={() => {
            setShare(null);
            setQr("");
          }}
        >
          <p>Share {share.businessName} with your prospect.</p>
          {share.status === "draft" && (
            <div className="notice">
              This demo is a draft. Publish it before sharing.
            </div>
          )}
          {qr && (
            <img
              className="qr-image"
              src={qr}
              alt={`QR code for ${share.businessName}`}
            />
          )}
          <div className="url-box">
            {typeof location !== "undefined" ? location.origin : ""}/preview/
            {share.slug}
          </div>
          <div className="button-row">
            <button className="button dark" onClick={() => copy(share)}>
              <Copy size={16} />
              Copy URL
            </button>
            <a className="button" href={qr} download={`${share.slug}-qr.png`}>
              <Download size={16} />
              Download QR
            </a>
          </div>
        </Modal>
      )}
    </div>
  );
}
function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="admin-page-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
function Overview({ data }: { data: Snapshot }) {
  const published = useMemo(
    () => data.demos.filter((d) => d.status === "published").length,
    [data.demos],
  );
  const counts = useMemo(
    () =>
      industries
        .map((i) => ({
          ...i,
          count: data.demos.filter((d) => d.industry === i.id).length,
        }))
        .filter((i) => i.count > 0),
    [data.demos],
  );
  return (
    <>
      <PageHeading
        eyebrow="YOUR IDEAS, IN MOTION"
        title="Welcome to the studio."
        description="A home for your next great first impression."
      >
        <Link className="button dark" href="/admin/demos/new">
          <Plus size={18} />
          Create a demo
        </Link>
      </PageHeading>
      <div className="stats-grid">
        {[
          [
            PanelsTopLeft,
            "Total demos",
            data.demos.length,
            "Your growing collection",
          ],
          [Globe, "Published", published, "Ready to share"],
          [
            FileText,
            "In progress",
            data.demos.length - published,
            "Ideas taking shape",
          ],
          [Layers, "Templates", templates.length, "Across 18 industries"],
        ].map(([Icon, label, value, sub]) => {
          const I = Icon as typeof Globe;
          return (
            <article className="stat-card" key={String(label)}>
              <div>
                <span>{String(label)}</span>
                <I size={18} />
              </div>
              <strong>{String(value).padStart(2, "0")}</strong>
              <small>{String(sub)}</small>
            </article>
          );
        })}
      </div>
      <div className="dashboard-banner">
        <div>
          <span className="eyebrow">THE NEXT CONVERSATION STARTS HERE</span>
          <h2>Show them what’s possible.</h2>
          <p>
            Pick a template. Personalise the details. Share a better vision.
          </p>
          <Link className="button lime" href="/admin/templates">
            Explore the collection <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="banner-art">
          <TemplateThumbnail
            template={templates.find((t) => t.id === "restaurant-2")!}
          />
        </div>
      </div>
      <div className="dashboard-columns">
        <section className="panel">
          <div className="panel-heading">
            <h2>Recently edited</h2>
            <Link href="/admin/demos">
              View all <ArrowUpRight size={15} />
            </Link>
          </div>
          {data.demos.length === 0 ? (
            <div className="empty-state compact">
              <PanelsTopLeft size={30} />
              <h3>Your first demo belongs here.</h3>
              <p>Turn a prospect into a personalised website concept.</p>
              <Link className="text-link" href="/admin/demos/new">
                Create your first demo <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="recent-demos">
              {[...data.demos]
                .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
                .slice(0, 4)
                .map((d) => (
                  <Link href={`/admin/demos/${d.id}`} key={d.id}>
                    <img
                      src={d.hero.image || getTemplate(d.templateId)!.image}
                      alt=""
                    />
                    <div>
                      <strong>{d.businessName}</strong>
                      <small>{getIndustry(d.industry)?.name}</small>
                    </div>
                    <Badge value={d.status} />
                    <ArrowUpRight size={18} />
                  </Link>
                ))}
            </div>
          )}
        </section>
        <section className="panel">
          <div className="panel-heading">
            <h2>Industry mix</h2>
            <BarChart3 size={18} />
          </div>
          {counts.length ? (
            <div className="distribution">
              {counts
                .sort((a, b) => b.count - a.count)
                .slice(0, 6)
                .map((i) => (
                  <div key={i.id}>
                    <span>
                      {i.name}
                      <strong>{i.count}</strong>
                    </span>
                    <div>
                      <i
                        style={{
                          width: `${(i.count / data.demos.length) * 100}%`,
                          background: i.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="empty-state compact">
              <Layers size={30} />
              <p>Your industry distribution appears as you create demos.</p>
            </div>
          )}
        </section>
      </div>
      <div className="dashboard-columns">
        <section className="panel">
          <div className="panel-heading">
            <h2>Recent prospects</h2>
            <Link href="/admin/prospects">
              Open prospects <ArrowUpRight size={15} />
            </Link>
          </div>
          {data.prospects.length ? (
            <div className="recent-prospects">
              {data.prospects
                .slice(-4)
                .reverse()
                .map((p) => (
                  <Link href="/admin/prospects" key={p.id}>
                    <span className="avatar">
                      {p.businessName.slice(0, 2).toUpperCase()}
                    </span>
                    <strong>{p.businessName}</strong>
                    <Badge value={p.status} />
                  </Link>
                ))}
            </div>
          ) : (
            <div className="empty-state compact">
              <Users size={30} />
              <p>Keep the people behind your next project close.</p>
              <Link className="text-link" href="/admin/prospects">
                Add a prospect <Plus size={15} />
              </Link>
            </div>
          )}
        </section>
        <section className="panel">
          <div className="panel-heading">
            <h2>Demo activity</h2>
            <span className="hint">All time</span>
          </div>
          <div className="activity-numbers">
            {[
              ["visit", "Page visits"],
              ["whatsapp", "WhatsApp clicks"],
              ["enquiry", "Enquiries"],
            ].map(([type, label]) => (
              <div key={type}>
                <strong>
                  {data.analytics.filter((a) => a.type === type).length}
                </strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p className="panel-note">
            Basic activity counts, including administrator previews. Visits are
            counted once per browser tab session.
          </p>
        </section>
      </div>
    </>
  );
}
function DemoList({
  data,
  action,
  copy,
  share,
}: {
  data: Snapshot;
  action: (fn: () => Promise<unknown>, m: string) => Promise<void>;
  copy: (d: AdminDemo) => void;
  share: (d: AdminDemo) => void;
}) {
  const [q, setQ] = useState(""),
    [status, setStatus] = useState("all");
  const list = useMemo(
    () =>
      data.demos
        .filter(
          (d) =>
            (status === "all" || d.status === status) &&
            d.businessName.toLowerCase().includes(q.toLowerCase()),
        )
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [data.demos, status, q],
  );
  return (
    <>
      <PageHeading
        eyebrow="YOUR GROWING COLLECTION"
        title="A world of possibilities."
        description="Every concept, every conversation, in one place."
      >
        <Link className="button dark" href="/admin/demos/new">
          <Plus size={18} />
          Create a demo
        </Link>
      </PageHeading>
      <div className="list-toolbar">
        <div className="segmented">
          {["all", "published", "draft"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={status === s ? "active" : ""}
            >
              {s === "all" ? "All demos" : s}
            </button>
          ))}
        </div>
        <label className="search-box">
          <Search size={17} />
          <input
            aria-label="Search demos"
            placeholder="Search demos…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
      </div>
      {!list.length ? (
        <div className="empty-state panel">
          <PanelsTopLeft size={36} />
          <h2>
            {data.demos.length
              ? "No matching demos."
              : "Every good idea starts somewhere."}
          </h2>
          <p>
            {data.demos.length
              ? "Try another search or filter."
              : "Choose a template and create your first personalised website."}
          </p>
          <Link className="button dark" href="/admin/demos/new">
            Create a demo <Plus size={17} />
          </Link>
        </div>
      ) : (
        <div className="demo-grid">
          {list.map((d) => (
            <article className="demo-card" key={d.id}>
              <Link href={`/admin/demos/${d.id}`}>
                <TemplateThumbnail
                  template={{
                    ...getTemplate(d.templateId)!,
                    image: d.hero.image || getTemplate(d.templateId)!.image,
                    color: d.design.primary,
                    specialty: d.businessName,
                    layout: d.design.layout,
                  }}
                />
              </Link>
              <div className="demo-card-info">
                <div>
                  <span className="eyebrow">
                    {getIndustry(d.industry)?.name}
                  </span>
                  <Badge value={d.status} />
                </div>
                <Link href={`/admin/demos/${d.id}`}>
                  <h3>{d.businessName}</h3>
                </Link>
                <p>/preview/{d.slug}</p>
                <div className="demo-card-meta">
                  <span>
                    Edited {new Date(d.updatedAt).toLocaleDateString()}
                  </span>
                  <span>
                    {
                      data.analytics.filter(
                        (a) => a.demoId === d.id && a.type === "visit",
                      ).length
                    }{" "}
                    visits
                  </span>
                </div>
                <div className="demo-card-actions">
                  <Link className="button small" href={`/admin/demos/${d.id}`}>
                    Edit website <ArrowRight size={14} />
                  </Link>
                  <a
                    className="icon-button"
                    title="Preview demo"
                    href={`/preview/${d.slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button
                    className="icon-button"
                    title="Copy demo URL"
                    onClick={() => copy(d)}
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    className="icon-button"
                    title="Share QR code"
                    onClick={() => share(d)}
                  >
                    <QrCode size={16} />
                  </button>
                  <button
                    className="icon-button"
                    title="Duplicate demo"
                    onClick={() =>
                      action(
                        () => platform.duplicateDemo(d.id),
                        "An independent draft copy was created.",
                      )
                    }
                  >
                    <Layers size={16} />
                  </button>
                  <button
                    className="icon-button danger"
                    title="Delete demo"
                    onClick={() => {
                      if (
                        confirm(
                          `Delete ${d.businessName} and its enquiries? This cannot be undone.`,
                        )
                      )
                        action(
                          () => platform.deleteDemo(d.id),
                          "Demo deleted.",
                        );
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
function MediaLibrary({
  assets,
  action,
  refresh,
  notify,
}: {
  assets: Asset[];
  action: (fn: () => Promise<unknown>, m: string) => Promise<void>;
  refresh: () => Promise<void>;
  notify: (s: string) => void;
}) {
  const [folder, setFolder] = useState("all"),
    [q, setQ] = useState(""),
    [uploading, setUploading] = useState(false),
    [editing, setEditing] = useState<Asset | null>(null);
  const list = assets.filter(
    (a) =>
      (folder === "all" || a.folder === folder) &&
      a.name.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="THE VISUAL DETAILS"
        title="Your media library."
        description="Logos, photography and the details that make a business its own."
      >
        <label className="button dark upload-label">
          <Upload size={17} />
          {uploading ? "Uploading…" : "Upload images"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            disabled={uploading}
            onChange={async (e) => {
              const files = Array.from(e.target.files || []);
              setUploading(true);
              try {
                for (const file of files)
                  await platform.upload(
                    file,
                    folder === "all" ? "General" : folder,
                  );
                await refresh();
                notify(`${files.length} image(s) uploaded.`);
              } catch (e) {
                await refresh();
                notify((e as Error).message);
              } finally {
                setUploading(false);
              }
            }}
          />
        </label>
      </PageHeading>
      <div className="list-toolbar">
        <select
          aria-label="Media folder"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        >
          <option value="all">All folders</option>
          {Array.from(new Set(assets.map((a) => a.folder))).map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
        <label className="search-box">
          <Search size={17} />
          <input
            aria-label="Search images"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search images…"
          />
        </label>
      </div>
      <p className="hint">
        PNG, JPEG and WebP · up to 5 MB each. Built-in stock photos are included
        with the templates.
      </p>
      {!list.length ? (
        <div className="empty-state panel">
          <ImageIcon size={34} />
          <h2>Make room for the details.</h2>
          <p>Upload images to use across your demo collection.</p>
        </div>
      ) : (
        <div className="media-grid">
          {list.map((a) => (
            <article className="media-card" key={a.id}>
              <img src={a.url} alt={a.name} />
              <div>
                <strong>{a.name}</strong>
                <small>
                  {a.folder} · {Math.round(a.size / 1024)} KB
                </small>
                <div className="button-row">
                  <button
                    className="button small"
                    onClick={() => setEditing({ ...a })}
                  >
                    Organise
                  </button>
                  <button
                    className="icon-button danger"
                    aria-label={`Delete ${a.name}`}
                    onClick={() => {
                      if (confirm(`Delete ${a.name}?`))
                        action(
                          () => platform.deleteAsset(a.id),
                          "Image deleted.",
                        );
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      {editing && (
        <Modal title="Organise image" onClose={() => setEditing(null)}>
          <Field
            label="Image name"
            value={editing.name}
            onChange={(name) => setEditing({ ...editing, name })}
          />
          <Field
            label="Folder"
            value={editing.folder}
            onChange={(folder) => setEditing({ ...editing, folder })}
          />
          <button
            className="button dark"
            onClick={async () => {
              await action(
                () =>
                  platform.updateAsset(editing.id, {
                    name: editing.name,
                    folder: editing.folder,
                  }),
                "Image updated.",
              );
              setEditing(null);
            }}
          >
            Save details
          </button>
        </Modal>
      )}
    </>
  );
}
function Prospects({
  data,
  action,
  refresh,
  notify,
}: {
  data: Snapshot;
  action: (fn: () => Promise<unknown>, m: string) => Promise<void>;
  refresh: () => Promise<void>;
  notify: (s: string) => void;
}) {
  const [editing, setEditing] = useState<Partial<Prospect> | null>(null),
    [q, setQ] = useState(""),
    [status, setStatus] = useState("all"),
    [error, setError] = useState(""),
    [saving, setSaving] = useState(false);
  const list = useMemo(
    () =>
      data.prospects.filter(
        (p) =>
          (status === "all" || p.status === status) &&
          `${p.businessName} ${p.contactPerson}`
            .toLowerCase()
            .includes(q.toLowerCase()),
      ),
    [data.prospects, status, q],
  );
  const blank = () => ({
    businessName: "",
    contactPerson: "",
    phone: "",
    email: "",
    industry: industries[0].id,
    demoId: "",
    status: "New prospect" as const,
    followUp: "",
    notes: "",
  });
  return (
    <>
      <PageHeading
        eyebrow="PEOPLE, NOT JUST PIPELINE"
        title="Keep the conversation going."
        description="From a promising introduction to your next project."
      >
        <button
          className="button dark"
          onClick={() => {
            setError("");
            setEditing(blank());
          }}
        >
          <Plus size={18} />
          Add a prospect
        </button>
      </PageHeading>
      <div className="list-toolbar">
        <select
          aria-label="Outreach status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All statuses</option>
          {prospectStatuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <label className="search-box">
          <Search size={17} />
          <input
            aria-label="Search prospects"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Find a prospect…"
          />
        </label>
      </div>
      {!list.length ? (
        <div className="empty-state panel">
          <Users size={36} />
          <h2>Your next project starts with a person.</h2>
          <p>Add a prospect and keep the next step in sight.</p>
        </div>
      ) : (
        <div className="table-wrap panel">
          <table>
            <thead>
              <tr>
                <th>Business / contact</th>
                <th>Industry</th>
                <th>Outreach status</th>
                <th>Follow-up</th>
                <th>Demo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id}>
                  <td>
                    <button
                      className="table-link"
                      onClick={() => {
                        setError("");
                        setEditing({ ...p });
                      }}
                    >
                      {p.businessName}
                    </button>
                    <small>
                      {p.contactPerson ||
                        p.email ||
                        p.phone ||
                        "No contact added"}
                    </small>
                  </td>
                  <td>{getIndustry(p.industry)?.name}</td>
                  <td>
                    <Badge value={p.status} />
                  </td>
                  <td>{p.followUp || "—"}</td>
                  <td>
                    {p.demoId ? (
                      <Link
                        href={`/preview/${data.demos.find((d) => d.id === p.demoId)?.slug}`}
                        target="_blank"
                        className="text-link"
                      >
                        View <ArrowUpRight size={14} />
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <button
                      className="button small"
                      onClick={() => {
                        setError("");
                        setEditing({ ...p });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="icon-button danger"
                      aria-label={`Delete ${p.businessName}`}
                      onClick={() => {
                        if (confirm(`Delete prospect ${p.businessName}?`))
                          action(
                            () => platform.deleteProspect(p.id),
                            "Prospect deleted.",
                          );
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {editing && (
        <Modal
          title={editing.id ? "Edit prospect" : "A new conversation."}
          onClose={() => setEditing(null)}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSaving(true);
              setError("");
              try {
                await platform.saveProspect(editing);
                await refresh();
                setEditing(null);
                notify("Prospect saved.");
              } catch (e) {
                setError((e as Error).message);
              } finally {
                setSaving(false);
              }
            }}
          >
            {(["businessName", "contactPerson", "phone", "email"] as const).map(
              (k) => (
                <Field
                  key={k}
                  label={
                    {
                      businessName: "Business name",
                      contactPerson: "Contact person",
                      phone: "Phone",
                      email: "Email",
                    }[k]
                  }
                  value={editing[k] || ""}
                  onChange={(v) => setEditing({ ...editing, [k]: v })}
                  type={k === "email" ? "email" : "text"}
                  required={k === "businessName"}
                />
              ),
            )}
            <Field
              label="Industry"
              value={editing.industry || ""}
              options={industries.map((i) => ({ value: i.id, label: i.name }))}
              onChange={(industry) => setEditing({ ...editing, industry })}
            />
            <Field
              label="Linked demo"
              value={editing.demoId || ""}
              options={[
                { value: "", label: "No demo linked" },
                ...data.demos.map((d) => ({
                  value: d.id,
                  label: d.businessName,
                })),
              ]}
              onChange={(demoId) => setEditing({ ...editing, demoId })}
            />
            <Field
              label="Outreach status"
              value={editing.status || "New prospect"}
              options={prospectStatuses.map((value) => ({
                value,
                label: value,
              }))}
              onChange={(status) =>
                setEditing({ ...editing, status: status as Prospect["status"] })
              }
            />
            <Field
              label="Follow-up date"
              type="date"
              value={editing.followUp || ""}
              onChange={(followUp) => setEditing({ ...editing, followUp })}
            />
            <Field
              label="Internal notes"
              value={editing.notes || ""}
              onChange={(notes) => setEditing({ ...editing, notes })}
              textarea
            />
            {error && (
              <p role="alert" className="error-text">
                {error}
              </p>
            )}
            <button className="button dark full" disabled={saving}>
              {saving ? "Saving…" : "Save prospect"}
              <Check size={16} />
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
function Enquiries({
  data,
  action,
}: {
  data: Snapshot;
  action: (fn: () => Promise<unknown>, m: string) => Promise<void>;
}) {
  const [filter, setFilter] = useState("all");
  const list = data.enquiries
    .filter((e) => filter === "all" || e.status === filter)
    .slice()
    .reverse();
  return (
    <>
      <PageHeading
        eyebrow="THE START OF SOMETHING"
        title="Your enquiry inbox."
        description="Messages submitted through published demo websites."
      />
      <div className="segmented">
        {["all", "new", "read"].map((s) => (
          <button
            key={s}
            className={filter === s ? "active" : ""}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>
      {!list.length ? (
        <div className="empty-state panel">
          <Inbox size={36} />
          <h2>A quiet moment.</h2>
          <p>
            New enquiries will appear here when someone submits a demo form.
          </p>
        </div>
      ) : (
        <div className="enquiry-list">
          {list.map((e) => (
            <article className="panel" key={e.id}>
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">
                    {data.demos.find((d) => d.id === e.demoId)?.businessName}
                  </span>
                  <h2>{e.name}</h2>
                </div>
                <Badge value={e.status} />
              </div>
              <p className="enquiry-message">{e.message}</p>
              <div className="enquiry-contact">
                {e.email && <a href={`mailto:${e.email}`}>{e.email}</a>}
                {e.phone && (
                  <a href={`tel:${e.phone.replace(/[^+\d]/g, "")}`}>
                    {e.phone}
                  </a>
                )}
                <span>{new Date(e.createdAt).toLocaleString()}</span>
              </div>
              <div className="button-row">
                {e.status === "new" && (
                  <button
                    className="button small"
                    onClick={() =>
                      action(
                        () => platform.readEnquiry(e.id),
                        "Marked as read.",
                      )
                    }
                  >
                    <Check size={15} />
                    Mark as read
                  </button>
                )}
                <button
                  className="button small"
                  onClick={() => {
                    if (confirm("Delete this enquiry?"))
                      action(
                        () => platform.deleteEnquiry(e.id),
                        "Enquiry deleted.",
                      );
                  }}
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
function SettingsPage({ data }: { data: Snapshot }) {
  return (
    <>
      <PageHeading
        eyebrow="BEHIND THE STUDIO"
        title="Workspace settings."
        description="A clear view of your development environment."
      />
      <div className="settings-grid">
        <section className="panel settings-panel">
          <h2>Local development</h2>
          <dl>
            <dt>Data provider</dt>
            <dd>Server-side JSON repository</dd>
            <dt>Authentication</dt>
            <dd>Server environment credentials · 8-hour sessions</dd>
            <dt>Media storage</dt>
            <dd>Local uploads directory</dd>
            <dt>Production backend</dt>
            <dd>Supabase integration pending</dd>
          </dl>
          <p>
            Run <code>pnpm setup</code> on the server to change admin
            credentials. Restart the server after environment changes.
          </p>
        </section>
        <section className="panel settings-panel">
          <h2>Your workspace records</h2>
          <p>
            Download demo content, prospects, enquiries and activity for
            inspection. This export contains private records. It excludes
            passwords and uploaded image binaries.
          </p>
          <button
            className="button"
            onClick={() => {
              const blob = new Blob([JSON.stringify(data, null, 2)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "kitty-corp-records.json";
              a.click();
              setTimeout(() => URL.revokeObjectURL(url), 1000);
            }}
          >
            <Download size={17} />
            Export records
          </button>
        </section>
        <section className="panel settings-panel">
          <h2>Official enquiries</h2>
          <p>
            Company enquiries, support, feedback and partnerships are handled
            through the official KITTY CORP website.
          </p>
          <a
            href={OFFICIAL}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Visit thekittycorp.com <ArrowUpRight size={16} />
          </a>
        </section>
        <section className="panel settings-panel">
          <h2>Before production</h2>
          <p>
            Connect Supabase database, authentication and storage. Replace
            temporary credentials, configure your production URL and follow the
            included deployment guide.
          </p>
          <p className="hint">
            This application intentionally refuses local file persistence on
            Vercel.
          </p>
        </section>
      </div>
    </>
  );
}
