import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0C0812] text-gray-400 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-[#7B3FF2] fill-[#7B3FF2]" />
              <span className="font-black text-lg tracking-tight">
                <span className="text-white">AUTOMATE</span>
                <span className="text-[#7B3FF2]">305</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">AI-powered revenue automation for Miami-Dade businesses.</p>
            <p className="text-sm mt-2">Miami, FL 33128</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Industries</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/industries/home-services" className="hover:text-white transition-colors">Home Services</Link></li>
              <li><Link href="/industries/professional-services" className="hover:text-white transition-colors">Professional Services</Link></li>
              <li><Link href="/industries/hospitality" className="hover:text-white transition-colors">Hospitality</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/results" className="hover:text-white transition-colors">Results</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Get Started</h4>
            <a
              href="https://cal.com/automate305"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#7B3FF2] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#6930d4] transition-colors"
            >
              Book a Free Audit
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-sm text-center">
          © 2025 Automate305. All rights reserved. Miami, FL.
        </div>
      </div>
    </footer>
  )
}
