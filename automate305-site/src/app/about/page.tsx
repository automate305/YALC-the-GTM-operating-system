import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'About | Automate305',
  description: 'Miami-based AI automation agency. We build revenue systems for home service contractors, professional firms, and hospitality brands across Miami-Dade.',
  openGraph: {
    title: 'About | Automate305',
    description: 'We are Miami-based operators and builders. We build the systems we wish existed.',
    url: 'https://automate305.com/about',
    type: 'website',
  },
}

const values = [
  {
    icon: '🏙️',
    title: 'Miami-first',
    desc: "We live and work in Miami-Dade. We know the market, the contractors, the pace. We're not a remote agency pretending to understand your market.",
  },
  {
    icon: '🔧',
    title: 'Operators, not theorists',
    desc: 'We have run outbound, built pipelines, and managed follow-up ourselves. We build systems we would use — not demos we pitch.',
  },
  {
    icon: '⚡',
    title: 'Fast and real',
    desc: "Days to ship, not months. No 6-month roadmaps. We build the first system, you see results, we iterate. That's the only timeline we operate on.",
  },
  {
    icon: '🔒',
    title: 'You own your data',
    desc: "Your leads, your conversations, your pipeline — on your stack. We don't hold data hostage behind a proprietary platform.",
  },
]

const services = [
  { name: 'Speed-to-lead AI agents', desc: 'Respond to every inbound lead under 5 minutes, 24/7.' },
  { name: 'After-hours dispatch automation', desc: 'Emergency triage and job booking without an answering service.' },
  { name: 'Multi-touch follow-up sequences', desc: 'Never let an estimate, quote, or application go dark again.' },
  { name: 'Review request automation', desc: 'Google and Yelp review asks triggered automatically at job close.' },
  { name: 'Cold outbound infrastructure', desc: 'Sender infrastructure, campaigns, and booking handoff — end-to-end.' },
  { name: 'Pipeline visibility dashboards', desc: 'Real-time view of every lead, touchpoint, and conversion.' },
]

export default function AboutPage() {
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
            <span className="text-[#7B3FF2] text-sm font-medium">About Automate305</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            We Build the Systems<br />
            <span className="text-[#7B3FF2]">You Wish You Had.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Miami-based operators and builders. We build revenue systems for the businesses that keep Miami running.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-[#0C0812] mb-6">Why We Started</h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Miami contractors are running million-dollar businesses on WhatsApp, post-it notes, and gut instinct. They&apos;re losing jobs to slower competitors who happen to have a faster follow-up system. They&apos;re leaving reviews uncollected and referrals untapped.
                </p>
                <p>
                  We started Automate305 because we saw the gap between what AI can do and what local businesses were actually using it for. The tools exist. The integrations work. What was missing was someone to build it specifically for the trades, for lenders, for restaurants — not as a generic SaaS, but as a custom system tuned to how each business actually operates.
                </p>
                <p>
                  That&apos;s what we do. We sit with you, map your revenue leaks, and build the automation layer that plugs them.
                </p>
              </div>
            </div>
            <div className="bg-[#0C0812] rounded-2xl p-8 border border-gray-800">
              <div className="space-y-4">
                {[
                  { label: 'Founded', value: '2024' },
                  { label: 'Based in', value: 'Miami, FL' },
                  { label: 'Industries served', value: 'Home Services, Professional Services, Hospitality' },
                  { label: 'Approach', value: 'Custom systems, not SaaS subscriptions' },
                  { label: 'Time to first system', value: 'Days, not months' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-3 border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                    <span className="text-gray-500 text-sm w-40 flex-shrink-0">{label}</span>
                    <span className="text-white text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#FAF7F2] py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0C0812] mb-4">How We Work</h2>
            <p className="text-gray-500 text-lg">A few things that are non-negotiable about how we operate.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#7B3FF2] transition-colors">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-[#0C0812] font-bold text-xl mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0C0812] mb-4">What We Build</h2>
            <p className="text-gray-500 text-lg">Every engagement starts with an audit. Every engagement ends with a running system.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ name, desc }) => (
              <div key={name} className="border border-gray-200 rounded-xl p-6 hover:border-[#7B3FF2] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#7B3FF2]/10 border border-[#7B3FF2]/30 flex items-center justify-center mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#7B3FF2]" />
                </div>
                <h3 className="text-[#0C0812] font-bold text-base mb-2">{name}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Miami section */}
      <section className="bg-[#0C0812] py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">🌴</div>
          <h2 className="text-4xl font-black text-white mb-6">
            305 Is More Than an Area Code
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            It&apos;s a commitment. We are building for Miami businesses because we believe Miami operators deserve the same AI-powered systems that enterprise companies deploy — without the enterprise price tag or the 18-month implementation timeline.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mt-4">
            If your business is in Miami-Dade and you are losing revenue to slow follow-up, missed leads, or manual work that should be automated — we are the team to call.
          </p>
          <div className="mt-10">
            <a
              href="https://cal.com/automate305"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#7B3FF2] text-white font-semibold text-lg px-10 py-4 rounded-full hover:opacity-90 transition-opacity"
            >
              Book a Free Audit →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
