'use client'

import React, { useState } from 'react'
import { ScrollReveal } from '@/components/marketing/scroll-reveal'

/* ============================================================
 * Preview page — design-ref: preview.html
 * Shows a mock dashboard with header/sidebar/stats/chart
 * + floating chat bubble
 * ============================================================ */

const statCards = [
  { label: 'Total users', value: '2,841', delta: '+12%' },
  { label: 'Active today', value: '147', delta: '+3%' },
  { label: 'New this week', value: '382', delta: '+18%' },
]

const chartData = [28, 35, 42, 31, 48, 52, 45, 60, 58, 67, 72, 65, 78, 82, 75, 88, 84, 91, 87, 95, 89, 98, 92, 105, 99, 112, 108, 115, 110, 120]

type ChatMessage = { role: 'user' | 'ai'; text: string }

export default function PreviewPage() {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: 'Hi — this is a mock dashboard powered by the starter. What would you like to build?' },
  ])

  const send = () => {
    if (!chatInput.trim()) return
    setMessages(m => [
      ...m,
      { role: 'user', text: chatInput },
      { role: 'ai', text: 'This is a placeholder response. Wire in your Supabase query and AI handler.' },
    ])
    setChatInput('')
  }

  return (
    <div
      className="mx-auto px-6"
      style={{ maxWidth: 'var(--ds-container-max)', paddingTop: 'var(--ds-space-6)' }}
    >
      {/* Info banner */}
      <div
        className="mb-6 flex items-center justify-center gap-2 rounded-lg text-sm"
        style={{
          backgroundColor: 'var(--ds-accent-subtle)',
          borderBottom: '1px solid var(--ds-border-subtle)',
          padding: '12px 24px',
          fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
          fontSize: '12px',
          color: 'var(--ds-text-secondary)',
        }}
      >
        <span
          className="inline-block rounded-full"
          style={{ width: '6px', height: '6px', backgroundColor: 'var(--ds-accent)', flexShrink: 0 }}
          aria-hidden="true"
        />
        This is a static preview of the dashboard included in the starter.
        <a
          href="/handoff"
          style={{
            color: 'var(--ds-text-primary)',
            borderBottom: '1px solid var(--ds-border)',
            marginLeft: '12px',
          }}
        >
          Learn about handoff →
        </a>
      </div>

      {/* Page header */}
      <ScrollReveal>
        <p
          className="mb-2 text-center uppercase"
          style={{
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            fontSize: '11px',
            letterSpacing: '0.16em',
            color: 'var(--ds-text-muted)',
          }}
        >
          Live preview
        </p>
        <h1
          className="mb-4 text-center"
          style={{
            fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
            fontWeight: 'var(--ds-headline-weight, 400)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: '1.0',
            letterSpacing: '-0.025em',
            color: 'var(--ds-text-primary)',
          }}
        >
          What ships on day one.
        </h1>
        <p
          className="mx-auto mb-8 text-center"
          style={{
            fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
            fontSize: '18px',
            lineHeight: '1.6',
            color: 'var(--ds-text-secondary)',
            maxWidth: '540px',
          }}
        >
          Auth, profile, and structured data access — wired from the first commit.
        </p>
      </ScrollReveal>

      {/* Dashboard mock */}
      <ScrollReveal delay={100}>
        <div
          className="overflow-hidden rounded-xl"
          style={{
            border: '1px solid var(--ds-border)',
            backgroundColor: 'var(--ds-surface-raised)',
            display: 'grid',
            gridTemplateColumns: '220px 1fr',
            gridTemplateRows: '56px 1fr',
            minHeight: '720px',
            boxShadow: 'var(--ds-shadow-md)',
            marginBottom: 'var(--ds-space-12)',
          }}
        >
          {/* Dashboard header — full width */}
          <DashHeader />

          {/* Sidebar */}
          <DashSidebar />

          {/* Main content */}
          <DashMain statCards={statCards} chartData={chartData} />
        </div>
      </ScrollReveal>

      {/* Floating chat bubble */}
      <ChatBubble
        open={chatOpen}
        onToggle={() => setChatOpen(v => !v)}
        messages={messages}
        input={chatInput}
        onInputChange={setChatInput}
        onSend={send}
      />
    </div>
  )
}

/* ---- Sub-components ---- */

