"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

function titleCase(segment: string): string {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function BreadcrumbJsonLd() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const itemListElement = segments.map((segment, i) => {
    const url = `${siteConfig.siteUrl}/${segments.slice(0, i + 1).join("/")}`;
    return {
      "@type": "ListItem",
      position: i + 2,
      name: titleCase(segment),
      item: url,
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.siteUrl },
      ...itemListElement,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
