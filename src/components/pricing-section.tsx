"use client";

import { useState } from "react";
import { Check, X, ArrowRight, MessageCircle, ChevronDown, ChevronUp, Layers, Sparkles } from "lucide-react";
import { whatsappUrl } from "@/lib/catalogue";

export interface PricingTier {
  id: "basic" | "premium" | "advanced" | "custom";
  badge: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  featured?: boolean;
  inclusions: string[];
  exclusions: string[];
  maintenance: string;
  turnaround: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "basic",
    badge: "FOUNDATION",
    name: "Basic",
    price: "₹10,000+",
    description: "Essential, high-performance digital presence for local businesses and independent professionals.",
    featured: false,
    inclusions: [
      "Up to 5 bespoke responsive pages",
      "Mobile-first, dark/light adaptive layout",
      "WhatsApp click-to-chat integration",
      "Standard on-page SEO & OpenGraph tags",
      "Lead capture contact form with alerts",
      "Google Maps & local address citation",
      "Sub-1.5s fast page load performance",
    ],
    exclusions: [
      "Domain registration & cloud hosting fees (billed at cost)",
      "Custom backend database or user authentication",
      "Copywriting & professional photography (client provided)",
      "Paid third-party plugins or SaaS subscriptions",
      "E-commerce payment gateway integration",
    ],
    maintenance: "3 months complimentary bug fixes & uptime monitoring",
    turnaround: "5–7 business days",
  },
  {
    id: "premium",
    badge: "MOST POPULAR",
    name: "Premium",
    price: "₹18,000+",
    description: "Comprehensive commercial platform built for conversion, lead capture, and brand elevation.",
    featured: true,
    inclusions: [
      "Up to 10 bespoke designed pages",
      "Interactive portfolio / service catalogue",
      "Dynamic appointment / table booking capture",
      "Local SEO package & Google Business schema",
      "CRM lead webhook sync (Google Sheets/Notion)",
      "Custom micro-interactions & smooth animations",
      "Social proof & review showcase integration",
    ],
    exclusions: [
      "Full e-commerce checkout with dynamic inventory",
      "High-frequency cloud compute or custom microservices",
      "Page-by-page editorial copywriting",
      "Paid WhatsApp Business Cloud API / Twilio charges",
      "Proprietary font or stock asset licensing",
    ],
    maintenance: "6 months complimentary maintenance & monthly performance monitoring",
    turnaround: "10–14 business days",
  },
  {
    id: "advanced",
    badge: "ENTERPRISE",
    name: "Advanced",
    price: "₹35,000+",
    description: "Full-scale dynamic business system with automated workflows, database, and client portal.",
    featured: false,
    inclusions: [
      "Comprehensive business platform (15+ pages or full dynamic app)",
      "PostgreSQL / Supabase dynamic database integration",
      "Client portal / member area with authentication",
      "Custom REST/RPC APIs & automated workflows",
      "Payment gateway integration (Razorpay / Stripe)",
      "Advanced Technical SEO & Core Web Vitals 95+",
      "Multi-region CDN deployment & automated backups",
    ],
    exclusions: [
      "Cloud infrastructure hosting fees (AWS / Vercel / Supabase Pro)",
      "Payment gateway transaction processing commissions (2%)",
      "External enterprise SaaS subscriptions",
      "Heavy GPU compute / custom AI model fine-tuning",
    ],
    maintenance: "12 months dedicated priority SLA support & quarterly audits",
    turnaround: "3–4 weeks",
  },
  {
    id: "custom",
    badge: "INTELLIGENT SYSTEMS",
    name: "Custom AI",
    price: "Quote-based",
    period: "Starting ₹60,000",
    description: "Bespoke AI agents, autonomous workflow orchestration, and robotics telemetry bridges.",
    featured: false,
    inclusions: [
      "Bespoke conversational AI agents & knowledge assistants",
      "Enterprise RAG pipeline with vector database (PgVector/Pinecone)",
      "Autonomous document extraction & workflow automation",
      "KITTY CORP physical robotics telemetry & IoT bridge",
      "High-throughput WebSocket / SSE real-time streaming",
      "Human-in-the-loop review interface & guardrails",
      "Dedicated Solutions Architect & custom licensing",
    ],
    exclusions: [
      "Third-party LLM token / API inference costs (billed directly)",
      "Dedicated cloud GPU hosting instances (RunPod/AWS EC2)",
      "Formal legal / HIPAA / SOC2 certification filing fees",
    ],
    maintenance: "Continuous dedicated engineering SLA & quarterly upgrades",
    turnaround: "Custom milestone roadmap",
  },
];

