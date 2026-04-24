'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const registerSchema = z
  .object({
    email: z.string().email('請輸入有效的電子郵件'),
    password: z.string().min(8, '密碼至少需要 8 個字元'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '兩次輸入的密碼不一致',
    path: ['confirmPassword'],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: RegisterFormValues) {
    setIsLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: signUpError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        setError('此電子郵件已經被註冊，請直接登入。')
      } else {
        setError('註冊失敗，請稍後再試。')
      }
      setIsLoading(false)
      return
    }

    setIsSuccess(true)
    setIsLoading(false)
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <CheckCircle className="h-12 w-12 text-green-500" aria-hidden="true" />
        <h3 className="text-lg font-semibold">請查收確認信</h3>
        <p className="text-sm text-muted-foreground">
          我們已將確認連結寄至您的電子郵件信箱，請點擊連結完成註冊。
        </p>
        <Link href="/login" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          返回登入
        </Link>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>電子郵件</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密碼</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>確認密碼</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <p className="text-sm font-medium text-destructive" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" aria-hidden="true" />}
          建立帳號
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          已有帳號？{' '}
          <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            立即登入
          </Link>
        </p>
      </form>
    </Form>
  )
}
