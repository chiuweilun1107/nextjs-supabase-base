# next-supabase-starter — Claude Code 慣例說明

## 技術棧版本

| 套件 | 版本 |
|------|------|
| Next.js | ^15.0.0 (App Router) |
| React | ^19.0.0 |
| TypeScript | ^5.0.0 (strict mode) |
| Tailwind CSS | ^4.0.0 |
| shadcn/ui | 手動安裝（components.json 設定） |
| Supabase JS | ^2.45.0 |
| @supabase/ssr | ^0.5.0 |
| react-hook-form | ^7.53.0 |
| zod | ^3.23.0 |

## 目錄結構

```
src/
├── app/                     # Next.js App Router 頁面
│   ├── (auth)/              # 未登入路由群組（login, register, auth/callback）
│   └── (dashboard)/         # 登入後路由群組（dashboard）
├── components/
│   ├── ui/                  # shadcn/ui 基礎元件
│   └── auth/                # 身份驗證相關元件
└── lib/
    ├── supabase/
    │   ├── client.ts        # Browser Client（Client Component 用）
    │   └── server.ts        # Server Client（Server Component / Route Handler 用）
    └── utils.ts             # cn() 工具函式
```

## 環境變數

複製 `.env.example` 為 `.env.local` 並填入以下值：

```
NEXT_PUBLIC_SUPABASE_URL=       # Supabase 專案 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Supabase anon public key
SUPABASE_SERVICE_ROLE_KEY=      # Supabase service role key（僅伺服器端使用）
NEXT_PUBLIC_APP_URL=            # 應用程式公開 URL（本機開發用 http://localhost:3000）
```

## Supabase 資料表慣例

### profiles 表

每個使用者在 `auth.users` 建立時，透過 trigger 自動在 `public.profiles` 建立對應紀錄。

```sql
public.profiles (
  id uuid references auth.users,  -- 主鍵，與 auth.users.id 一對一
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz,
  updated_at timestamptz
)
```

- RLS 啟用：使用者只能讀取與更新自己的 profile
- Migration 檔在 `supabase/migrations/001_init.sql`

### 新增資料表命名慣例

- 表名用複數小寫（`posts`, `comments`）
- 外鍵命名為 `{table_singular}_id`
- 時間欄位統一用 `timestamptz`
- 新資料表必須啟用 RLS

## 路由保護

`middleware.ts` 負責所有路由保護：

- `/dashboard/*` — 需要登入，未登入導向 `/login`
- `/login`, `/register` — 已登入導向 `/dashboard`

## 部署流程

### 本機開發

```bash
cp .env.example .env.local
# 填入 Supabase 憑證
npm install
npm run dev
```

### Docker 部署

```bash
cp .env.example .env
# 填入 Supabase 憑證
docker compose up -d
```

### Mac Mini / VPS 部署

```bash
./deploy.sh
```

`deploy.sh` 執行：git pull → docker compose build → docker compose up -d

### Cloudflare Tunnel

複製 `cloudflare-tunnel/config.yml.example` 為 `config.yml`，填入 Tunnel ID 與 hostname。

## UI 元件規範（強制）

**所有 UI 元件必須使用 shadcn/ui，不得自己刻或用其他 UI library。**

| 需求 | 使用 |
|------|------|
| 按鈕 | `<Button>` from `@/components/ui/button` |
| 輸入框 | `<Input>` from `@/components/ui/input` |
| 表單 | `<Form>` + `<FormField>` from `@/components/ui/form` |
| 標籤 | `<Label>` from `@/components/ui/label` |
| 卡片 | `<Card>` / `<CardHeader>` / `<CardContent>` from `@/components/ui/card` |
| 頁籤 | `<Tabs>` / `<TabsList>` / `<TabsTrigger>` from `@/components/ui/tabs` |
| 對話框 | `<Dialog>` from `@/components/ui/dialog` |
| 下拉選單 | `<Select>` from `@/components/ui/select` |
| 提示訊息 | `<Toast>` / `useToast` from `@/components/ui/toast` |
| 徽章 | `<Badge>` from `@/components/ui/badge` |
| 分隔線 | `<Separator>` from `@/components/ui/separator` |
| 載入動畫 | shadcn skeleton 或 lucide `<Loader2 className="animate-spin">` |

新增 shadcn 元件：`npx shadcn@latest add <component>`

## 開發規範

- TypeScript strict mode，禁止使用 `any`
- 組件用具名匯出（named export），頁面用預設匯出（default export）
- Server Component 優先，必要時才加 `'use client'`
- 表單驗證統一用 `zod` + `react-hook-form`
- 圖示統一用 `lucide-react`，禁止使用 emoji 或特殊字元作圖示
- UI 文字使用繁體中文
- Section 標題置中（`text-center`），不用左邊 border-l 豎條裝飾
