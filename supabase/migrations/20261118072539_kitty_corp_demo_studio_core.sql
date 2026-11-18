-- KITTY CORP: Supabase schema draft for the next implementation phase.
-- Run in a NEW development project first. This is not an installed adapter.
begin;
create extension if not exists pgcrypto;

create table public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Studio administrator',
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create schema if not exists private;
revoke all on schema private from public,anon;
grant usage on schema private to authenticated,service_role;
create or replace function private.is_studio_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select (select auth.uid()) is not null and exists(select 1 from public.admin_users where id = (select auth.uid()) and active);
$$;
revoke all on function private.is_studio_admin() from public,anon;
grant execute on function private.is_studio_admin() to authenticated,service_role;

create table public.industries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  definition jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create table public.templates (
  id uuid primary key default gen_random_uuid(),
  template_key text not null unique,
  industry_id uuid not null references public.industries(id) on delete restrict,
  name text not null,
  specialty text not null,
  layout text not null check(layout in ('editorial','split','immersive','minimal','structured')),
  definition jsonb not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index templates_industry_idx on public.templates(industry_id);
create table public.template_sections (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references public.templates(id) on delete cascade,
  position integer not null check(position >= 0),
  kind text not null,
  content jsonb not null,
  unique(template_id,position)
);
create table public.demos (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  slug text not null unique check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  industry_id uuid not null references public.industries(id) on delete restrict,
  template_id uuid not null references public.templates(id) on delete restrict,
  status text not null default 'draft' check(status in ('draft','published')),
  revision integer not null default 1 check(revision > 0),
  business jsonb not null,
  contact jsonb not null,
  hero jsonb not null,
  design jsonb not null,
  seo jsonb not null,
  expires_at timestamptz,
  password_hash text,
  show_demo_label boolean not null default true,
  footer text not null default '',
  internal_notes text not null default '',
  created_by uuid references public.admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index demos_status_expiry_idx on public.demos(status,expires_at);
create index demos_updated_idx on public.demos(updated_at desc);
create index demos_industry_idx on public.demos(industry_id);
create table public.demo_sections (
  id uuid primary key default gen_random_uuid(),
  demo_id uuid not null references public.demos(id) on delete cascade,
  position integer not null check(position >= 0),
  kind text not null,
  visible boolean not null default true,
  content jsonb not null,
  unique(demo_id,position)
);
create index demo_sections_demo_idx on public.demo_sections(demo_id,position);
-- Media assets can be shared by independent demos. References in content use asset UUIDs.
-- demo_id is optional provenance, not a visibility grant or sole ownership assertion.
create table public.demo_assets (
  id uuid primary key default gen_random_uuid(),
  demo_id uuid references public.demos(id) on delete set null,
  name text not null,
  folder text not null default 'General',
  bucket text not null default 'demo-assets',
  storage_path text not null unique,
  mime_type text not null check(mime_type in ('image/png','image/jpeg','image/webp')),
  size_bytes bigint not null check(size_bytes > 0 and size_bytes <= 5242880),
  created_at timestamptz not null default now()
);
create index demo_assets_folder_idx on public.demo_assets(folder);
create table public.demo_enquiries (
  id uuid primary key default gen_random_uuid(),
  demo_id uuid not null references public.demos(id) on delete cascade,
  name text not null,
  email text not null default '',
  phone text not null default '',
  message text not null check(char_length(message) between 5 and 1500),
  kind text not null,
  status text not null default 'new' check(status in ('new','read')),
  consent_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  check(email <> '' or phone <> '')
);
create index enquiries_demo_created_idx on public.demo_enquiries(demo_id,created_at desc);
create index enquiries_status_idx on public.demo_enquiries(status);
create table public.prospects (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_person text not null default '',
  phone text not null default '',
  email text not null default '',
  industry_id uuid references public.industries(id) on delete set null,
  demo_id uuid references public.demos(id) on delete set null,
  status text not null default 'New prospect' check(status in ('New prospect','Demo prepared','Contacted','Interested','Meeting scheduled','Negotiation','Converted','Not interested')),
  follow_up date,
  internal_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index prospects_follow_up_idx on public.prospects(follow_up) where follow_up is not null;
create index prospects_status_idx on public.prospects(status);
create table public.demo_analytics (
  id uuid primary key default gen_random_uuid(),
  demo_id uuid not null references public.demos(id) on delete cascade,
  event_type text not null check(event_type in ('visit','whatsapp','enquiry')),
  created_at timestamptz not null default now()
);
create index analytics_demo_type_time_idx on public.demo_analytics(demo_id,event_type,created_at desc);
create table public.platform_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text not null unique,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Default deny: anonymous visitors do not access base tables, including published demos.
-- Public previews are served by a narrow server API after publication/expiry/password checks.
-- Never return entire rows from the privileged public-read path.
do $$ declare table_name text; begin
  foreach table_name in array array['admin_users','industries','templates','template_sections','demos','demo_sections','demo_assets','demo_enquiries','prospects','demo_analytics','platform_settings'] loop
    execute format('alter table public.%I enable row level security',table_name);
    execute format('revoke all on public.%I from anon',table_name);
    execute format('grant select,insert,update,delete on public.%I to authenticated',table_name);
    if table_name = 'admin_users' then
      execute 'create policy "Admins can read membership" on public.admin_users for select to authenticated using (private.is_studio_admin())';
      -- Membership must be provisioned server-side, never self-granted.
    else
      execute format('create policy "Studio admin access" on public.%I for all to authenticated using (private.is_studio_admin()) with check (private.is_studio_admin())',table_name);
    end if;
  end loop;
end $$;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('demo-assets','demo-assets',false,5242880,array['image/png','image/jpeg','image/webp'])
on conflict(id) do nothing;
create policy "Studio media read" on storage.objects for select to authenticated
using(bucket_id='demo-assets' and private.is_studio_admin());
create policy "Studio media upload" on storage.objects for insert to authenticated
with check(bucket_id='demo-assets' and private.is_studio_admin());
create policy "Studio media update" on storage.objects for update to authenticated
using(bucket_id='demo-assets' and private.is_studio_admin()) with check(bucket_id='demo-assets' and private.is_studio_admin());
create policy "Studio media delete" on storage.objects for delete to authenticated
using(bucket_id='demo-assets' and private.is_studio_admin());
commit;

-- Remaining migrations: atomic save/duplicate/delete RPCs, updated_at triggers,
-- transactional revision checks, seed import and validated public-read projection.
-- Enquiries and analytics are inserted ONLY by the server after validation and rate limiting.

-- Transactional demo write functions. Calls are restricted to the server's service role.
create or replace function public.studio_create_demo(p_demo jsonb)
returns void language plpgsql security invoker set search_path = '' as $$
declare v_industry uuid; v_template uuid; s jsonb; n integer:=0;
begin
 select id into v_industry from public.industries where slug=p_demo->>'industry';
 select id into v_template from public.templates where template_key=p_demo->>'templateId';
 if v_industry is null or v_template is null then raise exception 'Unknown industry or template'; end if;
 insert into public.demos(id,business_name,slug,industry_id,template_id,status,revision,business,contact,hero,design,seo,expires_at,password_hash,show_demo_label,footer,internal_notes,created_at,updated_at)
 values((p_demo->>'id')::uuid,p_demo->>'businessName',p_demo->>'slug',v_industry,v_template,coalesce(p_demo->>'status','draft'),coalesce((p_demo->>'revision')::int,1),coalesce(p_demo->'business','{}'),coalesce(p_demo->'contact','{}'),coalesce(p_demo->'hero','{}'),coalesce(p_demo->'design','{}'),coalesce(p_demo->'seo','{}'),nullif(p_demo#>>'{settings,expiresAt}','')::timestamptz,nullif(p_demo#>>'{settings,passwordHash}',''),coalesce((p_demo#>>'{settings,showDemoLabel}')::boolean,true),coalesce(p_demo->>'footer',''),coalesce(p_demo->>'notes',''),coalesce((p_demo->>'createdAt')::timestamptz,now()),coalesce((p_demo->>'updatedAt')::timestamptz,now()));
 for s in select value from jsonb_array_elements(coalesce(p_demo->'sections','[]'::jsonb)) loop
  insert into public.demo_sections(id,demo_id,position,kind,visible,content) values((s->>'id')::uuid,(p_demo->>'id')::uuid,n,s->>'kind',coalesce((s->>'visible')::boolean,true),s); n:=n+1;
 end loop;
end $$;
create or replace function public.studio_save_demo(p_demo jsonb,p_expected_revision integer)
returns integer language plpgsql security invoker set search_path = '' as $$
declare v_industry uuid; v_template uuid; v_revision integer; s jsonb; n integer:=0;
begin
 select id into v_industry from public.industries where slug=p_demo->>'industry';
 select id into v_template from public.templates where template_key=p_demo->>'templateId';
 if v_industry is null or v_template is null then raise exception 'Unknown industry or template'; end if;
 update public.demos set business_name=p_demo->>'businessName',slug=p_demo->>'slug',industry_id=v_industry,template_id=v_template,status=p_demo->>'status',revision=revision+1,business=p_demo->'business',contact=p_demo->'contact',hero=p_demo->'hero',design=p_demo->'design',seo=p_demo->'seo',expires_at=nullif(p_demo#>>'{settings,expiresAt}','')::timestamptz,password_hash=nullif(p_demo#>>'{settings,passwordHash}',''),show_demo_label=coalesce((p_demo#>>'{settings,showDemoLabel}')::boolean,true),footer=coalesce(p_demo->>'footer',''),internal_notes=coalesce(p_demo->>'notes',''),updated_at=now()
 where id=(p_demo->>'id')::uuid and revision=p_expected_revision returning revision into v_revision;
 if v_revision is null then raise exception using message='REVISION_CONFLICT',errcode='40001'; end if;
 delete from public.demo_sections where demo_id=(p_demo->>'id')::uuid;
 for s in select value from jsonb_array_elements(coalesce(p_demo->'sections','[]'::jsonb)) loop
  insert into public.demo_sections(id,demo_id,position,kind,visible,content) values((s->>'id')::uuid,(p_demo->>'id')::uuid,n,s->>'kind',coalesce((s->>'visible')::boolean,true),s); n:=n+1;
 end loop;
 return v_revision;
end $$;
create or replace function public.studio_delete_demo(p_id uuid)
returns void language sql security invoker set search_path = '' as $$ delete from public.demos where id=p_id; $$;
revoke all on function public.studio_create_demo(jsonb) from public,anon,authenticated;
revoke all on function public.studio_save_demo(jsonb,integer) from public,anon,authenticated;
revoke all on function public.studio_delete_demo(uuid) from public,anon,authenticated;
grant execute on function public.studio_create_demo(jsonb) to service_role;
grant execute on function public.studio_save_demo(jsonb,integer) to service_role;
grant execute on function public.studio_delete_demo(uuid) to service_role;
