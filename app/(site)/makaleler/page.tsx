import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getPublishedArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/article-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Makaleler",
  description:
    "Kaygı, depresyon, ilişkiler, öz bakım ve terapi notları üzerine yazılmış psikoloji makaleleri.",
};

type Props = {
  searchParams: Promise<{ kategori?: string; q?: string }>;
};

export default function ArticlesPage({ searchParams }: Props) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 bg-shell">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-clay-2/50 blur-3xl" />
        <div className="container-page relative py-14 sm:py-20">
          <Reveal>
            <span className="eyebrow">Blog</span>
            <h1 className="mt-5 max-w-3xl text-[2.4rem] leading-[1.1] sm:text-5xl">
              Duyguları anlamak için{" "}
              <span className="italic text-sage">yazılmış</span> notlar.
            </h1>
            <p className="mt-5 max-w-2xl leading-relaxed text-ink-2">
              Terapi odasında konuşamadığımız, çünkü zamanın yetmediği konuları burada uzun uzun
              yazıyorum. Her ay en az iki yeni yazı yayımlanır.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <Suspense
          key="article-browser"
          fallback={
            <div className="grid gap-6 md:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="card h-80 animate-pulse bg-shell/70" />
              ))}
            </div>
          }
        >
          <ArticleBrowser searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}

async function ArticleBrowser({ searchParams }: Props) {
  const params = await searchParams;
  const kategori = typeof params.kategori === "string" ? params.kategori : "";
  const q = typeof params.q === "string" ? params.q : "";

  const articles = await getPublishedArticles();
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  const keyword = q.trim().toLocaleLowerCase("tr");
  const filtered = articles.filter((article) => {
    const matchesCategory = !kategori || article.category === kategori;
    const haystack = `${article.title} ${article.excerpt} ${article.tags.join(" ")}`.toLocaleLowerCase(
      "tr",
    );
    return matchesCategory && (!keyword || haystack.includes(keyword));
  });

  return (
    <>
      {/* Filtreler */}
      <div className="flex flex-col gap-5 border-b border-ink/10 pb-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <Chip href="/makaleler" active={!kategori && !q}>
            Tümü
          </Chip>
          {categories.map((category) => (
            <Chip
              key={category}
              href={`/makaleler?kategori=${encodeURIComponent(category)}`}
              active={kategori === category}
            >
              {category}
            </Chip>
          ))}
        </div>

        <form method="GET" className="relative w-full lg:w-72">
          {kategori ? <input type="hidden" name="kategori" value={kategori} /> : null}
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Yazılarda ara…"
            className="field pr-10"
          />
          <button
            type="submit"
            aria-label="Ara"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 transition-colors hover:text-sage"
          >
            ⌕
          </button>
        </form>
      </div>

      {/* Liste */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article, i) => (
            <Reveal key={article.id} delay={(i % 3) * 80} className="h-full">
              <ArticleCard article={article} index={i} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="card mt-10 p-12 text-center">
          <p className="font-display text-2xl">Sonuç bulunamadı</p>
          <p className="mt-3 text-ink-2">
            Aramanızı değiştirerek veya farklı bir kategori seçerek tekrar deneyin.
          </p>
          <Link href="/makaleler" className="btn btn-ghost mt-6">
            Tüm yazılara dön
          </Link>
        </div>
      )}
    </>
  );
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm transition-colors ${
        active
          ? "bg-sage text-cream"
          : "border border-ink/12 bg-white text-ink-2 hover:border-sage hover:text-sage"
      }`}
    >
      {children}
    </Link>
  );
}
