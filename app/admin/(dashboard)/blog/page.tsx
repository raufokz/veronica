import Link from "next/link";
import { getAllBlogPostsAdmin } from "@/lib/data/admin";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/admin/page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { blogCategoryLabels } from "@/lib/blog-content";
import { formatBlogDate } from "@/lib/blog-content";

const statusStyles: Record<string, string> = {
  published: "bg-emerald-100 text-emerald-800",
  scheduled: "bg-amber-100 text-amber-800",
  draft: "bg-sand text-ink",
  archived: "bg-black/10 text-slate",
};

export default async function AdminBlogPage() {
  const posts = await getAllBlogPostsAdmin();

  return (
    <div>
      <PageHeader title="Blog posts">
        <Link href="/admin/blog/new" className={cn(buttonVariants(), "rounded-full bg-brand hover:bg-brand/90 text-white px-5")}>
          New post
        </Link>
      </PageHeader>

      <div className="overflow-x-auto rounded-xl border border-black/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left text-xs uppercase tracking-wide text-slate">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Published</th>
              <th className="p-4 text-right">Views</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-black/5 last:border-0">
                <td className="p-4 max-w-md">
                  <p className="font-medium truncate">{post.title}</p>
                  <p className="text-slate text-xs truncate">/{post.slug}</p>
                </td>
                <td className="p-4">
                  {post.category ? blogCategoryLabels[post.category] : "—"}
                </td>
                <td className="p-4">
                  <Badge className={cn("border-0 capitalize", statusStyles[post.status])}>
                    {post.status}
                  </Badge>
                </td>
                <td className="p-4 text-slate">
                  {post.published_at ? formatBlogDate(post.published_at) : "—"}
                </td>
                <td className="p-4 text-right tabular-nums">{post.view_count}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/blog/${post.id}/edit`} className="text-brand hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate">
                  No posts yet —{" "}
                  <Link href="/admin/blog/new" className="text-brand underline">
                    write your first one
                  </Link>
                  .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
