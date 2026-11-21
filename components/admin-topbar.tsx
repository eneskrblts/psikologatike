"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions";
import { site } from "@/lib/site";

const items = [
  { href: "/admin", label: "Genel Bakış", exact: true },
  { href: "/admin/makaleler", label: "Makaleler" },
  { href: "/admin/makale/yeni", label: "Yeni Makale" },
  { href: "/admin/mesajlar", label: "Mesajlar" },
];

function AdminNavLinks({ pathname }: { pathname: string | null }) {
  return (
    <>
      {items.map((item) => {
        const active = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm transition-colors ${
              active ? "bg-sage text-cream" : "text-ink-2 hover:bg-shell hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

function ActiveAdminNav() {
  const pathname = usePathname();
  return <AdminNavLinks pathname={pathname} />;
}

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-sage text-sm font-semibold text-cream">
            {site.initials}
          </span>
          <span className="hidden text-sm font-medium text-ink sm:block">
            Yönetim Paneli
            <span className="ml-2 text-ink-3">{site.shortName}</span>
          </span>
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto">
          <Suspense fallback={<AdminNavLinks pathname={null} />}>
            <ActiveAdminNav />
          </Suspense>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="hidden rounded-full border border-ink/15 px-3.5 py-2 text-sm text-ink-2 transition-colors hover:bg-shell sm:block"
          >
            Siteyi Gör ↗
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full bg-ink px-3.5 py-2 text-sm text-cream transition-colors hover:bg-sage"
            >
              Çıkış
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
