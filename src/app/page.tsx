import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Layers,
  Smartphone,
  Globe,
  Clock,
  Workflow,
  Code2,
  Check,
} from "lucide-react";
import {
  Brand,
  SiteNav,
  SiteFooter,
  WHATSAPP_URL,
  WHATSAPP_NUMBER,
} from "@/components/brand";
import { TemplateLibrary, TemplateThumbnail } from "@/components/template-library";
import { templates, industries, OFFICIAL } from "@/lib/catalogue";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "KITTY CORP Demo Studio",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "200",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "KITTY CORP",
    url: "https://business.thekittycorp.com",
  },
  description:
    "High-performance business websites, e-commerce platforms and custom digital experiences by KITTY CORP Studio. Available to businesses in India and worldwide.",
};

export default function Home() {
  const premierTemplate =
    templates.find((t) => t.id === "real-estate-1") || templates[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <main id="main">
        {/* Apple-Grade Hero Section */}
        <section className="landing-hero">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <span>KITTY CORP STUDIO · BESPOKE DIGITAL CRAFT</span>
            </div>
            <h1>
              Websites engineered for authority.
              <br />
              <span className="hero-gradient-text">Built to convert.</span>
            </h1>
            <p className="hero-subtitle">
              We design and build fast, conversion-focused websites for businesses in India and across international markets. From a clear first website to a complete online store, every project is scoped around your goals.
            </p>
            <div className="button-row">
              <Link className="button dark hero-primary-btn" href="#blueprints">
                Explore 88 Blueprints <ArrowRight size={17} />
              </Link>
              <a
                className="button whatsapp-button hero-whatsapp-btn"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={17} />
                <span>Chat on WhatsApp ({WHATSAPP_NUMBER})</span>
              </a>
            </div>
            <div className="hero-footnote">
              <CheckCircle2 size={15} className="footnote-check" />
              <span>Sub-400ms edge response · 6 months dedicated maintenance included</span>
            </div>
          </div>

          {/* Apple Studio Display Showcase Frame */}
          <div className="hero-composition">
            <div className="studio-window">
              <div className="studio-window-bar">
                <div className="window-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="window-address-pill">
                  <span className="pill-lock">🔒</span>
                  <span>demo.thekittycorp.com/{premierTemplate.industry}</span>
                </div>
                <div className="window-latency-badge">
                  <Zap size={11} /> 120ms
                </div>
              </div>
              <div className="studio-window-content">
                <TemplateThumbnail template={premierTemplate} />
              </div>
            </div>

            {/* Subtle Floating Proof Cards */}
            <div className="floating-metric-card metric-left">
              <Sparkles size={16} />
              <div>
                <strong>Performance-first</strong>
                <small>Core Web Vitals aware</small>
              </div>
            </div>

            <div className="floating-metric-card metric-right">
              <ShieldCheck size={16} />
              <div>
                <strong>Global-ready</strong>
                <small>Built for worldwide reach</small>
              </div>
            </div>
          </div>
        </section>

        {/* Natural Metric Strip */}
        <section className="service-strip" aria-label="Key Performance Indicators">
          <div className="strip-item">
            <span className="strip-number">88</span>
            <span className="strip-label">Production Blueprints</span>
          </div>
          <div className="strip-divider" />
          <div className="strip-item">
            <span className="strip-number">18</span>
            <span className="strip-label">Major Industries</span>
          </div>
          <div className="strip-divider" />
          <div className="strip-item">
            <span className="strip-number">Global</span>
            <span className="strip-label">Performance-focused delivery</span>
          </div>
          <div className="strip-divider" />
          <div className="strip-item">
            <span className="strip-number">6 Mo</span>
            <span className="strip-label">Complimentary Support</span>
          </div>
        </section>

        {/* Interactive Industry Explorer Section */}
        <section id="industries" className="section-wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">01 / TAILORED ARCHITECTURE</span>
              <h2>
                Engineered for your industry.
                <br />
                <span className="heading-sub">Built around how your clients buy.</span>
              </h2>
            </div>
            <p>
              Different businesses demand distinct conversion funnels. Select your
              domain to explore targeted blueprints with pre-built booking, menus, or
              inquiry flows.
            </p>
          </div>
          <div className="industry-grid">
            {industries.map((i, n) => (
              <Link href={`/${i.id}`} key={i.id} className="industry-link">
                <span className="industry-index">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <h3>{i.name}</h3>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
        </section>

        {/* Master Template Library & Live Preview Section */}
        <section id="blueprints" className="section-wrap showcase">
          <div className="section-heading">
            <div>
              <span className="eyebrow">02 / INTERACTIVE BLUEPRINT SUITE</span>
              <h2>
                Explore 88 production blueprints.
                <br />
                <span className="heading-sub">Test-drive responsive viewports live.</span>
              </h2>
            </div>
            <a
              className="text-link"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              Request a custom prototype <ArrowUpRight size={17} />
            </a>
          </div>

          {/* Full Interactive Template Library with Live Preview Modal */}
          <TemplateLibrary />

          <p className="caption">
            All blueprints are functional prototypes running on Next.js 15 and Supabase.
            Content and imagery are illustrative concepts tailored for client demonstration.
          </p>
        </section>

        {/* The Architectural Standard (Bento Grid) */}
        <section id="services" className="services-section">
          <div className="section-wrap">
            <span className="eyebrow">03 / THE ARCHITECTURAL STANDARD</span>
            <div className="section-heading">
              <h2>
                Why category leaders choose
                <br />
                <span className="heading-sub">KITTY CORP over generic agencies.</span>
              </h2>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="button dark"
              >
                Discuss your requirements <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="bento-grid">
              <article className="bento-card bento-featured">
                <div className="bento-icon-wrap">
                  <Code2 size={24} />
                </div>
                <h3>Bespoke Next.js 15 & Turbopack Core</h3>
                <p>
                  Zero bloated WordPress plugins, zero sluggish builders. Every line of
                  TypeScript is handwritten for sub-second page transitions, maximum
                  Google Core Web Vitals, and effortless long-term maintainability.
                </p>
                <ul className="bento-points">
                  <li><Check size={14} /> Server-side rendered for instant First Contentful Paint</li>
                  <li><Check size={14} /> Clean HTML5 semantic markup optimized for organic SEO</li>
                  <li><Check size={14} /> Zero client-side bloat or layout shifts</li>
                </ul>
              </article>

              <article className="bento-card">
                <div className="bento-icon-wrap">
                  <Workflow size={24} />
                </div>
                <h3>High-Conversion Lead Funnels</h3>
                <p>
                  Built-in frictionless WhatsApp booking flows, appointment scheduling,
                  and direct inquiry routing that turn casual visitors into paying clients.
                </p>
              </article>

              <article className="bento-card">
                <div className="bento-icon-wrap">
                  <Globe size={24} />
                </div>
                <h3>Enterprise Edge Infrastructure</h3>
                <p>
                  Built with modern deployment infrastructure, automatic SSL, and security-conscious data handling. Hosting, uptime requirements, and third-party services are confirmed for each project.
                </p>
              </article>

              <article className="bento-card bento-wide">
                <div className="bento-icon-wrap">
                  <ShieldCheck size={24} />
                </div>
                <div className="bento-wide-content">
                  <div>
                    <h3>6 Months of Dedicated Engineering Support</h3>
                    <p>
                      Launch is just day one. Every engagement includes six months of
                      complimentary performance monitoring, security patches, and scope-aligned
                      refinements so your digital presence remains flawless.
                    </p>
                  </div>
                  <div className="bento-badge-pill">
                    <CheckCircle2 size={16} /> Guaranteed Peace of Mind
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 4-Step Production Process */}
        <section className="section-wrap process">
          <div>
            <span className="eyebrow">04 / THE PRODUCTION PIPELINE</span>
            <h2>
              From concept to live platform.
              <br />
              <span className="heading-sub">Disciplined engineering at every stage.</span>
            </h2>
            <p>
              We eliminate endless design rounds with working interactive prototypes,
              transparent milestone reviews, and rapid production deployment.
            </p>
          </div>
          <div className="process-steps">
            {[
              [
                "01",
                "Discovery & Scope",
                "We analyze your business model, customer journey, and conversion targets.",
              ],
              [
                "02",
                "Working Prototype",
                "We provide a live, clickable demo within 72 hours for tangible alignment.",
              ],
              [
                "03",
                "Production Build",
                "We engineer clean frontend code, database schemas, and lead integrations.",
              ],
              [
                "04",
                "Launch & Guardrails",
                "Live deployment on your custom domain backed by 6 months of active support.",
              ],
            ].map(([n, t, p]) => (
              <div key={n} className="process-step-item">
                <span className="step-num">{n}</span>
                <div className="step-info">
                  <h3>{t}</h3>
                  <p>{p}</p>
                </div>
                <ChevronRight size={18} className="step-chevron" />
              </div>
            ))}
          </div>
        </section>

        {/* Transparent Investment Section */}
        <section id="pricing" className="section-wrap pricing-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">05 / TRANSPARENT INVESTMENT</span>
              <h2>
                Predictable scope.
                <br />
                <span className="heading-sub">Exceptional return on investment.</span>
              </h2>
            </div>
            <p>
              Starting prices are shown in USD. Final pricing depends on scope, content, integrations, hosting, and agreed deliverables. Every project receives a written quote before work begins.
            </p>
          </div>
          <div className="pricing-grid">
            <article className="pricing-card">
              <span className="pricing-tier-label">Basic Website</span>
              <div className="pricing-amount"><h3>From $200</h3><small>USD · one-time project starting price</small></div>
              <p>A polished, responsive website that gives your business a clear online presence and makes it easy for customers to get in touch.</p>
              <ul className="pricing-features">
                <li><Check size={14} /> Responsive design for mobile and desktop</li>
                <li><Check size={14} /> Essential pages and clear navigation</li>
                <li><Check size={14} /> Contact and enquiry path</li>
                <li><Check size={14} /> Basic on-page SEO setup</li>
              </ul>
              <a className="button outline-btn pricing-action-btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Start a Basic Website <ArrowUpRight size={16} /></a>
            </article>
            <article className="pricing-card featured-pricing-card">
              <div className="featured-ribbon">For growing businesses</div>
              <span className="pricing-tier-label">Business Website</span>
              <div className="pricing-amount"><h3>From $800</h3><small>USD · one-time project starting price</small></div>
              <p>A custom multi-page business platform designed to present your services, build trust, and turn visits into qualified enquiries.</p>
              <ul className="pricing-features">
                <li><Check size={14} /> Custom multi-page website architecture</li>
                <li><Check size={14} /> Tailored design and conversion-focused layout</li>
                <li><Check size={14} /> Lead forms and agreed integrations</li>
                <li><Check size={14} /> Technical and on-page SEO foundations</li>
                <li><Check size={14} /> Analytics and performance setup</li>
              </ul>
              <a className="button dark pricing-action-btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Build a Business Website <ArrowUpRight size={16} /></a>
            </article>
            <article className="pricing-card">
              <span className="pricing-tier-label">E-commerce Website</span>
              <div className="pricing-amount"><h3>From $1,500</h3><small>USD · one-time project starting price</small></div>
              <p>A complete online storefront with product discovery, shopping flows, and the integrations agreed for your operation.</p>
              <ul className="pricing-features">
                <li><Check size={14} /> Product catalogue and category structure</li>
                <li><Check size={14} /> Cart and checkout integration</li>
                <li><Check size={14} /> Order and customer workflows</li>
                <li><Check size={14} /> Mobile-first shopping experience</li>
                <li><Check size={14} /> E-commerce SEO foundations</li>
              </ul>
              <a className="button outline-btn pricing-action-btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Launch an Online Store <ArrowUpRight size={16} /></a>
            </article>
          </div>

          {/* Maintenance & Reliability Banner */}
          <div className="maintenance-banner">
            <div className="maintenance-icon-badge">
              <Layers size={26} />
            </div>
            <div className="maintenance-copy">
              <h3>Every deployment includes 6 months of active care.</h3>
              <p>
                We handle core updates, security patches, uptime monitoring, and speed
                tuning so you can focus entirely on running your business.
              </p>
            </div>
            <div className="maintenance-tags">
              <span><Check size={15} /> Uptime monitoring options</span>
              <span><Check size={15} /> Continuous Security Patches</span>
            </div>
          </div>
        </section>

        {/* High-Impact Closing Consultation CTA */}
        <section className="closing-cta">
          <span className="eyebrow">BEGIN YOUR NEXT DIGITAL CHAPTER</span>
          <h2>
            Exceptional businesses begin with
            <br />
            <span className="cta-highlight">a focused conversation.</span>
          </h2>
          <p className="closing-cta-sub">
            Whether you need a bespoke website or an intelligent business platform, our
            engineering team is ready to demonstrate what is possible.
          </p>
          <div className="closing-cta-actions">
            <a
              className="button dark cta-large-btn"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} /> Chat on WhatsApp ({WHATSAPP_NUMBER})
            </a>
            <a
              className="button outline-btn cta-secondary-btn"
              href={OFFICIAL}
              target="_blank"
              rel="noreferrer"
            >
              Visit thekittycorp.com <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
