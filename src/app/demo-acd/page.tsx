/**
 * Phase D End-to-end Validation — 地基 consume @awesome-claude-design registry
 *
 * Installed via:
 *   npx shadcn@latest add http://localhost:3456/r/hero.json
 *   npx shadcn@latest add http://localhost:3456/r/theme-nvidia.json
 *
 * Hero.tsx copied into src/components/blocks/Hero.tsx (consumer owns the code).
 * NVIDIA theme cssVars merged into src/app/globals.css :root block.
 *
 * Scope: shadcn CLI defaults theme cssVars to :root (global). To get per-section
 * theming (multi-brand on same page), manually re-scope cssVars into a
 * [data-theme="<brand>"] selector after install. Documented limitation.
 */

import { Hero } from '@/components/blocks/Hero'

export default function PhaseDValidationPage() {
  return (
    <main>
      <header className="border-b bg-gray-100 px-8 py-4">
        <h1 className="text-xl font-bold">Phase D End-to-End Validation</h1>
        <p className="text-sm text-gray-600">
          地基 consume @awesome-claude-design registry: Hero block + theme-nvidia tokens installed
          via <code>npx shadcn@latest add</code>. Below Hero renders with NVIDIA tokens inherited
          from <code>:root</code> globals.css (installed by shadcn CLI).
        </p>
      </header>

      {/* NVIDIA-themed Hero using installed block + theme cssVars */}
      <div data-theme="nvidia">
        <Hero
          eyebrow="Phase D Validation"
          headline="地基 consume registry works."
          sub="Hero.tsx copied into geji repo. NVIDIA primary (76 100% 36%) flows from globals.css. shadcn CLI installed both in one chain. Phase A→D end-to-end proven."
          cta={{ label: 'Confirmed', href: '#' }}
          variant="centered"
          minHeight="60vh"
        />
      </div>

      <footer className="border-t bg-gray-100 px-8 py-4 text-sm text-gray-600">
        <p>
          ✅ Block source owned by consumer (modifiable). ✅ cssVars in globals.css. ✅ Type-safe
          variant prop via VariantProps. ✅ Zero npm publish workflow needed.
        </p>
      </footer>
    </main>
  )
}
