# nextjs-supabase-base

Next.js 15 + Supabase 全端專案**地基**（base）。每個新專案從這裡開始，不用重接線。

## 這個 repo 是什麼

「接好線的整合骨架」—— auth、資料庫、middleware、Docker、部署設定都已配好並驗證過。
開新專案直接套用，省掉每次重新決定「Supabase 怎麼接 / middleware 怎麼擋 / Docker 怎麼包」。

## 開新專案

這個 repo 是 GitHub Template Repository，**不要直接 clone 來改**，用 template 開新專案：

```bash
gh repo create my-new-app --template chiuweilun1107/nextjs-supabase-base --private
cd my-new-app
npm install
cp .env.example .env.local   # 填入 Supabase 金鑰
npm run dev
```

## 內含

| 層     | 內容                                                                                |
| ------ | ----------------------------------------------------------------------------------- |
| Auth   | login / register / callback / forgot-password，Supabase Auth + RLS                  |
| 後端   | API 中介層（errors / auth / logger / validation）、CRUD 範例（notes / attachments） |
| 資料庫 | Supabase migrations + RLS policy                                                    |
| 前端   | shadcn/ui 元件、dashboard 骨架、error / not-found 頁                                |
| DevOps | Dockerfile、docker-compose、Cloudflare Tunnel、deploy.sh、CI workflow               |
| 工程   | ESLint + Prettier + husky pre-commit + vitest                                       |

## 不含（按需自己加）

UI 版面零件（blocks）、後端功能模組（multi-tenant / RBAC / payment）—— 這些是「傢俱」，
專案開好後按需從對應 registry 取用，不塞進地基。

## 指令

```bash
npm run dev          # 開發
npm run build        # 建置
npm run lint         # ESLint
npm run type-check   # TypeScript 檢查
npm test             # vitest
npm run format       # Prettier
```
