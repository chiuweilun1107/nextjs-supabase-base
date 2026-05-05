import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// 加上型別：跑完 `npm run db:types` 後，改成 createServerClient<Database>(...)
// 並加上 import type { Database } from './database.types'
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Parameters<typeof cookieStore.set>[2] }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component 中無法設定 cookies，由 middleware 處理
          }
        },
      },
    }
  )
}
