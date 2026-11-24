-- 0001_init.sql — core schema for Nexora AI infrastructure platform
--
-- Tenancy model: one user belongs to exactly one organization (profiles.organization_id).
-- Every tenant-owned row carries organization_id and is gated by RLS in 0002_rls.sql.
-- Authorization is database-backed via public.user_roles + public.is_admin(); no role
-- value from the browser is ever trusted.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------- enums

do $$ begin
  create type public.user_role as enum ('customer', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.api_key_status as enum ('active', 'revoked', 'expired');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.provider_status as enum ('operational', 'degraded', 'maintenance');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.model_status as enum ('operational', 'degraded', 'maintenance');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.model_type as enum ('LLM', 'Multimodal', 'Vision', 'Embedding', 'Reasoning');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'canceled');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------- updated_at

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------- organizations

create table public.organizations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (length(btrim(name)) between 1 and 120),
  slug        text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  plan        text not null default 'growth',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger organizations_set_updated_at
  before update on public.organizations
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------- profiles

create table public.profiles (
  id              uuid primary key references auth.users (id) on delete cascade,
  organization_id uuid references public.organizations (id) on delete set null,
  email           text not null,
  full_name       text check (full_name is null or length(btrim(full_name)) between 1 and 120),
  avatar_url      text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index profiles_organization_id_idx on public.profiles (organization_id);
create unique index profiles_email_lower_idx on public.profiles (lower(email));

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------- user_roles

create table public.user_roles (
  user_id     uuid not null references auth.users (id) on delete cascade,
  role        public.user_role not null,
  granted_at  timestamptz not null default now(),
  granted_by  uuid references auth.users (id) on delete set null,
  primary key (user_id, role)
);

create index user_roles_role_idx on public.user_roles (role);

-- ---------------------------------------------------------------- providers / models

create table public.providers (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name        text not null check (length(btrim(name)) between 1 and 80),
  status      public.provider_status not null default 'operational',
  docs_url    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger providers_set_updated_at
  before update on public.providers
  for each row execute function public.set_updated_at();

create table public.models (
  id               uuid primary key default gen_random_uuid(),
  provider_id      uuid not null references public.providers (id) on delete cascade,
  slug             text not null,
  name             text not null check (length(btrim(name)) between 1 and 120),
  type             public.model_type not null default 'LLM',
  context_window   integer check (context_window is null or context_window > 0),
  input_price_usd  numeric(12, 6) check (input_price_usd is null or input_price_usd >= 0),
  output_price_usd numeric(12, 6) check (output_price_usd is null or output_price_usd >= 0),
  latency_ms       integer check (latency_ms is null or latency_ms >= 0),
  status           public.model_status not null default 'operational',
  description      text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (provider_id, slug)
);

create index models_provider_id_idx on public.models (provider_id);

create trigger models_set_updated_at
  before update on public.models
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------- api_keys

-- The raw key is never stored: only a SHA-256 hash plus a display prefix/suffix.
create table public.api_keys (
  id             uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  name           text not null check (length(btrim(name)) between 1 and 120),
  prefix         text not null check (length(prefix) between 4 and 32),
  last_four      text not null check (length(last_four) = 4),
  key_hash       text not null unique,
  permissions    text[] not null default '{}',
  status         public.api_key_status not null default 'active',
  rate_limit_rpm integer not null default 60 check (rate_limit_rpm > 0),
  last_used_at   timestamptz,
  created_by     uuid references auth.users (id) on delete set null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index api_keys_organization_id_idx on public.api_keys (organization_id);
create index api_keys_prefix_idx on public.api_keys (prefix);

create trigger api_keys_set_updated_at
  before update on public.api_keys
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------- subscriptions

create table public.subscriptions (
  id                    uuid primary key default gen_random_uuid(),
  organization_id       uuid not null references public.organizations (id) on delete cascade,
  plan                  text not null check (length(btrim(plan)) between 1 and 60),
  status                public.subscription_status not null default 'trialing',
  current_period_start  timestamptz not null default now(),
  current_period_end    timestamptz not null,
  cancel_at_period_end  boolean not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  constraint subscriptions_period_valid check (current_period_end > current_period_start)
);

create index subscriptions_organization_id_idx on public.subscriptions (organization_id);
create unique index subscriptions_one_active_per_org_idx
  on public.subscriptions (organization_id)
  where status in ('trialing', 'active');

create trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------- quota_allocations

create table public.quota_allocations (
  id                uuid primary key default gen_random_uuid(),
  organization_id   uuid not null references public.organizations (id) on delete cascade,
  period_start      timestamptz not null,
  period_end        timestamptz not null,
  tokens_allocated  bigint not null check (tokens_allocated >= 0),
  note              text,
  created_by        uuid references auth.users (id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  constraint quota_period_valid check (period_end > period_start)
);

create index quota_allocations_organization_id_idx on public.quota_allocations (organization_id);
create unique index quota_allocations_org_period_idx
  on public.quota_allocations (organization_id, period_start);

create trigger quota_allocations_set_updated_at
  before update on public.quota_allocations
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------- usage_records

create table public.usage_records (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  api_key_id      uuid references public.api_keys (id) on delete set null,
  model_id        uuid references public.models (id) on delete set null,
  request_id      text,
  status_code     smallint check (status_code is null or status_code between 100 and 599),
  input_tokens    integer not null default 0 check (input_tokens >= 0),
  output_tokens   integer not null default 0 check (output_tokens >= 0),
  latency_ms      integer check (latency_ms is null or latency_ms >= 0),
  cost_usd        numeric(12, 6) not null default 0 check (cost_usd >= 0),
  created_at      timestamptz not null default now()
);

create index usage_records_org_created_idx on public.usage_records (organization_id, created_at desc);
create index usage_records_api_key_idx on public.usage_records (api_key_id);
create unique index usage_records_request_id_idx on public.usage_records (request_id)
  where request_id is not null;

-- ---------------------------------------------------------------- notifications

create table public.notifications (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id         uuid references auth.users (id) on delete cascade,
  title           text not null check (length(btrim(title)) between 1 and 160),
  body            text,
  read_at         timestamptz,
  created_at      timestamptz not null default now()
);

create index notifications_user_created_idx on public.notifications (user_id, created_at desc);
create index notifications_organization_id_idx on public.notifications (organization_id);

-- ---------------------------------------------------------------- audit_logs

create table public.audit_logs (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations (id) on delete set null,
  actor_id        uuid references auth.users (id) on delete set null,
  action          text not null check (length(btrim(action)) between 1 and 80),
  target_type     text,
  target_id       text,
  metadata        jsonb not null default '{}'::jsonb,
  ip              inet,
  created_at      timestamptz not null default now()
);

create index audit_logs_org_created_idx on public.audit_logs (organization_id, created_at desc);
create index audit_logs_actor_idx on public.audit_logs (actor_id);

-- ---------------------------------------------------------------- authz helpers

-- SECURITY DEFINER so policy evaluation can read user_roles/profiles without
-- recursing into their own RLS policies. Empty search_path + fully qualified
-- names prevents search_path hijacking.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.user_roles r
    where r.user_id = (select auth.uid())
      and r.role = 'admin'
  );
$$;

create or replace function public.current_org_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select p.organization_id
  from public.profiles p
  where p.id = (select auth.uid());
$$;

revoke execute on function public.is_admin() from public;
revoke execute on function public.current_org_id() from public;
grant execute on function public.is_admin() to authenticated, anon;
grant execute on function public.current_org_id() to authenticated, anon;

-- ---------------------------------------------------------------- new user provisioning

-- Creates the profile row and a personal organization for every new auth user.
-- Full name comes from the signup metadata, never from client-trusted fields.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_org_id   uuid;
  v_base     text;
  v_slug     text;
  v_name     text;
begin
  v_name := nullif(btrim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), '');

  v_base := lower(regexp_replace(coalesce(split_part(new.email, '@', 1), 'workspace'), '[^a-zA-Z0-9]+', '-', 'g'));
  v_base := btrim(v_base, '-');
  if v_base = '' then
    v_base := 'workspace';
  end if;

  v_slug := v_base || '-' || substr(replace(new.id::text, '-', ''), 1, 6);

  insert into public.organizations (name, slug)
  values (coalesce(v_name, v_base) || '''s Workspace', v_slug)
  returning id into v_org_id;

  insert into public.profiles (id, organization_id, email, full_name)
  values (new.id, v_org_id, new.email, v_name)
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, 'customer')
  on conflict do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
