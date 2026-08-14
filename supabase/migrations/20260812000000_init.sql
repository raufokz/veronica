-- =========================================================
-- 00 INIT — baseline schema (tables, RLS, triggers) + storage buckets.
-- This file is the consolidation of the original supabase/schema.sql
-- and supabase/storage.sql, which were applied by hand in the
-- Supabase SQL Editor before migrations were wired into CI.
-- =========================================================

-- =========================================================
-- Veronica Medellin site — schema
-- Run in Supabase Dashboard -> SQL Editor, top to bottom.
-- =========================================================

-- =========================================================
-- 1. TABLES
-- =========================================================

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text unique not null,
  title text not null,
  description text,
  price numeric(12,2) not null,
  address text not null,
  city text default 'Houston',
  state text default 'TX',
  zip_code text,
  neighborhood text,
  bedrooms integer,
  bathrooms numeric(3,1),
  square_feet integer,
  lot_size text,
  year_built integer,
  property_type text check (property_type in ('house','condo','townhouse','land','commercial')),
  status text not null default 'active' check (status in ('active','pending','sold','coming_soon')),
  images text[] default '{}',
  virtual_tour_url text,
  amenities text[] default '{}',
  mls_number text,
  featured boolean default false,
  published boolean default true
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  interest_type text check (interest_type in ('buying','selling','investing','valuation','other')),
  property_id uuid references public.properties(id) on delete set null,
  message text,
  preferred_language text default 'en' check (preferred_language in ('en','es')),
  source_page text,
  status text not null default 'new' check (status in ('new','contacted','nurturing','closed','archived')),
  notes text
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  client_name text not null,
  client_location text,
  content text not null,
  rating integer check (rating between 1 and 5),
  transaction_type text,
  is_featured boolean default false,
  is_published boolean default true
);

create table public.neighborhoods (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  slug text unique not null,
  name text not null,
  headline text,
  body_md text,
  hero_image text,
  median_price numeric(12,2),
  highlights text[] default '{}',
  published boolean default true
);

