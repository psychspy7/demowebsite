-- KITTY CORP: Performance indexes, auto-updating timestamps, and atomic RPCs
begin;

-- 1. Automatic updated_at trigger function
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists set_demos_updated_at on public.demos;
create trigger set_demos_updated_at
before update on public.demos
for each row execute function public.touch_updated_at();

drop trigger if exists set_prospects_updated_at on public.prospects;
create trigger set_prospects_updated_at
before update on public.prospects
for each row execute function public.touch_updated_at();

-- 2. Query optimization indexes
create index if not exists idx_demos_status_slug on public.demos(status, slug);
create index if not exists idx_demo_enquiries_demo_status on public.demo_enquiries(demo_id, status);
create index if not exists idx_prospects_status_follow_up on public.prospects(status, follow_up);

-- 3. Atomic demo duplication RPC (runs entirely inside Postgres transaction)
create or replace function public.studio_duplicate_demo(
  p_source_id uuid,
  p_new_slug text,
  p_new_business_name text
)
returns uuid language plpgsql security invoker set search_path = '' as $$
declare
  v_source public.demos%rowtype;
  v_new_id uuid := gen_random_uuid();
  v_now timestamptz := now();
begin
  select * into v_source from public.demos where id = p_source_id;
  if not found then
    raise exception 'Source demo not found';
  end if;

  insert into public.demos (
    id, business_name, slug, industry_id, template_id, status, revision,
    business, contact, hero, design, seo, expires_at, password_hash,
    show_demo_label, footer, internal_notes, created_at, updated_at
  ) values (
    v_new_id,
    p_new_business_name,
    p_new_slug,
    v_source.industry_id,
    v_source.template_id,
    'draft',
    1,
    v_source.business,
    v_source.contact,
    v_source.hero,
    v_source.design,
    v_source.seo,
    null,
    null,
    v_source.show_demo_label,
    v_source.footer,
    '',
    v_now,
    v_now
  );

  insert into public.demo_sections (id, demo_id, position, kind, visible, content)
  select gen_random_uuid(), v_new_id, position, kind, visible, content
  from public.demo_sections
  where demo_id = p_source_id
  order by position asc;

  return v_new_id;
end $$;

revoke all on function public.studio_duplicate_demo(uuid, text, text) from public, anon, authenticated;
grant execute on function public.studio_duplicate_demo(uuid, text, text) to service_role;

commit;
