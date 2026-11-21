import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";

/** Yönetim sayfalarını oturum kontrolünden geçirir. */
export async function AdminGuard({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) {
    redirect("/giris");
  }
  return <>{children}</>;
}
