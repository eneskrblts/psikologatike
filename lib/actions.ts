"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import type { ArticleStatus } from "./types";
import {
  newId,
  pushMessage,
  deleteMessage as removeMessage,
  readArticles,
  slugExists,
  writeArticles,
} from "./store";
import { ARTICLES_TAG } from "./articles";
import { clearSessionCookie, isAdmin, setSessionCookie, verifyPassword } from "./auth";
import { excerptOf, slugify } from "./format";

export type FormState = {
  ok?: boolean;
  error?: string;
} | null;

async function requireAdmin() {
  if (!(await isAdmin())) {
    throw new Error("Yetkisiz erişim");
  }
}

/* ---------------------------------- Oturum --------------------------------- */

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "Lütfen şifrenizi girin." };

  if (!(await verifyPassword(password))) {
    return { error: "Şifre hatalı. Tekrar deneyin." };
  }

  await setSessionCookie();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await clearSessionCookie();
  redirect("/giris");
}

/* ---------------------------------- Makale --------------------------------- */

export async function saveArticle(id: string | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim() || "Genel";
  const excerptInput = String(formData.get("excerpt") ?? "").trim();
  const tagsInput = String(formData.get("tags") ?? "").trim();
  const status = (String(formData.get("status") ?? "draft") === "published" ? "published" : "draft") as ArticleStatus;
  const customSlug = String(formData.get("slug") ?? "").trim();

  if (!title) return { error: "Başlık zorunludur." };
  if (!content) return { error: "İçerik zorunludur." };

  let slug = customSlug ? slugify(customSlug) : slugify(title);
  if (!slug) slug = `makale-${Date.now()}`;

  let attempt = slug;
  let counter = 2;
  while (await slugExists(attempt, id ?? undefined)) {
    attempt = `${slug}-${counter++}`;
  }
  slug = attempt;

  const list = await readArticles();
  const now = new Date().toISOString();
  const excerpt = excerptInput || excerptOf(content);
  const tags = tagsInput
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (id) {
    const index = list.findIndex((a) => a.id === id);
    if (index === -1) return { error: "Makale bulunamadı." };

    const existing = list[index];
    list[index] = {
      ...existing,
      title,
      slug,
      content,
      excerpt,
      category,
      tags,
      status,
      updatedAt: now,
      publishedAt: status === "published" && existing.status !== "published" ? now : existing.publishedAt,
    };
    await writeArticles(list);
  } else {
    list.push({
      id: newId(),
      slug,
      title,
      content,
      excerpt,
      category,
      tags,
      status,
      publishedAt: now,
      updatedAt: now,
    });
    await writeArticles(list);
  }

  updateTag(ARTICLES_TAG);
  redirect("/admin/makaleler");
}

export async function deleteArticle(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const list = await readArticles();
  await writeArticles(list.filter((a) => a.id !== id));
  updateTag(ARTICLES_TAG);
}

export async function togglePublish(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const list = await readArticles();
  const article = list.find((a) => a.id === id);
  if (!article) return;

  const now = new Date().toISOString();
  article.status = article.status === "published" ? "draft" : "published";
  if (article.status === "published" && !article.publishedAt) article.publishedAt = now;
  article.updatedAt = now;

  await writeArticles(list);
  updateTag(ARTICLES_TAG);
}

export async function duplicateArticle(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const list = await readArticles();
  const source = list.find((a) => a.id === id);
  if (!source) return;

  const now = new Date().toISOString();
  const copy = {
    ...source,
    id: newId(),
    title: `${source.title} (kopya)`,
    slug: `${source.slug}-kopya-${Math.floor(Math.random() * 900 + 100)}`,
    status: "draft" as ArticleStatus,
    publishedAt: now,
    updatedAt: now,
  };

  list.unshift(copy);
  await writeArticles(list);
  updateTag(ARTICLES_TAG);
}

/* ---------------------------------- Mesajlar -------------------------------- */

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!name || !email || !body) return { error: "Ad, e-posta ve mesaj alanları zorunludur." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Geçerli bir e-posta adresi girin." };
  if (body.length < 10) return { error: "Mesajınız en az 10 karakter olmalıdır." };

  await pushMessage({
    id: newId(),
    name,
    email,
    phone,
    subject: subject || "İletişim formu",
    body,
    createdAt: new Date().toISOString(),
  });

  return { ok: true };
}

export async function deleteMessage(formData: FormData): Promise<void> {
  await requireAdmin();
  await removeMessage(String(formData.get("id") ?? ""));
}
