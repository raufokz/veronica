import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/admin/sign-out-button";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/listings", label: "Listings" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

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

  return (
    <div className="min-h-screen bg-sand">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/admin" className="font-display text-lg">
            Veronica Medellin <span className="text-slate text-sm font-sans">admin</span>
          </Link>
          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-ink/80 hover:text-ink">
                {link.label}
              </Link>
            ))}
            <span className="text-sm text-slate">{user.email}</span>
            <SignOutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
