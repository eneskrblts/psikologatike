import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getSessionSecret } from "./store";
import { site } from "./site";

export const SESSION_COOKIE = "yonetim_oturum";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 gün

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? site.defaultAdminPassword;
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export async function verifyPassword(input: string): Promise<boolean> {
  const expected = adminPassword();
  const hash = (v: string) => createHash("sha256").update(v).digest("hex");
  return safeEqual(hash(input), hash(expected));
}

async function sign(payload: string): Promise<string> {
  const secret = await getSessionSecret();
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export async function createSessionToken(): Promise<string> {
  const payload = JSON.stringify({
    u: "admin",
    exp: Date.now() + COOKIE_MAX_AGE * 1000,
  });
  const encoded = Buffer.from(payload).toString("base64url");
  return `${encoded}.${await sign(encoded)}`;
}

export async function isValidSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;

  const expected = await sign(encoded);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as {
      exp?: number;
    };
    if (!payload.exp || payload.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

export async function setSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return isValidSessionToken(jar.get(SESSION_COOKIE)?.value);
}
