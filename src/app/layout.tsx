import type { Metadata } from 'next'
import { Source_Serif_4, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'App — nextjs-supabase-base',
  description:
    'A production-ready Next.js 15 + Supabase + shadcn/ui starter. Clone once, own forever.',
  openGraph: {
    title: 'next-supabase-starter',
    description:
      'A production-ready Next.js 15 + Supabase + shadcn/ui starter. Clone once, own forever.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sourceSerif4.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
        style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
