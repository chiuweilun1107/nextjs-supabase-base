import { createBrowserClient } from '@supabase/ssr'

// 加上型別：跑完 `npm run db:types` 後，改成 createBrowserClient<Database>(...)
// 並加上 import type { Database } from './database.types'
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
