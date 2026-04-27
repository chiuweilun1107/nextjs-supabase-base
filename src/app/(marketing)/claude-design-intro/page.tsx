import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  MessageSquare,
  Sliders,
  MonitorSmartphone,
  Layers,
  Share2,
  Download,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'

const features = [
  {
    label: 'A',
    num: '01',
    title: '對話即設計',
    desc: '用自然語言描述你想要的畫面、互動與細節，Claude 即時產出可運作的原型，不需要從零開始拼接元件。',
    icon: MessageSquare,
  },
  {
    label: 'B',
    num: '02',
    title: '可即時調整',
    desc: '任何元素都可以再對話、再修改。色彩、字級、間距、排版方向，皆能在不破壞既有結構的前提下重新試驗。',
    icon: Sliders,
  },
  {
    label: 'C',
    num: '03',
    title: '高擬真原型',
    desc: '輸出不是靜態的圖片，而是可以點擊、可以滾動、可以填寫的網頁，能直接拿給工程師、客戶與使用者測試。',
    icon: MonitorSmartphone,
  },
  {
    label: 'D',
    num: '04',
    title: '設計系統相容',
    desc: '匯入既有的元件庫、設計 Token 或截圖，Claude 會延續你品牌的視覺語彙，而不是創造一套新的風格。',
    icon: Layers,
  },
  {
    label: 'E',
    num: '05',
    title: '即時可分享',
    desc: '每一份設計都會生成可分享的連結。團隊可以在原型上留言、提出修改，討論直接發生在設計本身上。',
    icon: Share2,
  },
  {
    label: 'F',
    num: '06',
    title: '匯出為多種格式',
    desc: '完成後可輸出為靜態 HTML、PDF、PPTX 或交付給 Claude Code 的工程包，銜接後續的開發與發布流程。',
    icon: Download,
  },
]

const steps = [
  {
    num: 'i',
    title: '開始一段對話',
    desc: '描述你正在解決的問題，或貼上參考圖片、設計系統的連結。Claude 會先問清楚、確認情境後再動手。',
  },
  {
    num: 'ii',
    title: '取得初版設計',
    desc: 'Claude 會直接生成可瀏覽的網頁，並標註它做了哪些假設。你可以立即點擊、滾動、操作。',
  },
  {
    num: 'iii',
    title: '以對話迭代',
    desc: '指出哪裡需要修改：「字級再大一點」「換一個更柔和的綠」「把這頁改成行動裝置版」——皆以一句話解決。',
  },
  {
    num: 'iv',
    title: '開啟可調整面板',
    desc: '用內建的 Tweaks 面板即時切換顏色、字體、版面，不需重新生成。',
  },
  {
    num: 'v',
    title: '分享與交付',
    desc: '複製連結給夥伴，或匯出為 PDF、PPTX、單檔 HTML，亦可直接交給 Claude Code 進入開發階段。',
  },
]

const cases = [
  {
    tag: '產品設計',
    title: '用一個下午，探索十種登入頁。',
    desc: '快速生成多個變體，並排比較版面、色彩、語氣，找出最適合品牌的方向。',
  },
  {
    tag: '使用者研究',
    title: '把訪談洞察變成可測試的原型。',
    desc: '將訪談筆記直接餵給 Claude，產出可點擊的流程，立刻拿去做下一輪可用性測試。',
  },
  {
    tag: '提案簡報',
    title: '從文件草稿，到完整視覺簡報。',
    desc: '上傳 PRD 或一頁式說明，Claude 會幫你生成有節奏、有圖文層次的中文簡報。',
  },
  {
    tag: '設計系統',
    title: '延續品牌語彙，而不是重新發明。',
    desc: '匯入現有的 Token 與元件，Claude 會嚴格遵循、不會擅自加入新的視覺。',
  },
]

