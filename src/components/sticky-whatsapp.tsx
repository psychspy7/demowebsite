"use client";

import { MessageCircle } from "lucide-react";

export function StickyWhatsApp() {
  const whatsappPhone =
    process.env.NEXT_PUBLIC_STUDIO_WHATSAPP || "919241619573";
  const message =
    "Hello Kitty Corp, I would like to discuss a bespoke website project for my business.";
  const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;

  return (
    <aside
      aria-label="Direct WhatsApp Consultation"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 pointer-events-auto"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Kitty Corp Studio (+91 9241619573)"
        className="group flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-[#FCFBF9] hover:bg-[#FFFFFF] text-[#1A1412] border border-[#1A1412]/15 shadow-[0_8px_30px_rgba(26,20,18,0.12)] hover:shadow-[0_12px_40px_rgba(26,20,18,0.18)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
        </span>
        <div className="w-6 h-6 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-200">
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
        </div>
        <span className="text-xs sm:text-sm font-semibold tracking-tight text-[#1A1412]">
          Chat on WhatsApp <span className="text-[#1A1412]/60 font-normal hidden md:inline">· +91 9241619573</span>
        </span>
      </a>
    </aside>
  );
}
