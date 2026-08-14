import { notFound } from "next/navigation";
import { getBlogPostByIdAdmin } from "@/lib/data/admin";
import { BlogForm } from "@/components/admin/blog-form";

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
      <h1 className="font-display text-2xl">Edit blog post</h1>
      <div className="mt-6">
        <BlogForm post={post} />
      </div>
    </div>
  );
}
