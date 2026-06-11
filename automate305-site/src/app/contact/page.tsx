"use client"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { MapPin, Calendar } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main>
      <Navbar />

      <section className="bg-[#0C0812] pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3">Contact</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Let&apos;s Build Your<br />
            <span className="text-[#7B3FF2]">Revenue System.</span>
          </h1>
          <p className="text-gray-400 text-xl">
            Book a free 30-minute audit or fill out the form below. No commitment, no sales pitch — just a clear picture of your revenue gaps.
          </p>
        </div>
      </section>

      <section className="bg-[#FAF7F2] py-24 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">

          {/* Form */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-8">Request a Free Audit</h2>
            {submitted ? (
              <div className="bg-[#7B3FF2]/10 border border-[#7B3FF2]/30 rounded-2xl p-10 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-black text-xl text-gray-900 mb-2">Got it!</h3>
                <p className="text-gray-600">We&apos;ll be in touch within 1 business day to schedule your audit.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">First Name</label>
                    <input required type="text" placeholder="Carlos" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7B3FF2] bg-white" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Last Name</label>
                    <input required type="text" placeholder="Zapata" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7B3FF2] bg-white" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
                  <input required type="email" placeholder="carlos@pureairpros.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7B3FF2] bg-white" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone</label>
                  <input type="tel" placeholder="(305) 555-0100" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7B3FF2] bg-white" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Business Type</label>
                  <select required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7B3FF2] bg-white text-gray-700">
                    <option value="">Select your industry</option>
                    <optgroup label="Home Services">
                      <option>HVAC</option>
                      <option>Roofing</option>
                      <option>Plumbing</option>
                      <option>Electrical</option>
                      <option>Restoration</option>
                    </optgroup>
                    <optgroup label="Professional Services">
                      <option>SMB Lending</option>
                      <option>Law Firm</option>
                      <option>Consulting</option>
                      <option>Insurance</option>
                    </optgroup>
                    <optgroup label="Hospitality">
                      <option>Restaurant</option>
                      <option>Bar / Lounge</option>
                      <option>Hotel</option>
                    </optgroup>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">What&apos;s your biggest revenue challenge right now?</label>
                  <textarea rows={4} placeholder="Tell us what's slipping through the cracks..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7B3FF2] bg-white resize-none" />
                </div>
                <button type="submit" className="w-full bg-[#7B3FF2] text-white font-bold py-4 rounded-xl hover:bg-[#6930d4] transition-colors text-lg">
                  Request My Free Audit →
                </button>
              </form>
            )}
          </div>

          {/* Cal.com + info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">Or book directly</h2>
              <p className="text-gray-500 text-sm mb-6">Skip the form and grab a time on our calendar. 30 minutes, no commitment.</p>
              <a
                href="https://cal.com/automate305"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl p-5 hover:border-[#7B3FF2] transition-colors group"
              >
                <div className="w-12 h-12 bg-[#7B3FF2]/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#7B3FF2]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 group-hover:text-[#7B3FF2] transition-colors">Book a Free 30-min Audit</p>
                  <p className="text-gray-500 text-sm">cal.com/automate305</p>
                </div>
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-[#7B3FF2] mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">Miami, FL 33128</p>
                  <p className="text-gray-500 text-sm">Serving Miami-Dade, Coral Gables, and surrounding metro area</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <p className="text-gray-500 text-sm">Response time: within 1 business day</p>
              </div>
            </div>

            <div className="bg-[#0C0812] rounded-2xl p-8 text-white">
              <p className="font-black text-lg mb-2">What happens in the audit?</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                {[
                  'We map your current lead flow end-to-end',
                  'We identify your top 3 revenue leaks',
                  'We show you what automation fixes each one',
                  'You leave with a clear action plan — use it with us or on your own',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#7B3FF2] mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
