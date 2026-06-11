import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CaseStudyCard from '@/components/CaseStudyCard'
import ChatDemo from '@/components/ChatDemo'
import CTASection from '@/components/CTASection'
import Link from 'next/link'
import { Wrench, Briefcase, UtensilsCrossed, Zap } from 'lucide-react'

const caseStudies = [
  {
    name: 'Carlos Z.',
    company: 'Pure Air Pros',
    industry: 'HVAC',
    location: 'Miami-Dade',
    description: 'Speed-to-lead capture, after-hours dispatcher, automated review-request loop, calendar handoff for booked jobs.',
    stat: '<5 min',
    quote: 'Every inbound inquiry replied to before it shops the next contractor.',
  },
  {
    name: 'Independent Aesthetics Rep',
    company: 'Aesthetics Practice',
    industry: 'Aesthetics',
    location: 'National',
    description: 'A lead-gen engine, end-to-end — sender infrastructure, two parallel cold campaigns, anti-cannibalization across a shared ICP, booking handoff to her calendar.',
    stat: '3,000+',
    quote: 'Cold outbound across two campaigns, one rep, zero SDRs.',
  },
  {
    name: 'Felipe C.',
    company: 'Mint Financial',
    industry: 'Financial Services',
    location: 'S. FL',
    description: 'Client intake automation, deal-status comms, pipeline visibility across the loan lifecycle — intake to close, on one rail.',
    stat: '100%',
    quote: 'Built for an SMB lender who can\'t afford to lose another deal to a delayed status email.',
  },
]

export default function HomePage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0C0812] min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(#7B3FF2 1px, transparent 1px), linear-gradient(90deg, #7B3FF2 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#7B3FF2]/20 border border-[#7B3FF2]/30 rounded-full px-4 py-2 mb-8">
            <Zap className="w-4 h-4 text-[#7B3FF2]" />
            <span className="text-[#7B3FF2] text-sm font-medium">Miami-Dade&apos;s AI Revenue System</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            More Leads.<br />
            Faster Follow-Up.<br />
            <span className="text-[#7B3FF2]">More Revenue.</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
            The AI-powered revenue system for home service businesses, professional service firms, and hospitality brands.
          </p>
          <a
            href="https://cal.com/automate305"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#7B3FF2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#6930d4] transition-colors"
          >
            Book a Free Audit →
          </a>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="bg-white border-y border-gray-200 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm text-gray-500 font-medium mb-6">Serving Miami-Dade contractors, lenders &amp; hospitality brands</p>
          <div className="flex justify-center gap-12 flex-wrap">
            <div className="flex items-center gap-2 text-gray-600">
              <Wrench className="w-5 h-5 text-[#7B3FF2]" />
              <span className="text-sm font-medium">Home Services</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="w-5 h-5 text-[#7B3FF2]" />
              <span className="text-sm font-medium">Professional Services</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <UtensilsCrossed className="w-5 h-5 text-[#7B3FF2]" />
              <span className="text-sm font-medium">Hospitality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <section className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3">Live Demo</p>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Your AI agent — working while you sleep.</h2>
              <p className="text-gray-600 text-lg mb-6">
                This is what it looks like when an HVAC contractor deploys an AI dispatcher. Every inbound inquiry gets captured, qualified, and booked — in under 5 minutes, 24/7, without a human on standby.
              </p>
              <ul className="space-y-3">
                {['Instant response to every inbound inquiry', 'Qualifies leads and captures contact info', 'Books appointments directly to your calendar', 'Sends review requests after job completion'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-gray-700">
                    <Zap className="w-4 h-4 text-[#7B3FF2] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <ChatDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-[#0C0812] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3 text-center">Results</p>
          <h2 className="text-4xl font-black text-white mb-4 text-center">Real businesses. Real results.</h2>
          <p className="text-gray-400 text-center mb-12 text-lg">From HVAC contractors to SMB lenders — here&apos;s what AI automation delivers.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.company} {...cs} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3 text-center">Industries</p>
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Built for your business type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/industries/home-services" className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#7B3FF2]/30 hover:shadow-lg transition-all">
              <Wrench className="w-10 h-10 text-[#7B3FF2] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Home Services</h3>
              <p className="text-gray-600 text-sm">HVAC, Roofing, Plumbing, Electrical, Restoration. Speed-to-lead and after-hours coverage.</p>
              <span className="text-[#7B3FF2] text-sm font-semibold mt-4 inline-block group-hover:underline">Learn more →</span>
            </Link>
            <Link href="/industries/professional-services" className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#7B3FF2]/30 hover:shadow-lg transition-all">
              <Briefcase className="w-10 h-10 text-[#7B3FF2] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Services</h3>
              <p className="text-gray-600 text-sm">Lenders, Law Firms, Consultants, Insurance Brokers. Automate intake and pipeline comms.</p>
              <span className="text-[#7B3FF2] text-sm font-semibold mt-4 inline-block group-hover:underline">Learn more →</span>
            </Link>
            <Link href="/industries/hospitality" className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#7B3FF2]/30 hover:shadow-lg transition-all">
              <UtensilsCrossed className="w-10 h-10 text-[#7B3FF2] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hospitality</h3>
              <p className="text-gray-600 text-sm">Restaurants, Bars, Hotels. Fill more tables and automate guest communications.</p>
              <span className="text-[#7B3FF2] text-sm font-semibold mt-4 inline-block group-hover:underline">Learn more →</span>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
