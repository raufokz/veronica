# SEO Audit Report — veronicasellshouston.com
**Prepared:** 2026-08-22 · **Method:** Full source-code audit (Next.js 15.5.23 App Router repo) + live crawl of sitemap.xml, robots.txt, and homepage HTML. Google Search Console, Google Business Profile, Bing Webmaster Tools, and rank-tracking data were **not accessible** in this session — see "Access Needed" at the end.

---

## 🚩 Flag before anything else: outbound links to a third-party domain in "your" content

8 of the 10 seeded blog posts (`supabase/migrations/20260821000000_seed_blogs.sql`) are generic, non-Houston-specific filler copy that repeatedly links out to **`domesticrealestate.us`** — a domain that is not Veronica's. Examples, verbatim from the seed file:

- `<a href="https://www.domesticrealestate.us/agents/veronica-medellin">Find a Realtor</a>` (post: *real-estate-for-sale*, line 47)
- `<a href="https://domesticrealestate.us/properties">Browse Real Estate for Sale</a>` (multiple posts)
- Every post's closing CTA block links to `domesticrealestate.us/properties`, `/agents/veronica-medellin`, or `/contact` instead of this site's own `/listings`, `/about`, or `/contact`.

This means the site is currently sending its own visitors — and passing SEO link equity — to an outside domain, under a URL path that implies it's *her* profile there. This reads like AI-generated/templated content pulled from (or written for) a different property, with a find-and-replace of the author name that missed the outbound links. **I have not visited that domain and can't tell you what it is or who controls it.** Before I touch a single line of blog content, please confirm: do you recognize `domesticrealestate.us`, and did Veronica or her brokerage ever have a relationship with it? This determines whether the fix is "delete the links" or something that needs a conversation with whoever supplied this content.

Independent of what that domain turns out to be, this content also fails Rule #2 (zero thin/AI-filler content) outright — it's covered in detail in the Duplicate Content section below.

---

## 1. Site inventory (live sitemap.xml, 29 URLs)

| # | URL | Notes |
|---|-----|-------|
| 1 | `/` | Homepage |
| 2 | `/listings` | Listing search |
| 3 | `/listings/14244-oak-chase-dr-houston-tx` | Only 1 live listing |
| 4 | `/about` | |
| 5 | `/services` | |
| 6 | `/services/sell-your-home` | |
| 7 | `/services/buy-a-home` | |
| 8 | `/home-value` | |
| 9 | `/neighborhoods` | Index |
| 10–12 | `/neighborhoods/{galleria,sugar-land,university}` | **Only 3 area pages exist** — the brief lists 25+ target areas and 10+ target ZIPs, none of which have pages yet |
| 13 | `/blog` | Index |
| 14–23 | `/blog/{10 slugs}` | See duplicate-content section — 8 of 10 are generic filler |
| 24 | `/contact` | |
| 25 | `/es` | **Only Spanish URL on the entire site** |
| 26–29 | `/legal/{iabs,consumer-protection,privacy,accessibility}` | |

**robots.txt** (live, correct):
```
User-Agent: *
Allow: /
Disallow: /admin
Sitemap: https://veronicasellshouston.com/sitemap.xml
```
No orphaned disallows, no crawl-blocking issues.

**Sitemap generation bug:** `app/sitemap.ts:31-57` sets `lastModified: new Date()` for every entry at request time — the live sitemap confirms every URL shares the same fetch-time timestamp. This is meaningless to Google (it looks like everything changed simultaneously, every time the sitemap is requested) and should be replaced with real content dates once pages track `updated_at`.

No 404s found in the current 29 URLs. No `app/not-found.tsx` exists, so visitors hitting a bad URL get Next.js's unstyled default 404 (Rule requires "clean 404 page").

---

## 2. The bilingual architecture doesn't do what the brief needs — this is the biggest structural finding

