import Link from 'next/link'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--ds-bg)', color: 'var(--ds-text-primary)' }}
    >
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function Header() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/stack', label: 'Stack' },
    { href: '/preview', label: 'Preview' },
    { href: '/handoff', label: 'Handoff' },
  ]

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--ds-bg) 85%, transparent)',
        backdropFilter: 'saturate(140%) blur(10px)',
        WebkitBackdropFilter: 'saturate(140%) blur(10px)',
        borderBottom: '1px solid var(--ds-border-subtle)',
      }}
    >
      <nav
        className="mx-auto flex items-center justify-between px-6"
        style={{ maxWidth: 'var(--ds-container-max)', height: '60px' }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-shrink-0 items-center gap-2"
          style={{ fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)', fontWeight: 500, color: 'var(--ds-text-primary)' }}
          aria-label="next-supabase-starter home"
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md"
            style={{
              backgroundColor: 'var(--ds-text-primary)',
              color: 'var(--ds-bg)',
              fontFamily: 'var(--font-serif, "Source Serif 4", serif)',
              fontSize: '14px',
              fontWeight: 400,
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            N
          </span>
          <span
            className="hidden text-sm sm:inline"
            style={{ color: 'var(--ds-text-primary)' }}
          >
            next-supabase-starter
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-5 sm:gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs transition-colors sm:text-sm"
              style={{
                fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                color: 'var(--ds-text-secondary)',
                transitionDuration: 'var(--ds-duration-fast)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Version badge */}
        <span
          className="hidden text-xs sm:inline"
          style={{
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            color: 'var(--ds-text-muted)',
          }}
        >
          v0.1.0
        </span>
      </nav>
    </header>
  )
}

function Footer() {
  const links = [
    { href: 'https://github.com/chiuweilun1107/next-supabase-starter', label: 'GitHub', external: true },
    { href: '/stack', label: 'Docs', external: false },
    { href: '/handoff', label: 'Claude Code Handoff', external: false },
  ]

  return (
    <footer
      className="py-10"
      style={{ borderTop: '1px solid var(--ds-border-subtle)' }}
    >
      <div
        className="mx-auto flex flex-col items-center gap-5 px-6"
        style={{ maxWidth: 'var(--ds-container-max)' }}
      >
        <div className="flex items-center gap-8">
          {links.map(({ href, label, external }) => (
            <Link
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-sm transition-colors"
              style={{
                fontFamily: 'var(--font-sans, "Inter Tight", sans-serif)',
                color: 'var(--ds-text-muted)',
                transitionDuration: 'var(--ds-duration-fast)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
        <p
          className="text-xs"
          style={{
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            color: 'var(--ds-text-muted)',
          }}
        >
          MIT · next-supabase-starter
        </p>
      </div>
    </footer>
  )
}
