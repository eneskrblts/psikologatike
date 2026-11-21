import type { ReactNode } from "react";
import { Suspense } from "react";
import { AdminGuard } from "@/components/admin-guard";
import { AdminTopbar } from "@/components/admin-topbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-shell">
      <Suspense fallback={<div className="h-20 border-b border-ink/8 bg-cream/80" />}>
        <AdminTopbar />
      </Suspense>
      <Suspense
        fallback={
          <div className="container-page py-16">
            <div className="h-24 animate-pulse rounded-3xl bg-white/60" />
          </div>
        }
      >
        <AdminGuard>{children}</AdminGuard>
      </Suspense>
    </div>
  );
}
