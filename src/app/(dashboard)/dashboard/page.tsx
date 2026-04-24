import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { LogOut, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: '控制台 | next-supabase-starter',
}

async function signOut() {
  'use server'
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <CardTitle>控制台</CardTitle>
              <CardDescription>您已成功登入</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-muted px-4 py-3">
            <p className="text-xs text-muted-foreground">已登入帳號</p>
            <p className="mt-1 text-sm font-medium text-foreground">{user.email}</p>
          </div>
          <form action={signOut}>
            <Button
              type="submit"
              variant="outline"
              className="w-full"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              登出
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
