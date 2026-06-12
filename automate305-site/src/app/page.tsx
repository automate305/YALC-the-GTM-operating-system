import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CaseStudyCard from '@/components/CaseStudyCard'
import dynamic from 'next/dynamic'
const OrchestrationFlow = dynamic(() => import('@/components/OrchestrationFlow'), { ssr: false })
import LogoMarquee from '@/components/LogoMarquee'
import ResultsChart from '@/components/ResultsChart'
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
    quote: "Built for an SMB lender who can't afford to lose another deal to a delayed status email.",
  },
]

const industryCards = [
  {
    icon: Wrench,
    title: 'Home Services',
    desc: 'HVAC, Roofing, Plumbing, Electrical, Restoration.',
    href: '/industries/home-services',
    preview: [
      'Speed-to-lead reply in under 60 seconds',
      'After-hours AI dispatcher captures & books jobs',
      'Automated review requests post-job completion',
    ],
  },
  {
    icon: Briefcase,
    title: 'Professional Services',
    desc: 'SMB Lenders, Law Firms, Consultants, Insurance Brokers.',
    href: '/industries/professional-services',
    preview: [
      'Automated client intake & document collection',
      'Deal-status comms with zero manual follow-up',
      'Cold outbound engine with AI-personalized copy',
    ],
  },
  {
    icon: UtensilsCrossed,
    title: 'Hospitality',
    desc: 'Restaurants, Bars & Lounges, Hotels.',
    href: '/industries/hospitality',
    preview: [
      'Reservation & waitlist automation 24/7',
      'VIP & bottle service lead capture from DMs',
      'Post-visit review loops & loyalty reactivation',
    ],
  },
]

const aboutValues = [
  {
    title: 'Miami-Built',
    desc: 'Born in Miami-Dade, built for the pace of South Florida business. We understand the market because we live in it.',
  },
  {
    title: 'Revenue-First',
    desc: 'Every automation we deploy is measured against one outcome: more revenue, faster. No vanity metrics, no fluff.',
  },
  {
    title: 'AI-Native',
    desc: 'Not a software agency that added AI. Not a consultant with a SaaS subscription. We build AI-native systems from scratch.',
  },
]

