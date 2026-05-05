import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'

type AuthResult =
  | { ok: true; user: User }
  | { ok: false; response: NextResponse }

// 在 Route Handler 中取得已登入使用者，未登入回 401
export async function requireUser(): Promise<AuthResult> {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: '請先登入' } },
        { status: 401 }
      ),
    }
  }
  return { ok: true, user }
}
