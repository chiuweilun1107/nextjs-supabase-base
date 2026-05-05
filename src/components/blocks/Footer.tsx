import Link from 'next/link'

export interface FooterColumn {
  heading: string
  links: { label: string; href: string }[]
}

interface FooterProps {
  brandMark: string
  tagline?: string
  columns: FooterColumn[]
  legal?: string
}

export function Footer({ brandMark, tagline, columns, legal }: FooterProps) {
  return (
    <footer
      className="px-8 pt-20 pb-10"
      style={{
        backgroundColor: 'hsl(var(--popover))',
        borderTop: '1px solid hsl(var(--border))',
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2">
            <div
              className="font-bold uppercase mb-3 text-base"
              style={{
                letterSpacing: '0.06em',
                color: 'hsl(var(--primary))',
              }}
            >
              {brandMark}
            </div>
            {tagline && (
              <p
                className="text-sm max-w-xs"
                style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.55 }}
              >
                {tagline}
              </p>
            )}
          </div>

          {columns.map(col => (
            <div key={col.heading}>
              <div
                className="text-[11px] uppercase font-semibold mb-4"
                style={{
                  letterSpacing: '0.1em',
                  color: 'hsl(var(--muted-foreground))',
                }}
              >
                {col.heading}
              </div>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-opacity hover:opacity-70"
                      style={{ color: 'hsl(var(--foreground))' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {legal && (
          <div
            className="pt-8 text-xs"
            style={{
              borderTop: '1px solid hsl(var(--border))',
              color: 'hsl(var(--muted-foreground))',
            }}
          >
            {legal}
          </div>
        )}
      </div>
    </footer>
  )
}
