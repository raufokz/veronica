-- =========================================================
-- PHASE 2 — CRM & Admin enhancements (idempotent migration)
-- Adds: richer lead statuses, lead_notes, activity_logs,
-- appointments, site_settings. Safe to re-run.
-- Run top to bottom in Supabase Dashboard -> SQL Editor.
-- =========================================================

-- 1. EXTEND LEAD STATUSES (new | contacted | qualified | showing_scheduled
--    | offer_made | closed_won | closed_lost | archived)
update public.leads set status = 'qualified'   where status = 'nurturing';
update public.leads set status = 'closed_won'  where status = 'closed';

-- Drop any auto-named check constraint on the leads status column, then re-add.
do $$
declare
  con record;
begin
  for con in
    select conname from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'leads'
      and c.contype = 'c' and c.conkey::int[] = (select array_agg(a.attnum) from pg_attribute a where a.attrelid = c.conrelid and a.attname = 'status')
  loop
    execute format('alter table public.leads drop constraint %I', con.conname);
  end loop;
end $$;

alter table public.leads add constraint leads_status_check check (
  status in ('new','contacted','qualified','showing_scheduled','offer_made','closed_won','closed_lost','archived')
);

-- 2. LEAD NOTES (conversation history per lead)
create table if not exists public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  note text not null,
  created_by uuid,               -- auth.users id; nullable for simplicity
  created_at timestamptz not null default now()
);

create index if not exists lead_notes_lead_id_idx on public.lead_notes (lead_id desc, created_at desc);

alter table public.lead_notes enable row level security;

drop policy if exists "authenticated read lead notes" on public.lead_notes;
create policy "authenticated read lead notes"
  on public.lead_notes for select
  using (auth.role() = 'authenticated');

drop policy if exists "authenticated write lead notes" on public.lead_notes;
create policy "authenticated write lead notes"
  on public.lead_notes for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "authenticated delete lead notes" on public.lead_notes;
create policy "authenticated delete lead notes"
  on public.lead_notes for delete
  using (auth.role() = 'authenticated');

-- 3. ACTIVITY LOG (audit trail for admin)
create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid,
  action text not null,          -- created | updated | deleted | status_changed | note_added | login
  entity_type text not null,     -- lead | property | blog_post | testimonial | appointment | setting
  entity_id uuid,
  details jsonb,
  ip_address text
);

create index if not exists activity_logs_created_at_idx on public.activity_logs (created_at desc);

alter table public.activity_logs enable row level security;

drop policy if exists "authenticated read activity logs" on public.activity_logs;
create policy "authenticated read activity logs"
  on public.activity_logs for select
  using (auth.role() = 'authenticated');

drop policy if exists "authenticated write activity logs" on public.activity_logs;
create policy "authenticated write activity logs"
  on public.activity_logs for insert
  with check (auth.role() = 'authenticated');

-- 4. APPOINTMENTS / SHOWINGS
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid references public.leads(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  client_name text not null,
  client_email text,
  client_phone text,
  appointment_date date not null,
  appointment_time time not null,
  duration_minutes integer not null default 60,
  appointment_type text check (appointment_type in ('showing','open_house','consultation','closing')),
  notes text,
  status text not null default 'scheduled' check (status in ('scheduled','confirmed','completed','cancelled','no_show')),
  timezone text not null default 'America/Chicago',
  reminder_sent boolean not null default false,
  client_confirmed boolean not null default false
);

create index if not exists appointments_date_idx on public.appointments (appointment_date);
create index if not exists appointments_lead_idx on public.appointments (lead_id);

alter table public.appointments enable row level security;

drop policy if exists "authenticated read appointments" on public.appointments;
create policy "authenticated read appointments"
  on public.appointments for select
  using (auth.role() = 'authenticated');

drop policy if exists "authenticated write appointments" on public.appointments;
create policy "authenticated write appointments"
  on public.appointments for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "authenticated update appointments" on public.appointments;
create policy "authenticated update appointments"
  on public.appointments for update
  using (auth.role() = 'authenticated');

drop policy if exists "authenticated delete appointments" on public.appointments;
create policy "authenticated delete appointments"
  on public.appointments for delete
  using (auth.role() = 'authenticated');

-- 5. SITE SETTINGS (single row, id = 1)
create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  site_title text default 'Veronica Medellin | Houston REALTOR®',
  site_description text,
  contact_phone text default '(713) 922-8340',
  contact_email text default 'varonicamedellin@gmail.com',
  contact_address text,
  facebook_url text,
  instagram_url text,
  pinterest_url text,
  youtube_url text,
  hero_headline text,
  hero_subtitle text,
  hero_cta_primary text,
  hero_cta_secondary text,
  license_number text default '0614869',
  mls_id text default '86981801',
  brokerage_name text default 'HomeSmart',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "public read site settings" on public.site_settings;
create policy "public read site settings"
  on public.site_settings for select
  using (true);

drop policy if exists "authenticated update site settings" on public.site_settings;
create policy "authenticated update site settings"
  on public.site_settings for update
  using (auth.role() = 'authenticated');

insert into public.site_settings (id) values (1) on conflict (id) do nothing;
