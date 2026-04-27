# DESIGN.md — Allen Chiu Personal Tech Brand

> Design system for Allen Chiu's personal brand: independent software engineer, investor, builder.
> Aesthetic direction: Editorial Minimalism. Reference spirits: Linear, Stripe Press, Vercel.

---

## Brand Personality

1. **Precise without being cold.** Every element earns its place. No decoration for decoration's sake.
2. **Quietly confident.** The work speaks; the design doesn't shout. Restraint is the message.
3. **Craft at every scale.** The same attention that goes into architecture diagrams goes into a button label.

---

## Color Tokens

### Light mode (default)

| Token | Hex | HSL | Usage |
|---|---|---|---|
| `--color-bg` | `#FAFAF8` | `60 10% 98%` | Page background — warm off-white, not pure white |
| `--color-surface` | `#F5F4F1` | `48 10% 95%` | Card / panel background |
| `--color-surface-raised` | `#FFFFFF` | `0 0% 100%` | Elevated modals, dropdowns |
| `--color-border` | `#E4E2DB` | `45 13% 87%` | Default border |
| `--color-border-subtle` | `#EEECE6` | `45 16% 92%` | Dividers, subtle separators |
| `--color-text-primary` | `#1A1917` | `30 7% 9%` | Body copy, headings |
| `--color-text-secondary` | `#6B6860` | `35 5% 40%` | Supporting copy, metadata |
| `--color-text-muted` | `#9E9B95` | `36 5% 61%` | Placeholder, disabled text |
| `--color-accent` | `#CC785C` | `17 48% 58%` | Single brand accent — terracotta orange |
| `--color-accent-hover` | `#B8664A` | `17 44% 50%` | Accent hover state |
| `--color-accent-subtle` | `#F7EDE8` | `17 48% 94%` | Accent tint backgrounds |
| `--color-code-bg` | `#F0EEE9` | `43 13% 93%` | Inline code background |

### Dark mode

| Token | Hex | HSL | Usage |
|---|---|---|---|
| `--color-bg` | `#141311` | `30 10% 8%` | Page background |
| `--color-surface` | `#1D1B18` | `30 8% 11%` | Card / panel background |
| `--color-surface-raised` | `#242119` | `35 15% 12%` | Elevated components |
| `--color-border` | `#2E2B26` | `35 8% 17%` | Default border |
| `--color-border-subtle` | `#252320` | `36 8% 14%` | Subtle dividers |
| `--color-text-primary` | `#F0EDE6` | `42 20% 92%` | Body copy, headings |
| `--color-text-secondary` | `#A09D97` | `35 5% 61%` | Supporting copy |
| `--color-text-muted` | `#6B6860` | `35 5% 40%` | Placeholder, disabled |
| `--color-accent` | `#D98B6E` | `17 55% 64%` | Accent — slightly warmer in dark |
| `--color-accent-hover` | `#E8A080` | `17 68% 70%` | Accent hover |
| `--color-accent-subtle` | `#2A1E18` | `17 22% 13%` | Accent tint backgrounds |
| `--color-code-bg` | `#1A1816` | `30 10% 9%` | Inline code background |

---

## Typography

### Font stack

| Role | Font | Fallback |
|---|---|---|
| Display / Headline | `"Source Serif 4"` | `"Times New Roman", serif` |
| Body / UI | `"Inter Tight"` | `Inter, system-ui, sans-serif` |
| Monospace | `"JetBrains Mono"` | `"Fira Code", "Cascadia Code", monospace` |

### Type scale

| Level | Font | Size | Line height | Weight | Usage |
|---|---|---|---|---|---|
| `display` | Serif | `clamp(48px, 7vw, 112px)` | `0.95` | `400` | Hero headlines only |
| `h1` | Serif | `clamp(32px, 4vw, 56px)` | `1.1` | `400` | Page titles |
| `h2` | Sans | `clamp(22px, 2.5vw, 32px)` | `1.2` | `500` | Section headings |
| `h3` | Sans | `18px` | `1.4` | `500` | Subsection headings, card titles |
| `body` | Sans | `16px` | `1.6` | `400` | Default body copy |
| `small` | Sans | `13px` | `1.5` | `400` | Labels, captions, metadata |
| `code` | Mono | `14px` | `1.7` | `400` | Inline code, code blocks |

**Rules:**
- Headlines use serif at `font-weight: 400` (not bold — restraint)
- UI labels use sans at `font-weight: 500`
- Never combine serif + serif; never set body copy in serif
- `letter-spacing`: `-0.02em` for display, `0` for body, `0.06em` for ALL-CAPS labels

---

## Spacing Tokens

Base unit: `8px`

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | Micro gaps (icon + label) |
| `--space-2` | `8px` | Inline padding, tight stacks |
| `--space-3` | `12px` | Form element padding |
| `--space-4` | `16px` | Component internal padding |
| `--space-5` | `24px` | Card padding, list gaps |
| `--space-6` | `32px` | Section internal spacing |
| `--space-8` | `48px` | Between components |
| `--space-10` | `64px` | Section padding (mobile) |
| `--space-12` | `80px` | Section padding (desktop) |
| `--space-16` | `128px` | Hero vertical rhythm |

---

## Radius Tokens

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `6px` | Badges, tags, inline chips |
| `--radius-md` | `10px` | Buttons, inputs, small cards |
| `--radius-lg` | `16px` | Cards, panels, modals |
| `--radius-xl` | `24px` | Large hero containers |
| `--radius-full` | `9999px` | Pill buttons, avatar rings |