create table public.blog_posts (
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

-- =========================================================
-- 2. INDEXES
-- =========================================================

create index properties_status_idx      on public.properties (status) where published = true;
create index properties_featured_idx    on public.properties (featured) where published = true;
create index properties_slug_idx        on public.properties (slug);
create index properties_neighborhood_idx on public.properties (neighborhood);
create index leads_created_at_idx       on public.leads (created_at desc);
create index blog_posts_status_idx      on public.blog_posts (status) where status in ('published','scheduled');
create index blog_posts_slug_idx        on public.blog_posts (slug);

-- =========================================================
-- 3. updated_at TRIGGER
-- =========================================================

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger properties_set_updated_at
before update on public.properties
for each row execute function public.set_updated_at();

create trigger blog_posts_set_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

-- Public-safe view counter: anonymous visitors may bump the count, nothing else.
create or replace function public.increment_blog_view(row_id uuid)
returns void language sql security definer set search_path = public as $$
  update public.blog_posts set view_count = view_count + 1 where id = row_id;
$$;

-- =========================================================
-- 4. ROW LEVEL SECURITY (after tables exist)
-- =========================================================

alter table public.properties    enable row level security;
alter table public.leads         enable row level security;
alter table public.testimonials  enable row level security;
alter table public.neighborhoods enable row level security;
alter table public.blog_posts    enable row level security;

-- Public read of published marketing content
create policy "public read published properties"
  on public.properties for select
  using (published = true);

create policy "public read published testimonials"
  on public.testimonials for select
  using (is_published = true);

create policy "public read published neighborhoods"
  on public.neighborhoods for select
  using (published = true);

-- Published (or scheduled-but-due) posts are public; drafts never leak
create policy "public read published blog posts"
  on public.blog_posts for select
  using (status in ('published','scheduled') and published_at <= now());

-- Authenticated (Veronica) manages all posts
create policy "authenticated manage blog posts"
  on public.blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Anyone may submit a lead; nobody anonymous may read them
create policy "anyone can submit a lead"
  on public.leads for insert
  with check (true);

create policy "authenticated can read leads"
  on public.leads for select
  using (auth.role() = 'authenticated');

create policy "authenticated can update leads"
  on public.leads for update
  using (auth.role() = 'authenticated');

-- Authenticated (Veronica) manages listings
create policy "authenticated manage properties"
  on public.properties for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- =========================================================
-- 5. SEED DATA
-- =========================================================

insert into public.testimonials (client_name, content, rating, transaction_type, is_featured) values
('Lilian Pastor', 'Veronica was a pleasure to work with. She made the home-buying process straightforward and enjoyable. We found our dream home thanks to her expertise!', 5, 'Home purchase', true),
('Michelle L.', 'Veronica''s professionalism and dedication were evident throughout the sale of our home. She exceeded our expectations in every way.', 5, 'Home sale', true);

insert into public.properties (slug, title, description, price, address, city, neighborhood, bedrooms, bathrooms, square_feet, property_type, status, featured, images) values
('bay-area-blvd-clear-lake', 'Family Home in Clear Lake', 'Four bedrooms, an open kitchen that actually fits a crowd, and a backyard big enough for the dog and the grill.', 450000, '123 Bay Area Blvd', 'Houston', 'Clear Lake', 4, 2.5, 2800, 'house', 'active', true, ARRAY['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200']),
('main-street-downtown-condo', 'Downtown Condo with Skyline Views', 'Floor-to-ceiling glass, a concierge who knows your name, and a ten-minute walk to the Theater District.', 650000, '456 Main Street', 'Houston', 'Downtown', 2, 2, 1500, 'condo', 'active', true, ARRAY['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200']),
('nasa-parkway-townhouse', 'Renovated Townhouse Near NASA', 'Built for the Space Center commute. New HVAC, new appliances, low maintenance.', 320000, '789 NASA Parkway', 'Houston', 'Clear Lake', 3, 2.5, 1900, 'townhouse', 'active', false, ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200']);

insert into public.blog_posts (title, slug, excerpt, content, category, status, published_at, tags) values
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
 E'Almost every pricing mistake is visible in the first 30 days.\n\n## The three pricing zones\n\n- Priced right: strong showings in the first week, multiple offers, closes at or above asking\n- Priced high: showings slow after the second week, offers come in low, price gets cut\n- Priced low: fast sale, but you may have left money on the table\n\n## How I price a Clear Lake listing\n\nI pull every closed comp in your neighborhood from the last 90 days, adjust for condition and upgrades, and factor in what buyers are actually paying. Then we set a price that generates traffic — because traffic is what creates competition.\n\n## Why the first two weeks matter\n\nMost buyers see a listing in its first two weeks. That is your window to get the widest audience and the strongest offers. A home that sits loses momentum, and buyers start asking what is wrong with it.\n\nIf you are thinking about selling in 2026, the conversation starts with a pricing strategy, not a listing date.',
 'selling_guide', 'published', now() - interval '2 weeks', ARRAY['selling','pricing','Clear Lake']);


-- =========================================================
-- STORAGE BUCKETS
-- =========================================================

-- Storage bucket for property listing photos
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

create policy "public read property-images"
  on storage.objects for select
  using (bucket_id = 'property-images');

create policy "authenticated write property-images"
  on storage.objects for insert
  with check (bucket_id = 'property-images' and auth.role() = 'authenticated');

create policy "authenticated update property-images"
  on storage.objects for update
  using (bucket_id = 'property-images' and auth.role() = 'authenticated');

create policy "authenticated delete property-images"
  on storage.objects for delete
  using (bucket_id = 'property-images' and auth.role() = 'authenticated');

-- Storage bucket for blog post cover images
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

create policy "public read blog-images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

create policy "authenticated write blog-images"
  on storage.objects for insert
  with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');

create policy "authenticated update blog-images"
  on storage.objects for update
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

create policy "authenticated delete blog-images"
  on storage.objects for delete
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');
