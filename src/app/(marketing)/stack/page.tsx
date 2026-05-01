'use client'

import { useState, useEffect, useRef } from 'react'

/* ============================================================
 * Stack page — design-ref: stack.html
 * Layout: left sticky TOC (220px) + right content (max 680px)
 * 4 sections with inline interactive demos
 * ============================================================ */

const sections = [
  {
    id: 'nextjs',
    num: '01',
    kicker: '01 · Framework',
    label: 'Next.js 15',
    headline: 'Next.js 15',
    summary: 'Server Components, streaming, and the App Router — configured the way you\'d configure them after six months of pain.',
    bullets: [
      { text: 'App Router with parallel routes and intercepting modals', key: 'app/' },
      { text: 'Streaming SSR + React Server Components by default', key: '' },
      { text: 'Typed route handlers with zod-validated inputs', key: '/api/*' },
      { text: 'Edge + Node runtime examples wired side-by-side', key: '' },
    ],
    demo: 'approuter',
  },
  {
    id: 'supabase',
    num: '02',
    kicker: '02 · Database & Auth',
    label: 'Supabase',
    headline: 'Supabase',
    summary: 'Postgres, auth, realtime, and storage from one client. Row-level security wired in from the first migration.',
    bullets: [
      { text: 'Email + OAuth auth with refresh-token rotation', key: '' },
      { text: 'Migrations managed via the Supabase CLI', key: 'supabase/migrations' },
      { text: 'Type-safe client generated from schema', key: 'database.types.ts' },
      { text: 'Realtime channels and broadcast helpers ready to import', key: '' },
    ],
    demo: 'rls',
  },
  {
    id: 'shadcn',
    num: '03',
    kicker: '03 · Components',
    label: 'shadcn/ui',
    headline: 'shadcn/ui',
    summary: 'Components live in your repo, not your node_modules. Read the source, edit a className, ship.',
    bullets: [
      { text: '40+ Radix-based primitives, fully themeable', key: '' },
      { text: 'Variants typed via cva — no className spaghetti', key: '' },
      { text: 'Dark mode controlled by a single class on', key: 'html.dark' },
      { text: 'Forms wired to react-hook-form + zod from the start', key: '' },
    ],
    demo: 'buttons',
  },
  {
    id: 'tailwind',
    num: '04',
    kicker: '04 · Styling',
    label: 'Tailwind v4',
    headline: 'Tailwind v4',
    summary: 'CSS-first configuration, no tailwind.config.js. Tokens live in @theme blocks alongside your CSS.',
    bullets: [
      { text: 'OKLCH color tokens, perceptually-uniform palettes', key: '' },
      { text: 'Container queries + cascade layers configured by default', key: '' },
      { text: 'Native CSS variables — your brand tokens are real CSS vars', key: '' },
      { text: '5x faster compiles vs. v3 on a cold cache', key: '' },
    ],
    demo: 'tokens',
  },
]

