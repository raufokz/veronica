import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="font-display text-2xl">New blog post</h1>
      <div className="mt-6">
        <BlogForm />
      </div>
    </div>
  );
}
