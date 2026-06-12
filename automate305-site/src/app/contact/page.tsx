import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MapPin, Mail, Calendar } from 'lucide-react'

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-[#0C0812] pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3">Contact</p>
          <h1 className="text-5xl font-black text-white mb-6">Let&apos;s talk revenue.</h1>
          <p className="text-gray-400 text-xl">Book a free 30-minute audit or drop us a message. No pitch deck, no fluff — just a real conversation about where AI can add ROI for your business.</p>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-8">Free Revenue Audit</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#7B3FF2]" placeholder="Carlos" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#7B3FF2]" placeholder="Rodriguez" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#7B3FF2]" placeholder="carlos@pureaircooling.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#7B3FF2]" placeholder="(305) 555-0100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#7B3FF2] bg-white">
                  <option value="">Select your industry</option>
                  <option value="hvac">HVAC</option>
                  <option value="roofing">Roofing</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="restoration">Restoration</option>
                  <option value="lending">SMB Lending</option>
                  <option value="law">Law Firm</option>
                  <option value="consulting">Consulting</option>
                  <option value="insurance">Insurance</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="bar">Bar / Lounge</option>
                  <option value="hotel">Hotel</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#7B3FF2]" placeholder="Tell us a bit about your business and what you're trying to solve..."></textarea>
              </div>
              <button type="submit" className="w-full bg-[#7B3FF2] text-white py-3 rounded-lg font-semibold hover:bg-[#6930d4] transition-colors">
                Submit →
              </button>
            </form>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-6">Or book directly</h2>
              <div className="bg-white rounded-xl p-6 border border-gray-100 flex items-start gap-4">
                <Calendar className="w-6 h-6 text-[#7B3FF2] shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">30-Minute Free Audit</h3>
                  <p className="text-gray-600 text-sm mb-3">We'll map your current revenue leaks and show you exactly where AI automation can add ROI.</p>
                  <a href="https://cal.com/automate305/30min" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#7B3FF2] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#6930d4] transition-colors">Book on Cal.com →</a>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#7B3FF2]" />
                <span className="text-gray-700">Miami, FL 33128 — Miami-Dade County</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#7B3FF2]" />
                <a href="mailto:hello@automate305.com" className="text-gray-700 hover:text-[#7B3FF2]">hello@automate305.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
