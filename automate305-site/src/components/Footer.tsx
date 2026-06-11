import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0C0812] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" fill="#7B3FF2" stroke="#7B3FF2" strokeWidth="1" strokeLinejoin="round"/>
              </svg>
              <span className="text-lg font-black tracking-tight">
                <span className="text-white">AUTOMATE</span>
                <span className="text-[#7B3FF2]">305</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered revenue systems for home services, professional firms, and hospitality brands.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">Industries</h4>
            <ul className="space-y-2">
              <li><Link href="/industries/home-services" className="text-gray-400 hover:text-white text-sm transition-colors">Home Services</Link></li>
              <li><Link href="/industries/professional-services" className="text-gray-400 hover:text-white text-sm transition-colors">Professional Services</Link></li>
              <li><Link href="/industries/hospitality" className="text-gray-400 hover:text-white text-sm transition-colors">Hospitality</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/results" className="text-gray-400 hover:text-white text-sm transition-colors">Results</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
              <li>
                <a href="https://cal.com/automate305" target="_blank" rel="noopener noreferrer" className="text-[#7B3FF2] hover:opacity-80 text-sm transition-opacity">
                  Book a Free Audit →
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">Miami, FL · © 2025 Automate305. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
