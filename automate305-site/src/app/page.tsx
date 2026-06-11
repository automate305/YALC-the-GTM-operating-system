import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CaseStudyCard from '@/components/CaseStudyCard'
import CTASection from '@/components/CTASection'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Automate305 | AI-Powered Revenue Systems for Home Services',
  description: 'Miami-based AI automation agency helping home service contractors, professional firms, and hospitality brands capture more revenue with less manual work.',
  openGraph: {
    title: 'Automate305 | AI-Powered Revenue Systems for Home Services',
    description: 'Miami-based AI automation agency. More leads. Faster follow-up. More revenue.',
    url: 'https://automate305.com',
    siteName: 'Automate305',
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

const industries = [
  {
    href: '/industries/home-services',
    icon: '🔧',
    title: 'Home Services',
    desc: 'HVAC, roofing, plumbing, electrical, restoration. Speed-to-lead, review automation, calendar handoff.',
  },
  {
    href: '/industries/professional-services',
    icon: '💼',
    title: 'Professional Services',
    desc: 'Lenders, law firms, consultants. Pipeline comms, intake automation, proposal follow-up.',
  },
  {
    href: '/industries/hospitality',
    icon: '🍽️',
    title: 'Hospitality',
    desc: 'Restaurants, bars, hotels. Reservation flows, loyalty outreach, review requests.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0C0812] min-h-screen flex items-center relative overflow-hidden">
        {/* Purple grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(123,63,242,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(123,63,242,0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-[#7B3FF2]/20 border border-[#7B3FF2]/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[#7B3FF2] rounded-full animate-pulse" />
            <span className="text-[#7B3FF2] text-sm font-medium">Miami-based AI Automation</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-6">
            More Leads.<br />
            Faster Follow-Up.<br />
            <span className="text-[#7B3FF2]">More Revenue.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
            We build AI-powered revenue systems for home service contractors, professional firms, and hospitality brands across Miami-Dade.
          </p>
          <a
            href="https://cal.com/automate305"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#7B3FF2] text-white font-semibold text-lg px-10 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            Book a Free Audit →
          </a>
          <p className="text-gray-600 text-sm mt-4">No commitment. 30 minutes.</p>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="bg-[#FAF7F2] border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-6">
            Trusted by Miami-Dade contractors, lenders &amp; hospitality brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[
              { icon: '❄️', label: 'HVAC' },
              { icon: '🏠', label: 'Roofing' },
              { icon: '💰', label: 'Lending' },
              { icon: '🍽️', label: 'Restaurants' },
              { icon: '💼', label: 'Professional Services' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#FAF7F2] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0C0812] mb-4">How It Works</h2>
            <p className="text-gray-500 text-lg">Three steps to a fully automated revenue system.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'We audit your revenue gaps',
                desc: 'We map every place a lead can fall through the cracks — slow response times, missed follow-ups, no review requests. Free 30-minute session.',
              },
              {
                step: '02',
                title: 'We build your automation stack',
                desc: 'Custom AI agents, sequences, and integrations. Speed-to-lead, booking flows, status comms, review loops — built in days, not months.',
              },
              {
                step: '03',
                title: 'You close more, work less',
                desc: 'Your system runs 24/7. Every inbound captured, every follow-up sent, every review requested — automatically.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative p-8 bg-white border border-gray-200 rounded-2xl hover:border-[#7B3FF2] transition-colors">
                <div className="text-[#7B3FF2] text-5xl font-black opacity-20 mb-4">{step}</div>
                <h3 className="text-[#0C0812] font-bold text-xl mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live demo chat */}
      <section className="bg-[#0C0812] py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">See the AI Agent in Action</h2>
            <p className="text-gray-400 text-lg">This is what an HVAC lead capture conversation looks like — live, 24/7, under 5 minutes.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden max-w-lg mx-auto">
            {/* Chat header */}
            <div className="bg-gray-800 px-4 py-3 flex items-center gap-3 border-b border-gray-700">
              <div className="w-8 h-8 rounded-full bg-[#7B3FF2] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" fill="white"/>
                </svg>
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Pure Air Pros</div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-green-400 text-xs">Online 24/7</span>
                </div>
              </div>
            </div>
            {/* Messages */}
            <div className="p-4 space-y-4 min-h-64">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#7B3FF2] flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" fill="white"/>
                  </svg>
                </div>
                <div className="bg-gray-800 text-gray-200 text-sm px-3 py-2 rounded-2xl rounded-tl-sm max-w-xs">
                  Hey! 👋 Thanks for reaching out to Pure Air Pros. Is this an emergency or are you looking to schedule service?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#7B3FF2] text-white text-sm px-3 py-2 rounded-2xl rounded-tr-sm max-w-xs">
                  My AC stopped working and it&apos;s 90° in my house
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#7B3FF2] flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" fill="white"/>
                  </svg>
                </div>
                <div className="bg-gray-800 text-gray-200 text-sm px-3 py-2 rounded-2xl rounded-tl-sm max-w-xs">
                  I&apos;m so sorry — that&apos;s a real emergency! We have a tech available today. What&apos;s your address and best phone number?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#7B3FF2] text-white text-sm px-3 py-2 rounded-2xl rounded-tr-sm max-w-xs">
                  8847 SW 132nd St, Miami. 786-555-0192
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#7B3FF2] flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" fill="white"/>
                  </svg>
                </div>
                <div className="bg-gray-800 text-gray-200 text-sm px-3 py-2 rounded-2xl rounded-tl-sm max-w-xs">
                  ✅ Got it! I&apos;ve booked you for today 2–4pm and texted you a confirmation. Carlos will call 30 min before arrival.
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 px-4 py-3">
              <div className="bg-gray-800 rounded-full px-4 py-2 flex items-center gap-2">
                <span className="text-gray-500 text-sm flex-1">Type a message...</span>
                <div className="w-6 h-6 rounded-full bg-[#7B3FF2] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M22 2L11 13"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-600 text-sm mt-6">Response time: 47 seconds · 2:17 AM · Booking confirmed automatically</p>
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-[#FAF7F2] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0C0812] mb-4">Real Systems. Real Results.</h2>
            <p className="text-gray-500 text-lg">From Miami-Dade HVAC to national outbound — here&apos;s what we&apos;ve shipped.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs, i) => (
              <CaseStudyCard key={i} {...cs} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0C0812] mb-4">Built for Your Industry</h2>
            <p className="text-gray-500 text-lg">We go deep on specific verticals — no generic &quot;AI automation&quot; fluff.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industries.map(({ href, icon, title, desc }) => (
              <Link
                key={href}
                href={href}
                className="group p-8 border border-gray-200 rounded-2xl hover:border-[#7B3FF2] hover:bg-[#7B3FF2]/5 transition-all"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-[#0C0812] font-bold text-xl mb-3 group-hover:text-[#7B3FF2] transition-colors">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
                <span className="text-[#7B3FF2] text-sm font-semibold">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  )
}
