create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  package text not null,
  budget text not null default '',
  details text not null,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- The Vercel API uses the service-role key server-side. Do not add that key
-- to browser code or create a public insert policy for this table.
