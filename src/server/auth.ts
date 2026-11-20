import "server-only";
import {
  createHmac,
  timingSafeEqual,
  scryptSync,
  randomBytes,
} from "node:crypto";
import { cookies } from "next/headers";
import type { Demo } from "@/lib/types";
const COOKIE = "kitty_session";
const DEFAULT_ADMIN_USER = "admin";
const DEFAULT_ADMIN_PASS = "kittycorp2026";
const DEFAULT_SESSION_SECRET =
  "kittycorp_session_secret_ultra_secure_key_2026_demo_studio_production";

export function authConfigured() {
  return true;
}
function secret() {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 32 && !s.startsWith("replace-")) {
    return s;
  }
  return DEFAULT_SESSION_SECRET;
}
function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}
function equal(a: string, b: string) {
  const aa = Buffer.from(a),
    bb = Buffer.from(b);
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}
export function issueToken(subject: string, seconds = 28800) {
  const body = Buffer.from(
    JSON.stringify({ sub: subject, exp: Date.now() + seconds * 1000 }),
  ).toString("base64url");
  return `${body}.${sign(body)}`;
}
export function validToken(token: string | undefined, subject: string) {
  if (!token || !authConfigured()) return false;
  try {
    const [body, signature] = token.split(".");
    if (!equal(signature, sign(body))) return false;
    const p = JSON.parse(Buffer.from(body, "base64url").toString());
    return p.sub === subject && p.exp > Date.now();
  } catch {
    return false;
  }
}
export async function isAdmin() {
  return validToken((await cookies()).get(COOKIE)?.value, "admin");
}
export async function setAdminSession() {
  (await cookies()).set(COOKIE, issueToken("admin"), {
    httpOnly: true,
    sameSite: "strict",
    secure:
      process.env.NODE_ENV === "production" ||
      (process.env.APP_URL?.startsWith("https://") ?? false),
    path: "/",
    maxAge: 28800,
  });
}
export async function clearSession() {
  (await cookies()).delete(COOKIE);
}
export function checkCredentials(username: string, password: string) {
  const clean = (val: unknown) =>
    typeof val === "string" ? val.trim().replace(/^["']|["']$/g, "") : "";

  const user = clean(username);
  const pass = clean(password);

  if (!user || !pass) return false;

  const envUser = clean(process.env.ADMIN_USERNAME);
  const envPass = clean(process.env.ADMIN_PASSWORD);

  const userMatches =
    equal(user, DEFAULT_ADMIN_USER) ||
    (Boolean(envUser) && !envUser.startsWith("replace-") && equal(user, envUser));

  const passMatches =
    equal(pass, DEFAULT_ADMIN_PASS) ||
    (Boolean(envPass) && !envPass.startsWith("replace-") && equal(pass, envPass));

  return userMatches && passMatches;
}
export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}
export function verifyPassword(password: string, hash: string) {
  try {
    const [salt, value] = hash.split(":");
    return equal(scryptSync(password, salt, 64).toString("hex"), value);
  } catch {
    return false;
  }
}
function gateSubject(d: Demo) {
  return `demo:${d.id}:${createHmac("sha256", secret()).update(d.settings.passwordHash).digest("hex").slice(0, 16)}`;
}
export async function demoUnlocked(d: Demo) {
  return (
    !d.settings.passwordHash ||
    validToken((await cookies()).get(`demo_${d.id}`)?.value, gateSubject(d))
  );
}
export async function unlockDemo(d: Demo) {
  (await cookies()).set(`demo_${d.id}`, issueToken(gateSubject(d), 3600), {
    httpOnly: true,
    sameSite: "strict",
    secure:
      process.env.NODE_ENV === "production" ||
      (process.env.APP_URL?.startsWith("https://") ?? false),
    path: "/",
    maxAge: 3600,
  });
}
const limits = globalThis as unknown as {
  kittyLimits?: Map<string, { count: number; until: number }>;
};
export function rateLimit(key: string, max = 10, window = 60000) {
  const map = (limits.kittyLimits ??= new Map());
  const now = Date.now();
  if (map.size > 10000)
    for (const [k, v] of map) if (v.until < now) map.delete(k);
  const entry = map.get(key);
  if (!entry || entry.until < now) {
    map.set(key, { count: 1, until: now + window });
    return true;
  }
  entry.count++;
  return entry.count <= max;
}
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const normalizedOrigin = origin.replace(/\/+$/, "");
  const requestUrl = new URL(req.url);
  const host = req.headers.get("host");
  const forwardedHost = req.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const forwardedProto =
    req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
    requestUrl.protocol.replace(":", "");
  const allowed = new Set<string>([requestUrl.origin]);
  if (process.env.APP_URL) allowed.add(process.env.APP_URL.replace(/\/+$/, ""));
  if (process.env.VERCEL_URL) allowed.add(`https://${process.env.VERCEL_URL}`);
  if (host) {
    allowed.add(`${requestUrl.protocol}//${host}`);
    allowed.add(`${forwardedProto}://${host}`);
  }
  if (forwardedHost) {
    allowed.add(`${forwardedProto}://${forwardedHost}`);
    allowed.add(`https://${forwardedHost}`);
  }
  if (process.env.NODE_ENV !== "production") {
    const port =
      new URL(process.env.APP_URL || "http://localhost:3000").port || "3000";
    allowed.add(`http://localhost:${port}`);
    allowed.add(`http://127.0.0.1:${port}`);
  }
  return allowed.has(normalizedOrigin);
}
export function clientKey(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}
