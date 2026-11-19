"use client";

import { useState } from "react";
import { Calculator, MessageCircle, FileText, Check, Plus, ArrowRight } from "lucide-react";
import { industries, whatsappUrl } from "@/lib/catalogue";

export type ProjectType = "website" | "automation" | "ai" | "hybrid";
export type ScopeTier = "basic" | "premium" | "advanced" | "custom";

export interface AddonOption {
  id: string;
  name: string;
  price: number;
  days: number;
  description: string;
}

export const BASE_PRICES: Record<ProjectType, Record<ScopeTier, number>> = {
  website: { basic: 10000, premium: 18000, advanced: 35000, custom: 60000 },
  automation: { basic: 12000, premium: 22000, advanced: 42000, custom: 75000 },
  ai: { basic: 15000, premium: 28000, advanced: 50000, custom: 90000 },
  hybrid: { basic: 18000, premium: 32000, advanced: 65000, custom: 120000 },
};

export const BASE_TIMELINES: Record<ScopeTier, number> = {
  basic: 5,
  premium: 10,
  advanced: 18,
  custom: 30,
};

export const ADDON_CATALOG: AddonOption[] = [
  {
    id: "seoPro",
    name: "Technical SEO & Local Schema",
    price: 4500,
    days: 2,
    description: "Deep JSON-LD schema, geotargeting tags, XML sitemaps, and search engine optimization.",
  },
  {
    id: "crmSync",
    name: "CRM & Webhook Pipeline Sync",
    price: 5000,
    days: 3,
    description: "Automated real-time lead dispatch into Notion, Google Sheets, Airtable, or CRM.",
  },
  {
    id: "whatsappBot",
    name: "Interactive WhatsApp Chatbot",
    price: 6500,
    days: 4,
    description: "Automated business inquiry flow with instant menu responses and lead collection.",
  },
  {
    id: "multiLanguage",
    name: "Multi-Language Support (i18n)",
    price: 4000,
    days: 3,
    description: "Localization infrastructure for 2+ international or regional languages.",
  },
  {
    id: "speedAudit",
    name: "Core Web Vitals 95+ Hardening",
    price: 3500,
    days: 1,
    description: "Next-gen image optimization, script pruning, and edge CDN sub-second LCP guarantees.",
  },
  {
    id: "maintenanceYear",
    name: "1-Year Extended SLA Support",
    price: 8000,
    days: 0,
    description: "Priority security updates, regular database backups, uptime monitoring, and 12-month bug warranty.",
  },
];

