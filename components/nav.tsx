"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import { siteConfig } from "@/lib/site-config";
import { AgentPhoto } from "@/components/agent-photo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", key: "home" as const },
  { href: "/listings", key: "listings" as const },
  { href: "/about", key: "about" as const },
  { href: "/services", key: "services" as const },
  { href: "/neighborhoods", key: "neighborhoods" as const },
  { href: "/blog", key: "blog" as const },
  { href: "/contact", key: "contact" as const },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggle } = useLanguage();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,border-color] duration-200",
        scrolled
          ? "bg-white/92 backdrop-blur-md border-b border-black/[.06]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-app flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-display text-xl font-semibold text-ink group">
          <AgentPhoto variant="headshot" className="size-9 rounded-full border border-black/10 transition-transform group-hover:scale-105" />
          <div className="flex flex-col leading-tight">
            <span className="font-display font-semibold text-lg text-ink">Veronica Medellin</span>
            <span className="text-[9px] font-sans font-medium uppercase tracking-[0.16em] text-slate">
              REALTOR®
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 hover:text-ink transition-colors"
            >
              {t(dict.nav[link.key], lang)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle language / Cambiar idioma"
            className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold tracking-wide"
          >
            <span className={lang === "en" ? "text-ink" : "text-slate"}>EN</span>
            <span className="text-slate mx-1">|</span>
            <span className={lang === "es" ? "text-ink" : "text-slate"}>ES</span>
          </button>

          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants(),
              "hidden sm:inline-flex rounded-full bg-brand hover:bg-brand/90 text-white px-5 h-9"
            )}
          >
            {t(dict.nav.bookACall, lang)}
          </a>

          <Sheet>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "lg:hidden")}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="font-display">Veronica Medellin</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="mb-4 flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white justify-center"
                >
                  <Phone className="size-4" />
                  {siteConfig.phoneDisplay}
                </a>
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-2 py-3 text-base font-medium text-ink border-b border-black/5"
                  >
                    {t(dict.nav[link.key], lang)}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
