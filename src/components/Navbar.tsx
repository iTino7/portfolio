import { Link, NavLink } from 'react-router-dom'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from 'react'
import { Home, User, BriefcaseBusiness, Mail, ChevronRight } from 'lucide-react'

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
  { type: 'scroll', href: '#about', label: 'Chi sono', icon: User },
  { type: 'scroll', href: '#works', label: 'Progetti', icon: BriefcaseBusiness },
  { type: 'scroll', href: '#contact', label: 'Contatti', icon: Mail },
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
  const [isFloatingNavExpanded, setIsFloatingNavExpanded] = useState(false)
  const [activeHash, setActiveHash] = useState<string>('#home')
  const floatingNavContainerRef = useRef<HTMLDivElement | null>(null)

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
    if (!showFloatingNav) {
      setIsFloatingNavExpanded(false)
    }
  }, [showFloatingNav])

  useEffect(() => {
    if (!isFloatingNavExpanded) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        floatingNavContainerRef.current &&
        !floatingNavContainerRef.current.contains(target)
      ) {
        setIsFloatingNavExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isFloatingNavExpanded])

  useEffect(() => {
    const scrollItems = links.filter((item): item is NavScrollItem => item.type === 'scroll')
    const targets = scrollItems
      .map((item) => document.querySelector(item.href))
      .filter((element): element is HTMLElement => element instanceof HTMLElement)

    if (targets.length === 0) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const viewportCenter = typeof window !== 'undefined' ? window.innerHeight / 2 : 0

        let candidate: IntersectionObserverEntry | null = null
        let bestDistance = Number.POSITIVE_INFINITY

        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.intersectionRatio <= 0) {
            return
          }

          if (viewportCenter === 0) {
            if (!candidate || entry.intersectionRatio > candidate.intersectionRatio) {
              candidate = entry
            }
            return
          }

          const rect = entry.boundingClientRect
          const entryCenter = rect.top + rect.height / 2
          const distance = Math.abs(entryCenter - viewportCenter)

          if (distance < bestDistance) {
            bestDistance = distance
            candidate = entry
          }
        })

        if (!candidate) {
          candidate = entries.reduce<IntersectionObserverEntry | null>((best, entry) => {
            if (!entry.target.id) {
              return best
            }
            if (entry.intersectionRatio <= 0) {
              return best
            }
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              return entry
            }
            return best
          }, null)
        }

        if (candidate?.target?.id) {
          setActiveHash(`#${candidate.target.id}`)
        }
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }
    )

    targets.forEach((element) => observer.observe(element))

    return () => {
      targets.forEach((element) => observer.unobserve(element))
      observer.disconnect()
    }
  }, [])

  const listClassName = useMemo(
    () => 'flex items-center gap-6 text-lg font-medium',
    []
  )

  const renderLabel = useCallback(
    (item: NavItem, isActive: boolean, compact: boolean, showLabel: boolean) => {
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
          {!compact && showLabel && item.label}
        </span>
      )
    },
    []
  )

  const renderBrand = useCallback(
    (onClick?: () => void) => (
      <Link
        to="/"
        onClick={onClick}
        className="font-initials inline-flex items-center gap-1 text-3xl font-semibold tracking-wide text-foreground transition-transform duration-300"
        aria-label="Home"
      >
        <span>S</span>
        <span className="text-2xl leading-none">•</span>
        <span>B</span>
      </Link>
    ),
    []
  )

  const renderLinks = useCallback(
    (
      options: {
        compact?: boolean
        className?: string
        onNavigate?: () => void
        showLabels?: boolean
        includeThemeToggle?: boolean
      } = {}
    ) => {
      const { compact = false, className, onNavigate, showLabels = true, includeThemeToggle = false } = options

      return (
        <ul
          className={cn(
            listClassName,
            compact && 'flex-col gap-3 text-sm',
            className
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
                    onClick={onNavigate}
                  >
                    {({ isActive }) => renderLabel(link, isActive, compact, showLabels)}
                  </NavLink>
                </li>
              )
            }

            const isActive = activeHash === link.href
            return (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveHash(link.href)
                    handleScrollTo(link.href)
                    onNavigate?.()
                  }}
                  className="focus-visible:outline-none cursor-pointer"
                  aria-current={isActive ? 'true' : undefined}
                >
                  {renderLabel(link, isActive, compact, showLabels)}
                </button>
              </li>
            )
          })}
          {includeThemeToggle && compact && (
            <li aria-hidden="true" className="h-px w-7 rounded-full bg-foreground/20 dark:bg-foreground/30" />
          )}
          {includeThemeToggle && (
            <li>
              <ThemeToggle />
            </li>
          )}
        </ul>
      )
    },
    [activeHash, listClassName, renderLabel]
  )

  return (
    <>
      <header className="w-full px-6 py-4 transition-all duration-300 md:px-12 lg:px-20">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between">
          {renderBrand()}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="md:hidden">
              <ThemeToggle />
            </div>
            <div className="hidden md:flex items-center gap-6">
              {renderLinks()}
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>
      {showFloatingNav && (
        <div
          ref={floatingNavContainerRef}
          className="fixed left-0 top-1/2 z-40 flex -translate-y-1/2 items-center gap-1 md:hidden"
        >
          <button
            type="button"
            aria-expanded={isFloatingNavExpanded}
            onClick={() => setIsFloatingNavExpanded((prev) => !prev)}
            className={cn(
              'group flex items-center justify-center rounded-r-full bg-white/90 px-1.5 py-3 shadow-md transition ease-in-out duration-500 focus-visible:outline-none dark:bg-foreground/80',
              isFloatingNavExpanded && 'pointer-events-none opacity-0'
            )}
          >
            <ChevronRight
              className={cn(
                'h-4 w-4 text-black transition ease-in-out duration-500 group-hover:text-black/80 dark:text-background dark:group-hover:text-background/80',
                isFloatingNavExpanded && 'rotate-180'
              )}
            />
          </button>
          <aside
            className={cn(
              'flex w-auto flex-col items-center gap-1.5 rounded-full bg-background/75 px-2 py-2.5 shadow-md backdrop-blur transition-all duration-300 ease-out',
              '-translate-x-8 scale-95 opacity-0 pointer-events-none',
              isFloatingNavExpanded && '-translate-x-3 scale-100 opacity-100 pointer-events-auto'
            )}
            aria-hidden={!isFloatingNavExpanded}
          >
            <div className="flex flex-col items-center gap-1.5">
              {renderLinks({
                compact: true,
                showLabels: false,
                includeThemeToggle: true,
                className:
                  'items-center gap-2 text-xs [&>li]:flex [&>li]:items-center [&>li]:justify-center [&>li]:rounded-full [&>li]:p-1.5',
              })}
            </div>
          </aside>
        </div>
      )}
      <aside
        className={cn(
          'fixed left-6 top-1/2 z-40 hidden w-auto -translate-y-1/2 flex-col items-center gap-4 rounded-full bg-background/80 px-3 py-4 shadow-lg backdrop-blur transition-all duration-300 ease-out md:flex',
          showFloatingNav
            ? 'pointer-events-auto opacity-100 translate-y-0'
            : 'pointer-events-none opacity-0 translate-y-2'
        )}
        aria-hidden={!showFloatingNav}
      >
        <div className="flex flex-col items-center gap-4">
          {renderLinks({
            compact: true,
            showLabels: false,
            includeThemeToggle: true,
            className: 'items-center',
          })}
        </div>
      </aside>
    </>
  )
}
