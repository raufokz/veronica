import Link from "next/link";
import { getAllListingsAdmin } from "@/lib/data/admin";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function AdminListingsPage() {
  const listings = await getAllListingsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Listings</h1>
        <Link href="/admin/listings/new" className={cn(buttonVariants(), "rounded-full bg-brand hover:bg-brand/90 text-white px-5")}>
          New listing
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-black/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left text-xs uppercase tracking-wide text-slate">
              <th className="p-4">Title</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Published</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {listings.map((property) => (
              <tr key={property.id} className="border-b border-black/5 last:border-0">
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
            {listings.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate">
                  No listings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
