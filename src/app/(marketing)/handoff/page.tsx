'use client'

import { useEffect, useRef, useState } from 'react'

/* ============================================================
 * Handoff page — design-ref: handoff.html
 * Three-step horizontal timeline + dark terminal + "What you get"
 * ============================================================ */

const steps = [
  {
    num: 'Step 01',
    title: 'Fork the repo.',
    body: 'One click on GitHub. The starter is yours — branch it, rename it, force-push to a private remote. The license is MIT.',
    icon: 'github',
  },
  {
    num: 'Step 02',
    title: 'Edit DESIGN.md.',
    body: 'Replace the tokens with your brand: colors, type, spacing, radius. One file is the source of truth — every component reads from it.',
    icon: 'file',
  },
  {
    num: 'Step 03',
    title: 'Run Claude Code.',
    body: 'Hand it a link to your design. Claude Code will implement your design — components, pages, polish, tests — and open a PR for review.',
    icon: 'terminal',
  },
]

const whatYouGet = [
  {
    key: 'PR · 1',
    value: 'Components built to match every token',
    detail: 'Every Button, Input, Card, and Layout reads from DESIGN.md tokens. No magic numbers.',
  },
  {
    key: 'PR · 2',
    value: 'Page templates wired to your routes',
    detail: 'Marketing, dashboard, settings — Server Components, suspense boundaries, error states.',
  },
  {
    key: 'PR · 3',
    value: 'Tests + Storybook coverage',
    detail: 'Snapshot tests for every component variant, and a deployable Storybook on Vercel.',
  },
  {
    key: 'PR · 4',
    value: 'A short summary of every decision',
    detail: 'What was added, what was deviated from spec and why, and a list of open questions for review.',
  },
]

