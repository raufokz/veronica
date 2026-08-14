"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Property } from "@/types/supabase";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const PAGE_SIZE = 20;

const propertyTypes = ["house", "condo", "townhouse", "land", "commercial"] as const;
const statuses = ["active", "pending", "sold", "coming_soon"] as const;

export function ListingsTable({ listings }: { listings: Property[] }) {
  const [status, setStatus] = useState<(typeof statuses)[number] | "all">("all");
  const [type, setType] = useState<(typeof propertyTypes)[number] | "all">("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return listings.filter((property) => {
      if (status !== "all" && property.status !== status) return false;
      if (type !== "all" && property.property_type !== type) return false;
      if (query) {
        const q = query.toLowerCase();
        const haystack = `${property.title} ${property.address} ${property.mls_number ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [listings, status, type, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search title, address, MLS#…"
          className="h-9 w-56"
        />
        <Select
          value={status}
          onValueChange={(v) => {
            setStatus((v as (typeof statuses)[number] | "all") ?? "all");
            setPage(1);
          }}
        >
          <SelectTrigger className="h-9 w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={type}
          onValueChange={(v) => {
            setType((v as (typeof propertyTypes)[number] | "all") ?? "all");
            setPage(1);
          }}
        >
          <SelectTrigger className="h-9 w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {propertyTypes.map((t) => (
              <SelectItem key={t} value={t} className="capitalize">
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-slate">
          {filtered.length} of {listings.length}
        </span>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-black/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left text-xs uppercase tracking-wide text-slate">
              <th className="p-4 w-16"></th>
              <th className="p-4">Title</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Published</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((property) => (
              <tr key={property.id} className="border-b border-black/5 last:border-0">
                <td className="p-4">
                  <div className="relative size-12 overflow-hidden rounded-md bg-sand">
                    {property.images?.[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={property.images[0]} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-medium">{property.title}</p>
                  <p className="text-slate">{property.address}</p>
                </td>
                <td className="p-4 tabular-nums">{currency.format(property.price)}</td>
                <td className="p-4 capitalize">{property.status.replace("_", " ")}</td>
                <td className="p-4">{property.featured ? <Badge>Featured</Badge> : "—"}</td>
                <td className="p-4">{property.published ? "Yes" : "No"}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/listings/${property.id}/edit`} className="text-brand hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate">
                  No listings match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`flex size-8 items-center justify-center rounded-full text-sm font-medium tabular-nums transition-colors ${
                p === page ? "bg-ink text-white" : "border border-black/10 text-ink/70 hover:border-ink"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
