import type { Metadata } from "next";
import Link from "next/link";
import { ArticleForm } from "@/components/article-form";

export const metadata: Metadata = {
  title: "Yeni Makale",
  robots: { index: false, follow: false },
};

export default function NewArticlePage() {
  return (
    <div className="container-page py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Yönetim</span>
          <h1 className="mt-3 text-3xl">Yeni makale</h1>
          <p className="mt-2 text-sm text-ink-2">
            Yazınızı yazın, taslak olarak kaydedip hazır olduğunda yayınlayın.
          </p>
        </div>
        <Link href="/admin/makaleler" className="btn btn-ghost !py-2.5 text-sm">
          ← Listeye dön
        </Link>
      </div>

      <ArticleForm article={null} />
    </div>
  );
}
