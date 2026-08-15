import { Hero } from "@/components/home/hero";
import { HomeValueBand } from "@/components/home/home-value-band";
import { FeaturedListings } from "@/components/home/featured-listings";
import { AboutPreview } from "@/components/home/about-preview";
import { Services } from "@/components/home/services";
import { WhyVeronica } from "@/components/home/why-veronica";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BlogPreview } from "@/components/home/blog-preview";
import { ContactSection } from "@/components/home/contact-section";
import { ServiceAreas } from "@/components/home/service-areas";
import { HomeFaq } from "@/components/home/home-faq";
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
    areaServed: siteConfig.serviceAreas.map((area) => `${area}, TX`),
    serviceArea: siteConfig.serviceZips.map((zip) => ({
      "@type": "PostalCodeSpecification",
      postalCode: zip,
      addressCountry: "US",
    })),
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
      <ServiceAreas />
      <AboutPreview />
      <Services />
      <WhyVeronica />
      <TestimonialsSection />
      <HomeFaq />
      <hr className="border-t border-black/5" />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
