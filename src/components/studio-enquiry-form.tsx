"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/catalogue";

export function StudioEnquiryForm({
  defaultProjectType = "website",
  defaultTier = "premium",
  defaultBudget = 18000,
}: {
  defaultProjectType?: string;
  defaultTier?: string;
  defaultBudget?: number;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: defaultProjectType,
    scopeTier: defaultTier,
    estimatedBudget: defaultBudget,
    details: "",
    website: "", // Honeypot
    startedAt: Date.now(),
    consent: true,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/public/studio/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit proposal request.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  const waPhone = process.env.NEXT_PUBLIC_STUDIO_WHATSAPP || "919999999999";
  const waUrl = whatsappUrl(
    waPhone,
    `Hi Kitty Corp Team,\nI just submitted a project proposal online for ${form.projectType} (${form.scopeTier}). My name is ${form.name}.`
  );

  return (
    <section id="proposal-form" className="py-20 max-w-5xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-800/80">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
              DIRECT STUDIO CONVERSION
            </span>
            <div className="w-12 h-[1px] bg-zinc-800" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Request a Structured <span className="font-serif italic font-normal text-white">Proposal.</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg">
            Tell us about your brand and vision. Receive a detailed scope breakdown, timeline, and milestone agreement within 24 hours.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-3xl bg-zinc-900/40 border border-white/10 p-8 md:p-12 backdrop-blur-md">
        {status === "success" ? (
          <div className="text-center py-12 space-y-6 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-white">Proposal Request Received</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Thank you, <strong className="text-white">{form.name}</strong>. Our digital studio lead is reviewing your specifications and will deliver a comprehensive proposal to your contact within 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-6 py-3 rounded-full text-xs md:text-sm transition-all"
              >
                <MessageCircle size={18} /> Confirm on WhatsApp
              </a>
              <button
                type="button"
                className="inline-flex items-center gap-2 border border-zinc-700 bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-full text-xs md:text-sm transition-all"
                onClick={() => {
                  setStatus("idle");
                  setForm((f) => ({ ...f, details: "", startedAt: Date.now() }));
                }}
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot anti-spam */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {status === "error" && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs md:text-sm flex items-center gap-3">
                <AlertCircle size={18} className="shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                  Project Type
                </label>
                <select
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                >
                  <option value="website">Commercial Website</option>
                  <option value="automation">Business Workflow Automation</option>
                  <option value="ai">Custom AI Solution</option>
                  <option value="hybrid">Website + Automation Suite</option>
                  <option value="other">Bespoke Enterprise Integration</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                  Scope Tier
                </label>
                <select
                  value={form.scopeTier}
                  onChange={(e) => setForm({ ...form, scopeTier: e.target.value })}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                >
                  <option value="basic">Basic (₹10,000+)</option>
                  <option value="premium">Premium (₹18,000+)</option>
                  <option value="advanced">Advanced (₹35,000+)</option>
                  <option value="custom">Custom AI (Quote-based)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                  Estimated Target Budget (INR)
                </label>
                <input
                  type="number"
                  min={10000}
                  step={1000}
                  value={form.estimatedBudget}
                  onChange={(e) => setForm({ ...form, estimatedBudget: Number(e.target.value) })}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                Project Requirements &amp; Goals *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share your current challenges, desired features, reference websites, or deadlines…"
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/40 transition-colors leading-relaxed"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer text-xs text-zinc-400 select-none">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-0.5 rounded border-zinc-700 text-white focus:ring-0"
                />
                <span>
                  I agree to be contacted by the KITTY CORP Studio engineering team regarding this project proposal.
                </span>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-zinc-950 hover:bg-zinc-200 font-semibold px-8 py-3.5 rounded-full text-sm transition-all shadow-md disabled:opacity-50"
              >
                {status === "submitting" ? "Submitting Proposal..." : "Request Proposal Now"} <Send size={16} />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
