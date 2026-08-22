import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllListingsForSitemap } from "@/lib/data/listings";
import { getAllBlogPostsForSitemap } from "@/lib/data/blog";
import { neighborhoods } from "@/lib/content/neighborhoods";

const staticRoutes = [
  "",
  "/listings",
  "/about",
  "/services",
  "/services/sell-your-home",
  "/services/buy-a-home",
  "/home-value",
  "/neighborhoods",
  "/blog",
  "/contact",
  "/es",
  "/legal/iabs",
  "/legal/consumer-protection",
  "/legal/privacy",
  "/legal/accessibility",
];

// Fallback for routes with no per-item updated_at (static marketing pages,
// code-defined neighborhood content). Bump this by hand when those pages
// change — it must not be `new Date()` at request time, or every URL in the
// sitemap looks like it changed on every single crawl.
const STATIC_CONTENT_LAST_MODIFIED = new Date("2026-08-22");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [listings, blogPosts] = await Promise.all([
    getAllListingsForSitemap(),
    getAllBlogPostsForSitemap(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: STATIC_CONTENT_LAST_MODIFIED,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const listingEntries: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${siteConfig.siteUrl}/listings/${listing.slug}`,
    lastModified: new Date(listing.updated_at),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const neighborhoodEntries: MetadataRoute.Sitemap = neighborhoods.map((n) => ({
    url: `${siteConfig.siteUrl}/neighborhoods/${n.slug}`,
    lastModified: STATIC_CONTENT_LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...listingEntries, ...blogEntries, ...neighborhoodEntries];
}
