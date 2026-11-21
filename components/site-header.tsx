"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/makaleler", label: "Makaleler" },
  { href: "/iletisim", label: "İletişim" },
];

function isActivePath(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  if (href === "/makaleler") return pathname === "/makaleler" || pathname.startsWith("/makaleler/");
  return pathname.startsWith(href);
}

/** Aktif bağlantı durumunu çizen saf liste */
function NavLinks({ pathname }: { pathname: string | null }) {
  return (
    <>
      {NAV_LINKS.map((link) => {
        const active = isActivePath(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative rounded-full px-4 py-2 text-[0.93rem] transition-colors ${
              active ? "text-sage" : "text-ink-2 hover:text-ink"
            }`}
          >
            {link.label}
            <span
              className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-sage transition-transform duration-300 ${
                active ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </Link>
        );
      })}
    </>
  );
}

/** Yalnızca tarayıcıda çalışan, rota bilgisini okuyan sürüm */
function ActiveNav() {
  const pathname = usePathname();
  return <NavLinks pathname={pathname} />;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-ink/8 bg-cream/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-sage font-display text-lg text-cream transition-transform duration-300 group-hover:scale-105">
            {site.initials}
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[1.02rem] text-ink">{site.name}</span>
            <span className="block text-[0.7rem] uppercase tracking-[0.18em] text-ink-3">
              {site.role}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Suspense fallback={<NavLinks pathname={null} />}>
            <ActiveNav />
          </Suspense>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/iletisim" className="btn btn-primary hidden text-sm sm:inline-flex">
            Randevu Al
          </Link>

          <button
            type="button"
            aria-label="Menüyü aç/kapat"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/12 bg-white/70 lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-0.5 w-full rounded bg-ink transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-full rounded bg-ink transition-all duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-full rounded bg-ink transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      <div
        className={`overflow-hidden border-t border-ink/8 bg-cream transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-page flex flex-col gap-1 py-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg text-ink transition-colors hover:bg-shell"
            >
              {link.label}
              <span className="text-ink-3">→</span>
            </Link>
          ))}
          <Link href="/iletisim" onClick={() => setOpen(false)} className="btn btn-primary mt-2">
            Randevu Al
          </Link>
        </nav>
      </div>
    </header>
  );
}
