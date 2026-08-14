-- =========================================================
-- SEO fields for properties and blog posts, ordering for testimonials
-- =========================================================

alter table public.properties
  add column if not exists meta_title text,
  add column if not exists meta_description text,
  add column if not exists og_image text;

alter table public.blog_posts
  add column if not exists meta_title text,
  add column if not exists og_image text;

alter table public.testimonials
  add column if not exists display_order integer not null default 0;

-- Give existing rows a stable initial order based on creation date.
with ordered as (
  select id, row_number() over (order by created_at) as rn
  from public.testimonials
)
update public.testimonials t
set display_order = ordered.rn
from ordered
where t.id = ordered.id and t.display_order = 0;
