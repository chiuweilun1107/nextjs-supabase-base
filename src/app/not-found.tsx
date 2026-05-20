import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-muted-foreground font-mono text-sm tracking-widest">404</p>
      <h1 className="text-2xl font-semibold">找不到這個頁面</h1>
      <p className="text-muted-foreground max-w-md text-sm">你要找的頁面不存在，或已經被移除。</p>
      <Button asChild>
        <Link href="/dashboard">回到 Dashboard</Link>
      </Button>
    </div>
  )
}
