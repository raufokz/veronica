"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "veronica:saved-listings";

function readSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function useSavedListings() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    setSaved(readSaved());
  }, []);

  const toggle = useCallback((id: string) => {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => saved.includes(id), [saved]);

  return { saved, toggle, isSaved };
}
