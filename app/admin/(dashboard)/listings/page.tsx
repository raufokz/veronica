import Link from "next/link";
import { getAllListingsAdmin } from "@/lib/data/admin";
import { buttonVariants } from "@/components/ui/button";
import { ListingsTable } from "@/components/admin/listings-table";
import { cn } from "@/lib/utils";

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

      <ListingsTable listings={listings} />
    </div>
  );
}
