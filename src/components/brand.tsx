import Link from "next/link";
import { Cat, ArrowUpRight } from "lucide-react";
import { OFFICIAL } from "@/lib/catalogue";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "light" : ""}`}
      aria-label="Kitty Corp home"
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
      </nav>
      <Link className="button small dark" href="/admin">
        Open studio <ArrowUpRight size={16} />
      </Link>
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Brand />
      <p>Ideas made tangible. Businesses brought online.</p>
      <a href={OFFICIAL} target="_blank" rel="noreferrer">
        Get in touch <ArrowUpRight size={16} />
      </a>
      <span>© {new Date().getFullYear()} KITTY CORP</span>
    </footer>
  );
}
