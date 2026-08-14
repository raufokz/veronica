import { notFound } from "next/navigation";
import { getBlogPostByIdAdmin } from "@/lib/data/admin";
import { BlogForm } from "@/components/admin/blog-form";
import { PageHeader } from "@/components/admin/page-header";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostByIdAdmin(id);
  if (!post) notFound();

  return (
    <div>
      <PageHeader title="Edit blog post" />
      <BlogForm post={post} />
    </div>
  );
}
