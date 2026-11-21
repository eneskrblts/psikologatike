import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { readMessages } from "@/lib/store";
import { togglePublish } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Genel Bakış",
  robots: { index: false, follow: false },
};

export default async function AdminHomePage() {
  const [articles, messages] = await Promise.all([getAllArticles(), readMessages()]);

  const published = articles.filter((a) => a.status === "published").length;
  const drafts = articles.length - published;
  const recent = articles.slice(0, 5);
  const recentMessages = messages.slice(0, 4);

  const stats = [
    { label: "Toplam makale", value: articles.length, tone: "text-sage" },
    { label: "Yayında", value: published, tone: "text-sage" },
    { label: "Taslak", value: drafts, tone: "text-clay" },
    { label: "Gelen mesaj", value: messages.length, tone: "text-ink" },
  ];

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl">Genel Bakış</h1>
          <p className="mt-2 text-sm text-ink-2">
            Sitenizin güncel durumu ve son hareketler.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/makale/yeni" className="btn btn-primary !py-2.5 text-sm">
            + Yeni Makale
          </Link>
          <Link href="/admin/mesajlar" className="btn btn-ghost !py-2.5 text-sm">
            Mesajlar
          </Link>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-6">
            <p className={`font-display text-4xl ${stat.tone}`}>{stat.value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink-3">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Son makaleler */}
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-ink/8 px-6 py-4">
            <h2 className="font-display text-lg">Son makaleler</h2>
            <Link href="/admin/makaleler" className="text-sm text-sage hover:underline">
              Tümü →
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-ink-2">
              Henüz makale yok.
              <Link href="/admin/makale/yeni" className="ml-1 text-sage hover:underline">
                İlk makaleyi yazın.
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-ink/8">
              {recent.map((article) => (
                <li key={article.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/admin/makale/${article.id}`}
                      className="block truncate text-sm font-medium text-ink hover:text-sage"
                    >
                      {article.title}
                    </Link>
                    <p className="mt-1 text-xs text-ink-3">
                      {article.category} · {formatDate(article.publishedAt)}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[0.68rem] uppercase tracking-wider ${
                      article.status === "published"
                        ? "bg-mint text-sage"
                        : "bg-shell text-clay"
                    }`}
                  >
                    {article.status === "published" ? "Yayında" : "Taslak"}
                  </span>

                  <form action={togglePublish}>
                    <input type="hidden" name="id" value={article.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-ink/12 px-3 py-1.5 text-xs text-ink-2 transition-colors hover:bg-shell"
                    >
                      {article.status === "published" ? "Kaldır" : "Yayınla"}
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Mesajlar + hızlı işlemler */}
        <div className="space-y-6">
          <section className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-ink/8 px-6 py-4">
              <h2 className="font-display text-lg">Son mesajlar</h2>
              <Link href="/admin/mesajlar" className="text-sm text-sage hover:underline">
                Tümü →
              </Link>
            </div>

            {recentMessages.length === 0 ? (
              <p className="px-6 py-8 text-center text-sm text-ink-2">Gelen kutusu boş.</p>
            ) : (
              <ul className="divide-y divide-ink/8">
                {recentMessages.map((message) => (
                  <li key={message.id} className="px-6 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-medium text-ink">{message.name}</p>
                      <span className="shrink-0 text-xs text-ink-3">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-2">
                      {message.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="card p-6">
            <h2 className="font-display text-lg">Hızlı işlemler</h2>
            <div className="mt-4 flex flex-col gap-2.5">
              <Link href="/admin/makale/yeni" className="btn btn-primary !py-2.5 text-sm">
                + Yeni makale oluştur
              </Link>
              <Link href="/makaleler" target="_blank" className="btn btn-ghost !py-2.5 text-sm">
                Blogu görüntüle ↗
              </Link>
              <Link href="/" target="_blank" className="btn btn-ghost !py-2.5 text-sm">
                Ana sayfayı görüntüle ↗
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
