import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OFFICIAL } from "@/lib/catalogue";

export function StudioBrandMark({ className = "w-6 h-6 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Dynamic Geometric 'K' matching reference visual */}
      <rect x="4" y="4" width="5" height="24" rx="1.5" fill="currentColor" />
      <path d="M11 16L22.5 4.5H28L14.5 18L11 16Z" fill="currentColor" />
      <path d="M12.5 15.5L26 27.5H20.5L9.5 17.5L12.5 15.5Z" fill="currentColor" />
    </svg>
  );
}

export function StudioBrand({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${className}`}>
      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-white group-hover:border-zinc-500 transition-colors shadow-sm">
        <StudioBrandMark className="w-5 h-5 text-white" />
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold tracking-wider text-sm text-white font-sans">KITTY CORP</span>
        <span className="text-zinc-600 text-xs font-light">|</span>
        <span className="text-[10px] tracking-[0.18em] text-zinc-400 font-semibold uppercase">DIGITAL SOLUTIONS</span>
      </div>
    </Link>
  );
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "light" : ""}`}
      aria-label="KITTY CORP Digital Solutions Studio home"
    >
      <span className="brand-mark" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <StudioBrandMark className="w-5 h-5 text-current" />
      </span>
      <span>
        KITTY<span className="brand-weight">CORP</span>
        <small>DIGITAL SOLUTIONS</small>
      </span>
    </Link>
  );
}

export function SiteNav() {
  return (
    <header className="site-nav">
      <Brand />
      <nav aria-label="Main navigation">
        <Link href="/#industries">Industries</Link>
        <Link href="/#designs">Designs</Link>
        <Link href="/#services">Services</Link>
        <Link href="/#pricing">Pricing</Link>
        <Link href="/#calculator">Quote Calculator</Link>
      </nav>
      <a
        className="button small dark"
        href="#proposal-form"
      >
        Get In Touch
      </a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Brand />
      <p className="brand-signature">Commercial Studio by KITTY CORP</p>
      <p>Ideas made tangible. Professional business websites &amp; automation solutions.</p>
      <div className="footer-links-row" style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
        <Link href="/#services">Services</Link>
        <Link href="/#pricing">Pricing</Link>
        <Link href="/#calculator">Calculator</Link>
        <Link href="/library">Catalogue</Link>
        <a
          href={OFFICIAL}
          target="_blank"
          rel="noopener noreferrer"
          className="official-footer-link"
        >
          KITTY CORP Robotics <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
      <span>© {new Date().getFullYear()} KITTY CORP · All rights reserved</span>
    </footer>
  );
}
