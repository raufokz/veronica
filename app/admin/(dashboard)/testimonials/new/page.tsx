import { TestimonialForm } from "@/components/admin/testimonial-form";
import { PageHeader } from "@/components/admin/page-header";

export default function NewTestimonialPage() {
  return (
    <div>
      <PageHeader title="New testimonial" />
      <TestimonialForm />
    </div>
  );
}