The site does **not** use separate URLs per language for anything except the homepage. `LanguageProvider` (`lib/language-context.tsx`) stores the visitor's language in a client-side cookie and every component (`about-content.tsx`, `neighborhood-detail-content.tsx`, `sell-content.tsx`, `FaqSection`, etc.) reads `useLanguage()` and swaps text in place, all under the **same URL**, all marked `"use client"`.

Concretely:
- Googlebot doesn't carry your visitor cookies. It will always render the English string on every dual-language component.
- There is no `/es/about`, `/es/services`, `/es/neighborhoods/sugar-land`, etc. — **only `/es` (the homepage) exists as a real, crawlable Spanish URL.**
- `hreflang` alternates are only wired up on `/` and `/es` (`app/layout.tsx:50`, `app/es/page.tsx:8-11`). Every other page has no `alternates.languages` at all.
- The FAQPage JSON-LD emitted by `components/faq-section.tsx:23-31` hardcodes `item.q.en` / `item.a.en` regardless of which language is displayed — so even where Spanish FAQ *text* exists, the structured data never reflects it.

**Why this matters for the brief:** Rule #3 requires "every new page gets a TRUE Spanish mirror... with correct hreflang en/es." That's impossible to satisfy by extension of the current pattern — toggling text on one URL is not a mirror page and cannot carry hreflang. Phase 2/3 needs an explicit decision on URL structure (e.g., `/es/...` route mirrors, using Next's `[lang]` segment or a parallel `/es` tree) before any new bilingual page gets built, or every page we add this month will need to be redone.

---

## 3. On-page audit, page by page

| Page | Title | Meta description | Canonical | hreflang | JSON-LD | H1 |
|---|---|---|---|---|---|---|
| `/` | ✅ unique, keyword-relevant | ✅ | ✅ `/` | ✅ en/es | ✅ `RealEstateAgent` | ✅ |
| `/about` | ✅ unique | ✅ | ✅ | ❌ | ❌ **none** — no Person/RealEstateAgent schema despite being the bio page | ✅ (needs confirming casing/format) |
| `/services` | ⚠️ generic ("Services", no location/keyword) | ✅ | ✅ | ❌ | ❌ | ✅ |
| `/services/sell-your-home` | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| `/services/buy-a-home` | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| `/home-value` | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| `/neighborhoods` | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| `/neighborhoods/[slug]` (×3) | ✅ dynamic, good | ✅ dynamic | ✅ | ❌ | ❌ **no Place/LocalBusiness schema at all** | ✅ |
| `/contact` | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (`headingLevel="h1"` prop confirmed) |
| `/listings` | ✅ | ✅ | ✅ | ❌ | ❌ (index has none; detail pages do) | ✅ |
| `/listings/[slug]` | ✅ dynamic | ✅ dynamic | ✅ | ❌ | ✅ `RealEstateListing` w/ `Offer` — well built, embedded Google Map iframe present | ✅ |
| `/blog` | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| `/blog/[slug]` | ✅ dynamic (falls back to post title) | ✅ dynamic | ✅ | ❌ | ✅ `BlogPosting` — but see gaps below | ✅ |
| `/es` | ✅ | ✅ | ✅ | ✅ (only page besides `/`) | ❌ no schema | need to verify |
| `/legal/*` (×4) | ✅ generic but fine for legal pages | ✅ | ✅ | ❌ | ❌ (fine, not needed) | assume ✅ |

**Open Graph image is broken sitewide.** `app/layout.tsx:57` sets `images: [{ url: "/og-image.jpg" }]`, but no `og-image.jpg` exists anywhere in `public/`. Every link share (Facebook, iMessage, LinkedIn, Slack, WhatsApp) currently shows a blank/broken preview image. Confirmed live: `https://www.veronicasellshouston.com/og-image.jpg` → 404. This is a same-day fix once you supply or approve a branded image.

