import { ListingForm } from "@/components/admin/listing-form";

export default function NewListingPage() {
  return (
    <div>
      <h1 className="font-display text-2xl">New listing</h1>
      <div className="mt-6">
        <ListingForm />
      </div>
    </div>
  );
}
