import { redirect } from 'next/navigation'

// 地基根路由：導向 dashboard（middleware 處理未登入 → /login）
export default function RootPage() {
  redirect('/dashboard')
}
