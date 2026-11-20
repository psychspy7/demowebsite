"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, LockKeyhole, User, KeyRound, ShieldCheck } from "lucide-react";
import { Brand } from "./brand";
import { OFFICIAL } from "@/lib/catalogue";

export function Login({ configured = true }: { configured?: boolean }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      const form = new FormData(e.currentTarget);
      const r = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Invalid credentials");

      // Check for redirect or template param
      const searchParams = new URLSearchParams(window.location.search);
      const template = searchParams.get("template");
      const redirectTarget = searchParams.get("redirect");

      if (redirectTarget) {
        window.location.href = redirectTarget;
      } else if (template) {
        window.location.href = `/admin/demos/new?template=${encodeURIComponent(template)}`;
      } else {
        window.location.reload();
      }
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-story">
        <Brand light />
        <div>
          <span className="eyebrow" style={{ color: "#d4a359" }}>
            KITTY CORP DIGITAL STUDIO
          </span>
          <h1>
            Bespoke craft.
            <br />
            <em>Total precision.</em>
          </h1>
          <p>
            Create, personalize, and deploy high-converting client prototypes in minutes.
          </p>
        </div>
        <div className="login-feature-tags">
          <span><ShieldCheck size={14} /> 88 Production Blueprints</span>
          <span><ShieldCheck size={14} /> Instant Prototype Links</span>
        </div>
      </div>

      <section className="login-form-wrap">
        <div className="login-card">
          <div className="login-lock-badge">
            <LockKeyhole size={22} />
          </div>

          <span className="eyebrow">AUTHORIZED STUDIO ACCESS</span>
          <h2>Sign in to Studio</h2>
          <p className="login-desc">
            Enter your admin credentials to customize blueprints, manage demos, and generate client prototype links.
          </p>

          <form onSubmit={login} className="login-form">
            <div className="login-input-group">
              <label htmlFor="login-username" className="login-label">
                <span>Admin Username / ID</span>
              </label>
              <div className="login-input-wrapper">
                <User size={16} className="login-input-icon" />
                <input
                  id="login-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  autoFocus
                  placeholder="admin"
                  className="login-input"
                />
              </div>
            </div>

            <div className="login-input-group">
              <label htmlFor="login-password" className="login-label">
                <span>Password</span>
              </label>
              <div className="login-input-wrapper">
                <KeyRound size={16} className="login-input-icon" />
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••••••"
                  className="login-input"
                />
              </div>
            </div>

            {error && (
              <div className="login-error-banner" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="button dark full login-submit-btn" disabled={busy}>
              {busy ? "Authenticating…" : "Access Studio Workspace"}
              <ArrowRight size={17} />
            </button>

            <div className="login-credentials-hint">
              <span>Default Studio ID: <strong>admin</strong> · Key: <strong>kittycorp2026</strong></span>
            </div>
          </form>

          <div className="login-footer-link">
            <a className="text-link" href={OFFICIAL} target="_blank" rel="noreferrer">
              KITTY CORP Official Ecosystem <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
