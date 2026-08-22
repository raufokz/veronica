import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  async redirects() {
    return [
      // 2026-08-22 blog consolidation: these 3 posts were near-duplicate
      // "near me" content merged into one Houston-specific post.
      {
        source: "/blog/real-estate-for-sale",
        destination: "/blog/homes-for-sale-near-me",
        permanent: true,
      },
      {
        source: "/blog/houses-for-sale-near-me",
        destination: "/blog/homes-for-sale-near-me",
        permanent: true,
      },
      {
        source: "/blog/real-estate-near-me",
        destination: "/blog/homes-for-sale-near-me",
        permanent: true,
      },
      // Off-mission content (Veronica doesn't handle rentals) — send to contact.
      {
        source: "/blog/apartments-for-rent",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
