import Link from "next/link";
import { getRecentBlogPosts } from "@/lib/data/blog";
import { BlogCard } from "@/components/blog-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function BlogPreview() {
  const posts = await getRecentBlogPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-sand section-pad">
      <div className="container-app">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">MARKET INSIGHTS</p>
            <h2 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold max-w-xl">
              Tips, trends, and local market updates
            </h2>
          </div>
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "hidden sm:inline-flex rounded-full px-6")}
          >
            View all posts
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-6")}
          >
            View all posts
          </Link>
        </div>
      </div>
    </section>
  );
}
