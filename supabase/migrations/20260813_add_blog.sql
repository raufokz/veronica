-- =========================================================
-- BLOG ADDITIONS (idempotent — safe to run as-is on an
-- existing database that already has properties/leads/etc.)
-- Run top to bottom in Supabase Dashboard -> SQL Editor.
-- =========================================================

-- 1. TABLE
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null default '',
  category text check (category in ('market_trends','buying_tips','selling_guide','investment','community')),
  cover_image text,
  tags text[] default '{}',
  status text not null default 'draft' check (status in ('draft','published','scheduled','archived')),
  published_at timestamptz,
  author text default 'Veronica Medellin',
  meta_description text,
  view_count integer not null default 0
);

-- 2. INDEXES
create index if not exists blog_posts_status_idx on public.blog_posts (status) where status in ('published','scheduled');
create index if not exists blog_posts_slug_idx on public.blog_posts (slug);

-- 3. updated_at TRIGGER (reuses set_updated_at if already defined)
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

-- 4. PUBLIC-SAFE VIEW COUNTER (bump view_count only; no other rights)
create or replace function public.increment_blog_view(row_id uuid)
returns void language sql security definer set search_path = public as $$
  update public.blog_posts set view_count = view_count + 1 where id = row_id;
$$;

-- 5. ROW LEVEL SECURITY
alter table public.blog_posts enable row level security;

drop policy if exists "public read published blog posts" on public.blog_posts;
create policy "public read published blog posts"
  on public.blog_posts for select
  using (status in ('published','scheduled') and published_at <= now());

drop policy if exists "authenticated manage blog posts" on public.blog_posts;
create policy "authenticated manage blog posts"
  on public.blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 6. BLOG-IMAGES STORAGE BUCKET
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

drop policy if exists "public read blog-images" on storage.objects;
create policy "public read blog-images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

drop policy if exists "authenticated write blog-images" on storage.objects;
create policy "authenticated write blog-images"
  on storage.objects for insert
  with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');

drop policy if exists "authenticated update blog-images" on storage.objects;
create policy "authenticated update blog-images"
  on storage.objects for update
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

drop policy if exists "authenticated delete blog-images" on storage.objects;
create policy "authenticated delete blog-images"
  on storage.objects for delete
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

-- 7. SEED POSTS (skip any that already exist)
insert into public.blog_posts (title, slug, excerpt, content, category, status, published_at, tags)
values
('What 4% Mortgage Rates Mean for Houston Buyers in 2026',
 'what-mortgage-rates-mean-for-houston-buyers-2026',
 'Rates are down from their peak, but the math is different than 2021. Here is what the numbers actually look like for Clear Lake and Bay Area buyers this year.',
 E'Rates have come down meaningfully from their 2023 peak, and that changes the conversation for Houston buyers.\n\n## What the rate change actually buys you\n\nOn a $350,000 home with 20% down at 4% interest, the monthly principal and interest payment is about $1,337. At 6.5% — where rates sat through much of 2024 — that same home costs about $1,769 a month. That difference is roughly $430 a month, or over $150,000 in interest across a 30-year loan.\n\nFor buyers in Clear Lake, League City, and Friendswood, that payment gap is what separates a starter home from a forever home in the same neighborhood.\n\n## Why Houston still favors buyers\n\nHouston did not see the same price spikes as coastal markets, which means prices stayed more grounded. Combined with falling rates, that keeps several Bay Area neighborhoods firmly in reach.\n\n- Clear Lake: strong inventory of 3–4 bedroom homes near the water\n- League City: newer construction with community amenities\n- Friendswood: established neighborhoods with good schools\n\n## The takeaway\n\nIf you are pre-approved and ready, this is a more favorable window than buyers have seen in several years. Financing details change month to month, so the best first step is a pre-approval conversation.',
 'market_trends', 'published', now(), ARRAY['mortgage rates','Clear Lake','2026 market']),
('8 Questions to Ask Before Making an Offer on a Houston Home',
 'questions-to-ask-before-making-an-offer-houston',
 'Beyond the asking price, the best offers are built on a few sharp questions. Bring these to every showing.',
 E'When you are standing in a home you love, it is easy to fall in love with the staging and forget the questions that protect you later. Here are the eight I ask on behalf of every buyer.\n\n## 1. Why is the seller moving?\n\nA relocation tells you something different than a divorce or an estate sale. The answer shapes how much room there is in the price.\n\n## 2. How long has it been on the market?\n\nDays on market tells you whether you are competing with other buyers or whether you have negotiating room.\n\n## 3. What repairs has the seller already done?\n\nNew roof? Updated electrical? The condition report tells you what is left to worry about.\n\n## 4. How old are the big-ticket systems?\n\nHVAC, water heater, and foundation — the expensive stuff — are where your inspection contingency earns its keep.\n\n## 5. What are the HOA rules and fees?\n\nHouston-area HOAs vary wildly. Read the docs before you commit, not after.\n\n## 6. What do the comps actually say?\n\nNot what the list agent says they say. What closed nearby in the last 90 days.\n\n## 7. Are there any known issues to disclose?\n\nTexas sellers are required to disclose known defects. Ask directly and get it in writing.\n\n## 8. What will my total cost be?\n\nPurchase price, closing costs, taxes, insurance, and any immediate repairs. The monthly number matters more than the sticker.\n\nGet these answered before your offer goes in, and you will be negotiating from facts instead of hope.',
 'buying_tips', 'published', now() - interval '1 week', ARRAY['buying tips','offers','Houston']),
('Pricing Your Houston Home to Sell: The First 30 Days Matter Most',
 'pricing-your-houston-home-first-30-days',
 'The first two weeks on the market set the ceiling for your sale price. Here is how to get the launch right.',
 E'The first two weeks on the market set the ceiling for your sale price.\n\n## The three pricing zones\n\n- Priced right: strong showings in the first week, multiple offers, closes at or above asking\n- Priced high: showings slow after the second week, offers come in low, price gets cut\n- Priced low: fast sale, but you may have left money on the table\n\n## How I price a Clear Lake listing\n\nI pull every closed comp in your neighborhood from the last 90 days, adjust for condition and upgrades, and factor in what buyers are actually paying. Then we set a price that generates traffic — because traffic is what creates competition.\n\n## Why the first two weeks matter\n\nMost buyers see a listing in its first two weeks. That is your window to get the widest audience and the strongest offers. A home that sits loses momentum, and buyers start asking what is wrong with it.\n\nIf you are thinking about selling in 2026, the conversation starts with a pricing strategy, not a listing date.',
 'selling_guide', 'published', now() - interval '2 weeks', ARRAY['selling','pricing','Clear Lake'])
on conflict (slug) do nothing;
