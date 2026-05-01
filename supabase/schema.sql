create extension if not exists "uuid-ossp";

create table if not exists public.menu_items (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null check (category in ('coffee', 'cold_drinks', 'food', 'seasonal')),
  description text,
  price integer not null,
  tags text[] default '{}',
  image_url text,
  visible boolean not null default true,
  is_seasonal boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.price_change_log (
  id uuid primary key default uuid_generate_v4(),
  menu_item_id uuid references public.menu_items(id) on delete cascade,
  old_price integer,
  new_price integer,
  changed_at timestamptz not null default now(),
  changed_by text
);

create table if not exists public.gallery_photos (
  id uuid primary key default uuid_generate_v4(),
  storage_path text not null,
  public_url text not null,
  caption text,
  alt_text text,
  category text default 'uncategorised' check (category in ('space', 'brews', 'bar', 'people', 'uncategorised')),
  is_featured boolean not null default false,
  visible boolean not null default true,
  sort_order integer not null default 0,
  uploaded_at timestamptz not null default now()
);

alter table public.menu_items enable row level security;
alter table public.price_change_log enable row level security;
alter table public.gallery_photos enable row level security;

drop policy if exists "Public menu read" on public.menu_items;
create policy "Public menu read"
on public.menu_items
for select
to anon, authenticated
using (visible = true);

drop policy if exists "Admin menu full access" on public.menu_items;
create policy "Admin menu full access"
on public.menu_items
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public gallery read" on public.gallery_photos;
create policy "Public gallery read"
on public.gallery_photos
for select
to anon, authenticated
using (visible = true);

drop policy if exists "Admin gallery full access" on public.gallery_photos;
create policy "Admin gallery full access"
on public.gallery_photos
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Admin price log read" on public.price_change_log;
create policy "Admin price log read"
on public.price_change_log
for select
to authenticated
using (true);
