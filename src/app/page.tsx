import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Database, Lock, Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Zap,
    title: 'Next.js 15',
    description: 'App Router、TypeScript、Tailwind CSS v4，開箱即用的現代前端架構。',
  },
  {
    icon: Database,
    title: 'Supabase 整合',
    description: 'PostgreSQL 資料庫、即時訂閱、Row Level Security，完整後端服務。',
  },
  {
    icon: Lock,
    title: '身份驗證',
    description: '支援 Email 登入與 GitHub OAuth，附帶完整的 Session 管理機制。',
  },
]

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-3xl space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            next-supabase-starter
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Next.js 15 + Supabase + shadcn/ui 的生產就緒起始模板，快速啟動你的下一個專案。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button asChild size="lg">
              <Link href="/login">
                立即開始
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register">建立帳號</Link>
            </Button>
          </div>
        </section>

        <section aria-label="功能特色">
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title}>
                  <CardHeader>
                    <Icon className="h-8 w-8 text-primary mb-2" aria-hidden="true" />
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
