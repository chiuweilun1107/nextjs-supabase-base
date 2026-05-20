# UI / 後端複用 Audit — QA-Sam dispatch template

> **用途**：用本地基開的專案，每完成一個 UI 或 API 任務，dispatch QA-Sam 複查「複用規範四規則」（規則定義見根目錄 `CLAUDE.md`）。
> **為什麼需要**：CLAUDE.md 的規則是「提醒」（機率性，AI 可能漏）。三層防線補強：

| 層       | 機制                        | 抓什麼                                    | 強度              |
| -------- | --------------------------- | ----------------------------------------- | ----------------- |
| 1 預防   | CLAUDE.md 規則 A/B/C/D      | 全部                                      | 機率性 70-95%     |
| 2 結構擋 | ESLint `BARE_ELEMENT_RULES` | 規則 A（裸 button/input/select/textarea） | **100%**（CI 擋） |
| 3 把關   | **本 template + QA-Sam**    | 規則 B/C/D（ESLint 抓不到的語意重複）     | 語意審查          |

→ ESLint 強在規則 A、抓不到規則 B（重複 JSX）；QA-Sam 讀得懂語意，正好補規則 B 的洞。

---

## Dispatch Prompt（複製下面整段，填入改動檔案清單）

```
審查本次 deliverable 是否符合「複用規範」四規則（定義見專案根目錄 CLAUDE.md）。

改動/新增檔案：{在此填入檔案清單}

實際 Read 這些檔案，逐條 PASS / FAIL + 證據：

【規則 A — 用 shadcn/Radix，不手刻】
- 改動檔案有無裸 <button> <input> <select> <textarea>？（src/components/ui/ 例外）
- 有無從零手刻 dialog / dropdown / tabs / popover 等「互動邏輯」（focus trap/keyboard/aria）？
- 註：裸基礎元件 ESLint 已自動擋；這裡重點複查 ESLint 抓不到的——手刻互動邏輯。

【規則 B — 重複的 UI 立刻抽共通元件】（QA-Sam 的核心職責，ESLint 抓不到）
- 改動檔案「內部」、或與專案「既有檔案」之間，有無結構相同、只差資料/文字的 JSX 重複 ≥ 2 次？
- 若有重複、卻沒抽成 src/components/ 共通元件 → FAIL，指出該抽的 pattern + 出現位置。

【規則 C — API route 走 lib/api 中介層】
- route handler 有無手刻 auth 檢查？（應 requireUser from lib/api/auth）
- 有無手刻 error response？（應用 lib/api/errors 統一格式）
- 有無手刻 JSON parse / 參數驗證？（應 parseBody / parseQuery from lib/api/validation）

【規則 D — 新 entity 照模板、重複邏輯抽 lib/】
- 新功能表有無照「新增 Entity 的完整步驟」複製 notes 模板，而非從零寫？
- 跨 route 重複的 server 邏輯有無抽到 lib/？schema 有無在 lib/schemas/ 定義（非 route 內 inline zod）？

逐條給 PASS / FAIL + 一句證據。末行單獨一行：
CRITIC_VERDICT: PASS   （或 FAIL）
```

---

## 何時用

- 每個 UI 元件 / 頁面任務完成後
- 每個 API route / entity 任務完成後
- 大批改動 commit 前

## 不用 template 也能擋的部分

規則 A 的「裸基礎元件」`npm run lint` 就會 error（CI 自動擋），不必等 QA-Sam。
QA-Sam 的價值在規則 B/C/D —— 特別是規則 B（語意重複），那是只有讀得懂 code 的審查員才抓得到的。
