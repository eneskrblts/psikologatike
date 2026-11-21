import Link from "next/link";
import { currentYear, site, services } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-shell">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-sage font-display text-lg text-cream">
              {site.initials}
            </span>
            <span className="font-display text-lg">{site.name}</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-ink-2">
            Güvenli, yargısız ve bilimsel temelli bir alanda duygularınızı anlamak için buradayım.
            İlk adım her zaman en zorudur — yanınızdayım.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={`tel:${site.phoneHref}`} className="btn btn-ghost !px-4 !py-2 text-xs">
              {site.phone}
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost !px-4 !py-2 text-xs"
            >
              Instagram
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-3">
            Sayfalar
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-ink-2">
            {[
              { href: "/hakkimda", label: "Hakkımda" },
              { href: "/hizmetler", label: "Hizmetler" },
              { href: "/makaleler", label: "Makaleler" },
              { href: "/iletisim", label: "İletişim & Randevu" },
              { href: "/gizlilik", label: "KVKK & Gizlilik" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-sage">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-3">
            Çalışma Alanları
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-ink-2">
            {services.slice(0, 5).map((s) => (
              <li key={s.title}>
                <Link href="/hizmetler" className="transition-colors hover:text-sage">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-3">
            İletişim
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-ink-2">
            <li>
              <span className="block text-[0.7rem] uppercase tracking-wider text-ink-3">Telefon</span>
              <a href={`tel:${site.phoneHref}`} className="hover:text-sage">
                {site.phone}
              </a>
            </li>
            <li>
              <span className="block text-[0.7rem] uppercase tracking-wider text-ink-3">E-posta</span>
              <a href={`mailto:${site.email}`} className="hover:text-sage">
                {site.email}
              </a>
            </li>
            <li>
              <span className="block text-[0.7rem] uppercase tracking-wider text-ink-3">Adres</span>
              {site.address}
            </li>
            <li>
              <span className="block text-[0.7rem] uppercase tracking-wider text-ink-3">
                Çalışma Saatleri
              </span>
              {site.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-3 sm:flex-row">
          <p>
            © {currentYear} {site.name} — Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/gizlilik" className="hover:text-sage">
              KVKK Aydınlatma Metni
            </Link>
            <Link href="/giris" className="hover:text-sage" title="Yönetim paneli">
              Yönetim
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
