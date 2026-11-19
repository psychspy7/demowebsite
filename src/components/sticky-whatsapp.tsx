"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/catalogue";

export function StickyWhatsApp() {
  const whatsappPhone = process.env.NEXT_PUBLIC_STUDIO_WHATSAPP || "919999999999";
  const url = whatsappUrl(
    whatsappPhone,
    "Hi Kitty Corp Team, I'd like to discuss a digital solution for my business."
  );

  return (
    <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-6 right-6 z-50">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with an engineer"
        className="group flex items-center gap-3 px-4 py-3 rounded-full bg-zinc-950/90 border border-emerald-500/30 text-white shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md hover:border-emerald-400 hover:scale-105 transition-all"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
          <MessageCircle className="w-4 h-4" />
        </div>
        <span className="text-xs font-semibold pr-1">Chat on WhatsApp</span>
      </a>
    </aside>
  );
}
