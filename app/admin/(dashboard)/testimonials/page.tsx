import Link from "next/link";
import { getAllTestimonialsAdmin } from "@/lib/data/admin";
import { buttonVariants } from "@/components/ui/button";
import { TestimonialsTable } from "@/components/admin/testimonials-table";
import { PageHeader } from "@/components/admin/page-header";
import { cn } from "@/lib/utils";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsAdmin();

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Drag rows by the handle to change display order on the site."
      >
        <Link
          href="/admin/testimonials/new"
          className={cn(buttonVariants(), "rounded-full bg-brand hover:bg-brand/90 text-white px-5")}
        >
          New testimonial
        </Link>
      </PageHeader>

      <TestimonialsTable testimonials={testimonials} />
    </div>
  );
}
