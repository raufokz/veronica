import { BlogForm } from "@/components/admin/blog-form";
import { PageHeader } from "@/components/admin/page-header";

export default function NewBlogPostPage() {
  return (
    <div>
      <PageHeader title="New blog post" />
      <BlogForm />
    </div>
  );
}
