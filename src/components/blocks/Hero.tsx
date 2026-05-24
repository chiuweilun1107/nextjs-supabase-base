import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'

// CVA root variant — declares 3 layout variants + provides type-safe VariantProps.
// The variant key drives runtime JSX branching + inline style (flex/text-align)
// in the component body — CVA primarily serves as the type contract here.
const heroVariants = cva('relative w-full overflow-hidden', {
  variants: {
    variant: {
      centered: '', // symmetric, eyebrow/headline/specs/CTA stacked center
      left: '', // editorial plate, content bottom-left
      split: '', // text left, specs right, 50/50 grid
    },
  },
  defaultVariants: { variant: 'centered' },
})

interface HeroStat {
  label: string
  value: string
}

export interface HeroProps extends VariantProps<typeof heroVariants> {
  eyebrow?: string
  headline: string
  sub?: string
  cta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  stats?: HeroStat[]
  /**
   * Background asset. design.md mandates video for NVIDIA but we accept image
   * fallback (and no asset = pure canvas). Reduced-motion users always get the
   * still poster regardless of `videoSrc`.
   */
  videoSrc?: string
  posterSrc?: string
  /** Override headline max-size in px (default: 128). Min is always clamped to 96px. */
  headlineSize?: number
  /** Override section min-height (default: '85vh'). Pass '100vh' for overlay-nav full-bleed. */
  minHeight?: string
  /** Override media layer opacity (default: 0.4). BMW uses 1 with a black stage bg. */
  mediaOpacity?: number
  /** Override scrim gradient. Default is vertical top+bottom fade. BMW uses diagonal. */
  scrimGradient?: string
  /** Override section background color. BMW needs '#000000' even though --background is white. */
  sectionBg?: string
  /** Override content area horizontal padding in px (default: 32 = px-8). BMW uses 96. */
  contentPaddingX?: number
  /** Override content area bottom padding in px (default: 128 = py-32). BMW uses 48. */
  contentPaddingBottom?: number
}

export function Hero({
  eyebrow,
  headline,
  sub,
  cta,
  secondaryCta,
  stats,
  videoSrc,
  posterSrc,
  variant = 'centered',
  headlineSize = 128,
  minHeight = '85vh',
  mediaOpacity = 0.4,
  scrimGradient,
  sectionBg,
  contentPaddingX,
  contentPaddingBottom,
}: HeroProps) {
  // When a background image/video is present, the canvas goes dark — force white text.
  const hasMedia = !!(videoSrc || posterSrc)
  const textColor = hasMedia ? '#ffffff' : 'hsl(var(--foreground))'
  const mutedColor = hasMedia ? 'rgba(255,255,255,0.72)' : 'hsl(var(--muted-foreground))'
  const accentColor = hasMedia ? '#ffffff' : 'hsl(var(--primary))'

  const StatsBlock = stats && stats.length > 0 && (
    <div className="tabular flex flex-wrap gap-x-10 gap-y-4">
      {stats.map((s) => (
        <div key={s.label}>
          <div
            className="mb-1 text-[11px] uppercase"
            style={{ letterSpacing: '0.1em', color: mutedColor }}
          >
            {s.label}
          </div>
          <div
            className="text-2xl font-bold md:text-3xl"
            style={{ color: accentColor, letterSpacing: '-0.01em' }}
          >
            {s.value}
          </div>
        </div>
      ))}
    </div>
  )

  const Eyebrow = eyebrow && (
    <div
      className="mb-4 text-xs font-medium uppercase"
      style={{ letterSpacing: '0.16em', color: accentColor }}
    >
      {eyebrow}
    </div>
  )

  const Headline = (
    <h1
      className="mb-6 leading-[0.92] font-bold"
      style={{
        fontSize: `clamp(40px, 9vw, ${headlineSize}px)`,
        letterSpacing: 'var(--brand-display-tracking, -0.01em)',
        fontWeight: 'var(--brand-display-weight, 700)',
        color: textColor,
      }}
      dangerouslySetInnerHTML={{ __html: headline }}
    />
  )

  const Sub = sub && (
    <p
      className="mb-8 max-w-2xl text-base leading-relaxed md:text-lg"
      style={{ color: mutedColor }}
    >
      {sub}
    </p>
  )

  const CTAGroup = (cta || secondaryCta) && (
    <div className="mb-10 flex flex-wrap items-center gap-4">
      {cta && (
        <Link
          href={cta.href}
          className="sc-btn-primary inline-flex items-center px-6 py-3 text-[15px] font-semibold"
          style={{
            backgroundColor: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            borderRadius: 'var(--radius)',
            letterSpacing: '0.01em',
          }}
        >
          {cta.label}
        </Link>
      )}
      {secondaryCta && (
        <Link
          href={secondaryCta.href}
          className="sc-btn-secondary inline-flex items-center px-6 py-3 text-[15px] font-medium"
          style={{
            border: `1px solid ${hasMedia ? 'rgba(255,255,255,0.5)' : 'hsl(var(--border-strong, var(--border)))'}`,
            color: textColor,
            borderRadius: 'var(--radius)',
          }}
        >
          {secondaryCta.label}
        </Link>
      )}
    </div>
  )

  return (
    <section
      className={heroVariants({ variant })}
      style={{ minHeight, backgroundColor: sectionBg ?? 'hsl(var(--background))' }}
    >
      {/* Background media layer */}
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          style={{ opacity: mediaOpacity, zIndex: 0 }}
        >
          <source src={videoSrc} />
        </video>
      ) : null}
      {posterSrc ? (
        <img
          src={posterSrc}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover ${videoSrc ? 'hidden motion-reduce:block' : ''}`}
          style={{ opacity: mediaOpacity, zIndex: 0 }}
        />
      ) : null}

      {/* Scrim overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            scrimGradient ??
            (hasMedia
              ? 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 25%, transparent 50%, hsl(var(--background) / 0.8) 100%)'
              : 'linear-gradient(180deg, transparent 0%, transparent 50%, hsl(var(--background) / 0.8) 100%)'),
          zIndex: 1,
        }}
      />

      {/* Content layer */}
      <div
        className="relative mx-auto flex max-w-[1440px] flex-col px-8 py-32 md:py-40"
        style={{
          zIndex: 2,
          minHeight,
          justifyContent: variant === 'centered' ? 'center' : 'flex-end',
          alignItems: variant === 'centered' ? 'center' : 'flex-start',
          textAlign: variant === 'centered' ? 'center' : 'left',
          ...(contentPaddingX != null && {
            paddingLeft: contentPaddingX,
            paddingRight: contentPaddingX,
          }),
          ...(contentPaddingBottom != null && { paddingBottom: contentPaddingBottom }),
        }}
      >
        {variant === 'split' ? (
          <div className="grid w-full grid-cols-1 items-end gap-12 md:grid-cols-2">
            <div>
              {Eyebrow}
              {Headline}
              {Sub}
              {CTAGroup}
            </div>
            <div className="md:flex md:justify-end">{StatsBlock}</div>
          </div>
        ) : (
          <>
            {Eyebrow}
            {Headline}
            {Sub}
            {CTAGroup}
            {StatsBlock}
          </>
        )}
      </div>
    </section>
  )
}
