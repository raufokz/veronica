import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { MobileDock } from "@/components/mobile-dock";
import { SiteChrome } from "@/components/site-chrome";
import { Toaster } from "@/components/ui/sonner";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import ClarityAnalytics from "@/components/clarity-analytics";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/data/crm";
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

const defaultTitle = "Veronica Medellin | Houston REALTOR® | HomeSmart";
const defaultDescription =
  "Bilingual Houston REALTOR® helping families buy, sell and invest in Galleria, Sugar Land, and University areas. Free home valuation. Se habla español.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.site_title || defaultTitle;
  const description = settings?.site_description || defaultDescription;

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: title,
      template: "%s | Veronica Medellin, REALTOR®",
    },
    description,
    alternates: {
      canonical: "/",
      languages: { "en-US": "/", "es-US": "/es" },
    },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: "Veronica Medellin, REALTOR®",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    manifest: "/site.webmanifest",
    twitter: { card: "summary_large_image" },
    verification: {
      google: "EmS_WrrO_jliQ27YWFO17ouicPmWOnFOPd6lmg1uXTs",
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const initialLang = (cookieStore.get("preferred_language")?.value as Lang) || "en";

  return (
    <html
      lang={initialLang}
      className={`${poppinsDisplay.variable} ${poppinsSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FJFQBY04NL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FJFQBY04NL');
          `}
        </Script>
        <ClarityAnalytics />
        <LanguageProvider initialLang={initialLang}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
          >
            Skip to main content
          </a>
          <BreadcrumbJsonLd />
          <SiteChrome>
            <Nav />
          </SiteChrome>
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          <SiteChrome>
            <Footer />
            <MobileDock />
          </SiteChrome>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
