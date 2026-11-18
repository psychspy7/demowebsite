"use client";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  X,
  CheckCircle2,
  Search,
} from "lucide-react";
import { OFFICIAL, whatsappUrl, getIndustry } from "@/lib/catalogue";
import type { PublicDemo, Section } from "@/lib/types";
export function BusinessSite({
  demo: d,
  mode = "public",
}: {
  demo: PublicDemo;
  mode?: "public" | "template" | "editor";
}) {
  const [menu, setMenu] = useState(false),
    [lightbox, setLightbox] = useState("");
  useEffect(() => {
    if (mode !== "public") return;
    const key = `visit:${d.id}`;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      fetch(`/api/public/${d.slug}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "visit" }),
      }).catch(() => {});
    }
  }, [d.id, d.slug, mode]);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox("");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);
  const style = {
    "--client-primary": d.design.primary,
    "--client-secondary": d.design.secondary,
    "--client-accent": d.design.accent,
    "--client-radius": { square: "0", soft: "7px", pill: "100px" }[
      d.design.buttonStyle
    ],
  } as React.CSSProperties;
  const whatsapp = whatsappUrl(d.contact.whatsapp, d.contact.whatsappMessage);
  function clickWhatsApp() {
    if (mode === "public")
      fetch(`/api/public/${d.slug}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "whatsapp" }),
      }).catch(() => {});
  }
  return (
    <div
      style={style}
      className={`business-site layout-${d.design.layout} client-${d.industry} font-${d.design.font} theme-${d.design.theme}`}
    >
      {(d.settings.showDemoLabel || mode === "template") && (
        <div className="demo-ribbon">
          {mode === "template" ? "TEMPLATE PREVIEW" : "DEMO PREVIEW"}{" "}
          <span>Illustrative concept · details subject to confirmation</span>
        </div>
      )}
      <header className="client-nav">
        <a href="#top" className="client-brand">
          {d.business.logo && <img src={d.business.logo} alt="" />}
          {d.businessName}
        </a>
        <button
          aria-label={menu ? "Close navigation" : "Open navigation"}
          className="client-menu-toggle"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <nav className={menu ? "open" : ""} aria-label="Business navigation">
          {d.sections
            .filter((s) => s.visible && s.kind !== "contact")
            .slice(0, 3)
            .map((s) => (
              <a
                key={s.id}
                href={`#section-${s.id}`}
                onClick={() => setMenu(false)}
              >
                {s.heading}
              </a>
            ))}
          <a
            href="#enquire"
            className="client-nav-cta"
            onClick={() => setMenu(false)}
          >
            Get in touch <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main id="top">
        <section className="client-hero">
          <div className="client-hero-copy">
            <span className="client-eyebrow">
              {d.business.tagline || d.business.category}
            </span>
            <h1>{d.hero.heading}</h1>
            <p>{d.hero.description}</p>
            {d.hero.ctaLabel && (
              <a href={d.hero.ctaLink || "#enquire"} className="client-button">
                {d.hero.ctaLabel}
                <ArrowUpRight size={18} />
              </a>
            )}
            <div className="client-hero-note">
              <span>ESTABLISH YOUR OWN STORY</span>
              <span>{d.contact.city || d.business.category}</span>
            </div>
          </div>
          {d.hero.image && (
            <div className="client-hero-image">
              <img
                src={d.hero.image}
                alt={`${d.businessName} website concept`}
              />
              <span>{getIndustry(d.industry)?.eyebrow}</span>
            </div>
          )}
        </section>
        {d.sections
          .filter((s) => s.visible)
          .map((s, index) => (
            <ClientSection
              key={s.id}
              section={s}
              demo={d}
              mode={mode}
              index={index}
              onImage={setLightbox}
            />
          ))}
        {!d.sections.some((s) => s.visible && s.kind === "contact") && (
          <div id="enquire" className="client-section">
            <h2>Get in touch</h2>
            <ContactDetails d={d} />
          </div>
        )}
      </main>
      <footer className="client-footer">
        <div>
          <strong>{d.businessName}</strong>
          <p>{d.footer}</p>
        </div>
        <a href={OFFICIAL} target="_blank" rel="noreferrer">
          Website concept by KITTY CORP <ArrowUpRight size={13} />
        </a>
      </footer>
      {whatsapp && (
        <a
          className="whatsapp-button"
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          onClick={clickWhatsApp}
          aria-label="Enquire on WhatsApp"
        >
          <MessageCircle size={21} />
          <span>Let’s talk</span>
        </a>
      )}
      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setLightbox("")}
        >
          <button
            className="icon-button"
            autoFocus
            aria-label="Close image"
            onClick={() => setLightbox("")}
            onKeyDown={(e) => {
              if (e.key === "Escape") setLightbox("");
            }}
          >
            <X />
          </button>
          <img src={lightbox} alt="Gallery image enlarged" />
        </div>
      )}
    </div>
  );
}
function ContactDetails({ d }: { d: PublicDemo }) {
  return (
    <div className="contact-details">
      {d.contact.phone && (
        <a href={`tel:${d.contact.phone.replace(/[^+\d]/g, "")}`}>
          <Phone size={18} />
          {d.contact.phone}
        </a>
      )}
      {d.contact.email && (
        <a href={`mailto:${d.contact.email}`}>
          <Mail size={18} />
          {d.contact.email}
        </a>
      )}
      {(d.contact.address || d.contact.city) && (
        <p>
          <MapPin size={18} />
          {[
            d.contact.address,
            d.contact.city,
            d.contact.state,
            d.contact.postalCode,
          ]
            .filter(Boolean)
            .join(", ")}
        </p>
      )}
      {d.contact.maps && (
        <a href={d.contact.maps} target="_blank" rel="noreferrer">
          View on map <ArrowUpRight size={16} />
        </a>
      )}
      <div className="social-links">
        {(["instagram", "facebook", "linkedin"] as const).map(
          (k) =>
            d.contact[k] && (
              <a key={k} href={d.contact[k]} target="_blank" rel="noreferrer">
                {k}
                <ArrowUpRight size={12} />
              </a>
            ),
        )}
      </div>
    </div>
  );
}
function ClientSection({
  section: s,
  demo: d,
  mode,
  index,
  onImage,
}: {
  section: Section;
  demo: PublicDemo;
  mode: string;
  index: number;
  onImage: (s: string) => void;
}) {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("all");
  const categories = Array.from(
    new Set(s.items.map((i) => i.category).filter(Boolean)),
  );
  const items = s.items.filter(
    (i) =>
      (category === "all" || i.category === category) &&
      `${i.title} ${i.text}`.toLowerCase().includes(query.toLowerCase()),
  );
  if ((s.kind === "team" || s.kind === "testimonials") && s.items.length === 0)
    return null;
  return (
    <section
      id={s.kind === "contact" ? "enquire" : `section-${s.id}`}
      className={`client-section section-${s.kind}`}
    >
      <div className="client-section-heading">
        <span className="client-eyebrow">
          {String(index + 1).padStart(2, "0")} /{" "}
          {s.kind === "catalogue" ? "EXPLORE" : s.kind.toUpperCase()}
        </span>
        <h2>{s.heading}</h2>
        <p>{s.kind === "about" ? d.business.description : s.description}</p>
      </div>
      {s.kind === "contact" ? (
        <div className="client-contact-grid">
          <div>
            <ContactDetails d={d} />
            <p className="client-small">
              Enquiries are reviewed by the demo administrator. Availability and
              bookings are confirmed separately.
              {d.industry === "medico" &&
                " Please do not share medical records or sensitive health information."}
            </p>
          </div>
          <EnquiryForm demo={d} mode={mode} />
        </div>
      ) : s.kind === "faq" ? (
        <div className="client-faq">
          {s.items.map((i) => (
            <details key={i.id}>
              <summary>
                {i.title}
                <span>+</span>
              </summary>
              <p>{i.text}</p>
            </details>
          ))}
        </div>
      ) : s.kind === "hours" ? (
        <div className="client-hours">
          {s.items.map((i) => (
            <div key={i.id}>
              <strong>{i.title}</strong>
              <span>{i.text}</span>
            </div>
          ))}
        </div>
      ) : s.kind === "gallery" ? (
        <div className="client-gallery">
          {s.items
            .filter((i) => i.image)
            .map((i) => (
              <button
                key={i.id}
                onClick={() => onImage(i.image)}
                aria-label={`Enlarge ${i.title}`}
              >
                <img src={i.image} alt={i.title} loading="lazy" />
                <span>
                  {i.title}
                  <ArrowUpRight size={16} />
                </span>
              </button>
            ))}
        </div>
      ) : s.kind === "about" ? null : (
        <>
          {s.kind === "catalogue" && (
            <div className="catalogue-filter">
              <label>
                <Search size={16} />
                <input
                  placeholder={`Search ${s.heading.toLowerCase()}`}
                  aria-label="Search catalogue"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              {categories.length > 0 && (
                <select
                  aria-label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All categories</option>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              )}
            </div>
          )}
          <div className={`client-cards ${s.kind}`}>
            {items.map((i, n) => (
              <article key={i.id}>
                {i.image && <img src={i.image} alt={i.title} loading="lazy" />}
                <div className="client-card-body">
                  <span className="client-eyebrow">
                    {i.category || String(n + 1).padStart(2, "0")}
                  </span>
                  <h3>{i.title}</h3>
                  <p>{i.text}</p>
                  {i.price && (
                    <strong className="client-price">{i.price}</strong>
                  )}
                  {s.kind !== "testimonials" && (
                    <a href={i.link || "#enquire"}>
                      {s.kind === "team"
                        ? "Get in touch"
                        : s.kind === "pricing"
                          ? "Enquire about this option"
                          : "Find out more"}
                      <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          {items.length === 0 && s.kind === "catalogue" && (
            <p>No matching items. Try another search.</p>
          )}
        </>
      )}
      {s.ctaLabel && (
        <a className="client-button section-cta" href={s.ctaLink || "#enquire"}>
          {s.ctaLabel}
          <ArrowRight size={16} />
        </a>
      )}
    </section>
  );
}
function EnquiryForm({ demo: d, mode }: { demo: PublicDemo; mode: string }) {
  const [startedAt, setStartedAt] = useState(0),
    [state, setState] = useState<"idle" | "sending" | "success">("idle"),
    [error, setError] = useState("");
  useEffect(() => setStartedAt(Date.now()), []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mode !== "public") return;
    const form = new FormData(e.currentTarget);
    setState("sending");
    setError("");
    try {
      const r = await fetch(`/api/public/${d.slug}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(form),
          consent: form.get("consent") === "on",
          startedAt,
          kind: d.hero.ctaLabel,
        }),
      });
      const b = await r.json();
      if (!r.ok) throw new Error(b.error);
      setState("success");
    } catch (e) {
      setError((e as Error).message);
      setState("idle");
    }
  }
  if (state === "success")
    return (
      <div className="enquiry-success" role="status">
        <CheckCircle2 size={34} />
        <h3>Thank you for reaching out.</h3>
        <p>
          Your enquiry has been recorded for the demo administrator. This is not
          a confirmed booking.
        </p>
        <button
          onClick={() => {
            setState("idle");
            setStartedAt(Date.now());
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  return (
    <form className="client-form" onSubmit={submit}>
      <label>
        Your name
        <input
          name="name"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
        />
      </label>
      <div className="form-pair">
        <label>
          Email
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" maxLength={30} />
        </label>
      </div>
      <span className="client-small">
        Provide an email address or phone number so we can respond.
      </span>
      <label>
        How can we help?
        <textarea
          name="message"
          required
          minLength={5}
          maxLength={1500}
          rows={4}
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Leave this empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="check-label">
        <input name="consent" type="checkbox" required />I agree to share these
        details with the demo administrator for this enquiry.
      </label>
      {error && (
        <p role="alert" className="error-text">
          {error}
        </p>
      )}
      <button
        className="client-button"
        disabled={mode !== "public" || state === "sending"}
      >
        {state === "sending" ? "Sending…" : "Send enquiry"}
        <ArrowUpRight size={18} />
      </button>
      {mode !== "public" && (
        <p className="client-small">
          Enquiries become available on a published demo.
        </p>
      )}
    </form>
  );
}
export function PasswordGate({ slug }: { slug: string }) {
  const [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const password = new FormData(e.currentTarget).get("password");
    try {
      const r = await fetch(`/api/public/${slug}/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const b = await r.json();
      if (!r.ok) throw new Error(b.error);
      window.location.reload();
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }
  return (
    <main className="password-gate">
      <span className="eyebrow">PRIVATE WEBSITE CONCEPT</span>
      <h1>
        A preview,
        <br />
        just for you.
      </h1>
      <p>Enter the password shared with your demo link.</p>
      <form onSubmit={submit}>
        <label>
          Demo password
          <input name="password" type="password" required autoFocus />
        </label>
        {error && (
          <p role="alert" className="error-text">
            {error}
          </p>
        )}
        <button className="button dark" disabled={busy}>
          Open preview <ArrowRight size={18} />
        </button>
      </form>
    </main>
  );
}