function DashHeader() {
  const navItems = ['Overview', 'Analytics', 'Users', 'Settings']

  return (
    <header
      className="flex items-center justify-between px-5"
      style={{
        gridColumn: '1 / -1',
        borderBottom: '1px solid var(--ds-border-subtle)',
        backgroundColor: 'var(--ds-bg)',
      }}
    >
      {/* Left: logo + nav */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-[22px] h-[22px] rounded"
            style={{
              backgroundColor: 'var(--ds-text-primary)',
              fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
              fontSize: '13px',
              color: 'var(--ds-bg)',
            }}
            aria-hidden="true"
          >
            N
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
              fontWeight: 500,
              fontSize: '13px',
              color: 'var(--ds-text-primary)',
            }}
          >
            my-app
          </span>
        </div>

        <nav className="flex gap-5" aria-label="Dashboard navigation">
          {navItems.map((label, i) => (
            <a
              key={label}
              href="#"
              aria-current={i === 0 ? 'page' : undefined}
              className="relative"
              style={{
                fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                fontSize: '13px',
                fontWeight: 500,
                color: i === 0 ? 'var(--ds-text-primary)' : 'var(--ds-text-muted)',
                padding: '6px 0',
                textDecoration: 'none',
              }}
              onClick={e => e.preventDefault()}
            >
              {label}
              {i === 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: '-19px',
                    height: '1px',
                    backgroundColor: 'var(--ds-accent)',
                  }}
                />
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* Right: search + avatar */}
      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-1.5"
          style={{
            backgroundColor: 'var(--ds-surface)',
            border: '1px solid var(--ds-border-subtle)',
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            fontSize: '12px',
            color: 'var(--ds-text-muted)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          Search
        </div>
        <div
          className="flex items-center justify-center w-7 h-7 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #c9c5bb, #a09d97)',
            border: '1px solid var(--ds-border)',
            fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
            fontSize: '12px',
            color: 'var(--ds-text-primary)',
          }}
          aria-label="User avatar"
        >
          A
        </div>
      </div>
    </header>
  )
}

