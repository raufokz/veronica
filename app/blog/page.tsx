import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { getPublishedBlogPosts } from "@/lib/data/blog";
import { BlogCard } from "@/components/blog-card";
import { blogCategoryLabels, blogCategorySlugs } from "@/lib/blog-content";
import type { BlogCategory } from "@/types/supabase";

export const metadata: Metadata = {
  title: "Market Insights & Real Estate Blog",
  description:
    "Tips, trends, and local market updates for Houston, Clear Lake and the Bay Area from Veronica Medellin, REALTOR®.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 60;

const fallbackCategories = blogCategorySlugs.map((slug) => ({ slug, label: blogCategoryLabels[slug] }));

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = (params.category as BlogCategory) || undefined;
  const posts = await getPublishedBlogPosts({
    category: activeCategory,
    search: params.q,
  });

  return (
    <div className="container-app section-pad">
      <p className="eyebrow">MARKET INSIGHTS</p>
      <h1 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold max-w-2xl">
        Tips, trends, and what&apos;s actually happening in Houston real estate
      </h1>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <Link
          href="/blog"
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            !activeCategory
              ? "bg-ink text-white"
              : "border border-black/10 text-ink/70 hover:border-ink"
          }`}
        >
          All
        </Link>
        {fallbackCategories.map(({ slug, label }) => (
          <Link
            key={slug}
            href={activeCategory === slug ? "/blog" : `/blog?category=${slug}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === slug
                ? "bg-ink text-white"
                : "border border-black/10 text-ink/70 hover:border-ink"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <Suspense fallback={<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" />}>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </Suspense>

      {posts.length === 0 && (
        <p className="mt-10 text-slate">
          No posts yet — check back soon, or{" "}
          <Link href="/contact" className="text-brand underline underline-offset-2">
            ask Veronica a question
          </Link>{" "}
          directly.
        </p>
      )}
    </div>
  );
}
