'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">發生未預期的錯誤</h1>
      <p className="text-muted-foreground max-w-md text-sm">
        {error.message || '系統暫時無法處理這個請求。'}
        {error.digest && (
          <span className="mt-1 block font-mono text-xs opacity-60">digest: {error.digest}</span>
        )}
      </p>
      <Button onClick={reset}>重試</Button>
    </div>
  )
}
