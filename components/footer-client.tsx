"use client";

import Link from "next/link";
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "@/components/social-icons";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import { siteConfig } from "@/lib/site-config";
import { Phone, Mail, MapPin } from "lucide-react";

export type FooterOverrides = {
  phone?: string;
  email?: string;
  brokerageName?: string;
  licenseNumber?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  pinterestUrl?: string;
  youtubeUrl?: string;
};

export function FooterClient({ overrides }: { overrides?: FooterOverrides }) {
  const { lang } = useLanguage();

  const phone = overrides?.phone || siteConfig.phoneDisplay;
  const telHref = overrides?.phone ? `tel:${overrides.phone}` : `tel:${siteConfig.phone}`;
  const email = overrides?.email || siteConfig.email;
  const licenseNumber = overrides?.licenseNumber || siteConfig.trecLicense;
  const facebookUrl = overrides?.facebookUrl || siteConfig.social.facebook;
  const instagramUrl = overrides?.instagramUrl || siteConfig.social.instagram;
  const youtubeUrl = overrides?.youtubeUrl || siteConfig.social.youtube;

  // Render 5 columns matching the mockup
  return (
    <footer className="bg-[#161612] text-white/80 text-sm border-t border-white/5 py-16">
      
      {/* 5-Column Grid */}
      <div className="container-app max-w-5xl px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
        
        {/* Column 1: Agent Name & Social Circles */}
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="font-display text-white font-bold text-base uppercase tracking-wider leading-tight">
              Veronica Medellin
            </h4>
            <p className="text-[10px] text-white/50 tracking-widest uppercase font-semibold">
              REALTOR®
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href={facebookUrl}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-[#c5a059] transition-all text-white cursor-pointer"
            >
              <FacebookIcon className="size-3.5" />
            </a>
            <a
              href={instagramUrl}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-[#c5a059] transition-all text-white cursor-pointer"
            >
              <InstagramIcon className="size-3.5" />
            </a>
            <a
              href={facebookUrl}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-[#c5a059] transition-all text-white cursor-pointer"
            >
              <LinkedInIcon className="size-3.5" />
            </a>
            {youtubeUrl && (
              <a
                href={youtubeUrl}
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-[#c5a059] transition-all text-white cursor-pointer"
              >
                <YouTubeIcon className="size-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Column 2: Contact Detail Info */}
        <div className="flex flex-col gap-3">
          <h5 className="font-display font-bold uppercase tracking-wider text-white text-xs">
            {lang === "es" ? "CONTACTO" : "CONTACT"}
          </h5>
          <div className="flex flex-col gap-2 text-white/70 text-xs sm:text-sm">
            <a href={telHref} className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Phone className="size-3.5 text-[#c5a059] shrink-0" />
              <span>{phone}</span>
            </a>
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer truncate">
              <Mail className="size-3.5 text-[#c5a059] shrink-0" />
              <span className="truncate">{email}</span>
            </a>
            <div className="inline-flex items-center gap-2 text-white/60">
              <MapPin className="size-3.5 text-[#c5a059] shrink-0" />
              <span>Houston, TX</span>
            </div>
          </div>
        </div>

        {/* Column 3: Services Links */}
        <div className="flex flex-col gap-3">
          <h5 className="font-display font-bold uppercase tracking-wider text-white text-xs">
            {lang === "es" ? "SERVICIOS" : "SERVICES"}
          </h5>
          <ul className="space-y-2 text-white/70 text-xs sm:text-sm">
            <li>
              <Link href="/buyer-tips" className="hover:text-white transition-colors">
                {lang === "es" ? "Comprar una Casa" : "Buy a Home"}
              </Link>
            </li>
            <li>
              <Link href="/seller-tips" className="hover:text-white transition-colors">
                {lang === "es" ? "Vender una Casa" : "Sell a Home"}
              </Link>
            </li>
            <li>
              <Link href="/listings" className="hover:text-white transition-colors">
                {lang === "es" ? "Invertir en Bienes Raíces" : "Invest in Real Estate"}
              </Link>
            </li>
            <li>
              <Link href="/home-value" className="hover:text-white transition-colors">
                {lang === "es" ? "Análisis de Mercado" : "Market Analysis"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Helpful Links */}
        <div className="flex flex-col gap-3">
          <h5 className="font-display font-bold uppercase tracking-wider text-white text-xs">
            {lang === "es" ? "ENLACES ÚTILES" : "HELPFUL LINKS"}
          </h5>
          <ul className="space-y-2 text-white/70 text-xs sm:text-sm">
            <li>
              <Link href="/neighborhoods" className="hover:text-white transition-colors">
                {lang === "es" ? "Vecindarios" : "Neighborhoods"}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                {lang === "es" ? "Blog" : "Blog"}
              </Link>
            </li>
            <li>
              <Link href="/#faq-contact" className="hover:text-white transition-colors">
                {lang === "es" ? "Contacto" : "Contact"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 5: Let's Connect CTA */}
        <div className="flex flex-col gap-3">
          <h5 className="font-display font-bold uppercase tracking-wider text-white text-xs">
            {lang === "es" ? "CONECTAR" : "LET'S CONNECT"}
          </h5>
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#c5a059] hover:bg-[#c5a059]/10 text-[#c5a059] uppercase text-[10px] font-bold tracking-widest py-2.5 px-4 text-center transition-all cursor-pointer inline-block"
          >
            {lang === "es" ? "Agenda una llamada" : "Book a Free Consultation"}
          </a>
        </div>

      </div>

      {/* Compliance / Copyright Bottom Section */}
      <div className="border-t border-white/5 pt-10 text-[11px] text-white/60">
        <div className="container-app max-w-5xl px-4 md:px-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          
          {/* Copyrights and state compliance */}
          <div className="flex flex-col gap-1.5 text-center lg:text-left">
            <p className="font-medium text-white/70">
              © 2026 Veronica Medellin, REALTOR®. {t(dict.footer.rights, lang)}
            </p>
            <p>
              License Number #{licenseNumber} | {t(dict.footer.brokerageLine, lang)}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-1 mt-1 text-white/40">
              <Link href="/legal/iabs" className="hover:underline hover:text-white">
                {t(dict.footer.iabs, lang)}
              </Link>
              <span>·</span>
              <Link href="/legal/consumer-protection" className="hover:underline hover:text-white">
                {t(dict.footer.consumerProtection, lang)}
              </Link>
              <span>·</span>
              <Link href="/legal/accessibility" className="hover:underline hover:text-white">
                {t(dict.footer.accessibility, lang)}
              </Link>
            </div>
          </div>

          {/* Equal Opportunity logos */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              Website Powered By My Broker Search
            </span>
            <div className="flex gap-2 items-center text-white/40" aria-hidden="true" title="Realtor & Equal Housing Opportunity logo compliance">
              <span className="font-semibold text-xs leading-none">®</span>
              <svg className="size-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 3.82L17.18 11H6.82L12 6.82zM7 13h10v5H7v-5z" />
              </svg>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
