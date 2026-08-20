import { Hero } from "@/components/home/hero";
import { WhyVeronica } from "@/components/home/why-veronica";
import { FeaturedListings } from "@/components/home/featured-listings";
import { AboutPreview } from "@/components/home/about-preview";
import { Services } from "@/components/home/services";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { HomeFaq } from "@/components/home/home-faq";
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
      {/* 1. Hero Slideshow & Floating Action Bar */}
      <Hero />

      {/* 2. Why Work With Me */}
      <WhyVeronica />

      {/* 3. Featured Properties (Currently on the Market) */}
      <FeaturedListings />

      {/* 4. About Me Profile Card & Bio */}
      <AboutPreview />

      {/* 5. How I Help Services Grid & Process steps */}
      <Services />

      {/* 6. Client Testimonials Carousel */}
      <TestimonialsSection />

      {/* 7. Homepage FAQ Section */}
      <HomeFaq />

      {/* 8. Dedicated Premium Lead Capture Form */}
      <ContactSection sourcePage="/" />
    </>
  );
}