**Canonical tag points at a URL that redirects away from itself — verified live.** `siteConfig.siteUrl` (`lib/site-config.ts:13`) is the bare domain `https://veronicasellshouston.com` (no `www`), and every page's canonical is built from it. But the live site actually serves from `www`: `curl -I https://veronicasellshouston.com/` returns `308 Permanent Redirect` → `https://www.veronicasellshouston.com/`. So every canonical tag site-wide points at a URL that itself redirects elsewhere, instead of pointing at the final `www` destination. This is a real canonicalization defect Google Search Console will likely flag ("Alternate page with proper canonical tag" / redirect-canonical conflicts) — fix by setting `siteConfig.siteUrl`/`NEXT_PUBLIC_SITE_URL` to the `www` form (or making `www` the redirect target of bare domain consistently, which it already is, and just fixing the canonical source).

**Missing mobile/PWA icons.** Only `public/favicon.ico` exists — no `apple-touch-icon.png`, no `site.webmanifest`. Minor, but easy to bundle with the OG image fix.

**Breadcrumb JSON-LD** (`components/breadcrumb-jsonld.tsx`) is a client component (`"use client"`) that derives labels by title-casing the URL slug — so it never breaks, but it also can't produce a real title for e.g. a blog post (it would render "Real Estate For Sale" instead of the actual post title, which happens to match here but won't for future slugs like `77478-homes-for-sale`). Low risk today, will misfire on future pages if not fixed.

**Alt text:** all public-facing images go through `next/image` (raw `<img>` only appears in admin-only components — no public SEO exposure). `Gallery` component passes `alt={`${address}, ${city}`}` — descriptive, good. Blog cover images use `alt={post.title}` — acceptable. No sitewide gaps found in what's live today; this will need re-checking as new area pages get built with new photography.

---

## 4. Structured data audit

| Schema type | Where present | Gaps |
|---|---|---|
| `RealEstateAgent` | Homepage only (`app/page.tsx:14-37`) | Missing from `/about` entirely. No `LocalBusiness` type alongside it. `image` points to `/veronica.jpg` (exists in `public/`, verified). |
| `RealEstateListing` + `Offer` | Every listing detail page | Solid. No `AggregateRating`/review schema on listings. |
| `BlogPosting` | Every blog post | `author` is `Person` with no `image`, no `jobTitle`, no license number — fails the brief's E-E-A-T requirement. `publisher` is typed `Person` (schema.org convention is `Organization` with a `logo` for publisher) — Rich Results Test will likely warn here. **Also: every blog post renders two `<h1>` tags** — `app/blog/[slug]/page.tsx` renders `<h1>{post.title}</h1>` in JSX, and every seeded post's `content` field *also* opens with its own `<h1>...</h1>` that gets rendered again via `dangerouslySetInnerHTML` in `blog-content-renderer.tsx`. Duplicate H1s on every post — needs stripping the leading `<h1>` from stored content when the consolidation/cleanup happens. |
| `BreadcrumbList` | Sitewide via layout, client-rendered | Generic slug-derived labels (see above) |
| `FAQPage` | Homepage, neighborhood pages (2 FAQs each — brief wants 3–5), wherever `FaqSection` is used | English-only in the JSON-LD regardless of displayed language |
| `Article` | **Not present anywhere** — brief specifically asks for `Article` on blog posts; current type is `BlogPosting` (a valid, closely related type, but worth deciding deliberately rather than by accident) | |

None of this has been run through Google's Rich Results Test yet — recommend doing that for one page per template once Phase 2 fixes land, since I can't call that tool from here.

---

## 5. Duplicate / thin content — the 4 "near me" posts, and the other 6

You flagged 4 posts as suspected near-duplicates. Having read the actual seed content, the problem is broader and worse than near-duplication:

