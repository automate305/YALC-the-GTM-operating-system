import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Home Services Automation | Automate305',
  description: 'AI automation for HVAC, roofing, plumbing, electrical, and restoration contractors in Miami-Dade. Speed-to-lead, review automation, calendar handoff.',
  openGraph: {
    title: 'Home Services Automation | Automate305',
    description: 'Built for the trades. Speed-to-lead, review automation, and job cycle automation for Miami contractors.',
    url: 'https://automate305.com/industries/home-services',
    type: 'website',
  },
}

const trades = [
  {
    icon: '❄️',
    name: 'HVAC',
    useCases: [
      { title: 'Speed-to-lead response (<5 min)', desc: 'Every inbound inquiry — web form, call, DM — gets an immediate AI response before the lead shops a competitor.' },
      { title: 'After-hours dispatcher bot', desc: 'Emergency calls at 2am get triaged and scheduled automatically. No answering service required.' },
      { title: 'Automated review request after job close', desc: 'Google review request goes out 2 hours after job completion, every single time.' },
      { title: 'Calendar handoff for booked service calls', desc: "AI captures the lead, confirms availability, and drops the booking directly on the tech's calendar." },
    ],
  },
  {
    icon: '🏠',
    name: 'Roofing',
    useCases: [
      { title: 'Storm damage lead capture', desc: "When a storm hits, your AI agent is ready to triage every inbound lead within minutes — not days." },
      { title: 'Estimate follow-up sequences', desc: "Automated multi-touch follow-up on every estimate sent. Never let a quote die in someone's inbox again." },
      { title: 'Insurance claim status updates', desc: 'Keep homeowners informed throughout the claim process with automated status communications.' },
      { title: 'Crew scheduling automation', desc: 'Job confirmations, crew assignments, and homeowner prep checklists — all automated.' },
    ],
  },
  {
    icon: '🔧',
    name: 'Plumbing',
    useCases: [
      { title: 'Emergency call routing', desc: 'Burst pipe at midnight? AI triage routes emergency calls to the on-call tech immediately.' },
      { title: 'Booking confirmation + reminder SMS', desc: 'Every booked job gets a confirmation and a day-before reminder to reduce no-shows.' },
      { title: 'Post-service review requests', desc: 'Automated Google and Yelp review requests after every completed job.' },
      { title: 'Seasonal maintenance outreach', desc: 'Re-engage past customers with water heater checks, drain cleaning, and winterization campaigns.' },
    ],
  },
  {
    icon: '⚡',
    name: 'Electrical',
    useCases: [
      { title: 'Quote follow-up automation', desc: 'Multi-touch follow-up sequence on every electrical estimate. Captures jobs that would otherwise go dark.' },
      { title: 'Permit status communication', desc: 'Automated updates to homeowners on permit status, inspection scheduling, and job timeline.' },
      { title: 'Recurring maintenance reminders', desc: 'Panel inspections, smoke detector testing, GFCI checks — automated outreach to your customer base.' },
      { title: 'Lead scoring + routing', desc: 'AI qualifies inbound leads by job size and urgency, routing high-value work to senior techs.' },
    ],
  },
  {
    icon: '🌊',
    name: 'Restoration',
    useCases: [
      { title: '24/7 emergency intake', desc: 'Flood and fire leads get immediate response any hour — AI captures scope, address, and insurance info.' },
      { title: 'Insurance adjuster communication automation', desc: 'Automated status updates and document requests keep the claim process moving without phone tag.' },
      { title: 'Job status updates to homeowners', desc: 'Daily or milestone-based updates keep homeowners calm and reduce inbound calls to your office.' },
      { title: 'Review + referral automation', desc: 'Post-project review requests and referral asks go out automatically at job close.' },
    ],
  },
]

export default function HomeServicesPage() {
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
            <span className="text-[#7B3FF2] text-sm font-medium">Home Services</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Built for the Trades.<br />
            <span className="text-[#7B3FF2]">Powered by AI.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
            From the first inbound call to the 5-star review request — we automate the full job cycle.
          </p>
          <a
            href="https://cal.com/automate305"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#7B3FF2] text-white font-semibold text-lg px-10 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            Book a Free Audit →
          </a>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-200 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '<5 min', label: 'Average response time' },
              { stat: '24/7', label: 'AI agent uptime' },
              { stat: '5x', label: 'More reviews captured' },
              { stat: '0', label: 'Leads lost after hours' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <div className="text-[#7B3FF2] text-3xl font-black mb-1">{stat}</div>
                <div className="text-gray-500 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trade sections */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0C0812] mb-4">Every Trade. Every Workflow.</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We build vertical-specific systems — not generic bots. Each trade gets automations tuned to how their jobs actually run.
            </p>
          </div>
          <div className="space-y-20">
            {trades.map((trade, i) => (
              <div key={trade.name} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">{trade.icon}</span>
                    <h2 className="text-3xl font-black text-[#0C0812]">{trade.name}</h2>
                  </div>
                  <div className="space-y-4">
                    {trade.useCases.map((uc) => (
                      <div key={uc.title} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#7B3FF2]/20 border border-[#7B3FF2]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7B3FF2]" />
                        </div>
                        <div>
                          <p className="text-[#0C0812] font-semibold text-sm">{uc.title}</p>
                          <p className="text-gray-500 text-sm mt-1">{uc.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`bg-[#0C0812] rounded-2xl p-8 border border-gray-800 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="text-6xl mb-6 text-center">{trade.icon}</div>
                  <h3 className="text-white text-center font-bold text-xl mb-2">{trade.name} Automation System</h3>
                  <p className="text-gray-400 text-center text-sm mb-6">
                    Built specifically for {trade.name.toLowerCase()} contractors. Every automation tuned to how your jobs actually run.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {trade.useCases.map((uc) => (
                      <div key={uc.title} className="bg-gray-800/60 rounded-lg px-3 py-2">
                        <p className="text-[#7B3FF2] text-xs font-semibold">{uc.title}</p>
                      </div>
                    ))}
                  </div>
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
