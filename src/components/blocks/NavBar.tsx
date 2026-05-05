'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export interface NavLink {
  label: string
  href: string
}

interface NavBarProps {
  brandMark: string
  links: NavLink[]
  cta?: { label: string; href: string }
}

export function NavBar({ brandMark, links, cta }: NavBarProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: 'hsl(var(--background) / 0.9)',
        borderBottom: '1px solid hsl(var(--border))',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold tracking-tight text-[15px] uppercase"
          style={{ color: 'hsl(var(--primary))', letterSpacing: '0.06em' }}
        >
          {brandMark}
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-opacity hover:opacity-70${isActive ? ' opacity-100' : ' opacity-60'}`}
                style={{ color: 'hsl(var(--foreground))' }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-4">
          {cta && (
            <Link
              href={cta.href}
              className="inline-flex items-center px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                borderRadius: 'var(--radius)',
              }}
            >
              {cta.label}
            </Link>
          )}

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-2"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className="block w-5 h-px transition-all duration-200"
              style={{
                backgroundColor: 'hsl(var(--foreground))',
                transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-200"
              style={{
                backgroundColor: 'hsl(var(--foreground))',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-200"
              style={{
                backgroundColor: 'hsl(var(--foreground))',
                transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden px-8 pb-6 flex flex-col gap-5"
          style={{ borderTop: '1px solid hsl(var(--border))' }}
        >
          {links.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-opacity hover:opacity-70${isActive ? ' opacity-100' : ' opacity-60'}`}
                style={{ color: 'hsl(var(--foreground))' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
