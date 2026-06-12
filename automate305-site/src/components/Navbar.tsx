'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'How it works', id: 'how-it-works' },
  {
    label: 'Industries',
    id: 'industries',
    dropdown: [
      { label: 'Home Services', href: '/industries/home-services' },
      { label: 'Professional Services', href: '/industries/professional-services' },
      { label: 'Hospitality', href: '/industries/hospitality' },
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

  const navBg = scrolled
    ? 'bg-[#0C0812]/95 backdrop-blur-md border-b border-white/10'
    : 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-gray-200'

  const linkBase = scrolled
    ? 'text-gray-300 hover:text-white'
    : 'text-gray-700 hover:text-[#7B3FF2]'

  const logoWord = scrolled ? 'text-white' : 'text-[#0C0812]'

  return (
    <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => scrollTo('hero')} className="flex items-center">
            <Image
              src={scrolled ? '/logo-master-dark-bg.png' : '/logo-master-light-bg.png'}
              alt="Automate305"
              width={160}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const hasDropdown = !!item.dropdown
              const isOpen = openDropdown === item.id
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => hasDropdown && setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => {
                      if (!hasDropdown) scrollTo(item.id)
                      else setOpenDropdown(isOpen ? null : item.id)
                    }}
                    className={`flex items-center gap-0.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${linkBase}`}
                  >
                    {item.label}
                    {hasDropdown && (
                      <ChevronDown className={`w-3 h-3 ml-0.5 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
                    )}
                  </button>

                  {hasDropdown && isOpen && (
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 min-w-[180px] rounded-xl shadow-xl border overflow-hidden z-50 ${scrolled ? 'bg-[#0C0812] border-white/10' : 'bg-white border-gray-100'}`}>
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

            <a
              href="https://cal.com/automate305/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 bg-[#7B3FF2] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#6930d4] transition-colors whitespace-nowrap"
            >
              Book a Free Audit
            </a>
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
          <a
            href="https://cal.com/automate305/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-[#7B3FF2] text-white px-4 py-3 rounded-lg text-sm font-bold hover:bg-[#6930d4] transition-colors mt-3"
          >
            Book a Free Audit
          </a>
        </div>
      )}
    </nav>
  )
}
