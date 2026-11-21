import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-5 text-[2.5rem] leading-tight sm:text-5xl">
        Aradığınız sayfa bulunamadı
      </h1>
      <p className="mt-4 max-w-md text-ink-2">
        Bağlantı değişmiş ya da yazı yayından kaldırılmış olabilir. Ana sayfaya dönüp
        yeniden deneyebilirsiniz.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Ana sayfa
        </Link>
        <Link href="/makaleler" className="btn btn-ghost">
          Makaleler
        </Link>
      </div>
    </main>
  );
}
