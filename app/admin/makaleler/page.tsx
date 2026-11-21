import type { Metadata } from "next";
import Link from "next/link";
import { deleteArticle, duplicateArticle, togglePublish } from "@/lib/actions";
import { getAllArticles } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { ConfirmSubmit } from "@/components/confirm-submit";

export const metadata: Metadata = {
  title: "Makaleler",
  robots: { index: false, follow: false },
};

export default async function AdminArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl">Makaleler</h1>
          <p className="mt-2 text-sm text-ink-2">
            {articles.length} kayıt · taslaklar site içinde görünmez.
          </p>
        </div>
        <Link href="/admin/makale/yeni" className="btn btn-primary !py-2.5 text-sm">
          + Yeni Makale
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="card mt-8 p-14 text-center">
          <p className="font-display text-2xl">Henüz makale yok</p>
          <p className="mx-auto mt-3 max-w-md text-ink-2">
            Yönetim panelinden ilk yazınızı oluşturabilir, istediğiniz zaman yayınlayabilirsiniz.
          </p>
          <Link href="/admin/makale/yeni" className="btn btn-primary mt-6">
            İlk makaleyi yaz
          </Link>
        </div>
      ) : (
        <div className="card mt-8 overflow-hidden">
          <div className="hidden grid-cols-[1fr_9rem_7rem_8rem_16rem] gap-4 border-b border-ink/8 px-6 py-3.5 text-[0.68rem] uppercase tracking-[0.14em] text-ink-3 md:grid">
            <span>Başlık</span>
            <span>Kategori</span>
            <span>Durum</span>
            <span>Tarih</span>
            <span className="text-right">İşlemler</span>
          </div>

          <ul className="divide-y divide-ink/8">
            {articles.map((article) => (
              <li
                key={article.id}
                className="grid gap-4 px-6 py-5 md:grid-cols-[1fr_9rem_7rem_8rem_16rem] md:items-center"
              >
                <div className="min-w-0">
                  <Link
                    href={`/admin/makale/${article.id}`}
                    className="block truncate font-medium text-ink transition-colors hover:text-sage"
                  >
                    {article.title}
                  </Link>
                  <span className="mt-1 block truncate font-mono text-xs text-ink-3">
                    /makaleler/{article.slug}
                  </span>
                </div>

                <span className="text-sm text-ink-2">{article.category}</span>

                <span
                  className={`w-fit rounded-full px-2.5 py-1 text-[0.68rem] uppercase tracking-wider ${
                    article.status === "published" ? "bg-mint text-sage" : "bg-shell text-clay"
                  }`}
                >
                  {article.status === "published" ? "Yayında" : "Taslak"}
                </span>

                <span className="text-sm text-ink-3">{formatDate(article.publishedAt)}</span>

                <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
                  <Link
                    href={`/admin/makale/${article.id}`}
                    className="rounded-full border border-ink/12 px-3 py-1.5 text-xs text-ink-2 transition-colors hover:bg-shell"
                  >
                    Düzenle
                  </Link>

                  <form action={togglePublish}>
                    <input type="hidden" name="id" value={article.id} />
                    <button
                      type="submit"
                      className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                        article.status === "published"
                          ? "border border-ink/12 text-ink-2 hover:bg-shell"
                          : "bg-sage text-cream hover:bg-sage-2"
                      }`}
                    >
                      {article.status === "published" ? "Yayından kaldır" : "Yayınla"}
                    </button>
                  </form>

                  <form action={duplicateArticle}>
                    <input type="hidden" name="id" value={article.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-ink/12 px-3 py-1.5 text-xs text-ink-2 transition-colors hover:bg-shell"
                      title="Taslak olarak kopyala"
                    >
                      Kopyala
                    </button>
                  </form>

                  <form action={deleteArticle}>
                    <input type="hidden" name="id" value={article.id} />
                    <ConfirmSubmit
                      message={`"${article.title}" kalıcı olarak silinecek. Emin misiniz?`}
                      className="rounded-full bg-clay-2/50 px-3 py-1.5 text-xs text-ink transition-colors hover:bg-clay-2"
                    >
                      Sil
                    </ConfirmSubmit>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
