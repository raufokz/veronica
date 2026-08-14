import { notFound } from "next/navigation";
import { getListingByIdAdmin } from "@/lib/data/admin";
import { ListingForm } from "@/components/admin/listing-form";

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
      <h1 className="font-display text-2xl">Edit listing</h1>
      <div className="mt-6">
        <ListingForm property={property} />
      </div>
    </div>
  );
}
