# nextjs-supabase-base — Claude Code 慣例說明

## 技術棧版本

| 套件            | 版本                             |
| --------------- | -------------------------------- |
| Next.js         | ^15.0.0 (App Router)             |
| React           | ^19.0.0                          |
| TypeScript      | ^5.0.0 (strict mode)             |
| Tailwind CSS    | ^4.0.0                           |
| shadcn/ui       | 手動安裝（components.json 設定） |
| Supabase JS     | ^2.45.0                          |
| @supabase/ssr   | ^0.5.0                           |
| react-hook-form | ^7.53.0                          |
| zod             | ^3.23.0                          |

## 目錄結構

```
src/
├── app/
│   ├── (auth)/              # 未登入路由群組（login, register, auth/callback）
│   ├── (dashboard)/         # 登入後路由群組（dashboard）
│   └── api/
│       ├── notes/           # CRUD 範例（萬用模板，開新 entity 複製這個）
│       │   ├── route.ts     # GET 列表 / POST 新增
│       │   └── [id]/route.ts # GET 單筆 / PATCH 修改 / DELETE
│       └── attachments/     # 檔案上傳範例
│           ├── route.ts     # GET 列表 / POST 上傳（multipart）
│           └── [id]/route.ts # GET signed URL / DELETE
├── components/
│   ├── ui/                  # shadcn/ui 基礎元件
│   ├── auth/                # 身份驗證相關元件
│   └── blocks/
│       ├── NavBar.tsx       # 固定頂部導航（'use client'，含 active state + mobile hamburger）
│       └── Footer.tsx       # 多欄頁腳（品牌名 + tagline + 連結欄 + 版權）
└── lib/
    ├── supabase/
    │   ├── client.ts        # Browser Client（Client Component 用）
    │   ├── server.ts        # Server Client（Server Component / Route Handler 用）
    │   ├── admin.ts         # Admin Client（service role，僅 server-side 使用）
    │   └── database.types.ts # 自動產生（npm run db:types），勿手動修改
    ├── api/
    │   ├── errors.ts        # 統一 API 錯誤回應格式
    │   ├── validation.ts    # zod parse helpers（parseBody / parseQuery）
    │   ├── auth.ts          # requireUser() — Route Handler 取得登入使用者
    │   └── logger.ts        # JSON logger + requestId()
    ├── schemas/
    │   ├── _template.ts     # 新 entity 的 zod schema 範本
    │   └── note.ts          # notes 的 zod schemas
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

## Blocks 使用方式（NavBar / Footer）

`src/components/blocks/` 是佈局積木，直接放進 layout.tsx 即用。

### NavBar

```tsx
import { NavBar } from '@/components/blocks/NavBar'

// layout.tsx 範例
;<NavBar
  brandMark="MY APP"
  links={[
    { label: '功能', href: '/features' },
    { label: '定價', href: '/pricing' },
  ]}
  cta={{ label: '開始使用', href: '/register' }}
/>
```

- `'use client'`（使用 `usePathname` + `useState`）
- 固定置頂，自動 active state，手機版含 hamburger
- 全用 `hsl(var(--*))` shadcn CSS 變數，切 dark mode 自動適配

### Footer

```tsx
import { Footer, FooterColumn } from '@/components/blocks/Footer'

const columns: FooterColumn[] = [
  { heading: '產品', links: [{ label: '功能', href: '/features' }] },
  { heading: '資源', links: [{ label: '文件', href: '/docs' }] },
]

<Footer
  brandMark="MY APP"
  tagline="讓工作更輕鬆的 SaaS 工具。"
  columns={columns}
  legal={`© ${new Date().getFullYear()} My App. All rights reserved.`}
