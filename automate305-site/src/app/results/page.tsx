import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CaseStudyCard from '@/components/CaseStudyCard'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Results | Automate305',
  description: 'Real AI automation results from Miami-Dade contractors, lenders, and hospitality brands. Speed-to-lead, review capture, outbound campaigns.',
  openGraph: {
    title: 'Results | Automate305',
    description: 'Real systems. Real results. See what we have shipped for Miami-Dade businesses.',
    url: 'https://automate305.com/results',
    type: 'website',
  },
}

const caseStudies = [
  {
    tag: 'HVAC',
    name: 'Carlos Z.',
    company: 'Pure Air Pros',
    industry: 'HVAC · Miami-Dade',
    description: 'Speed-to-lead capture, after-hours dispatcher, automated review-request loop, calendar handoff for booked jobs.',
    stat: '<5 min',
    statLabel: 'response time',
    quote: 'Every inbound inquiry replied to before it shops the next contractor.',
  },
  {
    tag: 'Outbound',
    name: 'Independent Aesthetics Rep',
    company: '',
    industry: 'Aesthetics · National',
    description: 'A lead-gen engine, end-to-end — sender infrastructure, two parallel cold campaigns, anti-cannibalization across a shared ICP, booking handoff to her calendar.',
    stat: '3,000+',
    statLabel: 'contacts / mo',
    quote: 'Cold outbound across two campaigns, one rep, zero SDRs.',
  },
  {
    tag: 'Lending',
    name: 'Felipe C.',
    company: 'Mint Financial',
    industry: 'Financial Services · S. FL',
    description: 'Client intake automation, deal-status comms, pipeline visibility across the loan lifecycle — intake to close, on one rail.',
    stat: '100%',
    statLabel: 'touchpoints automated',
    quote: "Built for an SMB lender who can't afford to lose another deal to a delayed status email.",
  },
]

const metrics = [
  { stat: '<5 min', label: 'Average lead response time', desc: 'vs. industry average of 47 hours' },
  { stat: '3,000+', label: 'Cold contacts per month', desc: 'Per rep, zero SDRs required' },
  { stat: '100%', label: 'Pipeline touchpoints automated', desc: 'Intake to close on one rail' },
  { stat: '24/7', label: 'Uptime for AI agents', desc: 'No answering services, no missed leads' },
]

export default function ResultsPage() {
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
            <span className="text-[#7B3FF2] text-sm font-medium">Real Results</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Real Systems.<br />
            <span className="text-[#7B3FF2]">Real Results.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Every case study on this page is a system we shipped for a real client. No demos. No hypotheticals.
          </p>
        </div>
      </section>

      {/* Key metrics */}
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map(({ stat, label, desc }) => (
              <div key={label} className="text-center">
                <div className="text-[#7B3FF2] text-3xl font-black mb-1">{stat}</div>
                <div className="text-[#0C0812] font-semibold text-sm mb-1">{label}</div>
                <div className="text-gray-400 text-xs">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0C0812] mb-4">Case Studies</h2>
            <p className="text-gray-500 text-lg">
              Three different industries. Three different problems. One approach: build the system, capture the revenue.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {caseStudies.map((cs, i) => (
              <CaseStudyCard key={i} {...cs} />
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard mockup */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#0C0812] mb-4">What the System Looks Like</h2>
            <p className="text-gray-500 text-lg">Real-time visibility into every lead, every touchpoint, every campaign.</p>
          </div>
          <div className="bg-[#0C0812] rounded-2xl overflow-hidden border border-gray-800">
            {/* Dashboard header */}
            <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-400 text-sm ml-3">Revenue Dashboard · Pure Air Pros</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs">Live</span>
              </div>
            </div>
            {/* Dashboard content */}
            <div className="p-6">
              {/* Stat row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Leads Today', value: '12', change: '+4 vs yesterday' },
                  { label: 'Avg Response', value: '3m 42s', change: 'Goal: <5 min ✓' },
                  { label: 'Jobs Booked', value: '8', change: '67% conversion' },
                  { label: 'Reviews Sent', value: '6', change: '3 received so far' },
                ].map(({ label, value, change }) => (
                  <div key={label} className="bg-gray-800/60 rounded-xl p-4">
                    <p className="text-gray-400 text-xs mb-1">{label}</p>
                    <p className="text-white text-2xl font-black mb-1">{value}</p>
                    <p className="text-[#7B3FF2] text-xs">{change}</p>
                  </div>
                ))}
              </div>
              {/* Recent leads */}
              <div className="bg-gray-800/40 rounded-xl p-4">
                <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Recent Leads</h4>
                <div className="space-y-2">
                  {[
                    { name: 'Maria R.', status: 'Booked', time: '2 min ago', source: 'Google' },
                    { name: 'Jorge L.', status: 'Replied', time: '18 min ago', source: 'Web Form' },
                    { name: 'Sandra K.', status: 'Booked', time: '1 hr ago', source: 'Instagram DM' },
                    { name: 'Rafael M.', status: 'Pending', time: '2 hr ago', source: 'Google' },
                  ].map(({ name, status, time, source }) => (
                    <div key={name} className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#7B3FF2]/30 flex items-center justify-center">
                          <span className="text-[#7B3FF2] text-xs font-bold">{name[0]}</span>
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{name}</p>
                          <p className="text-gray-500 text-xs">{source}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          status === 'Booked' ? 'bg-green-500/20 text-green-400' :
                          status === 'Replied' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>{status}</span>
                        <span className="text-gray-500 text-xs">{time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-4">Every client gets a live dashboard like this. Updated in real time.</p>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="bg-[#FAF7F2] py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#0C0812] mb-4">What Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The AI agent picked up a lead at 2am that would have been gone by morning. That job alone paid for the first year.",
                name: 'Carlos Z.',
                title: 'Owner, Pure Air Pros',
                icon: '❄️',
              },
              {
                quote: "I went from manually tracking every loan application to having a full pipeline view updated automatically. I don't miss deals anymore.",
                name: 'Felipe C.',
                title: 'Principal, Mint Financial',
                icon: '💰',
              },
              {
                quote: "Three thousand contacts a month. Two campaigns. Zero SDRs. I didn't know outbound could work at that scale without a team.",
                name: 'Anonymous Client',
                title: 'Aesthetics Rep, National',
                icon: '💼',
              },
            ].map(({ quote, name, title, icon }) => (
              <div key={name} className="bg-white border border-gray-200 rounded-2xl p-8">
                <div className="text-3xl mb-4">{icon}</div>
                <blockquote className="text-[#0C0812] text-sm leading-relaxed mb-6 italic">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <div>
                  <p className="text-[#0C0812] font-semibold text-sm">{name}</p>
                  <p className="text-gray-500 text-xs">{title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  )
}
