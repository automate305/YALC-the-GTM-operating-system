import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-brand-purple fill-brand-purple" />
              <span className="font-black text-xl tracking-tight">
                AUTOMATE<span className="text-brand-purple">305</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The AI-powered revenue system for Miami-Dade&apos;s home service businesses, professional service firms, and hospitality brands.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-200">Industries</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/industries/home-services" className="hover:text-white transition-colors">Home Services</Link></li>
              <li><Link href="/industries/professional-services" className="hover:text-white transition-colors">Professional Services</Link></li>
              <li><Link href="/industries/hospitality" className="hover:text-white transition-colors">Hospitality</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-200">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/results" className="hover:text-white transition-colors">Results</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li>
                <a href="https://cal.com/automate305" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Book a Free Audit
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2025 Automate305. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Miami, FL 33128</p>
        </div>
      </div>
    </footer>
  );
}
