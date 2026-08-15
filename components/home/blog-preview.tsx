import Link from "next/link";
import { getRecentBlogPosts } from "@/lib/data/blog";
import { BlogCard } from "@/components/blog-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Reveal } from "@/components/reveal";

export async function BlogPreview() {
  const posts = await getRecentBlogPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-sand section-pad">
      <div className="container-app">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">MARKET INSIGHTS</p>
              <h2 className="mt-3 h-section max-w-xl">
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
        </Reveal>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.05} className="h-full">
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/blog"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-6")}
            >
              View all posts
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
