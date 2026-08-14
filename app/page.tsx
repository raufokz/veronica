import { Hero } from "@/components/home/hero";
import { HomeValueBand } from "@/components/home/home-value-band";
import { FeaturedListings } from "@/components/home/featured-listings";
import { AboutPreview } from "@/components/home/about-preview";
import { Services } from "@/components/home/services";
import { WhyVeronica } from "@/components/home/why-veronica";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ContactSection } from "@/components/home/contact-section";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Veronica Medellin",
    image: `${siteConfig.siteUrl}/veronica.jpg`,
    telephone: siteConfig.phone,
    url: siteConfig.siteUrl,
    areaServed: ["Houston, TX", "Clear Lake, TX", "League City, TX", "Friendswood, TX"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Houston",
      addressRegion: "TX",
      addressCountry: "US",
    },
    parentOrganization: { "@type": "Organization", name: siteConfig.brokerage },
    knowsLanguage: ["en", "es"],
    priceRange: "$$",
    sameAs: Object.values(siteConfig.social),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <HomeValueBand />
      <FeaturedListings />
      <AboutPreview />
      <Services />
      <WhyVeronica />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