export default function StackPage() {
  const [activeSection, setActiveSection] = useState('nextjs')
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Page header */}
      <div
        className="mx-auto px-6"
        style={{
          maxWidth: 'var(--ds-container-max)',
          paddingTop: 'var(--ds-space-12)',
          paddingBottom: 'var(--ds-space-10)',
        }}
      >
        <p
          className="mb-5"
          style={{
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--ds-text-muted)',
          }}
        >
          Stack details · v0.1.0
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
            fontWeight: 'var(--ds-headline-weight, 400)',
            fontSize: 'clamp(40px, 5.5vw, 72px)',
            lineHeight: '1.0',
            letterSpacing: '-0.025em',
            color: 'var(--ds-text-primary)',
            maxWidth: '760px',
          }}
        >
          Four pieces.
          <br />
          Production-ready out of the box.
        </h1>
        <p
          className="mt-5"
          style={{
            fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
            fontSize: '18px',
            lineHeight: '1.6',
            color: 'var(--ds-text-secondary)',
            maxWidth: 'var(--ds-reading-max)',
          }}
        >
          Each layer of the stack was chosen for one reason: durability. Below is what&rsquo;s bundled, why, and a small interactive demo of the API surface you&rsquo;ll touch most.
        </p>
      </div>

      {/* TOC + Content grid */}
      <div
        className="mx-auto px-6"
        style={{
          maxWidth: 'var(--ds-container-max)',
          paddingBottom: 'var(--ds-space-12)',
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: 'var(--ds-space-10)',
        }}
      >
        {/* Sticky TOC */}
        <aside
          style={{
            position: 'sticky',
            top: '84px',
            alignSelf: 'start',
            paddingRight: 'var(--ds-space-5)',
            borderRight: '1px solid var(--ds-border-subtle)',
            maxHeight: 'calc(100vh - 100px)',
          }}
        >
          <p
            className="mb-4"
            style={{
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--ds-text-muted)',
            }}
          >
            On this page
          </p>
          <ol className="list-none p-0 m-0 flex flex-col gap-3">
            {sections.map(s => (
              <li key={s.id}>
                <button
                  onClick={() => scrollTo(s.id)}
                  className="flex items-baseline gap-3 w-full text-left transition-colors"
                  style={{
                    fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                    fontSize: '14px',
                    color: activeSection === s.id ? 'var(--ds-text-primary)' : 'var(--ds-text-secondary)',
                    padding: '4px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    transitionDuration: 'var(--ds-duration-fast)',
                  }}
                >
                  {activeSection === s.id && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: '-25px',
                        top: '50%',
                        width: '16px',
                        height: '1px',
                        backgroundColor: 'var(--ds-accent)',
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                      fontSize: '10px',
                      color: 'var(--ds-text-muted)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {s.num}
                  </span>
                  <span>{s.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        {/* Content */}
        <main style={{ maxWidth: 'var(--ds-reading-max)' }}>
          {sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              ref={el => { sectionRefs.current[s.id] = el }}
              style={{
                padding: `var(--ds-space-12) 0`,
                paddingTop: i === 0 ? '0' : undefined,
                borderBottom: '1px solid var(--ds-border-subtle)',
              }}
            >
              <p
                className="mb-3"
                style={{
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--ds-accent)',
                }}
              >
                {s.kicker}
              </p>
              <h2
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                  fontSize: 'clamp(22px, 2.5vw, 32px)',
                  fontWeight: 500,
                  lineHeight: '1.2',
                  letterSpacing: '-0.01em',
                  color: 'var(--ds-text-primary)',
                }}
              >
                {s.headline}
              </h2>
              <p
                className="mb-6"
                style={{
                  fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
                  fontWeight: 400,
                  fontSize: '22px',
                  lineHeight: '1.4',
                  letterSpacing: '-0.01em',
                  color: 'var(--ds-text-secondary)',
                }}
              >
                {s.summary}
              </p>

              {/* Bullets */}
              <ul className="list-none p-0 m-0 mb-8 flex flex-col gap-3">
                {s.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    className="flex gap-3 items-baseline"
                    style={{
                      fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                      fontSize: '15px',
                      color: 'var(--ds-text-primary)',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: '6px',
                        height: '6px',
                        marginTop: '8px',
                        borderRadius: 'var(--ds-radius-full)',
                        backgroundColor: 'var(--ds-accent)',
                        opacity: 0.5,
                      }}
                    />
                    <span>
                      {b.text}
                      {b.key && (
                        <code
                          style={{
                            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                            fontSize: '12px',
                            color: 'var(--ds-text-muted)',
                            marginLeft: '6px',
                          }}
                        >
                          {b.key}
                        </code>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Interactive demo */}
              <div
                className="mt-5 rounded-xl overflow-hidden"
                style={{
                  border: '1px solid var(--ds-border)',
                  backgroundColor: 'var(--ds-surface)',
                  padding: 'var(--ds-space-5)',
                }}
              >
                <p
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                    fontSize: '10px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--ds-text-muted)',
                  }}
                >
                  {s.demo === 'approuter' && 'File structure · interactive'}
                  {s.demo === 'rls' && 'Row-level security · live policy'}
                  {s.demo === 'buttons' && 'Button variants · interactive'}
                  {s.demo === 'tokens' && 'Token viewer · hover a swatch'}
                </p>
                <MiniDemo type={s.demo} />
              </div>
            </section>
          ))}
        </main>
      </div>
    </>
  )
}

/* ---- Demo components ---- */

function MiniDemo({ type }: { type: string }) {
  if (type === 'approuter') return <AppRouterDemo />
  if (type === 'rls') return <RlsDemo />
  if (type === 'buttons') return <ButtonsDemo />
  if (type === 'tokens') return <TokensDemo />
  return null
}