export default function HandoffPage() {
  return (
    <>
      {/* Page header — centered */}
      <div
        className="mx-auto text-center px-6"
        style={{
          maxWidth: 'var(--ds-container-max)',
          paddingTop: 'var(--ds-space-12)',
          paddingBottom: 'var(--ds-space-8)',
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
          Handoff · 3 steps · ~5 minutes
        </p>
        <h1
          className="mx-auto mb-5"
          style={{
            fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
            fontWeight: 'var(--ds-headline-weight, 400)',
            fontSize: 'clamp(40px, 6vw, 80px)',
            lineHeight: '1.0',
            letterSpacing: '-0.025em',
            color: 'var(--ds-text-primary)',
            maxWidth: '880px',
          }}
        >
          From design file
          <br />
          to{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--ds-accent)' }}>merged PR</em>.
        </h1>
        <p
          className="mx-auto"
          style={{
            fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
            fontSize: '18px',
            lineHeight: '1.6',
            color: 'var(--ds-text-secondary)',
            maxWidth: '600px',
          }}
        >
          Three steps. The first two take a minute each. The third one writes the code while you make coffee.
        </p>
      </div>

      {/* Timeline wrap */}
      <div
        className="mx-auto px-6"
        style={{
          maxWidth: '1080px',
          paddingTop: 'var(--ds-space-12)',
          paddingBottom: 'var(--ds-space-12)',
        }}
      >
        {/* Three-step horizontal timeline */}
        <TimelineSteps />

        {/* Dark terminal — handoff command */}
        <div className="mt-16">
          <p
            className="mb-3"
            style={{
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--ds-text-muted)',
            }}
          >
            The handoff command
          </p>
          <HandoffTerminal />
        </div>

        {/* What you get */}
        <WhatYouGet />
      </div>
    </>
  )
}

/* ---- Timeline ---- */

function TimelineSteps() {
  const pathRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)
  const [litSteps, setLitSteps] = useState<boolean[]>([false, false, false])

  const reduced =
    typeof window !== 'undefined' &&
    (document.documentElement.classList.contains('reduce-motion') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (reduced) {
      setDrawn(true)
      setLitSteps([true, true, true])
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate line
          setDrawn(true)
          // Stagger step lighting
          const delays = [200, 350, 500]
          delays.forEach((d, i) => {
            setTimeout(() => {
              setLitSteps(prev => {
                const next = [...prev]
                next[i] = true
                return next
              })
            }, d)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <div ref={containerRef} className="relative">
      {/* SVG connector line — desktop only */}
      <div
        className="absolute hidden md:block pointer-events-none"
        style={{ top: '36px', left: 0, right: 0, height: '2px', zIndex: 1 }}
      >
        <svg
          viewBox="0 0 1000 2"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: '2px' }}
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d="M 60 1 L 940 1"
            stroke="var(--ds-accent)"
            strokeWidth="1.5"
            fill="none"
            style={{
              strokeDasharray: '900',
              strokeDashoffset: drawn ? '0' : '900',
              transition: drawn ? 'stroke-dashoffset 600ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            }}
          />
        </svg>
      </div>

      {/* Steps grid */}
      <div
        className="grid gap-12 md:gap-6"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)', position: 'relative', zIndex: 2 }}
      >
        {steps.map((step, i) => (
          <div
            key={step.num}
            className="flex flex-col items-start gap-4"
          >
            {/* Icon box */}
            <div
              className="flex items-center justify-center rounded-xl transition-colors"
              style={{
                width: '72px',
                height: '72px',
                backgroundColor: litSteps[i] ? 'var(--ds-accent-subtle)' : 'var(--ds-bg)',
                border: `1px solid ${litSteps[i] ? 'var(--ds-accent)' : 'var(--ds-border)'}`,
                color: litSteps[i] ? 'var(--ds-accent)' : 'var(--ds-text-primary)',
                transition: 'border-color var(--ds-duration-base) var(--ds-ease-out), color var(--ds-duration-base) var(--ds-ease-out), background-color var(--ds-duration-base) var(--ds-ease-out)',
              }}
              aria-hidden="true"
            >
              <StepIcon name={step.icon} />
            </div>

            {/* Step number */}
            <p
              style={{
                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--ds-text-muted)',
                opacity: litSteps[i] ? 1 : 0,
                transition: 'opacity 400ms var(--ds-ease-out)',
              }}
            >
              {step.num}
            </p>

            {/* Title */}
            <h3
              style={{
                fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
                fontWeight: 'var(--ds-headline-weight, 400)',
                fontSize: '28px',
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
                color: 'var(--ds-text-primary)',
                maxWidth: '280px',
                opacity: litSteps[i] ? 1 : 0,
                transition: 'opacity 400ms var(--ds-ease-out)',
              }}
            >
              {step.title}
            </h3>

            {/* Body */}
            <p
              style={{
                fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                fontSize: '14px',
                lineHeight: '1.55',
                color: 'var(--ds-text-secondary)',
                maxWidth: '280px',
                opacity: litSteps[i] ? 1 : 0,
                transition: 'opacity 400ms 60ms var(--ds-ease-out)',
              }}
            >
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function StepIcon({ name }: { name: string }) {
  if (name === 'github') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
      </svg>
    )
  }
  if (name === 'file') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
      </svg>
    )
  }
  // terminal
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 17 6-6-6-6" />
      <path d="M12 19h8" />
    </svg>
  )
}

/* ---- Dark terminal ---- */

function HandoffTerminal() {
  const cmd = 'npx claude "Fetch my design file and implement it. https://api.anthropic.com/v1/design/h/abc123"'
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
      className="group relative overflow-hidden rounded-xl"
      style={{
        backgroundColor: '#141311',
        border: '1px solid #2E2B26',
        boxShadow: 'var(--ds-shadow-md)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #2E2B26',
        }}
      >
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#2E2B26' }} />
          <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#2E2B26' }} />
          <span className="block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#2E2B26' }} />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            fontSize: '11px',
            color: '#6B6860',
          }}
        >
          ~/my-app · zsh
        </span>
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity rounded"
        style={{
          top: '14px',
          right: '14px',
          padding: '5px 12px',
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          fontSize: '11px',
          color: copied ? '#D98B6E' : '#A09D97',
          backgroundColor: '#1D1B18',
          border: `1px solid ${copied ? '#D98B6E' : '#2E2B26'}`,
          cursor: 'pointer',
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
          fontSize: '13.5px',
          lineHeight: '1.7',
          color: '#F0EDE6',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
        }}
      >
        <span style={{ color: '#6B6860', userSelect: 'none' }}>$ </span>
        <span style={{ color: '#D98B6E' }}>npx</span>
        {' '}
        <span style={{ color: '#A09D97' }}>claude</span>
        {' '}
        <span style={{ color: '#F0EDE6' }}>
          &quot;Fetch my design file and implement it.{' '}
          <span style={{ color: '#D98B6E', opacity: 0.85 }}>
            https://api.anthropic.com/v1/design/h/abc123
          </span>
          &quot;
        </span>
      </pre>
    </div>
  )
}

/* ---- What you get ---- */

function WhatYouGet() {
  return (
    <div
      className="mt-16 grid gap-10"
      style={{ gridTemplateColumns: '1fr 1.4fr', alignItems: 'start' }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
          fontWeight: 'var(--ds-headline-weight, 400)',
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          color: 'var(--ds-text-primary)',
        }}
      >
        What you get back.
      </h2>

      <ul
        className="list-none p-0 m-0 flex flex-col"
        style={{ borderTop: '1px solid var(--ds-border-subtle)' }}
      >
        {whatYouGet.map(item => (
          <li
            key={item.key}
            className="grid gap-5 items-baseline"
            style={{
              gridTemplateColumns: '80px 1fr',
              padding: 'var(--ds-space-5) 0',
              borderBottom: '1px solid var(--ds-border-subtle)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: 'var(--ds-text-muted)',
              }}
            >
              {item.key}
            </span>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                  fontSize: '15px',
                  color: 'var(--ds-text-primary)',
                  display: 'block',
                }}
              >
                {item.value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                  fontSize: '13px',
                  color: 'var(--ds-text-secondary)',
                  marginTop: '4px',
                  display: 'block',
                }}
              >
                {item.detail}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
