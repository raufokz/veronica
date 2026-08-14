import { notFound } from "next/navigation";
import { getTestimonialByIdAdmin } from "@/lib/data/admin";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { PageHeader } from "@/components/admin/page-header";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonialByIdAdmin(id);
  if (!testimonial) notFound();

  return (
    <div>
      <PageHeader title="Edit testimonial" />
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
