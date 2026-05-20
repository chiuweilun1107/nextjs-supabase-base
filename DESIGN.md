# DESIGN.md — &lt;專案名&gt;

> **⚠️ 本檔目前是空白骨架。** 各段為 `TODO`，尚未針對本專案客製化。
>
> 依 `AGENTS.md` 規則 E：開始任何 UI / 頁面任務前，必須先與用戶跑設計訪談，
> 把本檔各段填滿並經用戶確認，才能開工。**嚴禁跳過訪談、臆測設計、或沿用其他專案的 DESIGN.md。**
>
> 填寫方式：
>
> - 用戶有參考 URL / 截圖 → 用 `/design-md` skill 萃取設計 DNA 填入
> - 無參考來源 → 互動 Q&A 逐段問出設計原則再填
>
> 填滿後請刪除本提示區塊與所有 `TODO` 標記。

---

## Brand Personality

> TODO — 與用戶確認 2–4 句品牌個性，每句一個核心原則（用於指導所有取捨）。
> 訪談問題範例：這個產品的調性是專業/活潑/沉穩/前衛？面向什麼用戶？要傳達什麼感覺？

1. TODO
2. TODO
3. TODO

---

## Color Tokens

> TODO — 與用戶確認色彩方向後，定義亮/暗兩套色票。
> 每個 token 需 `Hex` + `HSL` + `Usage`。至少涵蓋：背景、表面、邊框、主文字、次文字、
> 弱化文字、品牌 accent（單一）、accent hover、accent 弱化底、程式碼底。
> 訪談問題範例：主色調？品牌 accent 色？走暖色還是冷色？要不要暗色模式？

### Light mode (default)

| Token | Hex  | HSL  | Usage |
| ----- | ---- | ---- | ----- |
| TODO  | TODO | TODO | TODO  |

### Dark mode

| Token | Hex  | HSL  | Usage |
| ----- | ---- | ---- | ----- |
| TODO  | TODO | TODO | TODO  |

---

## Typography

> TODO — 與用戶確認字體後，定義 font stack 與 type scale。
> 訪談問題範例：標題要 serif 還是 sans？走編輯感還是科技感？有指定字體嗎？

### Font stack

| Role               | Font | Fallback |
| ------------------ | ---- | -------- |
| Display / Headline | TODO | TODO     |
| Body / UI          | TODO | TODO     |
| Monospace          | TODO | TODO     |

### Type scale

| Level | Font | Size | Line height | Weight | Usage |
| ----- | ---- | ---- | ----------- | ------ | ----- |
| TODO  | TODO | TODO | TODO        | TODO   | TODO  |

**Rules:** TODO — 字重、letter-spacing、serif/sans 混用禁則等。

---

## Spacing Tokens

> TODO — 定義基準單位與間距階梯（建議 8px 基準）。

Base unit: `TODO`

| Token | Value | Usage |
| ----- | ----- | ----- |
| TODO  | TODO  | TODO  |

---

## Radius Tokens

> TODO — 定義圓角階梯。訪談問題範例：走銳利方正還是圓潤親和？

| Token | Value | Usage |
| ----- | ----- | ----- |
| TODO  | TODO  | TODO  |

---

## Shadow Tokens

> TODO — 定義陰影階梯（含鍵盤 focus ring）。

| Token | Value | Usage |
| ----- | ----- | ----- |
| TODO  | TODO  | TODO  |

---

## Animation Tokens

> TODO — 定義 easing 與 duration token。

| Token | Value | Usage |
| ----- | ----- | ----- |
| TODO  | TODO  | TODO  |

**Rules:** TODO — 動畫須功能性、`prefers-reduced-motion` 處理、禁則等。

---

## Component Principles

> TODO — 針對核心元件各給一張「Do / Don't」對照表（至少 Buttons、Cards、Inputs & Forms）。

### Buttons

| Do   | Don't |
| ---- | ----- |
| TODO | TODO  |

### Cards

| Do   | Don't |
| ---- | ----- |
| TODO | TODO  |

### Inputs & Forms

| Do   | Don't |
| ---- | ----- |
| TODO | TODO  |

---

## Anti-Pattern List (NEVER)

> TODO — 與用戶確認後，列出本專案絕對禁止的設計做法（每條 `NEVER` 開頭）。
> 這段是防 AI 設計陋習的最後防線，務必具體。
> 通用起手式範例：NEVER 用紫色漸層（AI-slop palette）、NEVER 用 emoji 當 UI 圖示、
> NEVER 三欄「icon + 標題 + 兩行描述」feature grid。其餘依專案品牌補。

1. TODO
2. TODO
3. TODO

---

## Layout Principles

> TODO — 定義最大內容寬度、閱讀寬度、section 節奏、grid、斷點、hero 階層等。

- TODO