export function PricingSection({ onSelectTier }: { onSelectTier?: (tierId: string) => void }) {
  const [openDrawer, setOpenDrawer] = useState<Record<string, boolean>>({});

  const toggleDrawer = (id: string) => {
    setOpenDrawer((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const whatsappPhone = process.env.NEXT_PUBLIC_STUDIO_WHATSAPP || "919999999999";

  return (
    <section id="pricing" className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-800/80">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
              TRANSPARENT COMMERCIAL INVESTMENT
            </span>
            <div className="w-12 h-[1px] bg-zinc-800" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Engineered for growth.<br />
            <span className="font-serif italic font-normal text-white">Priced with absolute clarity.</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg">
            No hidden retainers. No ambiguity. Choose a battle-tested tier or calculate a tailored quote with modular add-ons.
          </p>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
        {PRICING_TIERS.map((tier) => {
          const isDrawerOpen = !!openDrawer[tier.id];
          const waMsg = `Hi Kitty Corp Team, I'm interested in the ${tier.name} Tier (${tier.price}) for my business. Could you share more details?`;
          const waUrl = whatsappUrl(whatsappPhone, waMsg);

          return (
            <article
              key={tier.id}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all backdrop-blur-md ${
                tier.featured
                  ? "bg-zinc-900/90 border-2 border-white/40 shadow-[0_0_35px_rgba(255,255,255,0.1)] scale-[1.02] z-10"
                  : "bg-zinc-900/40 border border-white/10 hover:border-white/20 hover:bg-zinc-900/60"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-zinc-950 text-[10px] font-bold tracking-widest uppercase px-3.5 py-1 rounded-full shadow-md">
                  RECOMMENDED
                </div>
              )}

              <div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400 block mb-2">
                  {tier.badge}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-extrabold text-white tracking-tight">{tier.price}</span>
                  {tier.period && (
                    <span className="text-xs text-zinc-400 font-medium">{tier.period}</span>
                  )}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-6 min-h-[48px]">
                  {tier.description}
                </p>

                {/* Specs */}
                <div className="py-3 border-y border-zinc-800/80 space-y-1.5 text-xs text-zinc-300 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Timeline:</span>
                    <span className="font-medium text-white">{tier.turnaround}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Warranty:</span>
                    <span className="font-medium text-white">{tier.maintenance}</span>
                  </div>
                </div>

                {/* Inclusions */}
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-semibold text-white tracking-wider block uppercase">
                    What&apos;s Included:
                  </span>
                  <ul className="space-y-2.5">
                    {tier.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-300 leading-snug">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Scope Exclusions Drawer */}
                <div className="pt-3 border-t border-zinc-800/60 mb-6">
                  <button
                    type="button"
                    onClick={() => toggleDrawer(tier.id)}
                    className="w-full flex items-center justify-between text-left text-xs font-medium text-zinc-400 hover:text-white transition-colors py-1.5"
                    aria-expanded={isDrawerOpen}
                  >
                    <span>Scope Exclusions &amp; Direct Costs</span>
                    {isDrawerOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  {isDrawerOpen && (
                    <div className="mt-2.5 p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-[11px] text-zinc-400 space-y-2 animate-in fade-in">
                      <p className="text-zinc-300 font-medium leading-tight">
                        Billed separately or supplied by client for complete transparency:
                      </p>
                      <ul className="space-y-1.5">
                        {tier.exclusions.map((exc, i) => (
                          <li key={i} className="flex items-start gap-1.5 leading-snug">
                            <X className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                            <span>{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 pt-4">
                <a
                  href="#calculator"
                  onClick={() => onSelectTier?.(tier.id)}
                  className={`w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-full text-xs font-semibold transition-all ${
                    tier.featured
                      ? "bg-white text-zinc-950 hover:bg-zinc-200 shadow-md"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                  }`}
                >
                  Configure Quote <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/20 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Maintenance Banner */}
      <div className="mt-12 rounded-2xl bg-zinc-900/40 border border-white/10 p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
          <Layers className="w-6 h-6 text-white" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-white">Complimentary Post-Launch Warranty Included</h3>
          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
            Every tier includes dedicated bug fixes, security monitoring, and SLA coverage. We maintain the software we build so you can focus on scaling your business.
          </p>
        </div>
      </div>
    </section>
  );
}
