"use client";

import Link from "next/link";
import { FacebookIcon, InstagramIcon, PinterestIcon, YouTubeIcon } from "@/components/social-icons";
import { BrokerageLogo } from "@/components/brokerage-logo";
import { useLanguage } from "@/lib/language-context";
import { dict, t } from "@/lib/dict";
import { siteConfig } from "@/lib/site-config";

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
  const brokerageName = overrides?.brokerageName || siteConfig.brokerage;
  const licenseNumber = overrides?.licenseNumber || siteConfig.trecLicense;
  const facebookUrl = overrides?.facebookUrl || siteConfig.social.facebook;
  const instagramUrl = overrides?.instagramUrl || siteConfig.social.instagram;
  const pinterestUrl = overrides?.pinterestUrl || siteConfig.social.pinterest;
  const youtubeUrl = overrides?.youtubeUrl || siteConfig.social.youtube;

  return (
    <footer className="bg-ink text-white/90">
      <div className="container-app py-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-lg font-semibold text-white">Veronica Medellin</div>
          <p className="mt-3 text-sm text-white/60 max-w-xs">{t(dict.footer.positioning, lang)}</p>
          <div className="mt-2 flex gap-1 lg:mt-4 lg:gap-2">
            <a href={facebookUrl} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="flex size-11 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white lg:size-9">
              <FacebookIcon className="size-4" />
            </a>
            <a href={instagramUrl} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="flex size-11 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white lg:size-9">
              <InstagramIcon className="size-4" />
            </a>
            <a href={pinterestUrl} aria-label="Pinterest" target="_blank" rel="noopener noreferrer" className="flex size-11 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white lg:size-9">
              <PinterestIcon className="size-4" />
            </a>
            <a href={youtubeUrl} aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="flex size-11 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white lg:size-9">
              <YouTubeIcon className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <div className="eyebrow text-white/50">{t(dict.footer.quickLinks, lang)}</div>
          <ul className="mt-3 space-y-1 text-sm text-white/70 lg:space-y-2">
            <li><Link href="/listings" className="inline-flex min-h-10 items-center hover:text-white lg:min-h-0">{t(dict.nav.listings, lang)}</Link></li>
            <li><Link href="/about" className="inline-flex min-h-10 items-center hover:text-white lg:min-h-0">{t(dict.nav.about, lang)}</Link></li>
            <li><Link href="/blog" className="inline-flex min-h-10 items-center hover:text-white lg:min-h-0">{t(dict.nav.blog, lang)}</Link></li>
            <li><Link href="/services" className="inline-flex min-h-10 items-center hover:text-white lg:min-h-0">{t(dict.nav.services, lang)}</Link></li>
            <li><Link href="/home-value" className="inline-flex min-h-10 items-center hover:text-white lg:min-h-0">{lang === "es" ? "Valor de tu casa" : "Home Value"}</Link></li>
            <li><Link href="/contact" className="inline-flex min-h-10 items-center hover:text-white lg:min-h-0">{t(dict.nav.contact, lang)}</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-white/50">{t(dict.footer.serviceAreas, lang)}</div>
          <ul className="mt-3 space-y-1 text-sm text-white/70 lg:space-y-2">
            {siteConfig.serviceAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow text-white/50">{t(dict.footer.contactHeading, lang)}</div>
          <ul className="mt-3 space-y-1 text-sm text-white/70 lg:space-y-2">
            <li><a href={telHref} className="inline-flex min-h-10 items-center hover:text-white lg:min-h-0">{phone}</a></li>
            <li><a href={`mailto:${email}`} className="inline-flex min-h-10 items-center hover:text-white lg:min-h-0">{email}</a></li>
            <li>
              <BrokerageLogo name={brokerageName} className="brightness-0 invert opacity-80" />
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app py-6 flex flex-col gap-4 text-[13px] leading-relaxed text-white/60">
          <p>{t(dict.footer.brokerageLine, lang)}</p>
          <p>{lang === "es" ? "Igualdad de Oportunidad de Vivienda." : "Equal Housing Opportunity."} REALTOR®</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/legal/iabs" className="inline-flex min-h-10 items-center underline underline-offset-2 hover:text-white lg:min-h-0">
              {t(dict.footer.iabs, lang)}
            </Link>
            <Link href="/legal/consumer-protection" className="inline-flex min-h-10 items-center underline underline-offset-2 hover:text-white lg:min-h-0">
              {t(dict.footer.consumerProtection, lang)}
            </Link>
            <Link href="/legal/privacy" className="inline-flex min-h-10 items-center underline underline-offset-2 hover:text-white lg:min-h-0">
              {t(dict.footer.privacy, lang)}
            </Link>
            <Link href="/legal/accessibility" className="inline-flex min-h-10 items-center underline underline-offset-2 hover:text-white lg:min-h-0">
              {t(dict.footer.accessibility, lang)}
            </Link>
          </div>
          <p>TREC License #{licenseNumber}</p>
          <p>© {new Date().getFullYear()} Veronica Medellin. {t(dict.footer.rights, lang)}</p>
        </div>
      </div>
    </footer>
  );
}
