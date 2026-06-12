'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Home, ChevronDown } from 'lucide-react'

const industries = [
  {
    label: 'Home Services',
    href: '/industries/home-services',
    items: ['HVAC', 'Roofing', 'Plumbing'],
  },
  {
    label: 'Professional Services',
    href: '/industries/professional-services',
    items: ['SMB Lending', 'Law Firms', 'Consultants'],
  },
  {
    label: 'Hospitality',
    href: '/industries/hospitality',
    items: ['Restaurants', 'Bars & Lounges', 'Hotels'],
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navBg = scrolled
    ? 'bg-[#0C0812]/95 backdrop-blur border-b border-white/10'
    : 'bg-[#FAF7F2]/95 backdrop-blur border-b border-gray-200'

  const textColor = scrolled ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#7B3FF2]'
  const logoText = scrolled ? 'text-white' : 'text-[#0C0812]'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo + home icon */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="Back to home"
              className={`p-1.5 rounded-lg transition-colors ${scrolled ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-[#7B3FF2] hover:bg-[#7B3FF2]/10'}`}
            >
              <Home className="w-4 h-4" />
            </Link>
            <Link href="/" className="flex items-center gap-2">
              {/* SVG lightning bolt matching Automate305 brand */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="13,2 4,14 11,14 11,22 20,10 13,10" fill="#7B3FF2" />
              </svg>
              <span className="font-black text-xl tracking-tight">
                <span className={`transition-colors duration-300 ${logoText}`}>AUTOMATE</span>
                <span className="text-[#7B3FF2]">305</span>
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">

            {/* Industries dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${textColor}`}
                onMouseEnter={() => setDropdownOpen(true)}
                onClick={() => setDropdownOpen(v => !v)}
              >
                Industries <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-3 gap-6"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {industries.map(ind => (
                    <div key={ind.label}>
                      <Link
                        href={ind.href}
                        className="block text-sm font-bold text-[#0C0812] hover:text-[#7B3FF2] mb-2 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {ind.label}
                      </Link>
                      <ul className="space-y-1">
                        {ind.items.map(item => (
                          <li key={item}>
                            <Link
                              href={ind.href}
                              className="text-xs text-gray-500 hover:text-[#7B3FF2] transition-colors block py-0.5"
                              onClick={() => setDropdownOpen(false)}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href="/results" className={`text-sm font-medium transition-colors ${textColor}`}>Results</Link>
            <Link href="/about" className={`text-sm font-medium transition-colors ${textColor}`}>About</Link>
            <Link href="/contact" className={`text-sm font-medium transition-colors ${textColor}`}>Contact</Link>

            <a
              href="https://cal.com/automate305/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7B3FF2] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#6930d4] transition-colors whitespace-nowrap"
            >
              📅 Strategy Call w/ Camilo
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
        <div className="md:hidden bg-[#0C0812] border-t border-white/10 px-4 py-6 space-y-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Industries</p>
          {industries.map(ind => (
            <div key={ind.label} className="mb-3">
              <Link
                href={ind.href}
                className="block text-white font-semibold text-sm mb-1"
                onClick={() => setMobileOpen(false)}
              >
                {ind.label}
              </Link>
              {ind.items.map(item => (
                <Link
                  key={item}
                  href={ind.href}
                  className="block text-gray-400 text-xs py-0.5 pl-3 hover:text-[#7B3FF2]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          ))}
          <div className="pt-2 border-t border-white/10 space-y-3">
            {[['Results', '/results'], ['About', '/about'], ['Contact', '/contact']].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="block text-gray-300 text-sm font-medium hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
          <a
            href="https://cal.com/automate305/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-[#7B3FF2] text-white px-4 py-3 rounded-lg text-sm font-bold hover:bg-[#6930d4] transition-colors mt-4"
          >
            📅 Strategy Call w/ Camilo
          </a>
        </div>
      )}
    </nav>
  )
}
