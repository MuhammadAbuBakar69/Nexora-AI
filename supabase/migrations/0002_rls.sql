-- 0002_rls.sql — row level security for every tenant-owned table
--
-- Authorization model:
--   * public.current_org_id() resolves the caller's organization from profiles.
--   * public.is_admin() resolves the caller's role from user_roles.
--   * Both are SECURITY DEFINER so policies never recurse into the tables they read.
--   * The browser never sends a role or organization id that is trusted; every
--     predicate is evaluated against auth.uid() inside Postgres.

alter table public.organizations     enable row level security;
alter table public.profiles          enable row level security;
alter table public.user_roles        enable row level security;
alter table public.providers         enable row level security;
alter table public.models            enable row level security;
alter table public.api_keys          enable row level security;
alter table public.subscriptions     enable row level security;
alter table public.quota_allocations enable row level security;
alter table public.usage_records     enable row level security;
alter table public.notifications     enable row level security;
alter table public.audit_logs        enable row level security;

-- ---------------------------------------------------------------- profiles

create policy profiles_select_own_or_admin
  on public.profiles for select to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));

create policy profiles_update_own
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- A user must not be able to move themselves into another tenant, so
-- organization_id and email are not writable through the API at all.
revoke update on public.profiles from authenticated;
grant update (full_name, avatar_url) on public.profiles to authenticated;

-- ---------------------------------------------------------------- user_roles

create policy user_roles_select_own_or_admin
  on public.user_roles for select to authenticated
  using (user_id = (select auth.uid()) or (select public.is_admin()));

create policy user_roles_insert_admin
  on public.user_roles for insert to authenticated
  with check ((select public.is_admin()));

create policy user_roles_update_admin
  on public.user_roles for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy user_roles_delete_admin
  on public.user_roles for delete to authenticated
  using ((select public.is_admin()));

-- ---------------------------------------------------------------- organizations

create policy organizations_select_member_or_admin
  on public.organizations for select to authenticated
  using (id = (select public.current_org_id()) or (select public.is_admin()));

create policy organizations_update_member_or_admin
  on public.organizations for update to authenticated
  using (id = (select public.current_org_id()) or (select public.is_admin()))
  with check (id = (select public.current_org_id()) or (select public.is_admin()));

-- ---------------------------------------------------------------- api_keys

create policy api_keys_select_org_or_admin
  on public.api_keys for select to authenticated
  using (organization_id = (select public.current_org_id()) or (select public.is_admin()));

create policy api_keys_insert_own_org
  on public.api_keys for insert to authenticated
  with check (
    organization_id = (select public.current_org_id())
    and created_by = (select auth.uid())
  );

create policy api_keys_update_org_or_admin
  on public.api_keys for update to authenticated
  using (organization_id = (select public.current_org_id()) or (select public.is_admin()))
  with check (organization_id = (select public.current_org_id()) or (select public.is_admin()));

create policy api_keys_delete_org_or_admin
  on public.api_keys for delete to authenticated
  using (organization_id = (select public.current_org_id()) or (select public.is_admin()));

-- ---------------------------------------------------------------- subscriptions

create policy subscriptions_select_org_or_admin
  on public.subscriptions for select to authenticated
  using (organization_id = (select public.current_org_id()) or (select public.is_admin()));

create policy subscriptions_admin_write
  on public.subscriptions for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ---------------------------------------------------------------- quota_allocations

create policy quota_select_org_or_admin
  on public.quota_allocations for select to authenticated
  using (organization_id = (select public.current_org_id()) or (select public.is_admin()));

create policy quota_admin_write
  on public.quota_allocations for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ---------------------------------------------------------------- usage_records

create policy usage_records_select_org_or_admin
  on public.usage_records for select to authenticated
  using (organization_id = (select public.current_org_id()) or (select public.is_admin()));

-- No insert/update/delete policy: usage is written by the metering service using
-- the secret key (which bypasses RLS). Customers can never fabricate usage.

-- ---------------------------------------------------------------- notifications

create policy notifications_select_own
  on public.notifications for select to authenticated
  using (
    user_id = (select auth.uid())
    or organization_id = (select public.current_org_id())
    or (select public.is_admin())
  );

create policy notifications_update_own
  on public.notifications for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- ---------------------------------------------------------------- audit_logs

create policy audit_logs_select_org_or_admin
  on public.audit_logs for select to authenticated
  using (organization_id = (select public.current_org_id()) or (select public.is_admin()));

create policy audit_logs_insert_self
  on public.audit_logs for insert to authenticated
  with check (
    actor_id = (select auth.uid())
    and (organization_id is null or organization_id = (select public.current_org_id()))
  );

-- Audit history is append-only for API clients.
revoke update, delete on public.audit_logs from authenticated, anon;

-- ---------------------------------------------------------------- catalog tables

create policy providers_select_public
  on public.providers for select to anon, authenticated
  using (true);

create policy providers_admin_write
  on public.providers for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy models_select_public
  on public.models for select to anon, authenticated
  using (true);

create policy models_admin_write
  on public.models for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ---------------------------------------------------------------- anon hardening

-- Anonymous visitors may only read the public model catalog; nothing else.
revoke all on public.organizations, public.profiles, public.user_roles,
  public.api_keys, public.subscriptions, public.quota_allocations,
  public.usage_records, public.notifications, public.audit_logs
  from anon;
