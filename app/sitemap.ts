import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllListingSlugs } from "@/lib/data/listings";
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
  "/contact",
  "/es",
  "/legal/iabs",
  "/legal/consumer-protection",
  "/legal/privacy",
  "/legal/accessibility",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [listingSlugs] = await Promise.all([getAllListingSlugs()]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const listingEntries: MetadataRoute.Sitemap = listingSlugs.map((slug) => ({
    url: `${siteConfig.siteUrl}/listings/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const neighborhoodEntries: MetadataRoute.Sitemap = neighborhoods.map((n) => ({
    url: `${siteConfig.siteUrl}/neighborhoods/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...listingEntries, ...neighborhoodEntries];
}
