import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteArticle, togglePublish } from "@/lib/actions";
import { formatDate } from "@/lib/format";
import { findArticleById } from "@/lib/store";
import { ArticleForm } from "@/components/article-form";
import { ConfirmSubmit } from "@/components/confirm-submit";

export const metadata: Metadata = {
  title: "Makaleyi Düzenle",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await findArticleById(id);
  if (!article) notFound();

  return (
    <div className="container-page py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">
            {article.status === "published" ? "Yayında" : "Taslak"} ·{" "}
            {formatDate(article.publishedAt)}
          </span>
          <h1 className="mt-3 text-3xl">Makaleyi düzenle</h1>
          <a
            href={`/makaleler/${article.slug}`}
            target="_blank"
            className="mt-2 inline-block text-sm text-sage hover:underline"
          >
            Site içinde görüntüle ↗
          </a>
        </div>

        <div className="flex flex-wrap gap-2">
          <form action={togglePublish}>
            <input type="hidden" name="id" value={article.id} />
            <button
              type="submit"
              className={`btn !py-2.5 text-sm ${
                article.status === "published" ? "btn-ghost" : "btn-primary"
              }`}
            >
              {article.status === "published" ? "Yayından kaldır" : "Yayınla"}
            </button>
          </form>

          <form action={deleteArticle}>
            <input type="hidden" name="id" value={article.id} />
            <ConfirmSubmit
              message="Bu makale kalıcı olarak silinecek. Emin misiniz?"
              className="btn !py-2.5 text-sm bg-clay-2/60 text-ink hover:bg-clay-2"
            >
              Sil
            </ConfirmSubmit>
          </form>

          <Link href="/admin/makaleler" className="btn btn-ghost !py-2.5 text-sm">
            ← Liste
          </Link>
        </div>
      </div>

      <ArticleForm article={article} />
    </div>
  );
}
