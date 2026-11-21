"use client";

import { useActionState, useMemo, useState } from "react";
import { saveArticle, type FormState } from "@/lib/actions";
import { slugify } from "@/lib/format";
import { renderMarkdown } from "@/lib/markdown";
import type { Article } from "@/lib/types";

const CATEGORIES = [
  "Kaygı",
  "Depresyon",
  "İlişkiler",
  "Çocuk & Ergen",
  "Öz Bakım",
  "Terapi Notları",
  "Genel",
];

export function ArticleForm({ article }: { article: Article | null }) {
  const action = useMemo(() => saveArticle.bind(null, article?.id ?? null), [article?.id]);
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, null);

  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(article?.slug));
  const [status, setStatus] = useState(article?.status ?? "draft");
  const [content, setContent] = useState(article?.content ?? "");
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <div className="space-y-5">
        <div className="card p-6">
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-ink-2">
            Başlık <span className="text-clay">*</span>
          </label>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => {
              const next = e.target.value;
              setTitle(next);
              if (!slugTouched) setSlug(slugify(next));
            }}
            placeholder="Örn. Kaygıyla Yaşamayı Öğrenmek"
            className="field !text-lg !font-medium"
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="slug" className="mb-1.5 block text-sm font-medium text-ink-2">
                Bağlantı (slug)
              </label>
              <input
                id="slug"
                name="slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
                placeholder="kaygi-ile-yasamayi-ogrenmek"
                className="field font-mono text-sm"
              />
            </div>
            <div>
              <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-ink-2">
                Kategori
              </label>
              <input
                id="category"
                name="category"
                list="category-list"
                defaultValue={article?.category ?? ""}
                placeholder="Kaygı"
                className="field"
              />
              <datalist id="category-list">
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <label htmlFor="content" className="text-sm font-medium text-ink-2">
              İçerik <span className="text-clay">*</span>
            </label>
            <div className="flex rounded-full border border-ink/12 p-1 text-xs">
              <button
                type="button"
                onClick={() => setTab("edit")}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  tab === "edit" ? "bg-sage text-cream" : "text-ink-2"
                }`}
              >
                Düzenle
              </button>
              <button
                type="button"
                onClick={() => setTab("preview")}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  tab === "preview" ? "bg-sage text-cream" : "text-ink-2"
                }`}
              >
                Önizleme
              </button>
            </div>
          </div>

          {tab === "edit" ? (
            <textarea
              id="content"
              name="content"
              required
              rows={20}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                "## Başlık\n\nParagraf metni buraya...\n\n- Madde 1\n- Madde 2\n\n> Alıntı metni"
              }
              className="field min-h-[26rem] resize-y font-mono text-[0.9rem] leading-relaxed"
            />
          ) : (
            <>
              <input type="hidden" name="content" value={content} />
              <div className="min-h-[26rem] rounded-xl border border-ink/10 bg-shell/50 p-5">
                <div
                  className="prose-site"
                  dangerouslySetInnerHTML={{
                    __html:
                      renderMarkdown(content) ||
                      "<p class='text-ink-3'>Önizlenecek içerik yok…</p>",
                  }}
                />
              </div>
            </>
          )}

          <p className="mt-3 text-xs text-ink-3">
            Desteklenen sözdizimi: <code>## Başlık</code>, <code>**kalın**</code>,{" "}
            <code>*italik*</code>, <code>- madde</code>, <code>&gt; alıntı</code>,{" "}
            <code>[bağlantı](url)</code>, <code>```kod```</code>
          </p>
        </div>

        <div className="card p-6">
          <label htmlFor="excerpt" className="mb-1.5 block text-sm font-medium text-ink-2">
            Kısa Açıklama
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            defaultValue={article?.excerpt ?? ""}
            placeholder="Listede görünecek 1–2 cümlelik özet. Boş bırakılırsa içerikten üretilir."
            className="field resize-none"
          />
          <label htmlFor="tags" className="mb-1.5 mt-4 block text-sm font-medium text-ink-2">
            Etiketler <span className="text-ink-3">(virgülle ayırın)</span>
          </label>
          <input
            id="tags"
            name="tags"
            defaultValue={article?.tags.join(", ") ?? ""}
            placeholder="kaygı, nefes, günlük alışkanlık"
            className="field"
          />
        </div>
      </div>

      {/* Yan panel */}
      <aside className="space-y-5">
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-ink">Yayın Durumu</h3>
          <div className="mt-4 space-y-2.5">
            {[
              { value: "draft", label: "Taslak", hint: "Site içinde görünmez" },
              { value: "published", label: "Yayında", hint: "Site içinde yayınlanır" },
            ].map((opt) => (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors ${
                  status === opt.value
                    ? "border-sage bg-mint/50"
                    : "border-ink/12 hover:bg-shell/60"
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value={opt.value}
                  checked={status === opt.value}
                  onChange={() => setStatus(opt.value as Article["status"])}
                  className="mt-1 accent-[#2f5d50]"
                />
                <span>
                  <span className="block text-sm font-medium text-ink">{opt.label}</span>
                  <span className="block text-xs text-ink-3">{opt.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {state?.error ? (
          <p className="rounded-xl bg-clay-2/40 px-4 py-3 text-sm text-ink">{state.error}</p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Kaydediliyor…" : article ? "Değişiklikleri Kaydet" : "Makaleyi Oluştur"}
        </button>

        <a
          href="#title"
          className="btn btn-ghost w-full text-sm"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Başa Dön
        </a>

        <div className="rounded-2xl bg-shell p-5 text-xs leading-relaxed text-ink-2">
          <p className="mb-2 font-semibold text-ink">İpucu</p>
          Taslak kaydettiğinizde makale site içinde görünmez; yayın durumunu{" "}
          <b>Yayında</b> yaparak yayına alabilirsiniz.
        </div>
      </aside>
    </form>
  );
}
