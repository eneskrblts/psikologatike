import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { Article, Message } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const ARTICLES_FILE = path.join(DATA_DIR, "articles.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const SECRET_FILE = path.join(DATA_DIR, ".session-secret");

/** Netlify Blobs depo adı ve anahtarları */
const BLOBS_STORE = "atike-nur-site";
const ARTICLES_KEY = "articles";
const MESSAGES_KEY = "messages";

/** Blobs istemcisi modül ömrü boyunca bir kez oluşturulur. */
let storePromise: Promise<import("@netlify/blobs").Store> | null = null;

/**
 * Yerelde dosya sistemi, Netlify'da kalıcı Blobs deposu kullanılır.
 * Netlify'ın dosya sistemi salt-okunurdur; bu yüzden yazmalar Blobs'a gider.
 */
function isNetlify(): boolean {
  return process.env.NETLIFY === "true" || Boolean(process.env.NETLIFY_BLOBS_CONTEXT);
}

async function blobStore() {
  if (!storePromise) {
    storePromise = import("@netlify/blobs").then(({ getStore }) =>
      // strong: yazdıktan hemen sonra okunan veri güncel olmalı (admin paneli için şart)
      getStore({ name: BLOBS_STORE, consistency: "strong" }),
    );
  }
  return storePromise;
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown): Promise<void> {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(value, null, 2), "utf8");
  await fs.rename(tmp, file);
}

function byDateDesc(a: Article, b: Article) {
  return b.publishedAt.localeCompare(a.publishedAt);
}

/* ------------------------------ Blobs yardımcıları ------------------------------ */

async function readBlob<T>(key: string): Promise<T | null> {
  const store = await blobStore();
  const value = await store.get(key, { type: "json" });
  return (value as T) ?? null;
}

async function writeBlob(key: string, value: unknown): Promise<void> {
  const store = await blobStore();
  await store.setJSON(key, value);
}

/* --------------------------------- Makaleler --------------------------------- */

/** Ham makale listesi (kendi içinde cache'lenmemiş — çağırıcının cache'lemesi beklenir) */
export async function readArticles(): Promise<Article[]> {
  let list: Article[];

  if (isNetlify()) {
    try {
      const stored = await readBlob<Article[]>(ARTICLES_KEY);
      if (stored && Array.isArray(stored)) {
        list = stored;
      } else {
        // İlk çalıştırma: deploy ile gelen seed verisini Blobs'a aktar
        list = await readJson<Article[]>(ARTICLES_FILE, []);
        if (list.length > 0) await writeBlob(ARTICLES_KEY, list);
      }
    } catch (error) {
      console.error("[store] Blobs okunamadı, dosyaya düşülüyor:", error);
      list = await readJson<Article[]>(ARTICLES_FILE, []);
    }
  } else {
    list = await readJson<Article[]>(ARTICLES_FILE, []);
  }

  return [...list].sort(byDateDesc);
}

export async function writeArticles(list: Article[]): Promise<void> {
  if (isNetlify()) {
    await writeBlob(ARTICLES_KEY, list);
    return;
  }
  await writeJson(ARTICLES_FILE, list);
}

export async function findArticleById(id: string): Promise<Article | null> {
  const list = await readArticles();
  return list.find((a) => a.id === id) ?? null;
}

export async function slugExists(slug: string, ignoreId?: string): Promise<boolean> {
  const list = await readArticles();
  return list.some((a) => a.slug === slug && a.id !== ignoreId);
}

/* ---------------------------------- Mesajlar ---------------------------------- */

export async function readMessages(): Promise<Message[]> {
  let list: Message[];

  if (isNetlify()) {
    try {
      const stored = await readBlob<Message[]>(MESSAGES_KEY);
      list = stored && Array.isArray(stored) ? stored : await readJson<Message[]>(MESSAGES_FILE, []);
    } catch (error) {
      console.error("[store] Blobs okunamadı, dosyaya düşülüyor:", error);
      list = await readJson<Message[]>(MESSAGES_FILE, []);
    }
  } else {
    list = await readJson<Message[]>(MESSAGES_FILE, []);
  }

  return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function writeMessages(list: Message[]): Promise<void> {
  if (isNetlify()) {
    await writeBlob(MESSAGES_KEY, list);
    return;
  }
  await writeJson(MESSAGES_FILE, list);
}

export async function pushMessage(message: Message): Promise<void> {
  const list = await readMessages();
  list.push(message);
  await writeMessages(list);
}

export async function deleteMessage(id: string): Promise<void> {
  const list = await readMessages();
  await writeMessages(list.filter((m) => m.id !== id));
}

/* ----------------------------------- Ortak ----------------------------------- */

export function newId(): string {
  return crypto.randomUUID();
}

/**
 * Oturum imzası için gizli anahtar.
 * Öncelik: SESSION_SECRET ortam değişkeni.
 * Yerelde yoksa `data/.session-secret` dosyasına üretilir.
 * Netlify'da dosya yazılamadığı için SESSION_SECRET tanımlanması gerekir;
 * yoksa deploy'lar arasında sabit kalan bir anahtar türetilir (uyarı loglanır).
 */
export async function getSessionSecret(): Promise<string> {
  const fromEnv = process.env.SESSION_SECRET;
  if (fromEnv && fromEnv.length >= 16) return fromEnv;

  if (isNetlify()) {
    console.warn(
      "[auth] SESSION_SECRET tanımlı değil. Netlify proje ayarlarından en az 16 karakterlik bir SESSION_SECRET ekleyin.",
    );
    return crypto
      .createHash("sha256")
      .update(`fallback-session:${process.env.ADMIN_PASSWORD ?? "psikolog2026"}`)
      .digest("hex");
  }

  try {
    const existing = await fs.readFile(SECRET_FILE, "utf8");
    if (existing.trim()) return existing.trim();
  } catch {
    /* üretilmedi */
  }
  const generated = crypto.randomBytes(32).toString("hex");
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(SECRET_FILE, generated, { encoding: "utf8", mode: 0o600 });
  return generated;
}
