import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { StudioBrand } from "./brand";

export function StudioFooter({ onOpenEnquiry }: { onOpenEnquiry?: () => void }) {
  return (
    <footer className="w-full border-t border-zinc-800 bg-[#050507] text-zinc-400">
      
      {/* 1. Top Conversion Banner (matching reference visual) */}
      <div className="border-b border-zinc-800/80 py-8 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <StudioBrand />
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="hidden sm:inline text-xs text-zinc-400 font-light">Real Impact.</span>
        </div>

        <div className="text-center md:text-left text-sm md:text-base text-zinc-300 font-medium font-serif italic">
          Let&apos;s build something extraordinary together.
        </div>

        <div>
          <a
            href="#proposal-form"
            onClick={onOpenEnquiry}
            className="inline-flex items-center gap-2 bg-white text-zinc-950 font-semibold px-6 py-2.5 rounded-full hover:bg-zinc-200 transition-colors text-xs md:text-sm shadow-sm"
          >
            Get Started <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 2. Comprehensive Navigation Links */}
      <div className="py-16 px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-xs">
        <div className="space-y-4">
          <h4 className="font-semibold text-white uppercase tracking-wider">Solutions</h4>
          <ul className="space-y-2.5">
            <li><a href="#services" className="hover:text-white transition-colors">Premium Websites</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">Business Automation</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">Custom AI Agents</a></li>
            <li><a href="#calculator" className="hover:text-white transition-colors">Interactive Quote Calculator</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-white uppercase tracking-wider">Industries</h4>
          <ul className="space-y-2.5">
            <li><Link href="/real-estate" className="hover:text-white transition-colors">Real Estate &amp; Property</Link></li>
            <li><Link href="/medico" className="hover:text-white transition-colors">Healthcare &amp; Wellness</Link></li>
            <li><Link href="/restaurant" className="hover:text-white transition-colors">Restaurants &amp; Hospitality</Link></li>
            <li><Link href="/library" className="hover:text-white transition-colors">Explore All 18 Industries →</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-white uppercase tracking-wider">Commercial</h4>
          <ul className="space-y-2.5">
            <li><a href="#pricing" className="hover:text-white transition-colors">INR Pricing Architecture</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Scope Exclusion Policies</a></li>
            <li><a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Direct WhatsApp Desk</a></li>
            <li><a href="#proposal-form" className="hover:text-white transition-colors">Request Formal Proposal</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-white uppercase tracking-wider">Ecosystem</h4>
          <p className="text-zinc-500 leading-relaxed">
            KITTY CORP Digital Solutions is the commercial web and automation studio of KITTY CORP.
          </p>
          <div className="pt-2">
            <a
              href="https://thekittycorp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors border border-zinc-800 px-3 py-1.5 rounded-lg bg-zinc-900/60"
            >
              KITTY CORP AI Robotics Venture <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="border-t border-zinc-900 py-6 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
        <div>
          © {new Date().getFullYear()} KITTY CORP · All rights reserved. Commercial Digital Solutions &amp; Automation Studio.
        </div>
        <div className="flex items-center gap-6">
          <span>INR Billing (₹)</span>
          <span>Zero External Trap Policy</span>
          <span>Privacy &amp; Terms</span>
        </div>
      </div>

    </footer>
  );
}
