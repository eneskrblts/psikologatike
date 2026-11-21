import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { articleCover } from "@/lib/images";
import { formatDate, readingMinutes } from "@/lib/format";

export function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  return (
    <Link
      href={`/makaleler/${article.slug}`}
      className="card card-hover group flex h-full flex-col overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden bg-shell">
        <Image
          src={articleCover(article, index)}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/0 to-ink/0" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-sage backdrop-blur">
          {article.category}
        </span>
        <span className="absolute bottom-3 right-4 font-display text-3xl text-white/70">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[0.72rem] uppercase tracking-wider text-ink-3">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span className="h-1 w-1 rounded-full bg-ink-3/60" />
          <span>{readingMinutes(article.content)} dk okuma</span>
        </div>

        <h3 className="mt-3 font-display text-[1.22rem] leading-snug text-ink transition-colors group-hover:text-sage">
          {article.title}
        </h3>

        <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-ink-2">{article.excerpt}</p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-sage">
          Yazıyı oku
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </span>
      </div>
    </Link>
  );
}