function DashSidebar() {
  const groups = [
    {
      label: 'Main',
      items: [
        { label: 'Overview', active: true, icon: 'grid' },
        { label: 'Analytics', active: false, icon: 'bar-chart' },
        { label: 'Users', active: false, icon: 'users' },
      ],
    },
    {
      label: 'Account',
      items: [
        { label: 'Settings', active: false, icon: 'settings' },
        { label: 'Profile', active: false, icon: 'user' },
      ],
    },
  ]

  return (
    <nav
      className="flex flex-col p-4 gap-5"
      style={{
        borderRight: '1px solid var(--ds-border-subtle)',
        backgroundColor: 'var(--ds-bg)',
      }}
      aria-label="Sidebar navigation"
    >
      {groups.map(group => (
        <div key={group.label}>
          <p
            className="px-2 mb-3"
            style={{
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--ds-text-muted)',
            }}
          >
            {group.label}
          </p>
          <div className="flex flex-col gap-0.5">
            {group.items.map(item => (
              <button
                key={item.label}
                className="flex items-center gap-2.5 rounded text-left transition-colors"
                style={{
                  padding: '8px 10px',
                  fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: item.active ? 'var(--ds-text-primary)' : 'var(--ds-text-secondary)',
                  backgroundColor: item.active ? 'var(--ds-accent-subtle)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transitionDuration: 'var(--ds-duration-fast)',
                }}
                aria-current={item.active ? 'page' : undefined}
              >
                <NavIcon name={item.icon} active={item.active} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}

function NavIcon({ name, active }: { name: string; active: boolean }) {
  const color = active ? 'var(--ds-accent)' : 'var(--ds-text-muted)'
  const icons: Record<string, React.ReactElement> = {
    grid: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    'bar-chart': (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    users: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    settings: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    user: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  }
  return icons[name] ?? null
}

function DashMain({
  statCards,
  chartData,
}: {
  statCards: { label: string; value: string; delta: string }[]
  chartData: number[]
}) {
  const [chartPeriod, setChartPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  return (
    <div
      className="overflow-auto"
      style={{ padding: 'var(--ds-space-6)' }}
    >
      {/* Head row */}
      <div
        className="flex items-end justify-between flex-wrap gap-4 mb-6"
      >
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
              fontWeight: 400,
              fontSize: '36px',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: 'var(--ds-text-primary)',
            }}
          >
            Overview
          </h2>
          <p
            className="mt-1.5"
            style={{
              fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
              fontSize: '13px',
              color: 'var(--ds-text-muted)',
            }}
          >
            Last updated: just now
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="rounded-lg px-3.5 py-2 text-xs font-medium transition-all"
            style={{
              fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
              fontSize: '13px',
              fontWeight: 500,
              border: '1px solid var(--ds-border)',
              backgroundColor: 'transparent',
              color: 'var(--ds-text-primary)',
              cursor: 'pointer',
            }}
          >
            Export
          </button>
          <button
            className="rounded-lg px-3.5 py-2 text-xs font-medium transition-all"
            style={{
              fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
              fontSize: '13px',
              fontWeight: 500,
              border: '1px solid var(--ds-text-primary)',
              backgroundColor: 'var(--ds-text-primary)',
              color: 'var(--ds-bg)',
              cursor: 'pointer',
            }}
          >
            + New
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div
        className="mb-6"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--ds-space-5)',
        }}
      >
        {statCards.map(card => (
          <div
            key={card.label}
            className="transition-shadow hover:shadow-sm rounded-xl"
            style={{
              border: '1px solid var(--ds-border)',
              padding: 'var(--ds-space-5)',
              backgroundColor: 'var(--ds-bg)',
            }}
          >
            <p
              className="mb-3 uppercase"
              style={{
                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                fontSize: '10px',
                letterSpacing: '0.16em',
                color: 'var(--ds-text-muted)',
              }}
            >
              {card.label}
            </p>
            <p
              className="mb-3"
              style={{
                fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
                fontWeight: 400,
                fontSize: '44px',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: 'var(--ds-text-primary)',
              }}
            >
              {card.value}
            </p>
            <span
              className="inline-flex items-center gap-1.5"
              style={{
                fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                fontSize: '12px',
                color: 'var(--ds-accent)',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              {card.delta}
              <span style={{ color: 'var(--ds-text-muted)' }}>vs last period</span>
            </span>
          </div>
        ))}
      </div>

      {/* Chart card */}
      <div
        className="rounded-xl"
        style={{
          border: '1px solid var(--ds-border)',
          padding: 'var(--ds-space-5)',
          backgroundColor: 'var(--ds-bg)',
        }}
      >
        <div className="flex items-end justify-between flex-wrap gap-4 mb-5">
          <div>
            <p
              className="mb-1.5 uppercase"
              style={{
                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                fontSize: '10px',
                letterSpacing: '0.16em',
                color: 'var(--ds-text-muted)',
              }}
            >
              Active users
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                fontSize: '18px',
                fontWeight: 500,
                color: 'var(--ds-text-primary)',
              }}
            >
              Growth trend
            </h3>
          </div>
          <div
            className="flex overflow-hidden rounded-lg"
            style={{ border: '1px solid var(--ds-border)' }}
          >
            {(['7d', '30d', '90d'] as const).map(p => (
              <button
                key={p}
                onClick={() => setChartPeriod(p)}
                style={{
                  padding: '6px 14px',
                  background: chartPeriod === p ? 'var(--ds-accent-subtle)' : 'transparent',
                  border: 'none',
                  borderLeft: p !== '7d' ? '1px solid var(--ds-border)' : 'none',
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: '11px',
                  color: chartPeriod === p ? 'var(--ds-accent)' : 'var(--ds-text-muted)',
                  cursor: 'pointer',
                  transition: 'all var(--ds-duration-fast) var(--ds-ease-out)',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <SparklineChart data={chartData} />
      </div>
    </div>
  )
}

function SparklineChart({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min
  const W = 600
  const H = 80
  const pad = 4

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (W - pad * 2) + pad
    const y = H - pad - ((v - min) / range) * (H - pad * 2)
    return `${x},${y}`
  })

  const area = [`${pad},${H - pad}`, ...pts, `${W - pad},${H - pad}`].join(' ')

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: '80px' }} aria-label="Active users chart" role="img">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ds-accent)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--ds-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#sparkGrad)" />
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke="var(--ds-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChatBubble({
  open,
  onToggle,
  messages,
  input,
  onInputChange,
  onSend,
}: {
  open: boolean
  onToggle: () => void
  messages: ChatMessage[]
  input: string
  onInputChange: (v: string) => void
  onSend: () => void
}) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      {open && (
        <div
          className="mb-3 flex flex-col overflow-hidden rounded-xl shadow-lg"
          style={{
            width: '320px',
            backgroundColor: 'var(--ds-surface-raised)',
            border: '1px solid var(--ds-border)',
          }}
        >
          {/* Chat header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ backgroundColor: 'var(--ds-text-primary)' }}
          >
            <span
              className="text-sm font-medium text-white"
              style={{ fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)' }}
            >
              AI Assistant
            </span>
            <button
              onClick={onToggle}
              className="text-white opacity-70 hover:opacity-100"
              aria-label="Close chat"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 space-y-3 overflow-y-auto p-4"
            style={{ maxHeight: '240px' }}
            aria-live="polite"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[80%] rounded-lg px-3 py-2"
                  style={{
                    fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    backgroundColor: m.role === 'user' ? 'var(--ds-accent)' : 'var(--ds-surface)',
                    color: m.role === 'user' ? 'white' : 'var(--ds-text-primary)',
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            className="flex gap-2 p-3"
            style={{ borderTop: '1px solid var(--ds-border)' }}
          >
            <input
              value={input}
              onChange={e => onInputChange(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onSend()}
              placeholder="Ask anything…"
              className="flex-1 rounded bg-transparent px-3 py-2 text-xs outline-none"
              style={{
                fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                color: 'var(--ds-text-primary)',
                border: '1px solid var(--ds-border)',
              }}
              aria-label="Chat message input"
            />
            <button
              onClick={onSend}
              className="rounded px-3 py-2 text-xs text-white"
              style={{
                backgroundColor: 'var(--ds-accent)',
                fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
              }}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105"
        style={{ backgroundColor: 'var(--ds-text-primary)' }}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>
    </div>
  )
}
