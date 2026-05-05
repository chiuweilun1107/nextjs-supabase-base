-- 共用函式：update_updated_at()
-- 用途：所有資料表的 updated_at 欄位自動更新。
-- 使用方式：建立新資料表後，加上這個 trigger：
--   create trigger {table}_updated_at
--     before update on public.{table}
--     for each row execute function public.update_updated_at();

create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 補上 profiles 的 updated_at trigger（001_init.sql 沒有加）
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();
