import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Automate305',
  description: 'Book a free 30-minute revenue audit with Automate305. Miami-based AI automation agency for home services, professional services, and hospitality.',
  openGraph: {
    title: 'Contact | Automate305',
    description: 'Book a free 30-minute revenue audit. Miami-based team. No commitment.',
    url: 'https://automate305.com/contact',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0C0812] pt-32 pb-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(123,63,242,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(123,63,242,0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#7B3FF2]/20 border border-[#7B3FF2]/30 rounded-full px-4 py-2 mb-8">
            <span className="text-[#7B3FF2] text-sm font-medium">Get in Touch</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Let&apos;s Map Your<br />
            <span className="text-[#7B3FF2]">Revenue Gaps.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Book a free 30-minute audit. We&apos;ll show you exactly where you&apos;re losing revenue and what a system would look like for your business.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: info */}
            <div>
              <h2 className="text-3xl font-black text-[#0C0812] mb-6">Book a Free Revenue Audit</h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                In 30 minutes, we&apos;ll walk through your current lead capture, follow-up, and review processes — and map every place revenue is leaking. No pitch. No pressure. Just a clear picture of your biggest automation opportunity.
              </p>
              <div className="space-y-6 mb-10">
                {[
                  { icon: '📍', title: 'Miami-based', desc: 'We are local. We know Miami-Dade businesses and how they operate.' },
                  { icon: '⏱️', title: '30 minutes', desc: 'Focused, structured, actionable. We respect your time.' },
                  { icon: '🚫', title: 'No commitment', desc: "You walk away with clarity on your biggest gap, even if you don't hire us." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">{icon}</span>
                    <div>
                      <p className="text-[#0C0812] font-semibold">{title}</p>
                      <p className="text-gray-500 text-sm mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct booking CTA */}
              <div className="bg-[#0C0812] rounded-2xl p-8 border border-gray-800">
                <h3 className="text-white font-bold text-xl mb-2">Ready to book now?</h3>
                <p className="text-gray-400 text-sm mb-6">Skip the form — pick a time directly on our calendar.</p>
                <a
                  href="https://cal.com/automate305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#7B3FF2] text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  Book on Cal.com →
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
