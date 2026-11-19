-- Migration: Additive Studio Inquiries & Platform Conversion Support
-- Timestamp: 2026-11-19T12:45:00Z
-- Purpose: Enable direct studio conversion without requiring a foreign key to public.demos,
-- while preserving 100% backward compatibility with demo previews and test suites.

-- 1. Relax NOT NULL constraint on demo_id in demo_enquiries
alter table public.demo_enquiries alter column demo_id drop not null;

-- 2. Relax NOT NULL constraint on demo_id in demo_analytics
alter table public.demo_analytics alter column demo_id drop not null;

-- 3. Add additive columns for structured studio proposal tracking
alter table public.demo_enquiries
  add column if not exists project_type text not null default 'website',
  add column if not exists scope_tier text not null default 'premium',
  add column if not exists estimated_budget numeric not null default 0,
  add column if not exists is_studio_enquiry boolean not null default false;

-- 4. Recreate studio_capture_enquiry RPC to safely handle NULL demo_id and studio events
create or replace function public.studio_capture_enquiry(p_enquiry jsonb, p_event jsonb)
returns void language plpgsql security invoker set search_path='' as $$
declare
  v_demo_id uuid;
begin
  if (p_enquiry->>'demo_id') is not null and (p_enquiry->>'demo_id') <> '' then
    v_demo_id := (p_enquiry->>'demo_id')::uuid;
  else
    v_demo_id := null;
  end if;

  insert into public.demo_enquiries(
    id,
    demo_id,
    name,
    email,
    phone,
    message,
    kind,
    status,
    project_type,
    scope_tier,
    estimated_budget,
    is_studio_enquiry,
    created_at,
    consent_at
  ) values (
    (p_enquiry->>'id')::uuid,
    v_demo_id,
    p_enquiry->>'name',
    coalesce(p_enquiry->>'email', ''),
    coalesce(p_enquiry->>'phone', ''),
    p_enquiry->>'message',
    coalesce(p_enquiry->>'kind', 'Studio Enquiry'),
    coalesce(p_enquiry->>'status', 'new'),
    coalesce(p_enquiry->>'project_type', 'website'),
    coalesce(p_enquiry->>'scope_tier', 'premium'),
    coalesce((p_enquiry->>'estimated_budget')::numeric, 0),
    coalesce((p_enquiry->>'is_studio_enquiry')::boolean, v_demo_id is null),
    coalesce((p_enquiry->>'created_at')::timestamptz, now()),
    coalesce((p_enquiry->>'consent_at')::timestamptz, now())
  );

  if p_event is not null and (p_event->>'event_type') is not null then
    insert into public.demo_analytics(
      id,
      demo_id,
      event_type,
      created_at
    ) values (
      (p_event->>'id')::uuid,
      v_demo_id,
      p_event->>'event_type',
      coalesce((p_event->>'created_at')::timestamptz, now())
    );
  end if;
end $$;

-- 5. Privileges and indexes
revoke all on function public.studio_capture_enquiry(jsonb, jsonb) from public, anon, authenticated;
grant execute on function public.studio_capture_enquiry(jsonb, jsonb) to service_role;

create index if not exists idx_demo_enquiries_studio on public.demo_enquiries(created_at desc) where demo_id is null;
