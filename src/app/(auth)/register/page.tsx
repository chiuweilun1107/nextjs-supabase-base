import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RegisterForm } from '@/components/auth/register-form'

export const metadata: Metadata = {
  title: '建立帳號 | next-supabase-starter',
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">建立帳號</CardTitle>
          <CardDescription>填寫以下資訊以建立您的帳號</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </main>
  )
}