export default function ClaudeDesignIntroPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Nav */}
      <nav className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-tight">Claude Design</span>
            <span className="text-xs text-stone-400">使用介紹 · 2026</span>
          </div>
          <Button asChild size="sm" className="bg-orange-600 text-white hover:bg-orange-700">
            <a href="https://claude.ai/design" target="_blank" rel="noopener noreferrer">
              START <ArrowRight className="ml-1 h-3 w-3" />
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-20">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest text-stone-400 uppercase">A Field Guide</span>
          <Separator orientation="vertical" className="h-4" />
          <span className="font-mono text-xs text-stone-400">索引 · 00 — 04</span>
        </div>
        <h1 className="mb-8 text-6xl font-bold leading-tight tracking-tight text-stone-900">
          讓 Claude
          <br />
          成為你的
          <br />
          <span className="text-orange-600">設計夥伴。</span>
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-stone-400">關於</p>
            <p className="text-sm leading-relaxed text-stone-600">
              一份從零開始、循序漸進的 Claude Design 使用指南。專為設計師、產品經理與創作者所撰寫。
            </p>
          </div>
          <div>
            <p className="mb-4 leading-relaxed text-stone-700">
              從一句話的構想，到可以點擊的高擬真原型——Claude Design
              把對話變成設計的草稿、把草稿變成可以分享的成品。它不取代你的審美，而是把繁瑣的執行交給機器，讓你專注在判斷與品味。
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <a href="https://claude.ai/design" target="_blank" rel="noopener noreferrer">
                  立即開始
                </a>
              </Button>
              <Button variant="ghost" asChild className="text-stone-600">
                <a href="#workflow">
                  觀看流程示範 <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-5xl px-6" />

      {/* 01 功能總覽 */}
      <section id="capabilities" className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 font-mono text-xs tracking-widest text-orange-600 uppercase">01 / 功能總覽</p>
          <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight">
            六項核心能力，<br />讓設計與想法同步發生。
          </h2>
          <p className="mx-auto max-w-xl text-stone-600">
            Claude Design 不是一個畫圖工具，而是一個會理解情境、會持續修改、會輸出可用成品的設計協作者。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <Card key={f.num} className="border-stone-200 bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-xs font-bold text-stone-500">
                      {f.label}
                    </div>
                    <span className="font-mono text-xs text-stone-300">{f.num}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-orange-600" />
                    <h3 className="font-semibold text-stone-900">{f.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-stone-600">{f.desc}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <Separator className="mx-auto max-w-5xl px-6" />

      {/* 02 使用流程 */}
      <section id="workflow" className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 font-mono text-xs tracking-widest text-orange-600 uppercase">02 / 使用流程</p>
          <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight">
            五個步驟，<br />從想法到成品。
          </h2>
          <p className="mx-auto max-w-xl text-stone-600">
            每一個步驟都圍繞著一件事——「再說一次，再改一次」。Claude 會記住前後脈絡，讓你的迭代不會斷裂。
          </p>
        </div>
        <div className="space-y-4">
          {steps.map((s, i) => (
            <div key={s.num} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-orange-200 bg-orange-50 font-mono text-sm font-semibold text-orange-600">
                  {s.num}
                </div>
                {i < steps.length - 1 && <div className="mt-2 h-full w-px bg-stone-200" />}
              </div>
              <div className="pb-8">
                <h4 className="mb-1 font-semibold text-stone-900">{s.title}</h4>
                <p className="text-sm leading-relaxed text-stone-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-stone-900 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <blockquote className="text-3xl font-light leading-relaxed tracking-tight md:text-4xl">
            「設計的瓶頸從來不是想法，而是
            <span className="font-semibold text-orange-400">執行的速度</span>。」
          </blockquote>
          <p className="mt-6 text-sm text-stone-400">— 設計師手記 · 2026</p>
        </div>
      </section>

      {/* 03 應用情境 */}
      <section id="cases" className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 font-mono text-xs tracking-widest text-orange-600 uppercase">03 / 應用情境</p>
          <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight">
            適合每一個<br />需要快速產出的人。
          </h2>
          <p className="mx-auto max-w-xl text-stone-600">
            不只是設計師。產品經理、研究員、創辦人——任何把「腦中的畫面」轉成「可分享的成品」是日常工作的人，都能受益。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cases.map((c) => (
            <Card key={c.tag} className="group border-stone-200 bg-white transition-shadow hover:shadow-md">
              <CardContent className="pt-6">
                <Badge variant="secondary" className="mb-3 bg-orange-50 text-orange-600 hover:bg-orange-100">
                  {c.tag}
                </Badge>
                <h4 className="mb-2 text-lg font-semibold leading-snug text-stone-900">{c.title}</h4>
                <p className="mb-4 text-sm leading-relaxed text-stone-600">{c.desc}</p>
                <Button variant="ghost" size="sm" asChild className="px-0 text-orange-600 hover:text-orange-700">
                  <a href="https://claude.ai/design" target="_blank" rel="noopener noreferrer">
                    了解更多 <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="mx-auto max-w-5xl px-6" />

      {/* 04 CTA */}
      <section id="start" className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="mb-3 font-mono text-xs tracking-widest text-orange-600 uppercase">04 / 開始使用</p>
        <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight">
          下一個設計，<br />從一句「我想要⋯」開始。
        </h2>
        <p className="mx-auto mb-8 max-w-md text-stone-600">
          開啟一段對話，描述你正在做的事。Claude Design 會接住其餘的細節。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
            <a href="https://claude.ai/design" target="_blank" rel="noopener noreferrer">
              前往 Claude Design <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href="https://support.claude.com/en/articles/14604416-get-started-with-claude-design"
              target="_blank"
              rel="noopener noreferrer"
            >
              閱讀完整指南
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-stone-100">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8">
          <div>
            <p className="font-semibold text-stone-900">Claude Design</p>
            <p className="text-xs text-stone-400">© 2026 / VOL.01 · by Anthropic Labs</p>
          </div>
          <div className="flex gap-6 text-sm text-stone-500">
            <a
              href="https://support.claude.com/en/articles/14604416-get-started-with-claude-design"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900"
            >
              文件
            </a>
            <a href="https://claude.ai/design" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900">
              範例
            </a>
            <a
              href="https://notebooklm.google.com/notebook/f81d8456-8251-46ba-9345-baaea192ee02"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900"
            >
              NotebookLM 研究
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
