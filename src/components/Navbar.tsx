import { NavLink, Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

type NavItem =
  | { type: 'route'; href: string; label: string; end?: boolean }
  | { type: 'anchor'; href: string; label: string }

const links: NavItem[] = [
  { type: 'route', href: '/', label: 'Home', end: true },
  { type: 'anchor', href: '#about', label: 'About me' },
  { type: 'route', href: '/works', label: 'Works' },
  { type: 'route', href: '/contact', label: 'Contact' },
]

function handleAnchorClick(href: string) {
  const target = document.querySelector(href)
  if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function Navbar() {
  return (
    <header className="w-full px-6 py-4 md:px-12 lg:px-20">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link
          to="/"
          className="font-initials inline-flex items-center gap-1 text-3xl font-semibold tracking-wide text-foreground"
          aria-label="Home"
        >
          <span>S</span>
          <span className="text-2xl leading-none">•</span>
          <span>B</span>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6 text-lg font-medium">
            {links.map((link) => (
              <li key={link.label}>
                {link.type === 'route' ? (
                  <NavLink
                    to={link.href}
                    end={link.end}
                    className={({ isActive }) =>
                      `transition-colors ${
                        isActive
                          ? 'text-sky-400 dark:text-sky-300'
                          : 'text-foreground/60 hover:text-foreground'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleAnchorClick(link.href)}
                    className="text-foreground/60 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
