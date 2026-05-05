-- 示範表：notes
-- 用途：作為「萬用 CRUD 模板」的示範。
-- 開新 entity 時：複製 003 的 trigger 語法，把 notes 改成你的表名。

create table public.notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  content text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- RLS
alter table public.notes enable row level security;

create policy "Users can view own notes"
  on public.notes for select
  using (auth.uid() = user_id);

create policy "Users can create own notes"
  on public.notes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own notes"
  on public.notes for update
  using (auth.uid() = user_id);

create policy "Users can delete own notes"
  on public.notes for delete
  using (auth.uid() = user_id);

-- updated_at 自動更新（共用 function 在 003_shared_functions.sql）
create trigger notes_updated_at
  before update on public.notes
  for each row execute function public.update_updated_at();