---

## Shadow Tokens

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle card lift |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)` | Cards, dropdowns |
| `--shadow-lg` | `0 16px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)` | Modals, floating panels |
| `--shadow-focus` | `0 0 0 3px rgba(204,120,92,0.25)` | Keyboard focus ring (accent-colored) |

---

## Animation Tokens

| Token | Value | Usage |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Elements entering the screen |
| `--ease-in-out` | `cubic-bezier(0.45, 0, 0.55, 1)` | State transitions |
| `--duration-fast` | `120ms` | Micro-interactions (hover, focus) |
| `--duration-base` | `200ms` | Default transitions |
| `--duration-slow` | `400ms` | Content reveals, page transitions |
| `--duration-enter` | `800ms` | Hero entrance animations |
| `--stagger-step` | `150ms` | Per-item stagger in list reveals |

**Rules:**
- Animations must be **functional**, not decorative — they convey state change
- `prefers-reduced-motion: reduce` must disable all transitions and animations
- No floating, looping, or perpetual-motion effects
- Scroll-triggered reveals: `fade-up` (translate Y 20px → 0 + opacity 0→1) with `--ease-out`

---

## Component Principles

### Buttons

| Do | Don't |
|---|---|
| Ghost button for secondary actions: `border: 1px solid --color-border`, transparent background | Use filled background for every button |
| Primary CTA: `background: --color-accent`, `color: white`, `radius: --radius-md` | Use `border-radius: 9999px` pill on primary CTA (too friendly, off-brand) |
| Hover: `scale(1.02)` + `--duration-fast` | Add shadows on hover — lift effect doesn't fit flat aesthetic |
| Label weight `500`, size `14–15px`, `letter-spacing: 0.01em` | Use ALL-CAPS labels on buttons (too loud) |
| Destructive actions: outlined red, require confirmation | Use red fill for any non-destructive action |

### Cards

| Do | Don't |
|---|---|
| Background `--color-surface`, border `1px solid --color-border`, radius `--radius-lg` | Card-in-card nesting (maximum 1 level) |
| Padding `--space-5` or `--space-6` consistently | Mix padding sizes within a card grid |
| Subtle `--shadow-sm` on hover (`transition: box-shadow --duration-base`) | Dramatic lift shadows on card hover |
| One visual hierarchy per card: one strong element draws the eye | Cram 3+ CTAs or 5+ metadata lines in one card |
| `gap: --space-5` in card grids | Make every card the same height in a text-heavy grid |

### Inputs & Forms

| Do | Don't |
|---|---|
| Border `1px solid --color-border`, focus `--shadow-focus` + border `--color-accent` | Fill background on focus (use border + ring instead) |
| Label above the input, weight `500`, size `13px` | Placeholder text as the only label |
| Error state: red border + error text below (never just color alone) | Use red fill on error input background |
| Stack form fields vertically with `--space-4` gap | Inline labels for multi-field forms |
| Helper text `--color-text-muted`, `12px`, below the input | Put helper text in a tooltip |

### Code Blocks

| Do | Don't |
|---|---|
| Background `--color-code-bg`, `border-radius: --radius-md`, padding `--space-4` | Pure black background in light mode |
| Copy button top-right, appears on hover, `opacity: 0 → 1` in `--duration-fast` | Always-visible copy button (visual noise) |
| Language label top-left, `--color-text-muted`, `11px` monospace | Title bars or colored header strips |
| Line numbers only for >10 line blocks | Line numbers on short snippets |

---

## Anti-Pattern List (NEVER)

1. **NEVER** use teal, cyan, or green-blue as any color — not accent, not icon, not status dot
2. **NEVER** use purple gradients (`#6366f1 → #8b5cf6` style) — this is the canonical AI-slop palette
3. **NEVER** use the default Lucide icon set without customization — pick an icon family and specify it (Phosphor Duotone preferred for personality)
4. **NEVER** use a 3-column feature grid with icon + heading + 2-line description — this layout is overused to the point of invisibility
5. **NEVER** use `font-weight: 700` for serif headlines — the elegance is in the lightness
6. **NEVER** use `border-left: 3px solid accent` as a section heading decoration — it belongs in documentation, not marketing
7. **NEVER** use emoji as UI icons or bullet points — inline SVG or icon library only
8. **NEVER** use floating, looping background animations (blobs, gradients shifting, particles without purpose)
9. **NEVER** use `border-radius: 9999px` (pill) on hero CTAs — it reads as consumer-app, not professional tool
10. **NEVER** center-align body text paragraphs — center is for short headlines and labels only
11. **NEVER** use more than one accent color in a single page — the single terracotta orange is the only accent
12. **NEVER** use a hero layout with `screenshot-in-browser-frame on the right, text on the left` — find a more original visual treatment

---

## Layout Principles

- **Max content width**: `1200px`, centered, `padding: 0 --space-6`
- **Reading width** (body copy): `680px` max
- **Section rhythm**: `--space-12` top + bottom on desktop, `--space-10` on mobile
- **Grid**: 12-column, `gap: --space-5`, collapses to single column at `640px`
- **Section headings**: centered (`text-align: center`), with a single thin `1px` accent underline `48px` wide, centered below
- **Hero hierarchy**: one dominant headline, one supporting line, one CTA — three elements maximum above the fold
