import { createClient } from '@supabase/supabase-js'

// Service role client — 繞過 RLS，僅在 server-side 受信任環境使用
// 不可暴露給 browser，不可在 Client Component 使用
//
// 加上型別：跑完 `npm run db:types` 後，改成 createClient<Database>(...)
// 並加上 import type { Database } from './database.types'
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
