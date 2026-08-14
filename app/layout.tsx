import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { MobileDock } from "@/components/mobile-dock";
import { Toaster } from "@/components/ui/sonner";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { siteConfig } from "@/lib/site-config";
import type { Lang } from "@/lib/dict";

const poppinsDisplay = Poppins({
  variable: "--font-poppins-display",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  display: "swap",
});

const poppinsSans = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Veronica Medellin | Houston & Clear Lake REALTOR® | HomeSmart",
    template: "%s | Veronica Medellin, REALTOR®",
  },
  description:
    "Bilingual Houston REALTOR® with 10+ years helping families buy, sell and invest in Clear Lake, League City and the Bay Area. Free home valuation. Se habla español.",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "es-US": "/es" },
  },
  openGraph: {
    title: "Veronica Medellin | Houston REALTOR®",
    description:
      "Buy, sell or invest in Houston & Clear Lake with a bilingual agent who explains every step.",
    url: "/",
    siteName: "Veronica Medellin, REALTOR®",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const initialLang = (cookieStore.get("preferred_language")?.value as Lang) || "en";

  return (
    <html
      lang={initialLang}
      className={`${poppinsDisplay.variable} ${poppinsSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <LanguageProvider initialLang={initialLang}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
          >
            Skip to main content
          </a>
          <BreadcrumbJsonLd />
          <Nav />
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <MobileDock />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
