import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Layers,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import {
  SiteNav,
  SiteFooter,
  WHATSAPP_URL,
  WHATSAPP_NUMBER,
} from "@/components/brand";
import { TemplateLibrary, TemplateThumbnail } from "@/components/template-library";
import { templates, industries } from "@/lib/catalogue";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "KITTY CORP Studio",
  url: "https://business.thekittycorp.com/",
  logo: "https://thekittycorp.com/brand/kitty-corp-logo-dark.webp",
  description:
    "KITTY CORP designs and develops business websites, e-commerce platforms and custom digital experiences for clients in India and worldwide.",
  areaServed: ["India", "Worldwide"],
  priceRange: "USD 200–1500+",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Website development services",
    itemListElement: [
      { "@type": "Offer", price: "200", priceCurrency: "USD", itemOffered: { "@type": "Service", name: "Basic Website Development" } },
      { "@type": "Offer", price: "800", priceCurrency: "USD", itemOffered: { "@type": "Service", name: "Business Website Development" } },
      { "@type": "Offer", price: "1500", priceCurrency: "USD", itemOffered: { "@type": "Service", name: "E-commerce Website Development" } },
    ],
  },
};

export default function Home() {
  const premierTemplate =
    templates.find((template) => template.id === "real-estate-1") || templates[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <main id="main" className="studio-compact">
        <section className="landing-hero compact-hero">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <span>KITTY CORP STUDIO · INDIA & WORLDWIDE</span>
            </div>
            <h1>
              Websites engineered for authority.
              <br />
              <span className="hero-gradient-text">Built to convert.</span>
            </h1>
            <p className="hero-subtitle">
              Thoughtful, high-performance websites for ambitious businesses.
              From a focused business presence to a complete online store, every
              project is shaped around your goals.
            </p>
            <div className="button-row">
              <Link className="button dark" href="#pricing">
                View packages <ArrowRight size={17} />
              </Link>
              <a className="button whatsapp-button" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle size={17} /> Talk to our team
              </a>
            </div>
            <div className="hero-footnote">
              <CheckCircle2 size={15} className="footnote-check" />
              <span>Clear scope · Client-owned accounts · Support options agreed upfront</span>
            </div>
          </div>
          <div className="hero-composition compact-showcase">
            <div className="studio-window">
              <div className="studio-window-bar">
                <div className="window-dots"><span className="dot dot-red" /><span className="dot dot-yellow" /><span className="dot dot-green" /></div>
                <div className="window-address-pill"><span className="pill-lock">⌑</span><span>business.thekittycorp.com/{premierTemplate.industry}</span></div>
                <div className="window-latency-badge"><Sparkles size={11} /> Studio preview</div>
              </div>
              <div className="studio-window-content">
                <TemplateThumbnail template={premierTemplate} />
              </div>
            </div>
          </div>
        </section>

        <section className="service-strip compact-strip" aria-label="Studio highlights">
          <div className="strip-item"><span className="strip-number">88</span><span className="strip-label">Website blueprints</span></div>
          <div className="strip-divider" />
          <div className="strip-item"><span className="strip-number">18</span><span className="strip-label">Industry collections</span></div>
          <div className="strip-divider" />
          <div className="strip-item"><span className="strip-number">Worldwide</span><span className="strip-label">Project enquiries welcome</span></div>
        </section>

        <section id="pricing" className="section-wrap pricing-section compact-pricing">
          <div className="section-heading">
            <div>
              <span className="eyebrow">WEBSITE PACKAGES</span>
              <h2>Clear starting points.<br /><span className="heading-sub">Built around your business.</span></h2>
            </div>
            <p>Prices are starting points in USD. Your final quote reflects the agreed scope, content, integrations and delivery requirements.</p>
          </div>
          <div className="pricing-grid">
            <article className="pricing-card">
              <span className="pricing-tier-label">Basic Website</span>
              <div className="pricing-amount"><h3>From $200</h3><small>USD · one-time project starting price</small></div>
              <p>A polished, responsive online presence for businesses that need a clear place to be found and contacted.</p>
              <ul className="pricing-features">
                <li><Check size={14} /> Mobile and desktop responsive design</li>
                <li><Check size={14} /> Essential pages and navigation</li>
                <li><Check size={14} /> Contact and enquiry path</li>
                <li><Check size={14} /> Basic on-page SEO setup</li>
              </ul>
              <a className="button outline-btn pricing-action-btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Discuss Basic <ArrowUpRight size={16} /></a>
            </article>
            <article className="pricing-card featured-pricing-card">
              <div className="featured-ribbon">For growing businesses</div>
              <span className="pricing-tier-label">Business Website</span>
              <div className="pricing-amount"><h3>From $800</h3><small>USD · one-time project starting price</small></div>
              <p>A tailored multi-page platform to present your services, build trust and turn visits into qualified enquiries.</p>
              <ul className="pricing-features">
                <li><Check size={14} /> Custom multi-page architecture</li>
                <li><Check size={14} /> Tailored design and conversion flow</li>
                <li><Check size={14} /> Lead forms and agreed integrations</li>
                <li><Check size={14} /> Technical and on-page SEO foundations</li>
                <li><Check size={14} /> Analytics and performance setup</li>
              </ul>
              <a className="button dark pricing-action-btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Discuss Business <ArrowUpRight size={16} /></a>
            </article>
            <article className="pricing-card">
              <span className="pricing-tier-label">E-commerce Website</span>
              <div className="pricing-amount"><h3>From $1,500</h3><small>USD · one-time project starting price</small></div>
              <p>A considered online storefront with product discovery, shopping flows and agreed commerce integrations.</p>
              <ul className="pricing-features">
                <li><Check size={14} /> Product catalogue and categories</li>
                <li><Check size={14} /> Cart and checkout integration</li>
                <li><Check size={14} /> Order and customer workflows</li>
                <li><Check size={14} /> Mobile-first shopping experience</li>
                <li><Check size={14} /> E-commerce SEO foundations</li>
              </ul>
              <a className="button outline-btn pricing-action-btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Discuss E-commerce <ArrowUpRight size={16} /></a>
            </article>
          </div>

          <div className="bonus-grid" aria-label="Included project bonuses">
            <article className="bonus-card">
              <Globe2 size={21} />
              <div><h3>1 year domain included</h3><p>One year of standard domain registration is included. Renewal is paid by you from year two onward.</p></div>
            </article>
            <article className="bonus-card">
              <Layers size={21} />
              <div><h3>1 month free maintenance</h3><p>Included after launch. Continue afterwards at $100/month or $1,000/year for 12 months (two months free).</p></div>
            </article>
            <article className="bonus-card">
              <ShieldCheck size={21} />
              <div><h3>Your accounts. Your control.</h3><p>Hosting, third-party APIs and paid plugins/apps are purchased directly under your own accounts.</p></div>
            </article>
          </div>
          <p className="pricing-disclaimer">Domain availability and eligibility are confirmed before registration. Third-party subscriptions, usage charges, taxes and premium domain costs are separate unless your written quote says otherwise. Ongoing maintenance begins only if you choose a paid plan.</p>
        </section>

        <section className="compact-details-section" aria-label="Explore the studio">
          <details id="blueprints" className="home-details">
            <summary>
              <span><strong>Explore 88 website blueprints</strong><small>Preview layouts and concepts across different business needs.</small></span>
              <ChevronDown size={20} />
            </summary>
            <div className="home-details-content"><TemplateLibrary /></div>
          </details>
          <details id="industries" className="home-details">
            <summary>
              <span><strong>Browse 18 industry collections</strong><small>Find a starting point tailored to your field.</small></span>
              <ChevronDown size={20} />
            </summary>
            <div className="home-details-content">
              <div className="industry-grid compact-industry-grid">
                {industries.map((industry) => (
                  <Link href={`/${industry.id}`} key={industry.id} className="industry-link">
                    <h3>{industry.name}</h3><ArrowUpRight size={17} />
                  </Link>
                ))}
              </div>
            </div>
          </details>
          <details className="home-details">
            <summary>
              <span><strong>How projects work</strong><small>A simple, transparent delivery process.</small></span>
              <ChevronDown size={20} />
            </summary>
            <div className="home-details-content">
              <div className="process-compact-grid">
                <article><span>01</span><h3>Discovery & scope</h3><p>We understand your business, audience and requirements, then confirm the deliverables in writing.</p></article>
                <article><span>02</span><h3>Design & build</h3><p>We shape the experience, share progress for review and develop the agreed website.</p></article>
                <article><span>03</span><h3>Launch & handover</h3><p>We launch on your domain and keep hosting and third-party services under your accounts.</p></article>
              </div>
            </div>
          </details>
        </section>

        <section className="closing-cta compact-closing">
          <span className="eyebrow">START A PROJECT</span>
          <h2>Have a business to bring online?<br /><span className="cta-highlight">Let’s talk.</span></h2>
          <p className="closing-cta-sub">Tell us what you’re building. We’ll discuss the right scope, timeline and package before anything begins.</p>
          <div className="closing-cta-actions">
            <a className="button dark cta-large-btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp · {WHATSAPP_NUMBER}</a>
            <a className="button outline-btn cta-secondary-btn" href="mailto:support@thekittycorp.com">Email the team <ArrowUpRight size={17} /></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