const APP_TREES: Record<string, Array<{ prefix: string; name: string; dir: boolean; depth: number; meta?: string }>> = {
  app: [
    { prefix: '', name: 'app/', dir: true, depth: 0 },
    { prefix: '│', name: 'layout.tsx', dir: false, depth: 1, meta: 'root layout' },
    { prefix: '│', name: 'page.tsx', dir: false, depth: 1, meta: 'home' },
    { prefix: '├', name: '(marketing)', dir: true, depth: 1, meta: 'route group' },
    { prefix: '│', name: 'page.tsx', dir: false, depth: 2 },
    { prefix: '├', name: 'dashboard', dir: true, depth: 1 },
    { prefix: '│', name: 'layout.tsx', dir: false, depth: 2, meta: 'protected' },
    { prefix: '│', name: 'page.tsx', dir: false, depth: 2 },
    { prefix: '└', name: 'api', dir: true, depth: 1 },
    { prefix: '  ', name: 'auth/route.ts', dir: false, depth: 2 },
  ],
  pages: [
    { prefix: '', name: 'pages/', dir: true, depth: 0 },
    { prefix: '│', name: '_app.tsx', dir: false, depth: 1 },
    { prefix: '│', name: '_document.tsx', dir: false, depth: 1 },
    { prefix: '│', name: 'index.tsx', dir: false, depth: 1, meta: 'home' },
    { prefix: '├', name: 'dashboard', dir: true, depth: 1 },
    { prefix: '│', name: 'index.tsx', dir: false, depth: 2 },
    { prefix: '└', name: 'api', dir: true, depth: 1 },
    { prefix: '  ', name: 'auth.ts', dir: false, depth: 2 },
  ],
}