| Slug | Word count (est.) | Verdict |
|---|---|---|
| `real-estate-for-sale` | ~430 | Generic national template. 3 outbound links to `domesticrealestate.us`. Zero Houston/Galleria/Sugar Land mentions. |
| `homes-for-sale-near-me` | ~260 | Same template skeleton as above (lead → numbered "how to search" list → filters list → 2 FAQs → CTA block). 2 outbound links to `domesticrealestate.us`. |
| `houses-for-sale-near-me` | ~250 | Same skeleton again, house-vs-condo-vs-townhome swapped in as the "unique" section. 3 outbound links. |
| `real-estate-near-me` | ~230 | Same skeleton a fourth time. 2 outbound links. |
| `apartments-for-rent` | ~260 | Off-topic for a buy/sell REALTOR® site (Veronica doesn't do rentals per the brief) — same template, 2 outbound links |
| `first-time-home-buyer` | ~350 | Generic but on-topic; no Houston specifics, no outbound-domain links — best of the batch |
| `sell-your-home-fast` | ~260 | Generic but on-topic; no outbound links |
| `mortgage-rates-guide` | ~280 | Generic; no outbound links |
| `investment-properties-guide` | ~300 | Generic; no outbound links |
| `clear-lake-neighborhood-guide` | ~350 | **The only genuinely localized post** — real ISD name, real landmarks (NASA JSC, Ellington). Still has 3 `domesticrealestate.us` links to strip, but the underlying content is legitimate and reusable as a template for future area guides. |

**Recommendation:** don't try to "differentiate" the 4 near-me posts in place — they share one templated skeleton and target overlapping intent (all four are essentially "how do I search for X near me"). Consolidate into **one** genuinely useful, Houston-specific post — e.g. *"Homes for Sale Near Me in Houston: How to Actually Narrow It Down by Neighborhood"* — and 301-redirect the other three slugs to it. `apartments-for-rent` should be removed or redirected to `/contact` since it's off-mission (Veronica doesn't handle rentals per the site's own positioning). The remaining 5 posts (buyer guide, sell-fast, mortgage, investment, Clear Lake) are keepable after: removing every `domesticrealestate.us` link, adding a Houston-specific data point or two, and adding the E-E-A-T author box. None of the 10 current posts meets the 900+ word target in Rule/Phase 4.

---

## 6. Technical / infrastructure

- **Next.js 15.5.23**, App Router — current, no framework-level blocker.
- `next.config.ts` — image `remotePatterns` cover Unsplash + Supabase storage only; fine for current media. No custom `redirects()`/`headers()` configured — there's nowhere yet to attach 301s for retired blog slugs (needed once the near-me consolidation happens).
- `vercel.json` is minimal (`framework: nextjs` only) — no conflicts, nothing to fix.
- **GA4** (`G-FJFQBY04NL`) and **Microsoft Clarity** are both live in `app/layout.tsx` / `components/clarity-analytics.tsx` — loaded once each, no duplication found.
- **Compliance contradiction:** `app/legal/privacy/page.tsx:34-39` states *"This site does not currently use analytics tools or advertising pixels."* That's false as of today — GA4 and Clarity are both firing sitewide. This is a legal-content bug, not narrowly an SEO one, but it's a factual misstatement on a live legal page and should be corrected alongside the SEO fixes.
- `lib/site-config.ts:1-2` carries a standing code comment: *"several of these are unverified per the brief's Part 12 checklist. Confirm with Veronica / HomeSmart compliance before launch."* — worth resolving so NAP data (phone, email, license) that feeds every schema block is known-correct before Phase 5 citation work uses it as the source of truth.
- No `app/not-found.tsx` — default unbranded 404.

---

## 7. Core Web Vitals

I don't have a way to run Lighthouse/PSI/CrUX from this session, so I can't give you real LCP/INP/CLS numbers — that needs either PageSpeed Insights, Search Console's Core Web Vitals report, or a local Lighthouse run. What I *can* confirm from source:
- Fonts use `next/font/google` with `display: "swap"` — good, avoids invisible-text flash.
- Images go through `next/image` with explicit `sizes` on the ones I checked (blog cover, gallery) — good.
- Homepage hero and several other client components are marked `"use client"` — not inherently a CWV problem, but worth checking bundle size once we have real numbers.
- No obvious render-blocking script issues in `layout.tsx` (GA/Clarity both load `afterInteractive` / async-style, not blocking).

**Recommendation:** once you grant PageSpeed Insights / GSC access (see below), I'll pull real mobile+desktop numbers for home, a listing, a neighborhood page, and a blog post before Phase 2 starts, so the CWV fixes target actual bottlenecks instead of guesses.

---

## 8. Access needed before I can complete Phase 1 fully / start Phase 2–5

The brief's context block left this blank, and I don't have it yet:

1. **Google Search Console** — index coverage, sitemap submission status, manual actions, current performance (impressions/clicks/queries). Either add me/this tool as a user on the property, or export the Coverage, Performance, and Sitemaps reports and share them.
2. **Google Business Profile** — current category, service areas, photo count, review count/rating, post history. Share owner/manager access or a read-only export.
3. **Bing Webmaster Tools** — is the site even submitted? Unknown until verified.
4. **PageSpeed Insights / real CWV data** — can be pulled without login (just needs the live URL), so I can attempt this in Phase 2 directly against the deployed pages.
5. **Analytics** — confirm GA4 property access if you want real traffic baselines in the 30/60/90-day tracking deliverable.
6. **NAP citation sources** — Facebook, Instagram, LinkedIn (URLs already in `lib/site-config.ts`), plus Zillow, Realtor.com, Yelp, BBB profile URLs if they exist, so I can diff them for consistency in Phase 5.
7. Confirmation on the `domesticrealestate.us` question above.

---

## 9. Prioritized issue list

**P0 — fix before anything else ships**
1. Resolve the `domesticrealestate.us` outbound-link content (needs your input first — see flag at top).
2. Add the missing `/public/og-image.jpg` (or update the path) — broken social sharing sitewide.
3. Fix canonical URLs to point at `www` (the domain that actually serves the site) instead of the bare domain, which just 308-redirects to `www` — verified live.
4. Decide the bilingual URL architecture (e.g. `/es/...` mirrored routes) before building any new page this task calls for — every subsequent phase depends on this.
5. Correct the false "no analytics" claim on `/legal/privacy`.
6. Merge/redirect the 4 near-me posts + drop or redirect `apartments-for-rent`.

**P1 — high-impact, do in Phase 2**
7. Add `RealEstateAgent`/`Person` schema to `/about`.
8. Add `Place`/`LocalBusiness` schema + real "as of [date]" sourced market data to the 3 existing neighborhood pages (currently a hardcoded single number with no date shown on-page).
9. Fix `BlogPosting` publisher to `Organization` + give author schema a photo/jobTitle/license.
10. Strip the duplicate `<h1>` that every blog post currently renders twice (once from the template, once from stored content).
11. Wire real `hreflang` alternates onto every page once the URL architecture is decided.
12. Fix sitemap `lastModified` to use real content dates.
13. Resolve the "unverified NAP fields" flag in `lib/site-config.ts` with Veronica before Phase 5 citation work.
14. Build `app/not-found.tsx`.

**P2 — do alongside expansion work**
15. Server-render breadcrumb JSON-LD (or at least give it real page titles instead of slug-derived guesses) instead of client-only.
16. Localize FAQPage JSON-LD answers to match displayed language.
17. Give `/services` a more specific title than "Services".
18. Add `redirects()` config in `next.config.ts` once the blog consolidation creates URLs that need 301s.
19. Add `apple-touch-icon.png` and `site.webmanifest` for mobile/PWA icon coverage.

---

## What I did *not* do
Per Rule #1, no code or content has been changed. Nothing has been deployed, redirected, merged, or deleted. This report is read-only findings.

## Recommended next step
Your call on scope, but I'd suggest: you resolve the `domesticrealestate.us` question and grant/share whatever GSC/GBP access you can, I fix the P0 items (2, 4, 5 don't need your input; 1 and 3 do), and then we scope Phase 3's page list together — 25+ area pages + 10+ ZIP pages + Spanish mirrors for all of it is a large build and worth sequencing (e.g. ship the top 5–8 highest-intent areas first, not all 25+ at once) rather than committing to write all of it before any of it is live and indexing.
