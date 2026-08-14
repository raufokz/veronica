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
          <div className="mt-4 flex gap-3">
            <a href={facebookUrl} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">
              <FacebookIcon className="size-4" />
            </a>
            <a href={instagramUrl} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">
              <InstagramIcon className="size-4" />
            </a>
            <a href={pinterestUrl} aria-label="Pinterest" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">
              <PinterestIcon className="size-4" />
            </a>
            <a href={youtubeUrl} aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">
              <YouTubeIcon className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <div className="eyebrow text-white/50">{t(dict.footer.quickLinks, lang)}</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><Link href="/listings" className="hover:text-white">{t(dict.nav.listings, lang)}</Link></li>
            <li><Link href="/about" className="hover:text-white">{t(dict.nav.about, lang)}</Link></li>
            <li><Link href="/blog" className="hover:text-white">{t(dict.nav.blog, lang)}</Link></li>
            <li><Link href="/services" className="hover:text-white">{t(dict.nav.services, lang)}</Link></li>
            <li><Link href="/home-value" className="hover:text-white">{lang === "es" ? "Valor de tu casa" : "Home Value"}</Link></li>
            <li><Link href="/contact" className="hover:text-white">{t(dict.nav.contact, lang)}</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-white/50">{t(dict.footer.serviceAreas, lang)}</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {siteConfig.serviceAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow text-white/50">{t(dict.footer.contactHeading, lang)}</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><a href={telHref} className="hover:text-white">{phone}</a></li>
            <li><a href={`mailto:${email}`} className="hover:text-white">{email}</a></li>
            <li>
              <BrokerageLogo name={brokerageName} className="brightness-0 invert opacity-80" />
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app py-6 flex flex-col gap-4 text-xs text-white/60">
          <p>{t(dict.footer.brokerageLine, lang)}</p>
          <p>{lang === "es" ? "Igualdad de Oportunidad de Vivienda." : "Equal Housing Opportunity."} REALTOR®</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/legal/iabs" className="hover:text-white underline underline-offset-2">
              {t(dict.footer.iabs, lang)}
            </Link>
            <Link href="/legal/consumer-protection" className="hover:text-white underline underline-offset-2">
              {t(dict.footer.consumerProtection, lang)}
            </Link>
            <Link href="/legal/privacy" className="hover:text-white underline underline-offset-2">
              {t(dict.footer.privacy, lang)}
            </Link>
            <Link href="/legal/accessibility" className="hover:text-white underline underline-offset-2">
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
