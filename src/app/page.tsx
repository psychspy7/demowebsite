import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Sun,
} from "lucide-react";
import { StudioBrand } from "@/components/brand";
import { HeroDevicesMockup } from "@/components/hero-devices-mockup";
import { IndustryRibbon } from "@/components/industry-ribbon";
import { ServicesGrid } from "@/components/services-grid";
import { SocialProofStrip } from "@/components/social-proof-strip";
import { PricingSection } from "@/components/pricing-section";
import { QuoteCalculator } from "@/components/quote-calculator";
import { StudioEnquiryForm } from "@/components/studio-enquiry-form";
import { StudioFooter } from "@/components/studio-footer";
import { StickyWhatsApp } from "@/components/sticky-whatsapp";
import { TemplateCard } from "@/components/template-library";
import { templates, OFFICIAL } from "@/lib/catalogue";

const studioJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "WebDesignService"],
      "@id": "https://demo.thekittycorp.com/#studio",
      name: "KITTY CORP — Digital Solutions & Commercial Studio",
      alternateName: "Kitty Corp Digital Studio",
      url: "https://demo.thekittycorp.com",
      logo: "https://demo.thekittycorp.com/images/office.jpg",
      image: "https://demo.thekittycorp.com/images/office.jpg",
      description:
        "High-performance digital studio crafting premium commercial websites, workflow automations, and bespoke AI integrations with transparent INR-first pricing.",
      parentOrganization: {
        "@type": "Organization",
        name: "KITTY CORP",
        url: OFFICIAL,
      },
      priceRange: "₹10,000 - ₹1,00,000+",
      currenciesAccepted: "INR",
      paymentAccepted: "Bank Transfer, UPI, Credit Card",
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "AdministrativeArea", name: "Worldwide" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "KITTY CORP Commercial Digital Solutions",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Basic Website Presence",
              description:
                "Up to 5 responsive pages, WhatsApp integration, standard on-page SEO, lead capture, and 3 months warranty.",
            },
            price: "10000",
            priceCurrency: "INR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Premium Commercial Platform",
              description:
                "Up to 10 pages, interactive portfolio/catalogue, appointment booking, local SEO, CRM sync, and 6 months maintenance.",
            },
            price: "18000",
            priceCurrency: "INR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Advanced Platform & Workflow Automation",
              description:
                "Dynamic database, client portal, custom APIs, automated workflows, payment gateway, and 12 months SLA support.",
            },
            price: "35000",
            priceCurrency: "INR",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom AI & Physical Robotics Integration",
              description:
                "Bespoke AI agents, enterprise RAG knowledge pipelines, autonomous workflow automations, and physical-world robotics telemetry bridges.",
            },
            price: "Quote-based",
            priceCurrency: "INR",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://demo.thekittycorp.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is included in the complimentary website maintenance period?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All website packages include complimentary maintenance (3 months for Basic, 6 months for Premium, 12 months for Advanced). This covers uptime monitoring, security patching, bug fixes, and minor content updates. Third-party cloud hosting and API usage fees are billed separately at cost.",
          },
        },
        {
          "@type": "Question",
          name: "What are the scope exclusions in KITTY CORP pricing tiers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To ensure 100% price transparency, client-provided assets (copywriting, photography), domain registration, cloud hosting/server compute, paid third-party SaaS/plugin licenses (e.g. Twilio WhatsApp API, OpenAI tokens), and payment gateway transaction commissions (e.g. 2% Razorpay/Stripe) are not included in base build pricing.",
          },
        },
        {
          "@type": "Question",
          name: "How quickly can a commercial website or business automation be launched?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Basic websites typically launch in 5 to 7 business days. Premium solutions take 10 to 14 business days. Advanced platforms and custom AI automations take 3 to 5 weeks depending on custom integration requirements.",
          },
        },
        {
          "@type": "Question",
          name: "How does the 1-click WhatsApp quote process work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Clients can configure their project type, scope tier, and modular add-ons using our interactive quote calculator. Clicking 'Send Quote via WhatsApp' immediately opens a direct conversation with our engineering team with your exact project specifications and estimated INR budget pre-filled.",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://demo.thekittycorp.com/#website",
      url: "https://demo.thekittycorp.com",
      name: "KITTY CORP Digital Solutions",
      publisher: {
        "@type": "Organization",
        name: "KITTY CORP",
        url: OFFICIAL,
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 flex flex-col font-sans selection:bg-white/20 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(studioJsonLd) }}
      />

      {/* Sticky Studio Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#050507]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <StudioBrand />

          {/* Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-300">
            <a href="#industries" className="hover:text-white transition-colors">
              Industries
            </a>
            <a href="#designs" className="hover:text-white transition-colors">
              Designs
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#calculator" className="hover:text-white transition-colors">
              Automation
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#proposal-form" className="hover:text-white transition-colors">
              About
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4">
            <a
              href="#proposal-form"
              className="inline-flex items-center gap-1.5 bg-white text-zinc-950 font-semibold px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-colors text-xs shadow-sm"
            >
              Get In Touch <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              aria-label="Theme Display"
              className="w-9 h-9 rounded-full border border-zinc-700/60 bg-zinc-900/60 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <Sun className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
          {/* Ambient Dusk Glow Background */}
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[65vh]">
              {/* Left Column: Hero Copy */}
              <div className="lg:col-span-6 flex flex-col justify-center space-y-8 z-10">
                {/* Eyebrow */}
                <div className="flex items-center gap-4">
                  <span className="text-[11px] md:text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                    WEBSITE • AUTOMATION • GROWTH
                  </span>
                  <div className="h-[1px] bg-zinc-800 flex-1" />
                </div>

                {/* Headline */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.06]">
                  <span className="sr-only">Build. Automate. Grow.</span>
                  Build. Automate.<br />
                  <span className="font-serif italic font-normal text-white">Grow.</span>
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-zinc-400 max-w-lg leading-relaxed font-normal">
                  Premium websites, powerful automation and digital solutions — crafted for your business.
                </p>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#designs"
                    className="inline-flex items-center gap-2 bg-white text-zinc-950 font-semibold px-7 py-3.5 rounded-full hover:bg-zinc-200 transition-all text-sm group shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                  >
                    Explore Our Solutions
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="#designs"
                    className="inline-flex items-center gap-2.5 border border-white/20 bg-white/5 backdrop-blur-sm text-white px-6 py-3.5 rounded-full hover:bg-white/10 hover:border-white/30 transition-all text-sm font-medium"
                  >
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                      <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
                    </div>
                    Watch Demo
                  </a>
                </div>

                {/* Scroll hint */}
                <div className="pt-6 flex items-center gap-2 text-xs text-zinc-500 tracking-wider">
                  <span>Scroll to explore</span>
                  <div className="w-8 h-[1px] bg-zinc-800" />
                </div>
              </div>

              {/* Right Column: 3D Device Mockup */}
              <div className="lg:col-span-6 relative">
                <HeroDevicesMockup />
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Industry Ribbon */}
        <IndustryRibbon />

        {/* 3-Pillar Services Grid */}
        <div className="sr-only">Services: Premium Websites, Business Automation, AI Solutions</div>
        <ServicesGrid />

        {/* Flagship Designs Showcase (#designs) */}
        <section id="designs" className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-800/80">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
                  FLAGSHIP ARCHITECTURES
                </span>
                <div className="w-12 h-[1px] bg-zinc-800" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Curated Flagships across <span className="font-serif italic font-normal text-white">18 Industries.</span>
              </h2>
              <p className="text-zinc-400 text-base md:text-lg">
                Editorial, Split, and Immersive designs engineered with authentic business copy, real pricing, and working conversion routes.
              </p>
            </div>
            <div>
              <Link
                href="/library"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 py-3 rounded-full text-xs md:text-sm font-medium transition-all"
              >
                Explore All 54 Designs <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            {["medico-1", "restaurant-2", "real-estate-1"].map((id) => {
              const t = templates.find((tpl) => tpl.id === id);
              if (!t) return null;
              return <TemplateCard key={id} template={t} />;
            })}
          </div>

          <p className="text-center text-xs text-zinc-500 pt-8">
            Curated flagship concepts with bespoke copy, team rosters, and real pricing.
          </p>
        </section>

        {/* Social Proof Strip */}
        <SocialProofStrip />

        {/* INR-First Pricing Architecture */}
        <PricingSection />

        {/* Interactive Quote Calculator */}
        <QuoteCalculator />

        {/* Direct Studio Enquiry Form */}
        <StudioEnquiryForm />
      </main>

      {/* Studio Footer */}
      <StudioFooter />

      {/* Sticky WhatsApp Trigger */}
      <StickyWhatsApp />
    </div>
  );
}
