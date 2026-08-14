import { MediaGrid } from "@/components/admin/media-grid";
import { PageHeader } from "@/components/admin/page-header";

export default function AdminMediaPage() {
  return (
    <div>
      <PageHeader
        title="Media library"
        description="Every image uploaded through the admin lives here — upload, copy URLs, or delete."
      />
      <MediaGrid />
    </div>
  );
}
