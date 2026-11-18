create or replace function public.studio_capture_enquiry(p_enquiry jsonb,p_event jsonb)
returns void language plpgsql security invoker set search_path='' as $$
begin
 insert into public.demo_enquiries(id,demo_id,name,email,phone,message,kind,status,created_at,consent_at)
 values((p_enquiry->>'id')::uuid,(p_enquiry->>'demo_id')::uuid,p_enquiry->>'name',coalesce(p_enquiry->>'email',''),coalesce(p_enquiry->>'phone',''),p_enquiry->>'message',p_enquiry->>'kind',coalesce(p_enquiry->>'status','new'),coalesce((p_enquiry->>'created_at')::timestamptz,now()),coalesce((p_enquiry->>'consent_at')::timestamptz,now()));
 insert into public.demo_analytics(id,demo_id,event_type,created_at)
 values((p_event->>'id')::uuid,(p_event->>'demo_id')::uuid,p_event->>'event_type',coalesce((p_event->>'created_at')::timestamptz,now()));
end $$;
revoke all on function public.studio_capture_enquiry(jsonb,jsonb) from public,anon,authenticated;
grant execute on function public.studio_capture_enquiry(jsonb,jsonb) to service_role;
