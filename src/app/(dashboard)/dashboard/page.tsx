import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { LogOut, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: '控制台 | nextjs-supabase-base',
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
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
              <User className="text-primary h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <CardTitle>控制台</CardTitle>
              <CardDescription>您已成功登入</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted rounded-md px-4 py-3">
            <p className="text-muted-foreground text-xs">已登入帳號</p>
            <p className="text-foreground mt-1 text-sm font-medium">{user.email}</p>
          </div>
          <form action={signOut}>
            <Button type="submit" variant="outline" className="w-full">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              登出
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
