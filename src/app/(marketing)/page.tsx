'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import { HeroComposeControls } from '@/components/marketing/hero-compose-controls'
import { TweaksPanel } from '@/components/marketing/tweaks-panel'
import { ScrollReveal } from '@/components/marketing/scroll-reveal'

const ThreeScene = dynamic(
  () => import('@/components/marketing/three-scene').then(m => m.ThreeScene),
  { ssr: false },
)

const stackItems = [
  { num: '01', label: 'Next.js 15' },
  { num: '02', label: 'Supabase' },
  { num: '03', label: 'shadcn/ui' },
  { num: '04', label: 'Tailwind v4' },
]

const reasons = [
  {
    num: '01',
    title: 'Production defaults, not demo code.',
    body: 'Auth, RLS policies, error boundaries, structured logging, and email handlers wired in from the first commit. You start where most projects end up after a month.',
  },
  {
    num: '02',
    title: 'Owned, not rented.',
    body: 'shadcn/ui means components live in your repo, not a node_modules black box. Read the source, edit one className, ship — no upstream PR, no vendor lock-in.',
  },
  {
    num: '03',
    title: 'Designed for AI handoff.',
    body: 'A single DESIGN.md is the source of truth for tokens. Pair it with Claude Code and the gap between "wireframe" and "merged PR" collapses to a coffee break.',
  },
]

type FormKind = 'oct' | 'ico' | 'knot'
type AtmKind = 'sparse' | 'balanced' | 'dense'

export default function LandingPage() {
  const [rotationSpeed, setRotationSpeed] = useState(3)
  const [mood, setMood] = useState(0.5)
  const [form, setForm] = useState<FormKind>('oct')
  const [atmosphere, setAtmosphere] = useState<AtmKind>('balanced')

  return (
    <>
      {/* ---- HERO ---- */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: 'calc(100vh - 60px)',
          display: 'grid',
          placeItems: 'center',
          padding: 'var(--ds-space-16) var(--ds-space-6)',
        }}
      >
        {/* WebGL canvas */}
        <div className="absolute inset-0 pointer-events-none">
          <ThreeScene rotationSpeed={rotationSpeed} mood={mood} form={form} atmosphere={atmosphere} className="h-full w-full" />
        </div>

        {/* Hero content */}
        <div
          className="relative text-center"
          style={{ maxWidth: '980px', zIndex: 2 }}
        >
          {/* Eyebrow */}
          <p
            className="flex items-center justify-center gap-2 mb-6"
            style={{
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--ds-text-muted)',
            }}
          >
            <span
              className="inline-block rounded-full"
              style={{ width: '6px', height: '6px', backgroundColor: 'var(--ds-accent)', flexShrink: 0 }}
              aria-hidden="true"
            />
            NEXT.JS · SUPABASE · SHADCN/UI · TAILWIND v4
          </p>

          {/* Headline */}
          <h1
            className="mb-6"
            style={{
              fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
              fontWeight: 'var(--ds-headline-weight, 400)',
              fontSize: 'clamp(56px, 8vw, 112px)',
              lineHeight: '0.95',
              letterSpacing: '-0.025em',
              color: 'var(--ds-text-primary)',
            }}
          >
            Build faster.
            <br />
            Ship with{' '}
            <em
              style={{
                fontStyle: 'italic',
                color: 'var(--ds-accent)',
                letterSpacing: '-0.02em',
              }}
            >
              confidence
            </em>
            .
          </h1>

          {/* Subtitle */}
          <p
            className="mx-auto mb-8"
            style={{
              fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
              fontSize: '18px',
              lineHeight: '1.6',
              color: 'var(--ds-text-secondary)',
              maxWidth: '600px',
            }}
          >
            A production-ready Next.js 15 + Supabase + shadcn/ui starter.
            <br />
            Clone once, own forever.
          </p>

          {/* CTA row */}
          <div className="inline-flex items-center gap-5">
            <Link
              href="/stack"
              className="inline-flex items-center gap-2 rounded-[8px] px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.02]"
              style={{
                fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                border: '1px solid var(--ds-border)',
                color: 'var(--ds-text-primary)',
                backgroundColor: 'transparent',
                transitionDuration: 'var(--ds-duration-fast)',
              }}
            >
              Clone the starter
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </Link>
            <span
              style={{
                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                fontSize: '12px',
                color: 'var(--ds-text-muted)',
              }}
            >
              MIT · 0 dependencies extra
            </span>
          </div>
        </div>

        {/* Compose Controls — bottom-left, desktop only */}
        <HeroComposeControls
          onMoodChange={setMood}
          onFormChange={setForm}
          onAtmosphereChange={setAtmosphere}
        />
      </section>

      {/* ---- STACK STRIP ---- */}
      <div
        style={{
          borderTop: '1px solid var(--ds-border-subtle)',
          borderBottom: '1px solid var(--ds-border-subtle)',
          padding: 'var(--ds-space-5) 0',
        }}
      >
        <div
          className="mx-auto flex flex-wrap items-center justify-between gap-6 px-6"
          style={{ maxWidth: 'var(--ds-container-max)' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--ds-text-muted)',
            }}
          >
            The stack
          </span>
          <div className="flex flex-wrap gap-8">
            {stackItems.map(({ num, label }) => (
              <span
                key={num}
                style={{
                  fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
                  fontSize: '22px',
                  letterSpacing: '-0.01em',
                  color: 'var(--ds-text-primary)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    color: 'var(--ds-text-muted)',
                    verticalAlign: 'super',
                    marginRight: '6px',
                  }}
                >
                  {num}
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---- WHY THIS STACK ---- */}
      <section style={{ padding: 'var(--ds-space-16) 0' }}>
        {/* Heading block */}
        <ScrollReveal>
          <div
            className="mx-auto mb-12 grid gap-10 px-6"
            style={{
              maxWidth: 'var(--ds-container-max)',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)',
              alignItems: 'end',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
                fontWeight: 'var(--ds-headline-weight, 400)',
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                lineHeight: '1.05',
                letterSpacing: '-0.025em',
                color: 'var(--ds-text-primary)',
              }}
            >
              Why this stack.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'var(--ds-text-secondary)',
                maxWidth: '480px',
              }}
            >
              Three principles guided every dependency choice. Nothing is here by default — every line was earned.
            </p>
          </div>
        </ScrollReveal>

        {/* Reasons list */}
        <div
          className="mx-auto px-6"
          style={{ maxWidth: 'var(--ds-container-max)' }}
        >
          {reasons.map((r, i) => (
            <ScrollReveal key={r.num} delay={i * 100}>
              <article
                style={{
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr 1.3fr',
                  gap: 'var(--ds-space-8)',
                  alignItems: 'start',
                  padding: 'var(--ds-space-10) 0',
                  borderTop: '1px solid var(--ds-border-subtle)',
                  ...(i === reasons.length - 1 ? { borderBottom: '1px solid var(--ds-border-subtle)' } : {}),
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
                    fontWeight: 400,
                    fontSize: '80px',
                    lineHeight: 1,
                    color: 'var(--ds-accent)',
                    opacity: 0.3,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {r.num}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: '1.25',
                    letterSpacing: '-0.01em',
                    color: 'var(--ds-text-primary)',
                  }}
                >
                  {r.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: 'var(--ds-text-secondary)',
                    maxWidth: '520px',
                  }}
                >
                  {r.body}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ---- GET STARTED ---- */}
      <section style={{ padding: 'var(--ds-space-16) 0 var(--ds-space-12)' }}>
        <div
          className="mx-auto px-6"
          style={{ maxWidth: '880px' }}
        >
          <ScrollReveal>
            <span
              className="block text-center mb-4"
              style={{
                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--ds-text-muted)',
              }}
            >
              Get started
            </span>
            <h2
              className="text-center mb-2"
              style={{
                fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
                fontWeight: 'var(--ds-headline-weight, 400)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                color: 'var(--ds-text-primary)',
              }}
            >
              One command.
            </h2>
            {/* Accent rule */}
            <div
              className="mx-auto"
              style={{
                width: '48px',
                height: '1px',
                backgroundColor: 'var(--ds-accent)',
                margin: 'var(--ds-space-5) auto var(--ds-space-8)',
              }}
            />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <TerminalBlock />
            <p
              className="text-center mt-6"
              style={{
                fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                fontSize: '13px',
                color: 'var(--ds-text-muted)',
              }}
            >
              Then follow the{' '}
              <Link
                href="/stack"
                style={{
                  color: 'var(--ds-text-primary)',
                  borderBottom: '1px solid var(--ds-border)',
                  paddingBottom: '1px',
                }}
              >
                README →
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <TweaksPanel onRotationSpeedChange={setRotationSpeed} />
    </>
  )
}

