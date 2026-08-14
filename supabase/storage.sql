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
