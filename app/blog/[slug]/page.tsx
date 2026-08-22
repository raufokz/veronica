import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock } from "lucide-react";
import { getBlogPostBySlug, getRelatedBlogPosts, getAllBlogPostSlugs } from "@/lib/data/blog";
import { BlogContent } from "@/components/blog-content-renderer";
import { BlogAuthorBox } from "@/components/blog-author-box";
import { BlogCard } from "@/components/blog-card";
import { BlogViewTracker } from "@/components/blog-view-tracker";
import { BlogShareButtons } from "@/components/blog-share-buttons";
import { NewsletterCta } from "@/components/newsletter-cta";
import { blogCategoryLabels, estimateReadTime, formatBlogDate } from "@/lib/blog-content";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs();
  // An empty result makes the Vercel build fail with "Unable to find lambda for
  // route", so keep one placeholder path when there is nothing published yet.
  // It renders the normal not-found page and is replaced as soon as posts exist.
  if (slugs.length === 0) return [{ slug: "__placeholder" }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  const description =
    post.meta_description ?? post.excerpt ?? post.title;
  const published = post.published_at ?? post.created_at;
  const ogImage = post.og_image ?? post.cover_image;

  return {
    title: post.meta_title ?? post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.meta_title ?? post.title,
      description,
      type: "article",
      publishedTime: published,
      images: [{ url: ogImage ?? "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post);
  const published = post.published_at ?? post.created_at;

  const authorName = post.author ?? siteConfig.name;
  const isVeronica = authorName === siteConfig.name;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.cover_image ?? `${siteConfig.siteUrl}/og-image.jpg`,
    datePublished: published,
    dateModified: post.updated_at ?? published,
    author: isVeronica
      ? {
          "@type": "Person",
          name: siteConfig.name,
          url: `${siteConfig.siteUrl}/about`,
          image: `${siteConfig.siteUrl}/veronica.jpg`,
          jobTitle: "REALTOR®",
          identifier: `TREC #${siteConfig.trecLicense}`,
        }
      : { "@type": "Person", name: authorName, url: `${siteConfig.siteUrl}/about` },
    publisher: {
      "@type": "Organization",
      name: siteConfig.brokerage,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.siteUrl}/veronica.jpg`,
      },
    },
  };

  return (
    <div className="container-app section-pad">
      <BlogViewTracker postId={post.id} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        <p className="flex items-center gap-2 text-xs text-slate uppercase tracking-[0.14em]">
          {post.category ? <span>{blogCategoryLabels[post.category]}</span> : null}
          <span className="text-black/20">·</span>
          <span>{formatBlogDate(published)}</span>
          <span className="text-black/20">·</span>
          <span className="flex items-center gap-1 uppercase tracking-normal">
            <Clock className="size-3" />
            {estimateReadTime(post.content)} min read
          </span>
        </p>

        <h1 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight">
          {post.title}
        </h1>

        {post.excerpt ? (
          <p className="mt-5 text-lg leading-relaxed text-slate">{post.excerpt}</p>
        ) : null}

        {post.cover_image ? (
          <div className="mt-8 relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        ) : null}

        <article className="mt-10">
          <BlogContent content={post.content} />
        </article>

        <BlogAuthorBox authorName={authorName} />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 px-3 py-1 text-xs text-slate"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center gap-3 border-t border-black/10 pt-6">
          <span className="text-sm font-medium">Share:</span>
          <BlogShareButtons title={post.title} slug={post.slug} />
        </div>

        <div className="mt-10">
          <NewsletterCta sourcePage={`blog:${post.slug}`} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20 border-t border-black/10 pt-12">
          <h2 className="font-display text-2xl font-semibold">Related reading</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
