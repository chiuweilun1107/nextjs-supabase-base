'use client'

import { useState, useEffect } from 'react'

interface HeroComposeControlsProps {
  onMoodChange?: (mood: number) => void
  onFormChange?: (form: FormKind) => void
  onAtmosphereChange?: (atm: AtmKind) => void
}

type FormKind = 'oct' | 'ico' | 'knot'
type AtmKind = 'sparse' | 'balanced' | 'dense'

interface ControlsState {
  mood: number
  form: FormKind
  atm: AtmKind
}

const STORAGE_KEY = 'nss-hero-tweaks-v1'
const defaults: ControlsState = { mood: 50, form: 'oct', atm: 'balanced' }

const moodLabels = ['Restrained', 'Quiet', 'Settled', 'Balanced', 'Lively', 'Kinetic']
function moodLabel(v: number): string {
  const i = Math.min(moodLabels.length - 1, Math.floor((v / 100) * moodLabels.length))
  return moodLabels[i]
}

const formLabels: Record<FormKind, string> = {
  oct: 'Octahedron',
  ico: 'Icosahedron',
  knot: 'Torus knot',
}

const atmLabels: Record<AtmKind, string> = {
  sparse: 'Sparse',
  balanced: 'Balanced',
  dense: 'Dense',
}

export function HeroComposeControls({ onMoodChange, onFormChange, onAtmosphereChange }: HeroComposeControlsProps) {
  const [state, setState] = useState<ControlsState>(defaults)
  const [ready, setReady] = useState(false)

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ControlsState>
        setState(prev => ({ ...prev, ...parsed }))
      }
    } catch { /* ignore */ }
    setReady(true)
  }, [])

  // Persist & notify parent
  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch { /* ignore */ }
    const m = state.mood / 100
    document.documentElement.style.setProperty('--mood', String(m))
    onMoodChange?.(m)
    onFormChange?.(state.form)
    onAtmosphereChange?.(state.atm)
  }, [state, ready, onMoodChange])

  const update = <K extends keyof ControlsState>(key: K, value: ControlsState[K]) => {
    setState(prev => ({ ...prev, [key]: value }))
  }

  return (
    <aside
      className="absolute bottom-6 left-6 hidden md:block"
      aria-label="Hero composition controls"
      style={{
        maxWidth: '320px',
        zIndex: 3,
        paddingTop: 'var(--ds-space-4)',
        borderTop: '1px solid var(--ds-border-subtle)',
        opacity: ready ? 1 : 0,
        transition: 'opacity 600ms var(--ds-ease-out)',
      }}
    >
      {/* Label */}
      <div
        className="flex items-center gap-2 mb-3"
        style={{
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          fontSize: '10px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ds-text-muted)',
        }}
      >
        <span
          className="rounded-full"
          style={{ width: '5px', height: '5px', backgroundColor: 'var(--ds-accent)', flexShrink: 0 }}
          aria-hidden="true"
        />
        Compose the hero
      </div>

      {/* Mood slider */}
      <div className="mb-3">
        <div
          className="flex items-baseline justify-between mb-1.5"
          style={{
            fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
            fontSize: '11px',
            color: 'var(--ds-text-secondary)',
          }}
        >
          <span>Mood</span>
          <span
            style={{
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              fontSize: '10px',
              color: 'var(--ds-text-primary)',
              letterSpacing: '0.04em',
            }}
          >
            {moodLabel(state.mood)}
          </span>
        </div>
        <div style={{ position: 'relative', height: '18px' }}>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={state.mood}
            onChange={e => update('mood', Number(e.target.value))}
            className="w-full"
            style={{ accentColor: 'var(--ds-accent)', height: '18px', margin: 0 }}
            aria-label="Mood: restrained to kinetic"
          />
        </div>
        <div
          className="flex justify-between mt-1"
          style={{
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            fontSize: '9.5px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ds-text-muted)',
          }}
        >
          <span>Restrained</span>
          <span>Kinetic</span>
        </div>
      </div>

      {/* Form segmented control */}
      <div className="mb-3">
        <div
          className="flex items-baseline justify-between mb-1.5"
          style={{
            fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
            fontSize: '11px',
            color: 'var(--ds-text-secondary)',
          }}
        >
          <span>Form</span>
          <span
            style={{
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              fontSize: '10px',
              color: 'var(--ds-text-primary)',
              letterSpacing: '0.04em',
            }}
          >
            {formLabels[state.form]}
          </span>
        </div>
        <SegControl
          options={(['oct', 'ico', 'knot'] as FormKind[])}
          labels={formLabels}
          value={state.form}
          onChange={v => update('form', v)}
        />
      </div>

      {/* Atmosphere segmented control */}
      <div>
        <div
          className="flex items-baseline justify-between mb-1.5"
          style={{
            fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
            fontSize: '11px',
            color: 'var(--ds-text-secondary)',
          }}
        >
          <span>Atmosphere</span>
          <span
            style={{
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              fontSize: '10px',
              color: 'var(--ds-text-primary)',
              letterSpacing: '0.04em',
            }}
          >
            {atmLabels[state.atm]}
          </span>
        </div>
        <SegControl
          options={(['sparse', 'balanced', 'dense'] as AtmKind[])}
          labels={atmLabels}
          value={state.atm}
          onChange={v => update('atm', v)}
        />
      </div>
    </aside>
  )
}

function SegControl<T extends string>({
  options,
  labels,
  value,
  onChange,
}: {
  options: T[]
  labels: Record<T, string>
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div
      className="flex overflow-hidden rounded"
      style={{
        border: '1px solid var(--ds-border)',
        backgroundColor: 'var(--ds-bg)',
      }}
    >
      {options.map((opt, i) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className="flex-1 text-xs font-medium transition-colors"
          style={{
            padding: '6px 8px',
            fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
            fontSize: '11px',
            fontWeight: 500,
            border: 'none',
            borderLeft: i > 0 ? '1px solid var(--ds-border-subtle)' : 'none',
            backgroundColor: value === opt ? 'var(--ds-accent-subtle)' : 'transparent',
            color: value === opt ? 'var(--ds-accent)' : 'var(--ds-text-secondary)',
            cursor: 'pointer',
            transitionDuration: 'var(--ds-duration-fast)',
          }}
        >
          {labels[opt]}
        </button>
      ))}
    </div>
  )
}