export default function HomePage() {
  return (
    <main>
      <Navbar />

      {/* ─── 1. HERO ────────────────────────────────────────── */}
      <section
        id="hero"
        className="bg-[#0C0812] min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(#7B3FF2 1px, transparent 1px), linear-gradient(90deg, #7B3FF2 1px, transparent 1px)',
          backgroundSize: '60px 60px',
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
            href="https://cal.com/automate305/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#7B3FF2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#6930d4] transition-colors"
          >
            Book a Free Audit →
          </a>
        </div>
      </section>

      {/* Logo marquee — visual separator, no nav section */}
      <LogoMarquee />

      {/* Quote / stat divider */}
      <section className="bg-[#0C0812] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-0.5 bg-[#7B3FF2] mx-auto mb-8" />
          <blockquote className="text-2xl md:text-3xl font-bold text-white italic leading-snug mb-6">
            &ldquo;76% of small business owners are actively using or exploring AI — yet only 1 in 4 have any formal system running. Less than 5% have hired a professional to put one in place.&rdquo;
          </blockquote>
          <p className="text-gray-500 text-sm mb-8">
            Reimagine Main Street / NSBA Small Business AI Survey · PayPal Research, 2025
          </p>
          <div className="w-12 h-0.5 bg-[#7B3FF2] mx-auto mb-8" />
          <p className="text-2xl font-black text-[#7B3FF2]">That 5% is pulling ahead. Fast.</p>
        </div>
      </section>

      {/* ─── 2. HOW IT WORKS ────────────────────────────────── */}
      <section id="how-it-works" className="bg-[#0C0812] py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#7B3FF2] text-xs font-semibold uppercase tracking-[0.15em] mb-3 text-center">
            HOW YOUR LEADS GET HANDLED
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">
            From first contact to booked appointment —<br />
            <span className="text-[#7B3FF2]">zero manual steps.</span>
          </h2>
          <p className="text-gray-400 text-lg text-center mb-14 max-w-2xl mx-auto">
            Watch the flow. Every node is a real system component running 24/7. Hover each to see what it does.
          </p>
          <OrchestrationFlow />
          <div className="mt-10 text-center">
            <a
              href="https://cal.com/automate305/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#7B3FF2] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#6930d4] transition-colors"
            >
              Build this for my business →
            </a>
          </div>
        </div>
      </section>

      {/* ─── 3. INDUSTRIES ──────────────────────────────────── */}
      <section id="industries" className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3 text-center">Industries</p>
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">Built for your business type</h2>
          <p className="text-gray-500 text-center mb-12">Hover a card to see a preview of what we deploy.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industryCards.map(({ icon: Icon, title, desc, href, preview }) => (
              <Link
                key={title}
                href={href}
                className="group relative bg-[#0C0812] rounded-2xl border border-gray-800 hover:border-[#7B3FF2]/60 overflow-hidden transition-all duration-300 min-h-[280px] flex flex-col"
              >
                {/* Base content */}
                <div className="p-8 flex flex-col flex-1 relative z-10 transition-opacity duration-300 group-hover:opacity-0">
                  <Icon className="w-10 h-10 text-[#7B3FF2] mb-4 shrink-0" />
                  <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                  <span className="text-[#7B3FF2] text-sm font-semibold mt-auto pt-4 inline-block">
                    Explore →
                  </span>
                </div>

                {/* Hover preview — cross-fades in */}
                <div className="absolute inset-0 p-8 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-[#0C0812]">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-6 h-6 text-[#7B3FF2] shrink-0" />
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                  </div>
                  <p className="text-xs font-semibold text-[#7B3FF2] uppercase tracking-widest mb-3">What we deploy:</p>
                  <ul className="space-y-3 flex-1">
                    {preview.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                        <Zap className="w-3.5 h-3.5 text-[#7B3FF2] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="text-[#7B3FF2] text-sm font-semibold mt-4 inline-block border border-[#7B3FF2]/30 rounded-lg px-4 py-2 text-center hover:bg-[#7B3FF2] hover:text-white transition-colors">
                    See full playbook →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. RESULTS ─────────────────────────────────────── */}
      <section id="results" className="bg-[#0C0812] py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3 text-center">Results</p>
          <h2 className="text-4xl font-black text-white mb-4 text-center">The numbers don&apos;t lie.</h2>
          <p className="text-gray-400 text-center mb-14 text-lg">Real outcomes from real Automate305 deployments across Miami-Dade and beyond.</p>

          {/* RevOps Dashboard */}
          <div id="revops-dashboard" className="mb-20 scroll-mt-20">
            <h3 className="text-2xl font-black text-white mb-2">RevOps Dashboard</h3>
            <p className="text-gray-500 mb-8 text-sm">Composite metrics across active accounts. Individual results vary by industry and deployment scope.</p>
            <div className="bg-[#FAF7F2] rounded-2xl p-6 md:p-8">
              <ResultsChart />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { label: 'Avg. Response Time', value: '<5 min', sub: 'vs. 47 min industry avg' },
                { label: 'Leads Captured/Mo', value: '127', sub: '6-month high, HVAC client' },
                { label: 'Contacts Sourced/Mo', value: '3,000+', sub: 'Aesthetics cold outbound' },
                { label: 'Touchpoints Automated', value: '100%', sub: 'SMB lender, intake to close' },
              ].map(stat => (
                <div key={stat.label} className="bg-[#FAF7F2] rounded-xl p-5 text-center">
                  <p className="text-3xl font-black text-[#7B3FF2]">{stat.value}</p>
                  <p className="font-semibold text-gray-900 text-sm mt-1">{stat.label}</p>
                  <p className="text-gray-500 text-xs mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Case Studies */}
          <div id="case-studies" className="scroll-mt-20">
            <h3 className="text-2xl font-black text-white mb-8">Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudies.map((cs) => (
                <CaseStudyCard key={cs.company} {...cs} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. ABOUT ───────────────────────────────────────── */}
      <section id="about" className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3 text-center">About</p>
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">Miami-built. Revenue-first. AI-native.</h2>
          <p className="text-gray-500 text-center mb-14 text-lg max-w-2xl mx-auto">
            We&apos;re not a software agency that bolted on AI. We build AI-native revenue systems from scratch — for businesses that compete on speed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {aboutValues.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-8 border border-gray-100">
                <div className="w-10 h-10 bg-[#7B3FF2]/10 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-[#7B3FF2]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/about" className="text-[#7B3FF2] font-semibold text-sm hover:underline">
              Our full story →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6. CONTACT ─────────────────────────────────────── */}
      <section id="contact" className="bg-[#0C0812] py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3">Contact</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to pull ahead?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Book a free 30-minute audit. We&apos;ll map your revenue leaks and show you exactly where AI automation adds ROI — no pitch deck, no fluff.
          </p>
          <a
            href="https://cal.com/automate305/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#7B3FF2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#6930d4] transition-colors mb-6"
          >
            Book a Free Audit →
          </a>
          <p className="text-gray-500 text-sm">
            Or{' '}
            <Link href="/contact" className="text-gray-400 hover:text-white underline">
              fill out our contact form
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
