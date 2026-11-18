create schema if not exists private;
revoke all on schema private from public,anon;
grant usage on schema private to authenticated,service_role;
create or replace function private.is_studio_admin() returns boolean
language sql stable security definer set search_path = '' as $$
 select (select auth.uid()) is not null and exists(select 1 from public.admin_users where id=(select auth.uid()) and active);
$$;
revoke all on function private.is_studio_admin() from public,anon;
grant execute on function private.is_studio_admin() to authenticated,service_role;
drop policy if exists "Admins can read membership" on public.admin_users;
drop policy if exists "Studio admin access" on public.industries;
drop policy if exists "Studio admin access" on public.templates;
drop policy if exists "Studio admin access" on public.template_sections;
drop policy if exists "Studio admin access" on public.demos;
drop policy if exists "Studio admin access" on public.demo_sections;
drop policy if exists "Studio admin access" on public.demo_assets;
drop policy if exists "Studio admin access" on public.demo_enquiries;
drop policy if exists "Studio admin access" on public.prospects;
drop policy if exists "Studio admin access" on public.demo_analytics;
drop policy if exists "Studio admin access" on public.platform_settings;
drop policy if exists "Studio media read" on storage.objects;
drop policy if exists "Studio media upload" on storage.objects;
drop policy if exists "Studio media update" on storage.objects;
drop policy if exists "Studio media delete" on storage.objects;
drop function if exists public.is_studio_admin();
create policy "Admins can read membership" on public.admin_users for select to authenticated using (private.is_studio_admin());
do $$ declare t text; begin
 foreach t in array array['industries','templates','template_sections','demos','demo_sections','demo_assets','demo_enquiries','prospects','demo_analytics','platform_settings'] loop
  execute format('create policy "Studio admin access" on public.%I for all to authenticated using (private.is_studio_admin()) with check (private.is_studio_admin())',t);
 end loop;
end $$;
create policy "Studio media read" on storage.objects for select to authenticated using(bucket_id='demo-assets' and private.is_studio_admin());
create policy "Studio media upload" on storage.objects for insert to authenticated with check(bucket_id='demo-assets' and private.is_studio_admin());
create policy "Studio media update" on storage.objects for update to authenticated using(bucket_id='demo-assets' and private.is_studio_admin()) with check(bucket_id='demo-assets' and private.is_studio_admin());
create policy "Studio media delete" on storage.objects for delete to authenticated using(bucket_id='demo-assets' and private.is_studio_admin());
create index if not exists demo_assets_demo_idx on public.demo_assets(demo_id);
create index if not exists demos_created_by_idx on public.demos(created_by);
create index if not exists demos_template_id_idx on public.demos(template_id);
create index if not exists prospects_demo_id_idx on public.prospects(demo_id);
create index if not exists prospects_industry_id_idx on public.prospects(industry_id);
