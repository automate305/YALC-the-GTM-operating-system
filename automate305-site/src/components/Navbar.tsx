'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, Wrench, Briefcase, UtensilsCrossed } from 'lucide-react'
import CalButton from '@/components/CalButton'

type DropdownItem =
  | { label: string; href: string }
  | { label: string; anchor: string }

type MegaColumn = {
  icon: React.ElementType
  title: string
  href: string
  items: string[]
}

type NavItem = {
  label: string
  id: string
  dropdown?: DropdownItem[]
  mega?: MegaColumn[]
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', id: 'hero' },
  { label: 'How it works', id: 'how-it-works' },
  {
    label: 'Industries',
    id: 'industries',
    mega: [
      {
        icon: Wrench,
        title: 'Home Services',
        href: '/industries/home-services',
        items: ['HVAC', 'Roofing', 'Plumbing', 'Electrical', 'Restoration'],
      },
      {
        icon: Briefcase,
        title: 'Professional Services',
        href: '/industries/professional-services',
        items: ['SMB Lenders', 'Law Firms', 'Consultants', 'Insurance Brokers'],
      },
      {
        icon: UtensilsCrossed,
        title: 'Hospitality',
        href: '/industries/hospitality',
        items: ['Restaurants', 'Bars & Lounges', 'Hotels'],
      },
    ],
  },
  {
    label: 'Results',
    id: 'results',
    dropdown: [
      { label: 'RevOps Dashboard', anchor: 'revops-dashboard' },
      { label: 'Case Studies', anchor: 'case-studies' },
    ],
  },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

function scrollTo(id: string) {
  if (typeof window === 'undefined') return
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    window.location.href = `/#${id}`
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Delayed close prevents flicker when mouse moves from button into dropdown panel
  const openMenu = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(id)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120)
  }

  const navBg = scrolled
    ? 'bg-[#0C0812]/95 backdrop-blur-md border-b border-white/10'
    : 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-gray-200'

  const linkBase = scrolled
    ? 'text-gray-300 hover:text-white'
    : 'text-gray-700 hover:text-[#7B3FF2]'

  return (
    <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => scrollTo('hero')} className="flex items-center">
            <Image
              src={scrolled ? '/logo-master-dark-bg.png' : '/logo-master-light-bg.png'}
              alt="Automate305"
              width={220}
              height={44}
              className="h-11 w-auto object-contain"
              priority
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const hasDropdown = !!item.dropdown
              const hasMega = !!item.mega
              const isOpen = openDropdown === item.id

              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => (hasDropdown || hasMega) ? openMenu(item.id) : undefined}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    onClick={() => {
                      if (!hasDropdown && !hasMega) scrollTo(item.id)
                      else setOpenDropdown(isOpen ? null : item.id)
                    }}
                    className={`flex items-center gap-0.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${linkBase}`}
                  >
                    {item.label}
                    {(hasDropdown || hasMega) && (
                      <ChevronDown className={`w-3 h-3 ml-0.5 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
                    )}
                  </button>

                  {/* Mega menu — Industries */}
                  {hasMega && isOpen && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[560px] rounded-xl shadow-2xl border z-50 ${scrolled ? 'bg-[#0C0812] border-white/10' : 'bg-white border-gray-100'}`}
                      onMouseEnter={() => openMenu(item.id)}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="grid grid-cols-3 gap-0 p-2">
                        {item.mega!.map((col) => {
                          const Icon = col.icon
                          return (
                            <div key={col.title} className="p-3">
                              <Link
                                href={col.href}
                                onClick={() => setOpenDropdown(null)}
                                className={`flex items-center gap-2 font-semibold text-sm mb-2 pb-2 border-b ${scrolled ? 'text-white border-white/10 hover:text-[#7B3FF2]' : 'text-gray-900 border-gray-100 hover:text-[#7B3FF2]'}`}
                              >
                                <Icon className="w-4 h-4 text-[#7B3FF2] shrink-0" />
                                {col.title}
                              </Link>
                              <ul className="space-y-1">
                                {col.items.map(sub => (
                                  <li key={sub}>
                                    <Link
                                      href={col.href}
                                      onClick={() => setOpenDropdown(null)}
                                      className={`block text-xs py-0.5 transition-colors ${scrolled ? 'text-gray-400 hover:text-[#7B3FF2]' : 'text-gray-500 hover:text-[#7B3FF2]'}`}
                                    >
                                      {sub}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Regular dropdown — Results */}
                  {hasDropdown && isOpen && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-0 min-w-[180px] rounded-xl shadow-xl border overflow-hidden z-50 ${scrolled ? 'bg-[#0C0812] border-white/10' : 'bg-white border-gray-100'}`}
                      onMouseEnter={() => openMenu(item.id)}
                      onMouseLeave={scheduleClose}
                    >
                      {item.dropdown!.map(sub => {
                        const isAnchor = 'anchor' in sub
                        return isAnchor ? (
                          <button
                            key={sub.label}
                            onClick={() => { scrollTo((sub as { label: string; anchor: string }).anchor); setOpenDropdown(null) }}
                            className={`w-full text-left block px-4 py-2.5 text-sm transition-colors ${scrolled ? 'text-gray-300 hover:bg-white/10 hover:text-white' : 'text-gray-700 hover:bg-[#7B3FF2]/5 hover:text-[#7B3FF2]'}`}
                          >
                            {sub.label}
                          </button>
                        ) : (
                          <Link
                            key={sub.label}
                            href={(sub as { label: string; href: string }).href}
                            onClick={() => setOpenDropdown(null)}
                            className={`block px-4 py-2.5 text-sm transition-colors ${scrolled ? 'text-gray-300 hover:bg-white/10 hover:text-white' : 'text-gray-700 hover:bg-[#7B3FF2]/5 hover:text-[#7B3FF2]'}`}
                          >
                            {sub.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}

            <CalButton className="ml-3 bg-[#7B3FF2] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#6930d4] transition-colors whitespace-nowrap cursor-pointer">
              Book a Free Audit
            </CalButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-[#7B3FF2]'}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0C0812] border-t border-white/10 px-4 py-5 space-y-1">
          {NAV_ITEMS.map(item => (
            <div key={item.id}>
              <button
                onClick={() => { scrollTo(item.id); setMobileOpen(false) }}
                className="w-full text-left text-gray-300 text-sm font-medium py-2.5 hover:text-white transition-colors"
              >
                {item.label}
              </button>
              {item.mega && (
                <div className="pl-4 border-l border-white/10 mb-2 space-y-2">
                  {item.mega.map(col => (
                    <div key={col.title}>
                      <Link
                        href={col.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-gray-300 text-xs font-semibold py-1 hover:text-[#7B3FF2]"
                      >
                        {col.title}
                      </Link>
                      {col.items.map(sub => (
                        <Link
                          key={sub}
                          href={col.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-gray-500 text-xs py-0.5 pl-2 hover:text-gray-300"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {item.dropdown && (
                <div className="pl-4 border-l border-white/10 mb-1">
                  {item.dropdown.map(sub => {
                    const isAnchor = 'anchor' in sub
                    return isAnchor ? (
                      <button key={sub.label}
                        onClick={() => { scrollTo((sub as { label: string; anchor: string }).anchor); setMobileOpen(false) }}
                        className="block w-full text-left text-gray-500 text-xs py-1.5 hover:text-gray-300">
                        {sub.label}
                      </button>
                    ) : (
                      <Link key={sub.label}
                        href={(sub as { label: string; href: string }).href}
                        className="block text-gray-500 text-xs py-1.5 hover:text-gray-300"
                        onClick={() => setMobileOpen(false)}>
                        {sub.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
          <CalButton className="block w-full text-center bg-[#7B3FF2] text-white px-4 py-3 rounded-lg text-sm font-bold hover:bg-[#6930d4] transition-colors mt-3 cursor-pointer">
            Book a Free Audit
          </CalButton>
        </div>
      )}
    </nav>
  )
}
