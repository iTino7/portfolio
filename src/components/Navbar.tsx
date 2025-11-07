import { NavLink, Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { href: '/', label: 'Home', end: true },
  { href: '/works', label: 'Works' },
  { href: '/contact', label: 'Contact' },
]

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
            {links.map(({ href, label, end }) => (
              <li key={href}>
                <NavLink
                  to={href}
                  end={end}
                  className={({ isActive }) =>
                    `transition-colors ${
                      isActive
                        ? 'text-foreground'
                        : 'text-foreground/60 hover:text-foreground'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
