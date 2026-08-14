import Link from "next/link";
import { getAllListingsAdmin } from "@/lib/data/admin";
import { buttonVariants } from "@/components/ui/button";
import { ListingsTable } from "@/components/admin/listings-table";
import { PageHeader } from "@/components/admin/page-header";
import { cn } from "@/lib/utils";

export default async function AdminListingsPage() {
  const listings = await getAllListingsAdmin();

  return (
    <div>
      <PageHeader title="Listings">
        <Link href="/admin/listings/new" className={cn(buttonVariants(), "rounded-full bg-brand hover:bg-brand/90 text-white px-5")}>
          New listing
        </Link>
      </PageHeader>

      <ListingsTable listings={listings} />
    </div>
  );
}
