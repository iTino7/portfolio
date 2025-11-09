import { Link, NavLink } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState, type ComponentType } from 'react'
import { Home, User, BriefcaseBusiness, Mail } from 'lucide-react'

import { cn } from '../lib/utils'
import { ThemeToggle } from './ThemeToggle'

type NavRouteItem = {
  type: 'route'
  href: string
  label: string
  end?: boolean
  icon: ComponentType<{ className?: string }>
}

type NavScrollItem = {
  type: 'scroll'
  href: `#${string}`
  label: string
  icon: ComponentType<{ className?: string }>
}

type NavItem = NavRouteItem | NavScrollItem

const links: NavItem[] = [
  { type: 'scroll', href: '#home', label: 'Home', icon: Home },
  { type: 'scroll', href: '#about', label: 'About me', icon: User },
  { type: 'scroll', href: '#works', label: 'Works', icon: BriefcaseBusiness },
  { type: 'scroll', href: '#contact', label: 'Contact', icon: Mail },
]

function handleScrollTo(hash: string) {
  const target = document.querySelector(hash)
  if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function Navbar() {
  const [isCompressed, setIsCompressed] = useState(false)
  const [showFloatingNav, setShowFloatingNav] = useState(false)
  const [activeHash, setActiveHash] = useState<string>('#home')

  useEffect(() => {
    const onScroll = () => {
      setIsCompressed(window.scrollY > 120)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isCompressed) {
      const raf = requestAnimationFrame(() => setShowFloatingNav(true))
      return () => cancelAnimationFrame(raf)
    }

    setShowFloatingNav(false)
    return undefined
  }, [isCompressed])

  useEffect(() => {
    const scrollItems = links.filter((item): item is NavScrollItem => item.type === 'scroll')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`)
          }
        })
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0.1,
      }
    )

    scrollItems.forEach((item) => {
      const element = document.querySelector(item.href)
      if (element instanceof HTMLElement) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const listClassName = useMemo(
    () => 'flex items-center gap-6 text-lg font-medium',
    []
  )

  const renderLabel = useCallback(
    (item: NavItem, isActive: boolean, compact: boolean) => {
      const Icon = item.icon
      return (
        <span
          className={cn(
            'flex items-center gap-2 transition-colors',
            compact && 'justify-center',
            isActive ? 'text-sky-400 dark:text-sky-300' : 'text-foreground/60 hover:text-foreground'
          )}
        >
          <Icon className={cn('h-5 w-5', isActive && 'text-sky-400 dark:text-sky-300')} />
          {!compact && item.label}
        </span>
      )
    },
    []
  )

  const renderLinks = useCallback(
    (compact: boolean) => (
      <ul
        className={cn(
          listClassName,
          compact && 'flex-col gap-3 text-sm'
        )}
      >
        {links.map((link) => {
          if (link.type === 'route') {
            return (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  end={link.end}
                  className={({ isActive }) =>
                    cn(
                      'transition-colors',
                      isActive
                        ? 'text-sky-400 dark:text-sky-300'
                        : 'text-foreground/60 hover:text-foreground'
                    )
                  }
                >
                  {({ isActive }) => renderLabel(link, isActive, compact)}
                </NavLink>
              </li>
            )
          }

          const isActive = activeHash === link.href
          return (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleScrollTo(link.href)}
                className="focus-visible:outline-none"
                aria-current={isActive ? 'true' : undefined}
              >
                {renderLabel(link, isActive, compact)}
              </button>
            </li>
          )
        })}
      </ul>
    ),
    [activeHash, listClassName, renderLabel]
  )

  return (
    <>
      <header className="w-full px-6 py-4 transition-all duration-300 md:px-12 lg:px-20">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Link
            to="/"
            className="font-initials inline-flex items-center gap-1 text-3xl font-semibold tracking-wide text-foreground transition-transform duration-300"
            aria-label="Home"
          >
            <span>S</span>
            <span className="text-2xl leading-none">•</span>
            <span>B</span>
          </Link>
          <div className="flex items-center gap-6">
            {renderLinks(false)}
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <aside
        className={cn(
          'fixed left-6 top-1/2 z-40 flex w-auto -translate-y-1/2 flex-col items-center gap-4 rounded-full bg-background/80 px-3 py-4 shadow-lg backdrop-blur transition-all duration-300 ease-out',
          showFloatingNav
            ? 'pointer-events-auto opacity-100 translate-y-0'
            : 'pointer-events-none opacity-0 translate-y-2'
        )}
        aria-hidden={!showFloatingNav}
      >
        {renderLinks(true)}
        <ThemeToggle />
      </aside>
    </>
  )
}
