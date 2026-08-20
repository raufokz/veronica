import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { getPublishedBlogPosts, getPublishedBlogPostsCount } from "@/lib/data/blog";
import { BlogCard } from "@/components/blog-card";
import { BlogSearchForm } from "@/components/blog-search-form";
import { blogCategoryLabels, blogCategorySlugs } from "@/lib/blog-content";
import type { BlogCategory } from "@/types/supabase";

export const metadata: Metadata = {
  title: "Market Insights & Real Estate Blog",
  description:
    "Tips, trends, and local market updates for Houston, Galleria, Sugar Land, and University areas from Veronica Medellin, REALTOR®.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 60;

const POSTS_PER_PAGE = 9;

const fallbackCategories = blogCategorySlugs.map((slug) => ({ slug, label: blogCategoryLabels[slug] }));

function buildHref(params: { category?: string; q?: string; page?: number }) {
  const search = new URLSearchParams();
  if (params.category) search.set("category", params.category);
  if (params.q) search.set("q", params.q);
  if (params.page && params.page > 1) search.set("page", String(params.page));
  const qs = search.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = (params.category as BlogCategory) || undefined;
  const search = params.q?.trim() || undefined;
  const page = Math.max(1, Number(params.page) || 1);
  const offset = (page - 1) * POSTS_PER_PAGE;

  const [posts, total] = await Promise.all([
    getPublishedBlogPosts({
      category: activeCategory,
      search,
      limit: POSTS_PER_PAGE,
      offset,
    }),
    getPublishedBlogPostsCount({ category: activeCategory, search }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  return (
    <div className="container-app section-pad">
      <p className="eyebrow">MARKET INSIGHTS</p>
      <h1 className="mt-3 h-display max-w-2xl">
        Tips, trends, and what&apos;s actually happening in Houston real estate
      </h1>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={buildHref({ q: search })}
            className={`inline-flex min-h-[36px] items-center justify-center rounded-full px-4 text-sm font-medium transition-colors cursor-pointer ${
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
              href={activeCategory === slug ? buildHref({ q: search }) : buildHref({ category: slug, q: search })}
              className={`inline-flex min-h-[36px] items-center justify-center rounded-full px-4 text-sm font-medium transition-colors cursor-pointer ${
                activeCategory === slug
                  ? "bg-ink text-white"
                  : "border border-black/10 text-ink/70 hover:border-ink"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <BlogSearchForm defaultValue={search ?? ""} category={activeCategory} />
      </div>

      <Suspense fallback={<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse" />}>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </Suspense>

      {posts.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-black/10 bg-sand/30 p-12 text-center max-w-2xl">
          <p className="text-slate font-medium">
            {search || activeCategory ? (
              <>
                No posts match that search —{" "}
                <Link href="/blog" className="text-brand underline underline-offset-2">
                  clear filters
                </Link>{" "}
                or{" "}
              </>
            ) : (
              "No posts yet — check back soon, or "
            )}
            <Link href="/contact" className="text-brand underline underline-offset-2">
              ask Veronica a question
            </Link>{" "}
            directly.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Blog pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={buildHref({ category: activeCategory, q: search, page: p })}
              aria-current={p === page ? "page" : undefined}
              className={`flex size-11 items-center justify-center rounded-full text-sm font-medium tabular-nums transition-colors cursor-pointer ${
                p === page
                  ? "bg-ink text-white"
                  : "border border-black/10 text-ink/70 hover:border-ink"
              }`}
            >
              {p}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
