# nextjs-supabase-base

> Next.js 15 + Supabase 全端專案地基。AI coding agent 進此專案，先讀本檔。
> 本檔為 [AGENTS.md](https://agents.md) 跨工具標準格式；`CLAUDE.md` 是指向本檔的 symlink（Claude Code 相容）。

---

## ⚠️ 複用規範（強制 — 最重要，先讀）

四條硬規則。違反 = 不合格。規則 A 由 ESLint 自動強制（`npm run lint` 會 error）；B/C/D 靠 code review / QA audit（見 `docs/qa-ui-reuse-audit.md`）。

### 規則 A — 前端用 shadcn/ui，不手刻

所有 UI 元件必須用 shadcn/ui（底層 Radix UI primitives），不得自己刻或用其他 UI library。

- 要某個元件 → 先找 `@/components/ui/`
- `@/components/ui/` 沒有 → `npx shadcn@latest add <component>` 裝官方版
- shadcn 沒提供、但需要無障礙互動邏輯（focus trap / keyboard / aria）→ `npm install @radix-ui/react-<x>` 裝底層 primitive 自加 Tailwind 樣式（Radix 是 npm package，無 CLI；多數情況 `npx shadcn add` 自動裝好依賴的 Radix primitive）
- **永遠禁止**從零手刻 button / input / dialog / dropdown / tabs 等基礎互動元件的互動邏輯

| 需求     | 使用                                                           |
| -------- | -------------------------------------------------------------- |
| 按鈕     | `<Button>` from `@/components/ui/button`                       |
| 輸入框   | `<Input>` from `@/components/ui/input`                         |
| 表單     | `<Form>` + `<FormField>` from `@/components/ui/form`           |
| 標籤     | `<Label>` from `@/components/ui/label`                         |
| 卡片     | `<Card>` 系列 from `@/components/ui/card`                      |
| 頁籤     | `<Tabs>` 系列 from `@/components/ui/tabs`                      |
| 對話框   | `<Dialog>` from `@/components/ui/dialog`                       |
| 下拉選單 | `<Select>` from `@/components/ui/select`                       |
| 提示訊息 | `toast()` from `sonner`（`<Toaster>` 已掛在 layout.tsx）       |
| 載入動畫 | shadcn skeleton 或 lucide `<Loader2 className="animate-spin">` |

### 規則 B — 重複的 UI 立刻抽共通元件

同一個 UI pattern 出現**第 2 次** → 立刻抽成 `src/components/` 共通元件，第 3 處起一律 import，禁止複製貼上。

- 判準：兩段 JSX 結構相同、只有資料/文字不同 → 該抽
- 抽出的元件放 `src/components/{領域}/`（例：`src/components/notes/note-card.tsx`），具名匯出、props 介面明確、brand-agnostic
- 抽完回頭把原本重複處全換成 import

### 規則 C — API route 一律走 lib/api 中介層，不手刻

Route Handler 禁止手刻 auth 檢查 / error response / 參數驗證：

| 需求              | 用                                                       | 不准                                        |
| ----------------- | -------------------------------------------------------- | ------------------------------------------- |
| 取登入使用者      | `requireUser()` from `lib/api/auth`                      | 自己 `supabase.auth.getUser()` + 手寫 401   |
| 解析/驗證 request | `parseBody()` / `parseQuery()` from `lib/api/validation` | 手刻 try-catch JSON.parse                   |
| 回錯誤            | `lib/api/errors` 統一格式                                | 自己 `NextResponse.json({error}, {status})` |
| 記 log            | `logger` + `requestId()` from `lib/api/logger`           | `console.log`                               |

### 規則 D — 新 entity 照模板複製，重複邏輯抽 lib/

- 新功能表照下方「新增 Entity 的完整步驟」複製 `notes` 模板，不從零寫 route
- 跨 route 重複的 server 邏輯（共用查詢 / 權限判斷）→ 抽到 `lib/`，route 只做 orchestration
- schema 一律 `lib/schemas/` 定義（複製 `_template.ts`），不在 route 內 inline zod

---

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

## 專案特有結構

App Router 標準慣例（`(auth)` / `(dashboard)` 路由群組、`api/*/route.ts`）不贅述。以下是本地基**特有、AI 需知道**的部分：

```
src/lib/
├── supabase/
│   ├── client.ts        # Browser Client（Client Component 用）
│   ├── server.ts        # Server Client（Server Component / Route Handler 用）
│   ├── admin.ts         # Admin Client（service role，繞過 RLS，僅 server-side）
│   └── database.types.ts # 自動產生（npm run db:types），勿手改
├── api/                 # 規則 C 的中介層 — route 一律走這裡
│   ├── errors.ts        # 統一 API 錯誤回應格式
│   ├── validation.ts    # parseBody / parseQuery（zod helpers）
│   ├── auth.ts          # requireUser()
│   └── logger.ts        # JSON logger + requestId()
└── schemas/
    ├── _template.ts     # 新 entity 的 zod schema 範本
    └── note.ts          # notes 的 zod schemas

src/app/api/
├── notes/               # CRUD 範例 = 萬用模板，開新 entity 複製這個
└── attachments/         # 檔案上傳範例（multipart + signed URL）
```

## 環境變數

複製 `.env.example` 為 `.env.local`（Docker 部署則複製為 `.env`），填入：

```
NEXT_PUBLIC_SUPABASE_URL=       # Supabase 專案 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Supabase anon key（前後端都可用）
SUPABASE_SERVICE_ROLE_KEY=      # service role key（僅 server-side，admin.ts 用，繞過 RLS）
NEXT_PUBLIC_APP_URL=            # 應用程式公開 URL（本機 http://localhost:3000）
```

`admin.ts` 用 `SUPABASE_SERVICE_ROLE_KEY` 繞過 RLS，適合：後台管理操作、Webhook 接收、跨使用者操作。

## Supabase 資料表慣例

### profiles 表

使用者在 `auth.users` 建立時，透過 trigger 自動在 `public.profiles` 建對應紀錄：

```sql
public.profiles (
  id uuid references auth.users,  -- 主鍵，與 auth.users.id 一對一
  email text, display_name text, avatar_url text,
  created_at timestamptz, updated_at timestamptz
)
```

RLS 啟用：使用者只能讀/更新自己的 profile。Migration 在 `supabase/migrations/001_init.sql`。

### 新增資料表命名慣例

- 表名複數小寫（`posts`, `comments`）
- 外鍵命名 `{table_singular}_id`
- 時間欄位統一 `timestamptz`
- 新資料表必須啟用 RLS

## 新增 Entity 的完整步驟（萬用 CRUD）

加新功能表（`tasks` / `bugs` / `documents`）照 4 步：

1. **建 Migration** — 複製 `supabase/migrations/002_notes.sql`，改名下一編號（如 `005_tasks.sql`），`notes` 全改成你的表名，調欄位。
2. **建 Zod Schema** — 複製 `src/lib/schemas/note.ts` 為 `task.ts`，調欄位。
3. **建 API Routes** — 複製整個 `src/app/api/notes/` 為 `src/app/api/tasks/`，`note`/`notes`/`createNoteSchema`/`updateNoteSchema` 全替換成 `task` 版。
4. **產生 Types** — `npm run db:types`，`database.types.ts` 自動更新。

## 檔案上傳

前置：Supabase Dashboard > Storage 建名為 `attachments` 的 **private** bucket。

```bash
# 上傳（multipart/form-data，欄位名 file）
curl -X POST http://localhost:3000/api/attachments -H "Cookie: <session>" -F "file=@/path/file.pdf"
# 取下載連結（有效 1 小時）
curl http://localhost:3000/api/attachments/<id> -H "Cookie: <session>"
# 刪除
curl -X DELETE http://localhost:3000/api/attachments/<id> -H "Cookie: <session>"
```

## API 錯誤回應格式

所有 API 錯誤統一格式（由 `lib/api/errors` 產生）：

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "資料格式錯誤",
    "details": { "title": ["標題必填"] }
  }
}
```

狀態碼：`400` 格式錯 / `401` 未登入 / `403` 權限不足 / `404` 不存在 / `409` 衝突 / `422` 驗證失敗（詳情在 `details`）/ `500` 伺服器錯誤。

## 路由保護

`middleware.ts` 負責：`/dashboard/*` 需登入（未登入導 `/login`）；`/login` `/register` 已登入導 `/dashboard`。

## 部署流程

```bash
# 本機開發
cp .env.example .env.local   # 填憑證
npm install && npm run dev

# Docker
cp .env.example .env         # 填憑證
docker compose up -d

# Mac Mini / VPS（git pull → docker compose build → up -d）
./deploy.sh

# Cloudflare Tunnel：複製 cloudflare-tunnel/config.yml.example 為 config.yml，填 Tunnel ID + hostname
```

## 開發規範

- TypeScript strict mode，禁用 `any`
- 組件具名匯出（named export），頁面預設匯出（default export）
- Server Component 優先，必要才加 `'use client'`
- 表單驗證統一 `zod` + `react-hook-form`
- 圖示統一 `lucide-react`，禁用 emoji 或特殊字元當圖示
- UI 文字用繁體中文
