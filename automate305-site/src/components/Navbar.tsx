'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0C0812] shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" fill="#7B3FF2" stroke="#7B3FF2" strokeWidth="1" strokeLinejoin="round"/>
            </svg>
            <span className="text-lg font-black tracking-tight">
              <span className={scrolled ? 'text-white' : 'text-[#0C0812]'}>AUTOMATE</span>
              <span className="text-[#7B3FF2]">305</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Industries', href: '/industries/home-services' },
              { label: 'Solutions', href: '#solutions' },
              { label: 'Results', href: '/results' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`text-sm font-medium transition-colors hover:text-[#7B3FF2] ${scrolled ? 'text-white' : 'text-[#0C0812]'}`}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://cal.com/automate305"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7B3FF2] text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Book a Free Audit
            </a>
          </div>
          {/* Mobile: just the CTA */}
          <div className="md:hidden">
            <a
              href="https://cal.com/automate305"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7B3FF2] text-white text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Book Audit
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
