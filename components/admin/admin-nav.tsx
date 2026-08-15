"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Home,
  FileText,
  MessageSquareQuote,
  Images,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@/components/admin/sign-out-button";
import type { AdminNavCounts } from "@/lib/data/admin";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
};

function buildGroups(counts: AdminNavCounts): Array<{ label: string; items: NavItem[] }> {
  return [
    {
      label: "Pipeline",
      items: [
        { href: "/admin", label: "Overview", icon: LayoutDashboard },
        { href: "/admin/leads", label: "Leads", icon: Users, badge: counts.newLeads },
        {
          href: "/admin/appointments",
          label: "Appointments",
          icon: CalendarDays,
          badge: counts.upcomingAppointments,
        },
      ],
    },
    {
      label: "Content",
      items: [
        { href: "/admin/listings", label: "Listings", icon: Home },
        { href: "/admin/blog", label: "Blog", icon: FileText },
        { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
        { href: "/admin/media", label: "Media", icon: Images },
      ],
    },
    {
      label: "Site",
      items: [{ href: "/admin/settings", label: "Settings", icon: Settings }],
    },
  ];
}

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({ counts, onNavigate }: { counts: AdminNavCounts; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-6 overflow-y-auto">
      {buildGroups(counts).map((group) => (
        <div key={group.label}>
          <p className="px-3 text-[11px] uppercase tracking-[0.14em] text-white/40">{group.label}</p>
          <ul className="mt-2 space-y-0.5">
            {group.items.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-brand text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                    {item.badge ? (
                      <span
                        className={cn(
                          "ml-auto rounded-full px-1.5 py-0.5 text-[11px] tabular-nums",
                          active ? "bg-white/20 text-white" : "bg-white/10 text-white/80"
                        )}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SidebarBody({ email, counts, onNavigate }: {
  email: string;
  counts: AdminNavCounts;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link href="/admin" onClick={onNavigate} className="px-3 font-display text-lg text-white">
        Veronica Medellin <span className="font-sans text-sm text-white/50">admin</span>
      </Link>

      <NavLinks counts={counts} onNavigate={onNavigate} />

      <div className="border-t border-white/10 pt-4">
        <p className="truncate px-3 text-xs text-white/50">{email}</p>
        <div className="mt-2 px-3">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}

export function AdminSidebar({ email, counts }: { email: string; counts: AdminNavCounts }) {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 bg-ink lg:block">
      <SidebarBody email={email} counts={counts} />
    </aside>
  );
}

export function AdminMobileNav({ email, counts }: { email: string; counts: AdminNavCounts }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close the drawer whenever navigation lands on a new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || !drawerRef.current) return;

    // Select focusable elements inside the drawer
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex="0"]';
    const focusableElements = drawerRef.current.querySelectorAll(focusableSelectors);
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (firstElement) {
      // Small timeout to ensure DOM transitions are ready
      setTimeout(() => firstElement.focus(), 50);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <div className="flex h-14 items-center justify-between border-b border-black/10 bg-ink px-4">
        <Link href="/admin" className="font-display text-base text-white">
          Veronica Medellin <span className="font-sans text-xs text-white/50">admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-2.5 text-white/80 hover:bg-white/10 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50 cursor-pointer"
          />
          <div ref={drawerRef} className="relative flex h-full w-72 flex-col bg-ink">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-3 rounded-lg p-2.5 text-white/70 hover:bg-white/10 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer z-10"
            >
              <X className="size-6" />
            </button>
            <SidebarBody email={email} counts={counts} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
