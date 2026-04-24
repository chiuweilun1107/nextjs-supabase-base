import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'next-supabase-starter',
  description: 'Next.js 15 + Supabase starter template',
  openGraph: {
    title: 'next-supabase-starter',
    description: 'Next.js 15 + Supabase starter template',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
