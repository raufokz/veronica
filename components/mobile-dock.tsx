"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import { siteConfig } from "@/lib/site-config";

export function MobileDock() {
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 bg-ink text-white md:hidden transition-transform duration-200 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={`tel:${siteConfig.phone}`} className="flex flex-col items-center gap-1 py-3 text-xs font-medium border-r border-white/10">
        <Phone className="size-4" />
        {t(dict.dock.call, lang)}
      </a>
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 py-3 text-xs font-medium border-r border-white/10"
      >
        <MessageCircle className="size-4" />
        {t(dict.dock.whatsapp, lang)}
      </a>
      <Link href="/contact" className="flex flex-col items-center gap-1 py-3 text-xs font-medium">
        <Mail className="size-4" />
        {t(dict.dock.message, lang)}
      </Link>
    </div>
  );
}
