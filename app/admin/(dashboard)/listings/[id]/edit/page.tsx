import { notFound } from "next/navigation";
import { getListingByIdAdmin } from "@/lib/data/admin";
import { ListingForm } from "@/components/admin/listing-form";
import { PageHeader } from "@/components/admin/page-header";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getListingByIdAdmin(id);
  if (!property) notFound();

  return (
    <div>
      <PageHeader title="Edit listing" />
      <ListingForm property={property} />
    </div>
  );
}
