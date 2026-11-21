"use client";

import { useActionState } from "react";
import { submitContact, type FormState } from "@/lib/actions";

export function ContactForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitContact, null);

  if (state?.ok) {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mint text-2xl text-sage">
          ✓
        </div>
        <h3 className="mt-5 text-2xl">Mesajınız bana ulaştı</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-2">
          En geç 24 saat içinde size dönüş yapacağım. Acil bir durum için doğrudan telefonla
          ulaşabilirsiniz.
        </p>
        <p className="mt-6 text-xs text-ink-3">Form otomatik olarak sıfırlanabilir.</p>
      </div>
    );
  }

  return (
    <form action={action} className="card space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-2">
            Ad Soyad <span className="text-clay">*</span>
          </label>
          <input id="name" name="name" required className="field" placeholder="Adınız" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-2">
            E-posta <span className="text-clay">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="field"
            placeholder="ornek@eposta.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink-2">
            Telefon
          </label>
          <input id="phone" name="phone" className="field" placeholder="+90 5xx xxx xx xx" />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-ink-2">
            Konu
          </label>
          <select id="subject" name="subject" className="field" defaultValue="Randevu talebi">
            <option>Randevu talebi</option>
            <option>Online görüşme bilgisi</option>
            <option>Kurumsal iş birliği</option>
            <option>Diğer</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="body" className="mb-1.5 block text-sm font-medium text-ink-2">
          Mesajınız <span className="text-clay">*</span>
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={6}
          className="field resize-none"
          placeholder="Kısaca belirtmek istediğiniz konu ve uygun olduğunuz saatler…"
        />
      </div>

      {state?.error ? (
        <p className="rounded-xl bg-clay-2/40 px-4 py-3 text-sm text-ink">{state.error}</p>
      ) : null}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-3">
          Gönderdiğiniz bilgiler KVKK kapsamında gizli tutulur.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Gönderiliyor…" : "Mesajı Gönder"}
        </button>
      </div>
    </form>
  );
}
