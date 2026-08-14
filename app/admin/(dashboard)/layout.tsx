import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminNavCounts } from "@/lib/data/admin";
import { AdminSidebar, AdminMobileNav } from "@/components/admin/admin-nav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const counts = await getAdminNavCounts();
  const email = user.email ?? "";

  return (
    <div className="min-h-screen bg-sand">
      <AdminSidebar email={email} counts={counts} />
      <AdminMobileNav email={email} counts={counts} />
      <main className="px-4 py-8 sm:px-6 lg:pl-64">
        <div className="mx-auto max-w-6xl lg:px-6">{children}</div>
      </main>
    </div>
  );
}
