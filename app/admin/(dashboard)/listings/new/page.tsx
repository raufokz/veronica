import { ListingForm } from "@/components/admin/listing-form";
import { PageHeader } from "@/components/admin/page-header";

export default function NewListingPage() {
  return (
    <div>
      <PageHeader title="New listing" />
      <ListingForm />
    </div>
  );
}