function TerminalBlock() {
  const cmd = 'npx create-next-app -e github.com/user/next-supabase-starter my-app'
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cmd)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch { /* ignore */ }
  }

  return (
    <div
      className="group relative rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'var(--ds-code-bg)',
        border: '1px solid var(--ds-border-subtle)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4"
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid var(--ds-border-subtle)',
        }}
      >
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--ds-border)' }} />
          <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--ds-border)' }} />
          <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--ds-border)' }} />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            fontSize: '11px',
            color: 'var(--ds-text-muted)',
          }}
        >
          ~/projects · zsh
        </span>
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity rounded"
        style={{
          top: '50px',
          right: '12px',
          padding: '5px 12px',
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          fontSize: '11px',
          color: copied ? 'var(--ds-accent)' : 'var(--ds-text-secondary)',
          backgroundColor: 'var(--ds-surface-raised)',
          border: `1px solid ${copied ? 'var(--ds-accent)' : 'var(--ds-border)'}`,
          transitionDuration: 'var(--ds-duration-fast)',
        }}
        aria-label="Copy command"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>

      {/* Command */}
      <pre
        className="m-0 overflow-x-auto"
        style={{
          padding: 'var(--ds-space-5)',
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          fontSize: '14px',
          lineHeight: '1.7',
          color: 'var(--ds-text-primary)',
          whiteSpace: 'pre',
        }}
      >
        <span style={{ color: 'var(--ds-text-muted)', userSelect: 'none' }}>$ </span>
        <span style={{ color: 'var(--ds-accent)' }}>npx</span>
        {' '}
        <span style={{ color: 'var(--ds-text-secondary)' }}>create-next-app</span>
        {' '}
        <span style={{ color: 'var(--ds-text-secondary)' }}>-e</span>
        {' '}
        <span style={{ color: 'var(--ds-text-primary)' }}>github.com/user/next-supabase-starter</span>
        {' '}
        <span style={{ color: 'var(--ds-text-secondary)' }}>my-app</span>
      </pre>
    </div>
  )
}
