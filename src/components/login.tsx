"use client";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import { Brand } from "./brand";
import { OFFICIAL } from "@/lib/catalogue";
export function Login({ configured }: { configured: boolean }) {
  const [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
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
      if (!r.ok) throw new Error(data.error);
      window.location.reload();
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
          <span className="eyebrow">THE KITTY CORP WORKSPACE</span>
          <h1>
            A little vision.
            <br />
            <em>A lot of possibility.</em>
          </h1>
          <p>Turn the next conversation into a considered website concept.</p>
        </div>
        <span className="eyebrow">
          DESIGN. PERSONALISE. MAKE AN IMPRESSION.
        </span>
      </div>
      <section className="login-form-wrap">
        <span className="login-lock">
          <LockKeyhole size={24} />
        </span>
        <span className="eyebrow">WELCOME TO YOUR STUDIO</span>
        <h2>Let’s get to work.</h2>
        <p>Sign in with your KITTY CORP admin credentials.</p>
        {!configured ? (
          <div className="notice">
            Admin credentials are not configured. Run <code>pnpm setup</code> in
            the project directory, then restart the server.
          </div>
        ) : (
          <form onSubmit={login}>
            <label className="field">
              <span>Admin ID</span>
              <input
                name="username"
                autoComplete="username"
                required
                autoFocus
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </label>
            {error && (
              <p className="error-text" role="alert">
                {error}
              </p>
            )}
            <button className="button dark full" disabled={busy}>
              {busy ? "Signing in…" : "Enter the studio"}
              <ArrowRight size={18} />
            </button>
          </form>
        )}
        <a className="text-link" href={OFFICIAL}>
          Need help? Contact KITTY CORP <ArrowUpRight size={15} />
        </a>
      </section>
    </main>
  );
}