export function QuoteCalculator({
  initialTier = "premium",
  onRequestProposal,
}: {
  initialTier?: ScopeTier;
  onRequestProposal?: (estimate: {
    projectType: ProjectType;
    scopeTier: ScopeTier;
    industry: string;
    addons: string[];
    total: number;
  }) => void;
}) {
  const [projectType, setProjectType] = useState<ProjectType>("website");
  const [scopeTier, setScopeTier] = useState<ScopeTier>(initialTier);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("real-estate");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["seoPro"]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const basePrice = BASE_PRICES[projectType][scopeTier];
  const addonsPrice = selectedAddons.reduce((sum, id) => {
    const addon = ADDON_CATALOG.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const total = basePrice + addonsPrice;

  const baseDays = BASE_TIMELINES[scopeTier];
  const addonsDays = selectedAddons.reduce((sum, id) => {
    const addon = ADDON_CATALOG.find((a) => a.id === id);
    return sum + (addon ? addon.days : 0);
  }, 0);
  const totalDays = baseDays + addonsDays;

  const industryName = industries.find((i) => i.id === selectedIndustry)?.name || "General Business";
  const addonNames = selectedAddons
    .map((id) => ADDON_CATALOG.find((a) => a.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  const waPhone = process.env.NEXT_PUBLIC_STUDIO_WHATSAPP || "919999999999";
  const waMessage = `Hi Kitty Corp Team,\nI used your online calculator to configure a project:\n• Project Type: ${projectType.toUpperCase()}\n• Scope Tier: ${scopeTier.toUpperCase()}\n• Industry: ${industryName}\n• Add-ons: ${addonNames || "None"}\n• Est. Budget: ₹${total.toLocaleString("en-IN")}${scopeTier === "custom" ? "+" : ""}\n• Est. Timeline: ~${totalDays} business days\n\nPlease let me know your availability to discuss next steps.`;
  const waUrl = whatsappUrl(waPhone, waMessage);

  return (
    <section id="calculator" className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-800/80">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
              ESTIMATE YOUR INVESTMENT
            </span>
            <div className="w-12 h-[1px] bg-zinc-800" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Interactive Quote <span className="font-serif italic font-normal text-white">Calculator.</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg">
            Configure your scope and add-ons in real time. Transparent estimates with zero hidden surprises.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start">
        {/* Left Column: Controls */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Project Type */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
              1. Select Project Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(
                [
                  ["website", "Website"],
                  ["automation", "Automation"],
                  ["ai", "Custom AI"],
                  ["hybrid", "Hybrid Suite"],
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  className={`py-3 px-3 rounded-2xl text-xs font-medium border transition-all text-center ${
                    projectType === val
                      ? "bg-white text-zinc-950 border-white font-semibold shadow-md"
                      : "bg-zinc-900/60 text-zinc-400 border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                  onClick={() => setProjectType(val)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Scope Tier */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
              2. Select Scope Tier
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(
                [
                  ["basic", "Basic", "₹10K+"],
                  ["premium", "Premium", "₹18K+"],
                  ["advanced", "Advanced", "₹35K+"],
                  ["custom", "Custom AI", "Quote"],
                ] as const
              ).map(([val, name, tag]) => (
                <button
                  key={val}
                  type="button"
                  className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between min-h-[70px] ${
                    scopeTier === val
                      ? "bg-white text-zinc-950 border-white font-semibold shadow-md"
                      : "bg-zinc-900/60 text-zinc-400 border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                  onClick={() => setScopeTier(val)}
                >
                  <span className="text-xs font-semibold block">{name}</span>
                  <span className={`text-[10px] mt-2 block ${scopeTier === val ? "text-zinc-600" : "text-zinc-500"}`}>
                    {tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Industry Target */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block" htmlFor="calc-industry">
              3. Target Industry
            </label>
            <select
              id="calc-industry"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
            >
              {industries.map((ind) => (
                <option key={ind.id} value={ind.id} className="bg-zinc-900 text-white">
                  {ind.name}
                </option>
              ))}
            </select>
          </div>

          {/* Step 4: Modular Add-ons */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
              4. Select Modular Add-ons
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ADDON_CATALOG.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-zinc-900/90 border-white/40 shadow-sm"
                        : "bg-zinc-900/40 border-white/5 hover:border-white/20"
                    }`}
                    onClick={() => toggleAddon(addon.id)}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{addon.name}</span>
                        <span className="text-xs font-semibold text-emerald-400">
                          +₹{addon.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug mb-3">
                        {addon.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-2 border-t border-zinc-800/60">
                      <span>+{addon.days} business days</span>
                      <span className={`flex items-center gap-1 font-semibold ${isSelected ? "text-emerald-400" : "text-zinc-400"}`}>
                        {isSelected ? <Check size={13} /> : <Plus size={13} />}
                        {isSelected ? "Included" : "Add"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Real-time Summary Card */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="rounded-3xl bg-zinc-900/90 border-2 border-white/20 p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400 block mb-2">
                ESTIMATED INVESTMENT
              </span>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-2xl font-bold">₹</span>
                <span className="text-5xl font-extrabold tracking-tight">
                  {total.toLocaleString("en-IN")}
                </span>
                {scopeTier === "custom" && <span className="text-2xl font-bold text-zinc-400">+</span>}
              </div>
              <p className="text-xs text-zinc-400 mt-2">
                Estimated delivery: <strong className="text-white">~{totalDays} business days</strong>
              </p>
            </div>

            {/* Breakdown */}
            <div className="py-4 border-y border-zinc-800/80 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-zinc-300">
                <span>Base ({projectType} / {scopeTier})</span>
                <span className="font-semibold text-white">₹{basePrice.toLocaleString("en-IN")}</span>
              </div>
              {selectedAddons.map((id) => {
                const a = ADDON_CATALOG.find((x) => x.id === id);
                if (!a) return null;
                return (
                  <div key={id} className="flex items-center justify-between text-zinc-400 text-[11px]">
                    <span className="truncate max-w-[200px]">+ {a.name}</span>
                    <span className="text-zinc-300">₹{a.price.toLocaleString("en-IN")}</span>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold py-3.5 px-6 rounded-full text-xs md:text-sm transition-all shadow-md"
              >
                <MessageCircle size={17} /> Send Quote via WhatsApp
              </a>

              <a
                href="#proposal-form"
                onClick={() =>
                  onRequestProposal?.({
                    projectType,
                    scopeTier,
                    industry: selectedIndustry,
                    addons: selectedAddons,
                    total,
                  })
                }
                className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium py-3 px-6 rounded-full text-xs md:text-sm transition-all"
              >
                <FileText size={16} /> Request Structured Proposal
              </a>
            </div>

            <p className="text-[10px] text-zinc-500 text-center leading-relaxed">
              * Indicative quotation. Official proposal delivered within 24 hours after scope confirmation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
