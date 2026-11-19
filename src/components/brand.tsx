import Link from "next/link";
import { Cat, ArrowUpRight } from "lucide-react";
import { OFFICIAL } from "@/lib/catalogue";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "light" : ""}`}
      aria-label="KITTY CORP Demo Studio home"
    >
      <span className="brand-mark">
        <Cat size={23} strokeWidth={1.7} />
      </span>
      <span>
        KITTY<span className="brand-weight">CORP</span>
        <small>DEMO STUDIO</small>
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
        <Link href="/#services">What we do</Link>
        <Link href="/#pricing">Pricing</Link>
        <a
          href={OFFICIAL}
          target="_blank"
          rel="noopener noreferrer"
          className="official-nav-link"
        >
          KITTY CORP Official Website <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </nav>
      <a
        className="button small dark"
        href={OFFICIAL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Official Website <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Brand />
      <p className="brand-signature">A website experience by KITTY CORP</p>
      <p>Ideas made tangible. Professional business websites brought online.</p>
      <div className="footer-links-row" style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
        <a
          href={OFFICIAL}
          target="_blank"
          rel="noopener noreferrer"
          className="official-footer-link"
        >
          KITTY CORP Official Website <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <a
          href={`${OFFICIAL}/services`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Websites &amp; Software Services <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <a
          href={`${OFFICIAL}/contact`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get in touch <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
      <span>© {new Date().getFullYear()} KITTY CORP · All rights reserved</span>
    </footer>
  );
}
