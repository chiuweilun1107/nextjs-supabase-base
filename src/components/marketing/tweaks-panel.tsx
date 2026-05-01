'use client'

import { useState, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'

interface TweaksState {
  rotationSpeed: number
  accentHue: number
  darkMode: boolean
  reduceMotion: boolean
  headlineWeight: number
  containerWidth: number
}

const defaults: TweaksState = {
  rotationSpeed: 3,
  accentHue: 17,
  darkMode: false,
  reduceMotion: false,
  headlineWeight: 400,
  containerWidth: 1200,
}

interface TweaksPanelProps {
  onRotationSpeedChange?: (v: number) => void
}

export function TweaksPanel({ onRotationSpeedChange }: TweaksPanelProps) {
  const [open, setOpen] = useState(false)
  const [tweaks, setTweaks] = useState<TweaksState>(defaults)

  // Apply tweaks to document
  useEffect(() => {
    const root = document.documentElement

    // Accent hue shift
    const h = tweaks.accentHue
    root.style.setProperty('--ds-accent', `hsl(${h}, 48%, 58%)`)
    root.style.setProperty('--ds-accent-hover', `hsl(${h}, 44%, 50%)`)
    root.style.setProperty('--ds-accent-subtle', `hsl(${h}, 48%, 94%)`)

    // Dark mode
    if (tweaks.darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Headline weight
    root.style.setProperty('--ds-headline-weight', String(tweaks.headlineWeight))

    // Container width
    root.style.setProperty('--ds-container-width', `${tweaks.containerWidth}px`)

    // Reduce motion
    if (tweaks.reduceMotion) {
      root.style.setProperty('--ds-motion', 'none')
    } else {
      root.style.removeProperty('--ds-motion')
    }

    onRotationSpeedChange?.(tweaks.rotationSpeed)
  }, [tweaks, onRotationSpeedChange])

  const update = (key: keyof TweaksState, value: number | boolean) => {
    setTweaks(prev => ({ ...prev, [key]: value }))
  }

  return (
    <>
      {/* Wrench toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-transform duration-[120ms] hover:scale-105"
        style={{ backgroundColor: 'var(--ds-accent)', color: 'white' }}
        aria-label="Open tweaks panel"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-50 w-72 rounded-xl p-5 shadow-lg"
          style={{
            backgroundColor: 'var(--ds-surface-raised)',
            border: '1px solid var(--ds-border)',
          }}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--ds-text-muted)', fontFamily: 'Inter Tight, Inter, sans-serif' }}>
              Tweaks
            </span>
            <button onClick={() => setOpen(false)} style={{ color: 'var(--ds-text-muted)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Rotation speed */}
            <SliderControl
              label="Rotation speed"
              value={tweaks.rotationSpeed}
              min={0} max={10} step={0.5}
              onChange={v => update('rotationSpeed', v)}
            />

            {/* Accent hue */}
            <SliderControl
              label="Accent hue"
              value={tweaks.accentHue}
              min={0} max={360} step={1}
              onChange={v => update('accentHue', v)}
            />

            {/* Headline weight */}
            <div>
              <label className="mb-1.5 flex justify-between text-xs" style={{ color: 'var(--ds-text-secondary)', fontFamily: 'Inter Tight, Inter, sans-serif' }}>
                <span>Headline weight</span>
                <span style={{ color: 'var(--ds-text-muted)' }}>{tweaks.headlineWeight}</span>
              </label>
              <div className="flex gap-2">
                {[300, 400, 500].map(w => (
                  <button
                    key={w}
                    onClick={() => update('headlineWeight', w)}
                    className="flex-1 rounded py-1 text-xs transition-colors"
                    style={{
                      backgroundColor: tweaks.headlineWeight === w ? 'var(--ds-accent)' : 'var(--ds-surface)',
                      color: tweaks.headlineWeight === w ? 'white' : 'var(--ds-text-secondary)',
                      border: `1px solid ${tweaks.headlineWeight === w ? 'var(--ds-accent)' : 'var(--ds-border)'}`,
                      fontFamily: 'Inter Tight, Inter, sans-serif',
                    }}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Container width */}
            <div>
              <label className="mb-1.5 flex justify-between text-xs" style={{ color: 'var(--ds-text-secondary)', fontFamily: 'Inter Tight, Inter, sans-serif' }}>
                <span>Container width</span>
                <span style={{ color: 'var(--ds-text-muted)' }}>{tweaks.containerWidth}</span>
              </label>
              <div className="flex gap-1.5">
                {[960, 1120, 1280, 1440].map(w => (
                  <button
                    key={w}
                    onClick={() => update('containerWidth', w)}
                    className="flex-1 rounded py-1 text-xs transition-colors"
                    style={{
                      backgroundColor: tweaks.containerWidth === w ? 'var(--ds-accent)' : 'var(--ds-surface)',
                      color: tweaks.containerWidth === w ? 'white' : 'var(--ds-text-secondary)',
                      border: `1px solid ${tweaks.containerWidth === w ? 'var(--ds-accent)' : 'var(--ds-border)'}`,
                      fontFamily: 'Inter Tight, Inter, sans-serif',
                    }}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-1">
              <ToggleControl label="Dark mode" checked={tweaks.darkMode} onChange={v => update('darkMode', v)} />
              <ToggleControl label="Reduce motion" checked={tweaks.reduceMotion} onChange={v => update('reduceMotion', v)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function SliderControl({ label, value, min, max, step, onChange }: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <label className="mb-1.5 flex justify-between text-xs" style={{ color: 'var(--ds-text-secondary)', fontFamily: 'Inter Tight, Inter, sans-serif' }}>
        <span>{label}</span>
        <span style={{ color: 'var(--ds-text-muted)' }}>{value}</span>
      </label>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-[var(--ds-accent)]"
        style={{ accentColor: 'var(--ds-accent)' }}
      />
    </div>
  )
}

function ToggleControl({ label, checked, onChange }: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs" style={{ color: 'var(--ds-text-secondary)', fontFamily: 'Inter Tight, Inter, sans-serif' }}>{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
