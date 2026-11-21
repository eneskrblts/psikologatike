import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Yönetici Girişi",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-mint blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-clay-2/50 blur-3xl" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-6 flex items-center justify-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-sage font-display text-lg text-cream">
            {site.initials}
          </span>
          <span className="font-display text-lg">{site.name}</span>
        </Link>

        <div className="card p-8 shadow-[0_30px_60px_-40px_rgba(22,35,30,0.7)]">
          <span className="eyebrow">Yönetim</span>
          <h1 className="mt-4 text-3xl">Hoş geldiniz</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            Makale yayınlamak ve gelen mesajları okumak için şifrenizi girin.
          </p>

          <div className="mt-7">
            <LoginForm />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink-3">
          Panel şifresi <code className="rounded bg-shell px-1.5 py-0.5">ADMIN_PASSWORD</code>{" "}
          ortam değişkeni ile değiştirilebilir.
        </p>

        <Link
          href="/"
          className="mt-4 block text-center text-sm text-ink-3 transition-colors hover:text-sage"
        >
          ← Siteye dön
        </Link>
      </div>
    </main>
  );
}
