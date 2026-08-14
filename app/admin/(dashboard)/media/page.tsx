import { MediaGrid } from "@/components/admin/media-grid";

export default function AdminMediaPage() {
  return (
    <div>
      <h1 className="font-display text-2xl">Media library</h1>
      <p className="mt-1 text-sm text-slate">
        Every image uploaded through the admin lives here — upload, copy URLs, or delete.
      </p>
      <div className="mt-6">
        <MediaGrid />
      </div>
    </div>
  );
}
