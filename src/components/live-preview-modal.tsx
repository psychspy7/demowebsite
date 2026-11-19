"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  X,
  Monitor,
  Tablet,
  Smartphone,
  MessageCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";
import type { Template } from "@/lib/types";
import { getIndustry } from "@/lib/catalogue";

export type DeviceViewport = "desktop" | "tablet" | "mobile";

interface LivePreviewModalProps {
  template: Template | null;
  onClose: () => void;
}

export function LivePreviewModal({ template, onClose }: LivePreviewModalProps) {
  const [device, setDevice] = useState<DeviceViewport>("desktop");
  const [loading, setLoading] = useState(true);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!template) return;
    setLoading(true);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [template, onClose]);

  if (!template) return null;

  const whatsappHref = `https://wa.me/919241619573?text=${encodeURIComponent(
    `Hello Kitty Corp, I would like to discuss the "${template.name}" blueprint for my business.`
  )}`;

  const industry = getIndustry(template.industry);

  const getViewportWidth = () => {
    switch (device) {
      case "mobile":
        return "390px";
      case "tablet":
        return "768px";
      case "desktop":
      default:
        return "100%";
    }
  };

  const getViewportHeight = () => {
    switch (device) {
      case "mobile":
        return "800px";
      case "tablet":
        return "860px";
      case "desktop":
      default:
        return "100%";
    }
  };

  return (
    <div
      ref={backdropRef}
      className="live-preview-backdrop"
      onClick={(e) => {
        if (e.target === backdropRef.current) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Live preview of ${template.name}`}
    >
      <div className="live-preview-container">
        {/* Top Control Bar */}
        <header className="live-preview-header">
          <div className="live-preview-meta">
            <span className="live-preview-badge">
              {template.layout.toUpperCase()} · {industry?.name || template.industry}
            </span>
            <h2 className="live-preview-title">{template.name}</h2>
          </div>

          {/* 3-way Segmented Device Switcher */}
          <div
            className="segmented-device-toggle"
            role="tablist"
            aria-label="Device viewport switcher"
          >
            <button
              type="button"
              role="tab"
              aria-selected={device === "desktop"}
              className={`device-toggle-btn ${
                device === "desktop" ? "active" : ""
              }`}
              onClick={() => setDevice("desktop")}
              title="Desktop View (Fluid)"
            >
              <Monitor size={15} />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={device === "tablet"}
              className={`device-toggle-btn ${
                device === "tablet" ? "active" : ""
              }`}
              onClick={() => setDevice("tablet")}
              title="Tablet View (768px)"
            >
              <Tablet size={15} />
              <span>Tablet</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={device === "mobile"}
              className={`device-toggle-btn ${
                device === "mobile" ? "active" : ""
              }`}
              onClick={() => setDevice("mobile")}
              title="Mobile View (390px)"
            >
              <Smartphone size={15} />
              <span>Mobile</span>
            </button>
          </div>

          {/* Action CTAs */}
          <div className="live-preview-actions">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="button small dark preview-cta-whatsapp"
              aria-label="Enquire about this template via WhatsApp"
            >
              <MessageCircle size={15} />
              <span>Enquire via WhatsApp</span>
            </a>
            <Link
              href={`/templates/${template.id}`}
              target="_blank"
              className="button small preview-cta-page"
              title="Open standalone page"
            >
              <ExternalLink size={15} />
              <span className="desktop-only-text">Full Page</span>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="preview-close-button"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Viewport Frame Stage */}
        <div className={`live-preview-stage stage-${device}`}>
          <div
            className={`live-preview-frame-wrapper frame-${device}`}
            style={{
              width: getViewportWidth(),
              maxWidth: device === "desktop" ? "1280px" : getViewportWidth(),
              height: device === "desktop" ? "100%" : getViewportHeight(),
            }}
          >
            {loading && (
              <div className="live-preview-loading">
                <Loader2 size={26} className="animate-spin text-[#1A1412]" />
                <span>Loading {template.name}…</span>
              </div>
            )}
            <iframe
              key={template.id}
              src={`/templates/${template.id}?embed=1`}
              title={`Live Preview of ${template.name}`}
              className="live-preview-iframe"
              onLoad={() => setLoading(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
