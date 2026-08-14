"use client";

import { useLanguage } from "@/lib/language-context";

const items = [
  { en: "Local market knowledge", es: "Conocimiento del mercado local" },
  { en: "Sharp negotiation", es: "Negociación aguda" },
  { en: "Personalised service", es: "Servicio personalizado" },
  { en: "Modern marketing", es: "Marketing moderno" },
  { en: "Investment insight", es: "Visión de inversión" },
  { en: "Continuing education", es: "Educación continua" },
  { en: "Community roots", es: "Raíces en la comunidad" },
  { en: "Clear communication", es: "Comunicación clara" },
  { en: "Bilingual service", es: "Servicio bilingüe" },
  { en: "Client-first focus", es: "Enfoque en el cliente" },
];

export function WhyVeronica() {
  const { lang } = useLanguage();

  return (
    <section className="bg-white py-16">
      <div className="container-app">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {items.map((item) => (
            <span key={item.en} className="text-sm font-medium text-slate">
              {lang === "es" ? item.es : item.en}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
