-- 附件/檔案上傳表：attachments
-- 搭配 Supabase Storage bucket "attachments" 使用。
-- 需手動在 Supabase Dashboard > Storage 建立名為 "attachments" 的 bucket（private）。

create table public.attachments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  file_name text not null,           -- 原始檔案名稱（顯示用）
  storage_path text not null unique, -- storage bucket 內的路徑，格式：{user_id}/{uuid}/{file_name}
  mime_type text not null,
  size_bytes bigint not null,
  created_at timestamptz default now() not null
);

-- RLS
alter table public.attachments enable row level security;

create policy "Users can view own attachments"
  on public.attachments for select
  using (auth.uid() = user_id);

create policy "Users can create own attachments"
  on public.attachments for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own attachments"
  on public.attachments for delete
  using (auth.uid() = user_id);
