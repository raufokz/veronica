"use client";

import {
  MapPin,
  Handshake,
  UserCheck,
  Megaphone,
  LineChart,
  GraduationCap,
  Landmark,
  MessageCircle,
  Languages,
  Target,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Reveal } from "@/components/reveal";

const eyebrow = { en: "WHY WORK WITH VERONICA", es: "POR QUÉ TRABAJAR CON VERONICA" };
const heading = { en: "Ten reasons clients choose her", es: "Diez razones por las que los clientes la eligen" };

const items = [
  { icon: MapPin, en: "Local market knowledge", es: "Conocimiento del mercado local" },
  { icon: Handshake, en: "Sharp negotiation", es: "Negociación aguda" },
  { icon: UserCheck, en: "Personalised service", es: "Servicio personalizado" },
  { icon: Megaphone, en: "Modern marketing", es: "Marketing moderno" },
  { icon: LineChart, en: "Investment insight", es: "Visión de inversión" },
  { icon: GraduationCap, en: "Continuing education", es: "Educación continua" },
  { icon: Landmark, en: "Community roots", es: "Raíces en la comunidad" },
  { icon: MessageCircle, en: "Clear communication", es: "Comunicación clara" },
  { icon: Languages, en: "Bilingual service", es: "Servicio bilingüe" },
  { icon: Target, en: "Client-first focus", es: "Enfoque en el cliente" },
];

export function WhyVeronica() {
  const { lang } = useLanguage();

  return (
    <section className="section-pad bg-white">
      <div className="container-app">
        <Reveal>
          <p className="eyebrow">{lang === "es" ? eyebrow.es : eyebrow.en}</p>
          <h2 className="mt-3 max-w-xl text-balance h-section">
            {lang === "es" ? heading.es : heading.en}
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.en} delay={i * 0.05}>
            <div className="group flex flex-col items-start gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                <item.icon className="size-5" />
              </span>
              <span className="text-sm font-medium text-ink leading-snug">
                {lang === "es" ? item.es : item.en}
              </span>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
