import type { Metadata } from "next";
import { AboutContent } from "@/components/about/about-content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Veronica Medellin",
  description:
    "Meet Veronica Medellin — a bilingual Houston REALTOR® with 10+ years serving Galleria, Sugar Land, and the University Area.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "REALTOR®",
    image: `${siteConfig.siteUrl}/veronica.jpg`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: `${siteConfig.siteUrl}/about`,
    worksFor: { "@type": "Organization", name: siteConfig.brokerage },
    identifier: `TREC #${siteConfig.trecLicense}`,
    knowsLanguage: ["en", "es"],
    areaServed: siteConfig.serviceAreas.map((area) => `${area}, TX`),
    sameAs: Object.values(siteConfig.social),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent />
    </>
  );
}
