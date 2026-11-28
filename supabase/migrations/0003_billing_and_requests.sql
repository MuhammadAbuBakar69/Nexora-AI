-- 0003_billing_and_requests.sql — access requests and payment transactions for Nexora
--
-- Supports:
--   1. Customer quota/tier access requests (referenced by /dashboard and /dashboard/billing)
--   2. Real payment tracking for Safepay, PayFast, and SadaPay/Raast transfers
--   3. Strict tenant-scoped RLS matching 0002_rls.sql

create table if not exists public.access_requests (
  id                     uuid primary key default gen_random_uuid(),
  organization_id        uuid not null references public.organizations (id) on delete cascade,
  user_id                uuid not null references auth.users (id) on delete cascade,
  requested_plan         text not null check (length(btrim(requested_plan)) between 1 and 60),
  requested_tokens       bigint check (requested_tokens is null or requested_tokens >= 0),
  estimated_cost_pkr     integer check (estimated_cost_pkr is null or estimated_cost_pkr >= 0),
  business_justification text,
  status                 text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by            uuid references auth.users (id) on delete set null,
  reviewed_at            timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index if not exists access_requests_org_created_idx
  on public.access_requests (organization_id, created_at desc);
create index if not exists access_requests_user_id_idx
  on public.access_requests (user_id);
create index if not exists access_requests_status_idx
  on public.access_requests (status);

drop trigger if exists access_requests_set_updated_at on public.access_requests;
create trigger access_requests_set_updated_at
  before update on public.access_requests
  for each row execute function public.set_updated_at();

alter table public.access_requests enable row level security;

create policy access_requests_select_org_or_admin
  on public.access_requests for select to authenticated
  using (organization_id = (select public.current_org_id()) or (select public.is_admin()));

create policy access_requests_insert_own_org
  on public.access_requests for insert to authenticated
  with check (
    organization_id = (select public.current_org_id())
    and user_id = (select auth.uid())
    and status = 'pending'
  );

create policy access_requests_admin_update
  on public.access_requests for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

revoke all on public.access_requests from anon;

-- ---------------------------------------------------------------- payment_transactions

create table if not exists public.payment_transactions (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references public.organizations (id) on delete cascade,
  user_id          uuid references auth.users (id) on delete set null,
  gateway          text not null check (gateway in ('safepay', 'payfast', 'sadapay_raast')),
  method           text not null check (length(btrim(method)) between 1 and 80),
  plan             text not null check (length(btrim(plan)) between 1 and 80),
  amount_pkr       integer not null check (amount_pkr > 0),
  amount_usd       numeric(10, 2) check (amount_usd is null or amount_usd >= 0),
  tokens_allocated bigint not null default 0 check (tokens_allocated >= 0),
  tracker_id       text unique,
  reference_code   text,
  status           text not null default 'pending'
    check (status in ('pending', 'pending_verification', 'paid', 'failed', 'canceled')),
  metadata         jsonb not null default '{}'::jsonb,
  verified_by      uuid references auth.users (id) on delete set null,
  verified_at      timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists payment_transactions_org_created_idx
  on public.payment_transactions (organization_id, created_at desc);
create index if not exists payment_transactions_status_idx
  on public.payment_transactions (status);

drop trigger if exists payment_transactions_set_updated_at on public.payment_transactions;
create trigger payment_transactions_set_updated_at
  before update on public.payment_transactions
  for each row execute function public.set_updated_at();

alter table public.payment_transactions enable row level security;

create policy payment_transactions_select_org_or_admin
  on public.payment_transactions for select to authenticated
  using (organization_id = (select public.current_org_id()) or (select public.is_admin()));

create policy payment_transactions_insert_own_org
  on public.payment_transactions for insert to authenticated
  with check (
    organization_id = (select public.current_org_id())
    and user_id = (select auth.uid())
    and status in ('pending', 'pending_verification')
  );

create policy payment_transactions_admin_update
  on public.payment_transactions for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

revoke all on public.payment_transactions from anon;
