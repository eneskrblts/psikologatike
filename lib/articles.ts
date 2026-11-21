import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { readArticles } from "./store";
import type { Article } from "./types";

export const ARTICLES_TAG = "articles";

/** Yayınlanmış makaleler — statik kabuğa gömülür, admin yazınca etiket tazelenir. */
export async function getPublishedArticles(): Promise<Article[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(ARTICLES_TAG);
  const all = await readArticles();
  return all
    .filter((a) => a.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Tek makale (slug ile). */
export async function getPublishedArticle(slug: string): Promise<Article | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(ARTICLES_TAG);
  const all = await readArticles();
  return all.find((a) => a.slug === slug && a.status === "published") ?? null;
}

/** Tüm makaleler (taslaklar dahil) — admin tarafında, cache'siz kullanılır. */
export async function getAllArticles(): Promise<Article[]> {
  return readArticles();
}
