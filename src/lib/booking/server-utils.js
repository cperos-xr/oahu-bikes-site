// Server-only helpers: the site's public URL and the /admin login cookie.

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";

// Prefer SITE_URL (e.g. https://oahu.bike) so links never point at a
// preview deployment; fall back to whatever host served the request.
function configuredOrigin() {
  return process.env.SITE_URL ? process.env.SITE_URL.replace(/\/+$/, "") : null;
}

export function originFromRequest(request) {
  return configuredOrigin() || new URL(request.url).origin;
}

export async function originFromHeaders() {
  if (configuredOrigin()) return configuredOrigin();
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host");
  const proto = h.get("x-forwarded-proto") || (host?.startsWith("localhost") ? "http" : "https");
  return host ? `${proto}://${host}` : "";
}

const ADMIN_COOKIE = "ob_admin";

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

// Changing ADMIN_PASSWORD signs everyone out.
function sessionToken() {
  return createHmac("sha256", process.env.ADMIN_PASSWORD).update("oahu-bike-admin-session").digest("hex");
}

const digest = (s) => createHash("sha256").update(String(s)).digest();

export function passwordMatches(input) {
  return adminConfigured() && timingSafeEqual(digest(input), digest(process.env.ADMIN_PASSWORD));
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value || "";
  return timingSafeEqual(digest(value), digest(sessionToken()));
}

export async function startAdminSession() {
  (await cookies()).set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function endAdminSession() {
  (await cookies()).delete(ADMIN_COOKIE);
}
