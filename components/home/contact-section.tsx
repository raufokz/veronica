"use client";

import { CalendarClock } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import { ContactForm } from "@/components/contact-form";
import { FacebookIcon, InstagramIcon, PinterestIcon, YouTubeIcon } from "@/components/social-icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { AgentPhoto } from "@/components/agent-photo";
import { cn } from "@/lib/utils";

const bookCopy = {
  heading: { en: "Prefer to pick a time yourself?", es: "¿Prefieres elegir tu propio horario?" },
  cta: { en: "Book a call directly", es: "Agenda una llamada directamente" },
};

export function ContactSection({
  headingLevel: Heading = "h2",
  sourcePage = "/",
}: {
  headingLevel?: "h1" | "h2";
  sourcePage?: string;
} = {}) {
  const { lang } = useLanguage();

  return (
    <section id="contact" className="section-pad bg-white">
      <div className="container-app grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="eyebrow">{t(dict.contact.eyebrow, lang)}</p>
          <Heading className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold">{t(dict.contact.h2, lang)}</Heading>
          <ContactForm sourcePage={sourcePage} className="mt-8" />
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4 p-4 rounded-xl border border-black/10 bg-sand/60">
            <AgentPhoto variant="closeup" className="size-16 rounded-full border border-black/10 shrink-0" />
            <div>
              <p className="font-display font-semibold text-base text-ink">Veronica Medellin</p>
              <p className="text-xs text-slate font-medium">Bilingual REALTOR® · Houston & Bay Area</p>
              <p className="text-xs text-brand font-medium mt-0.5">TREC License #{siteConfig.trecLicense}</p>
            </div>
          </div>

          <div className="rounded-xl border border-black/10 bg-sand p-5">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CalendarClock className="size-4 text-brand" />
              {bookCopy.heading[lang]}
            </div>
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "mt-3 rounded-full px-5 border-ink/20 bg-white")}
            >
              {bookCopy.cta[lang]}
            </a>
          </div>

          <div className="space-y-1 text-sm lg:space-y-3">
            <p>
              <a href={`tel:${siteConfig.phone}`} className="inline-flex min-h-10 items-center font-medium hover:text-brand lg:min-h-0">
                {siteConfig.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="inline-flex min-h-10 items-center font-medium hover:text-brand lg:min-h-0">
                {siteConfig.email}
              </a>
            </p>
            <p className="text-slate">{siteConfig.brokerage}</p>
            <p className="text-slate">TREC License #{siteConfig.trecLicense}</p>
            <div className="flex gap-1 pt-2 lg:gap-2">
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex size-11 items-center justify-center rounded-full text-slate transition-colors hover:bg-sand hover:text-brand lg:size-9">
                <FacebookIcon className="size-5" />
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex size-11 items-center justify-center rounded-full text-slate transition-colors hover:bg-sand hover:text-brand lg:size-9">
                <InstagramIcon className="size-5" />
              </a>
              <a href={siteConfig.social.pinterest} target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="flex size-11 items-center justify-center rounded-full text-slate transition-colors hover:bg-sand hover:text-brand lg:size-9">
                <PinterestIcon className="size-5" />
              </a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex size-11 items-center justify-center rounded-full text-slate transition-colors hover:bg-sand hover:text-brand lg:size-9">
                <YouTubeIcon className="size-5" />
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-black/10 aspect-video">
            <iframe
              title="Service area map — Clear Lake & Houston, TX"
              src="https://www.google.com/maps?q=Clear+Lake,+Houston,+TX&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
