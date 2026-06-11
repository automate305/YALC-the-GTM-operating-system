import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F2]/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#7B3FF2] fill-[#7B3FF2]" />
            <span className="font-black text-xl tracking-tight">
              <span className="text-[#0C0812]">AUTOMATE</span>
              <span className="text-[#7B3FF2]">305</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/industries/home-services" className="text-sm font-medium text-gray-700 hover:text-[#7B3FF2] transition-colors">Industries</Link>
            <Link href="/results" className="text-sm font-medium text-gray-700 hover:text-[#7B3FF2] transition-colors">Results</Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-[#7B3FF2] transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-[#7B3FF2] transition-colors">Contact</Link>
            <a
              href="https://cal.com/automate305"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7B3FF2] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#6930d4] transition-colors"
            >
              Book a Free Audit
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
