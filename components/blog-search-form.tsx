"use client";

import { Search } from "lucide-react";
import type { BlogCategory } from "@/types/supabase";

export function BlogSearchForm({
  defaultValue,
  category,
}: {
  defaultValue: string;
  category?: BlogCategory;
}) {
  return (
    <form action="/blog" method="get" className="relative w-full sm:w-64">
      {category && <input type="hidden" name="category" value={category} />}
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate" />
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search posts…"
        className="w-full rounded-full border border-black/10 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-ink"
      />
    </form>
  );
}
