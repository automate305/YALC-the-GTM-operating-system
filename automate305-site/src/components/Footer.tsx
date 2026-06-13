import Link from 'next/link'
import Image from 'next/image'
import CalButton from '@/components/CalButton'

export default function Footer() {
  return (
    <footer className="bg-[#111318] text-gray-400 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo-master-dark-bg.png"
                alt="Automate305"
                width={180}
                height={36}
                className="h-9 w-auto object-contain"
              />
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
            <CalButton className="inline-block bg-[#7B3FF2] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#6930d4] transition-colors cursor-pointer">
              Book a Free Audit
            </CalButton>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-sm text-center">
          © 2025 Automate305. All rights reserved. Miami, FL.
        </div>
      </div>
    </footer>
  )
}