function AppRouterDemo() {
  const [tab, setTab] = useState<'app' | 'pages'>('app')
  return (
    <div>
      {/* Tabs */}
      <div
        className="flex mb-4"
        style={{ borderBottom: '1px solid var(--ds-border-subtle)' }}
      >
        {(['app', 'pages'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="relative transition-colors"
            style={{
              padding: '10px 16px',
              background: 'transparent',
              border: 'none',
              fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
              fontSize: '13px',
              fontWeight: 500,
              color: tab === t ? 'var(--ds-text-primary)' : 'var(--ds-text-muted)',
              cursor: 'pointer',
              transitionDuration: 'var(--ds-duration-fast)',
            }}
          >
            {t === 'app' ? 'App Router' : 'Pages Router'}
            {tab === t && (
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: '-1px',
                  height: '1px',
                  backgroundColor: 'var(--ds-accent)',
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* File tree */}
      <div
        style={{
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          fontSize: '13px',
          lineHeight: '1.7',
          color: 'var(--ds-text-primary)',
        }}
      >
        {APP_TREES[tab].map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              style={{
                display: 'inline-block',
                width: `${row.depth * 14}px`,
                flexShrink: 0,
              }}
            />
            <span style={{ color: 'var(--ds-text-muted)', userSelect: 'none' }}>{row.prefix}</span>
            <span style={{ color: row.dir ? 'var(--ds-accent)' : 'var(--ds-text-primary)' }}>
              {row.name}
            </span>
            {row.meta && (
              <span
                style={{
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: '11px',
                  color: 'var(--ds-text-muted)',
                  marginLeft: '6px',
                }}
              >
                · {row.meta}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function RlsDemo() {
  const [enabled, setEnabled] = useState(true)

  const sqlOn = `ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owners only"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);`

  const sqlOff = `-- RLS disabled: ALL rows are public.
-- Anyone can read any row.
SELECT * FROM posts; -- returns everything`

  return (
    <div>
      {/* Toggle row */}
      <div
        className="flex items-center justify-between rounded-lg p-4 mb-4"
        style={{
          backgroundColor: 'var(--ds-surface-raised)',
          border: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div className="flex flex-col gap-0.5">
          <span
            style={{
              fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--ds-text-primary)',
            }}
          >
            Enable RLS on <code style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: '12px' }}>posts</code>
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
              fontSize: '12px',
              color: 'var(--ds-text-muted)',
            }}
          >
            When on, only owners can read their own rows.
          </span>
        </div>
        <button
          onClick={() => setEnabled(e => !e)}
          role="switch"
          aria-checked={enabled}
          style={{
            position: 'relative',
            width: '36px',
            height: '20px',
            borderRadius: 'var(--ds-radius-full)',
            border: 'none',
            backgroundColor: enabled ? 'var(--ds-accent)' : 'var(--ds-border)',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background-color var(--ds-duration-fast) var(--ds-ease-out)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '2px',
              left: enabled ? '18px' : '2px',
              width: '16px',
              height: '16px',
              borderRadius: 'var(--ds-radius-full)',
              backgroundColor: '#fff',
              transition: 'left var(--ds-duration-fast) var(--ds-ease-out)',
            }}
          />
        </button>
      </div>

      {/* SQL block */}
      <div
        className="rounded-lg overflow-x-auto"
        style={{
          backgroundColor: 'var(--ds-code-bg)',
          padding: 'var(--ds-space-4)',
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          fontSize: '13px',
          lineHeight: '1.7',
          minHeight: '130px',
          opacity: enabled ? 1 : 0.5,
          transition: 'opacity 200ms',
        }}
      >
        <pre style={{ margin: 0, color: 'var(--ds-text-primary)' }}>
          {enabled ? sqlOn : sqlOff}
        </pre>
      </div>
      {!enabled && (
        <p
          className="mt-3 text-xs"
          style={{
            fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
            color: 'var(--ds-accent)',
          }}
        >
          Warning: all rows are publicly readable.
        </p>
      )}
    </div>
  )
}

function ButtonsDemo() {
  return (
    <div>
      <div className="flex flex-wrap gap-3 items-center justify-center py-5">
        {[
          { label: 'Get started', variant: 'default' },
          { label: 'Learn more', variant: 'outline' },
          { label: 'Skip', variant: 'ghost' },
        ].map(({ label, variant }) => (
          <button
            key={label}
            className="transition-transform hover:scale-[1.02]"
            style={{
              padding: '10px 18px',
              fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.01em',
              borderRadius: 'var(--ds-radius-md)',
              border: variant === 'outline' ? '1px solid var(--ds-border)' : '1px solid transparent',
              backgroundColor:
                variant === 'default' ? 'var(--ds-text-primary)' :
                variant === 'ghost' ? 'transparent' :
                'transparent',
              color:
                variant === 'default' ? 'var(--ds-bg)' :
                'var(--ds-text-primary)',
              cursor: 'pointer',
              transitionDuration: 'var(--ds-duration-fast)',
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-2">
        {['default', 'outline', 'ghost'].map(v => (
          <span
            key={v}
            style={{
              flex: 1,
              maxWidth: '120px',
              textAlign: 'center',
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              fontSize: '11px',
              color: 'var(--ds-text-muted)',
            }}
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  )
}

const tokenSwatches = [
  { name: '--ds-bg', hex: '#FAFAF8', label: 'Background' },
  { name: '--ds-surface', hex: '#F5F4F1', label: 'Surface' },
  { name: '--ds-border', hex: '#E4E2DB', label: 'Border' },
  { name: '--ds-accent', hex: '#CC785C', label: 'Accent' },
  { name: '--ds-text-primary', hex: '#1A1917', label: 'Heading' },
  { name: '--ds-text-secondary', hex: '#6B6860', label: 'Body' },
  { name: '--ds-text-muted', hex: '#9E9B95', label: 'Muted' },
  { name: '--ds-code-bg', hex: '#F0EEE9', label: 'Code bg' },
]

function TokensDemo() {
  const [active, setActive] = useState(tokenSwatches[3])

  return (
    <div>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(72px, 1fr))', marginBottom: 'var(--ds-space-5)' }}
      >
        {tokenSwatches.map(t => (
          <button
            key={t.name}
            onClick={() => setActive(t)}
            className="flex flex-col gap-2 transition-transform hover:-translate-y-0.5"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <span
              style={{
                display: 'block',
                width: '100%',
                aspectRatio: '1.6',
                borderRadius: 'var(--ds-radius-md)',
                backgroundColor: t.hex,
                border: `1px solid ${active.name === t.name ? 'var(--ds-accent)' : 'var(--ds-border-subtle)'}`,
                boxShadow: active.name === t.name ? 'var(--ds-shadow-focus)' : 'none',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                fontSize: '11px',
                color: 'var(--ds-text-secondary)',
              }}
            >
              {t.label}
            </span>
          </button>
        ))}
      </div>
      <div
        className="flex items-center justify-between gap-4 rounded-lg"
        style={{
          padding: 'var(--ds-space-4)',
          backgroundColor: 'var(--ds-code-bg)',
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          fontSize: '13px',
        }}
      >
        <span style={{ color: 'var(--ds-accent)' }}>{active.name}</span>
        <span style={{ color: 'var(--ds-text-secondary)' }}>{active.hex}</span>
        <span
          style={{
            width: '28px',
            height: '28px',
            borderRadius: 'var(--ds-radius-sm)',
            backgroundColor: active.hex,
            border: '1px solid var(--ds-border-subtle)',
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  )
}
