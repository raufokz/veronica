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

-- =========================================================
-- 2. INDEXES
-- =========================================================

create index properties_status_idx      on public.properties (status) where published = true;
create index properties_featured_idx    on public.properties (featured) where published = true;
create index properties_slug_idx        on public.properties (slug);
create index properties_neighborhood_idx on public.properties (neighborhood);
create index leads_created_at_idx       on public.leads (created_at desc);

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

-- =========================================================
-- 4. ROW LEVEL SECURITY (after tables exist)
-- =========================================================

alter table public.properties    enable row level security;
alter table public.leads         enable row level security;
alter table public.testimonials  enable row level security;
alter table public.neighborhoods enable row level security;

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
