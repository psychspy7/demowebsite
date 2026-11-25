"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, MessageCircle, Menu, X } from "lucide-react";
import { OFFICIAL } from "@/lib/catalogue";

export const WHATSAPP_NUMBER = "+919241619573";
export const WHATSAPP_URL =
  "https://wa.me/919241619573?text=Hello%20Kitty%20Corp%2C%20I%20would%20like%20to%20discuss%20a%20website%20project%20for%20my%20business.";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "light" : ""}`}
      aria-label="Kitty Corp home"
    >
      <img
        className="brand-logo"
        src="https://thekittycorp.com/brand/kitty-corp-logo-dark.webp"
        alt="KITTY CORP"
        width={168}
        height={42}
      />
    </Link>
  );
}

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="site-nav">
      <Brand />
      <nav aria-label="Main navigation" className="nav-desktop">
        <Link href="/#industries">Industries</Link>
        <Link href="/#services">What we do</Link>
        <Link href="/#pricing">Pricing</Link>
      </nav>
      <div className="nav-actions">
        <a
          className="button small whatsapp-button"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Consultation"
        >
          <MessageCircle size={15} />
          <span>WhatsApp</span>
        </a>
        <a
          className="button small dark nav-official-link"
          href={OFFICIAL}
          target="_blank"
          rel="noreferrer"
          aria-label="Visit official KITTY CORP website"
        >
          <span>thekittycorp.com</span>
          <ArrowUpRight size={14} />
        </a>
        <button
          className="nav-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          type="button"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="nav-mobile-drawer">
          <nav aria-label="Mobile navigation">
            <Link href="/#industries" onClick={() => setIsOpen(false)}>
              Industries
            </Link>
            <Link href="/#services" onClick={() => setIsOpen(false)}>
              What we do
            </Link>
            <Link href="/#pricing" onClick={() => setIsOpen(false)}>
              Pricing
            </Link>
            <a
              className="button whatsapp-button"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
            >
              <MessageCircle size={16} /> WhatsApp: {WHATSAPP_NUMBER}
            </a>
            <a
              className="button dark"
              href={OFFICIAL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
            >
              Visit thekittycorp.com <ArrowUpRight size={16} />
            </a>
            <Link
              className="button outline-btn"
              href="/admin"
              onClick={() => setIsOpen(false)}
            >
              Admin Studio Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Brand />
      <p>Precision engineering for ambitious businesses. Brought online with authority.</p>
      <div className="footer-links">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="footer-whatsapp"
        >
          <MessageCircle size={16} /> WhatsApp: {WHATSAPP_NUMBER}
        </a>
        <a href={OFFICIAL} target="_blank" rel="noreferrer">
          thekittycorp.com <ArrowUpRight size={16} />
        </a>
      </div>
      <span>© {new Date().getFullYear()} KITTY CORP. All rights reserved.</span>
    </footer>
  );
}
