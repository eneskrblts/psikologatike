import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles();
  const now = new Date();

  const staticPages = [
    { path: "", priority: 1 },
    { path: "/hakkimda", priority: 0.8 },
    { path: "/hizmetler", priority: 0.9 },
    { path: "/makaleler", priority: 0.9 },
    { path: "/iletisim", priority: 0.8 },
    { path: "/gizlilik", priority: 0.3 },
  ].map((page) => ({
    url: `${site.baseUrl}${page.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: page.priority,
  }));

  const articlePages = articles.map((article) => ({
    url: `${site.baseUrl}/makaleler/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages];
}