/>
```

- Server Component（無 `'use client'`）
- 2 col brand + 最多 3 col 連結欄
- `legal` 選填

### 典型 layout 結構

```tsx
// src/app/(site)/layout.tsx
import { NavBar } from '@/components/blocks/NavBar'
import { Footer } from '@/components/blocks/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar brandMark="MY APP" links={[...]} cta={{ label: '登入', href: '/login' }} />
      <main className="flex-1 pt-16">{children}</main>
      <Footer brandMark="MY APP" columns={[...]} />
    </div>
  )
}
```

> `pt-16` 補齊 NavBar 固定高度（h-16 = 64px）。

---

## 新增 Entity 的完整步驟（萬用 CRUD）

每次要加新功能表（例如 `tasks`、`bugs`、`documents`），照這 4 步走：

**1. 建 Migration**
複製 `supabase/migrations/002_notes.sql`，改名為下一個編號（例如 `005_tasks.sql`）。
把所有 `notes` 改成你的表名（`tasks`），調整欄位。

**2. 建 Zod Schema**
複製 `src/lib/schemas/note.ts`，改名為 `task.ts`，調整欄位定義。

**3. 建 API Routes**
把 `src/app/api/notes/` 整個資料夾複製為 `src/app/api/tasks/`。
把所有 `note` / `notes` / `createNoteSchema` / `updateNoteSchema` 替換成對應的 `task` 版本。

**4. 產生 TypeScript Types**

```bash
npm run db:types
```

執行完後 `src/lib/supabase/database.types.ts` 會自動更新，型別即時可用。

---

## 檔案上傳使用方式

前置作業：在 Supabase Dashboard > Storage，建立名為 `attachments` 的 **private** bucket。

```bash
# 上傳（multipart/form-data，欄位名：file）
curl -X POST http://localhost:3000/api/attachments \
  -H "Cookie: <session-cookie>" \
  -F "file=@/path/to/file.pdf"

# 取得下載連結（有效 1 小時）
curl http://localhost:3000/api/attachments/<id> \
  -H "Cookie: <session-cookie>"

# 刪除
curl -X DELETE http://localhost:3000/api/attachments/<id> \
  -H "Cookie: <session-cookie>"
```

---

## API 錯誤回應格式

所有 API 錯誤統一使用以下格式：

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "資料格式錯誤",
    "details": { "title": ["標題必填"] }
  }
}
```

常見 HTTP 狀態碼對應：

- `400` — 請求格式錯誤
- `401` — 未登入
- `403` — 權限不足
- `404` — 資源不存在
- `409` — 資料衝突
- `422` — 資料驗證失敗（欄位錯誤詳情在 `details`）
- `500` — 伺服器錯誤

---

## 環境變數（完整說明）

```
NEXT_PUBLIC_SUPABASE_URL=       # Supabase 專案 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Supabase anon key（前後端都可用）
SUPABASE_SERVICE_ROLE_KEY=      # service role key（僅 server-side，admin.ts 用）
NEXT_PUBLIC_APP_URL=            # 應用程式公開 URL
```

`admin.ts` 使用 `SUPABASE_SERVICE_ROLE_KEY`，可以繞過 RLS，適合：

- 後台管理操作
- Webhook 接收（外部服務觸發的寫入）
- 跨使用者操作

---

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

| 需求     | 使用                                                                    |
| -------- | ----------------------------------------------------------------------- |
| 按鈕     | `<Button>` from `@/components/ui/button`                                |
| 輸入框   | `<Input>` from `@/components/ui/input`                                  |
| 表單     | `<Form>` + `<FormField>` from `@/components/ui/form`                    |
| 標籤     | `<Label>` from `@/components/ui/label`                                  |
| 卡片     | `<Card>` / `<CardHeader>` / `<CardContent>` from `@/components/ui/card` |
| 頁籤     | `<Tabs>` / `<TabsList>` / `<TabsTrigger>` from `@/components/ui/tabs`   |
| 對話框   | `<Dialog>` from `@/components/ui/dialog`                                |
| 下拉選單 | `<Select>` from `@/components/ui/select`                                |
| 提示訊息 | `<Toast>` / `useToast` from `@/components/ui/toast`                     |
| 徽章     | `<Badge>` from `@/components/ui/badge`                                  |
| 分隔線   | `<Separator>` from `@/components/ui/separator`                          |
| 載入動畫 | shadcn skeleton 或 lucide `<Loader2 className="animate-spin">`          |

新增 shadcn 元件：`npx shadcn@latest add <component>`

## 開發規範

- TypeScript strict mode，禁止使用 `any`
- 組件用具名匯出（named export），頁面用預設匯出（default export）
- Server Component 優先，必要時才加 `'use client'`
- 表單驗證統一用 `zod` + `react-hook-form`
- 圖示統一用 `lucide-react`，禁止使用 emoji 或特殊字元作圖示
- UI 文字使用繁體中文
- Section 標題置中（`text-center`），不用左邊 border-l 豎條裝飾
