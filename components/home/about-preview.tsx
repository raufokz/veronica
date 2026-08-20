"use client";

import { useLanguage } from "@/lib/language-context";
import { AgentPhoto } from "@/components/agent-photo";
import { siteConfig } from "@/lib/site-config";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/social-icons";
import { Reveal } from "@/components/reveal";

const content = {
  aboutBadge: { en: "ABOUT ME", es: "SOBRE MÍ" },
  eyebrow: { en: "YOUR GUIDE", es: "TU GUÍA" },
  h2: {
    en: "You've got the goal. I've got the map.",
    es: "Tú tienes la meta. Yo tengo el mapa.",
  },
  body1: {
    en: "For years, hundreds of clients, and a license I take seriously. I've sat at the table when a first-time buyer got a positive yes and won on the first try. What I do isn't magic — it's local knowledge, market math, and answering the phone.",
    es: "Por años, cientos de clientes y una licencia que me tomo en serio. He estado en la mesa cuando un comprador primerizo recibió un sí positivo y ganó al primer intento. Lo que hago no es magia — es conocimiento local, matemáticas de mercadeo y contestar el teléfono.",
  },
  body2: {
    en: "Whether you are an experienced investor or a first-time buyer, I can help you find the property of your dreams. You will know you're prioritized, treated like family, & I'd be honored to guide you through this vital experience. To learn more about my real estate services, please don't hesitate to call me today!",
    es: "Ya sea que seas un inversionista experimentado o un comprador primerizo, puedo ayudarte a encontrar la propiedad de tus sueños. Sabrás que eres una prioridad, que se te trata como a un miembro de la familia, y me honraría guiarte a través de esta experiencia vital. Para obtener más información sobre mis servicios de bienes raíces, ¡no dudes en llamarme hoy!",
  },
};

export function AboutPreview() {
  const { lang } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-[#faf9f6]/95 to-[#f3efe6]/80 border-b border-black/5" id="about-section">
      <div className="container-app max-w-5xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Overlapping Collage of 3 Photos of Veronica */}
          <div className="md:col-span-5 flex flex-col items-center">
            <Reveal>
              {/* Overlapping Collage Container */}
              <div className="relative w-full max-w-[340px] aspect-[4/5] mb-12 select-none">
                
                {/* Photo 1: Seated Studio Portrait (Stool) - Back/Main */}
                <div className="w-[85%] aspect-[4/5] rounded-3xl overflow-hidden border border-black/5 bg-sand/30 shadow-xl transition-all duration-500 hover:scale-102">
                  <AgentPhoto variant="stool" className="w-full h-full object-cover" />
                </div>
                
                {/* Photo 2: Professional Close-up (Headshot) - Overlapping Bottom Left */}
                <div className="absolute -bottom-8 -left-4 w-[46%] aspect-square rounded-2xl overflow-hidden border-4 border-white bg-sand/35 shadow-2xl transition-all duration-300 hover:scale-105 hover:z-30">
                  <AgentPhoto variant="headshot" className="w-full h-full object-cover" />
                </div>

                {/* Photo 3: Luxury foyer listing pose (Luxury) - Overlapping Top Right */}
                <div className="absolute -top-6 -right-4 w-[42%] aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white bg-sand/35 shadow-2xl transition-all duration-300 hover:scale-105 hover:z-30">
                  <AgentPhoto variant="luxury" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Sleek Credentials Badge */}
              <div className="w-full max-w-[340px] bg-white border border-[#c5a059]/20 rounded-3xl p-5 shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:border-[#c5a059]/30">
                <h3 className="font-display text-base font-bold text-ink uppercase tracking-wider mb-0.5">
                  Veronica A. Medellin
                </h3>
                <p className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest mb-1.5">
                  REALTOR®
                </p>
                <p className="text-[9px] font-semibold text-slate/75 uppercase tracking-wider mb-4">
                  LIC #{siteConfig.trecLicense}
                </p>

                {/* Social icons inline */}
                <div className="flex gap-4 justify-center border-t border-black/5 pt-3.5 w-full">
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate hover:text-ink transition-colors cursor-pointer"
                    aria-label="Facebook"
                  >
                    <FacebookIcon width={16} height={16} />
                  </a>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate hover:text-ink transition-colors cursor-pointer"
                    aria-label="Instagram"
                  >
                    <InstagramIcon width={16} height={16} />
                  </a>
                  <a
                    href={siteConfig.social.facebook} // Linked In fallback
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate hover:text-ink transition-colors cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon width={16} height={16} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Bio Content */}
          <div className="md:col-span-7 flex flex-col items-start justify-center">
            <Reveal>
              {/* Badge label */}
              <span className="inline-block bg-[#f3efe6] border border-[#c5a059]/20 text-[#a3823b] text-[10px] font-bold tracking-[0.2em] px-3.5 py-1.5 rounded-sm mb-4">
                {lang === "es" ? content.aboutBadge.es : content.aboutBadge.en}
              </span>

              {/* Title Section */}
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink uppercase leading-snug mb-6 max-w-[28ch]">
                {lang === "es" ? content.h2.es : content.h2.en}
              </h2>

              {/* Bio Paragraphs */}
              <p className="text-sm sm:text-base leading-relaxed text-ink/90 font-medium mb-6">
                {lang === "es" ? content.body1.es : content.body1.en}
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-ink/80 font-medium">
                {lang === "es" ? content.body2.es : content.body2.en}
              </p>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
