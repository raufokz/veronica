import type { Metadata } from "next";
import { EsLandingContent } from "@/components/es/es-landing-content";

export const metadata: Metadata = {
  title: "Realtor Que Habla Español en Houston",
  description:
    "Veronica Medellin es una REALTOR® bilingüe en Houston con más de 10 años ayudando a familias hispanas a comprar, vender e invertir en Clear Lake y el Bay Area.",
  alternates: {
    canonical: "/es",
    languages: { "en-US": "/", "es-US": "/es" },
  },
  openGraph: {
    title: "Realtor Que Habla Español en Houston | Veronica Medellin",
    description:
      "Compra, vende o invierte en Houston y Clear Lake con una agente bilingüe que te explica cada paso, en tu idioma.",
    url: "/es",
    siteName: "Veronica Medellin, REALTOR®",
    locale: "es_US",
    type: "website",
  },
};

export default function EsLandingPage() {
  return <EsLandingContent />;
}
