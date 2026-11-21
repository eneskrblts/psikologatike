import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublishedArticle, getPublishedArticles } from "@/lib/articles";
import { formatDate, readingMinutes } from "@/lib/format";
import { articleCover } from "@/lib/images";
import { site } from "@/lib/site";
import { ArticleCard } from "@/components/article-card";
import { Markdown } from "@/components/markdown";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) return { title: "Makale bulunamadı" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      authors: [site.name],
      url: `${site.baseUrl}/makaleler/${article.slug}`,
      images: [
        {
          url: articleCover(article),
          alt: article.title,
        },
      ],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) notFound();

  const others = (await getPublishedArticles())
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  return (
    <>
      <article className="container-page max-w-3xl pt-14 sm:pt-20">
        <Link
          href="/makaleler"
          className="inline-flex items-center gap-2 text-sm text-ink-3 transition-colors hover:text-sage"
        >
          ← Tüm makaleler
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.14em]">
          <span className="rounded-full bg-mint px-3 py-1.5 text-sage">{article.category}</span>
          <time dateTime={article.publishedAt} className="text-ink-3">
            {formatDate(article.publishedAt)}
          </time>
          <span className="h-1 w-1 rounded-full bg-ink-3/60" />
          <span className="text-ink-3">{readingMinutes(article.content)} dakikalık okuma</span>
        </div>

        <h1 className="mt-5 text-[2.2rem] leading-[1.12] sm:text-[3rem]">{article.title}</h1>

        <p className="mt-5 border-l-2 border-clay pl-5 text-lg leading-relaxed text-ink-2">
          {article.excerpt}
        </p>

        <div className="mt-8 overflow-hidden rounded-[2rem]">
          <div className="relative aspect-[16/9]">
            <Image
              src={articleCover(article)}
              alt={article.title}
              fill
              priority
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 border-y border-ink/10 py-5">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-sage font-display text-cream">
            {site.initials}
          </span>
          <span>
            <span className="block text-sm font-medium text-ink">{site.name}</span>
            <span className="block text-xs text-ink-3">{site.role}</span>
          </span>
        </div>

        <div className="mt-10">
          <Markdown source={article.content} />
        </div>

        {article.tags.length > 0 ? (
          <div className="mt-12 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink/12 px-3.5 py-1.5 text-xs text-ink-2"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}

        {/* CTA */}
        <div className="mt-12 rounded-[2rem] bg-shell p-8 text-center">
          <h2 className="text-2xl">Bu yazı size bir şey hissettirdi mi?</h2>
          <p className="mx-auto mt-3 max-w-md text-ink-2">
            Konuşarak daha fazlasını keşfetmek isterseniz, ilk görüşme için randevu oluşturabiliriz.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/iletisim" className="btn btn-primary">
              Randevu Al
            </Link>
            <Link href="/makaleler" className="btn btn-ghost">
              Diğer yazılar
            </Link>
          </div>
        </div>
      </article>

      {others.length > 0 ? (
        <section className="container-page mt-20 border-t border-ink/10 pt-14">
          <h2 className="text-2xl">Okumaya devam</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((item, i) => (
              <ArticleCard key={item.id} article={item} index={i} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
