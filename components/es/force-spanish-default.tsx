"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language-context";

// Landing directly on /es is itself a language signal (Spanish-language ads/search).
// Only applies once per mount and never overrides a language the visitor already picked.
export function ForceSpanishDefault() {
  const { lang, setLang } = useLanguage();
  const applied = useRef(false);

  useEffect(() => {
    if (applied.current) return;
    applied.current = true;
    const hasCookie = document.cookie.includes("preferred_language=");
    if (!hasCookie && lang !== "es") {
      setLang("es");
    }
  }, [lang]);

  return null;
}
