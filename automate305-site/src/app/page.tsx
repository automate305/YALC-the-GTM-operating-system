import Navbar from '@/components/Navbar'
import CalButton from '@/components/CalButton'
import Footer from '@/components/Footer'
import CaseStudyCard from '@/components/CaseStudyCard'
import dynamic from 'next/dynamic'
const OrchestrationFlow = dynamic(() => import('@/components/OrchestrationFlow'), { ssr: false })
import LogoMarquee from '@/components/LogoMarquee'
import ResultsChart from '@/components/ResultsChart'
import Link from 'next/link'
import { Wrench, Briefcase, UtensilsCrossed, Zap } from 'lucide-react'
import TypewriterSwap from '@/components/TypewriterSwap'
import CountUpStat from '@/components/CountUpStat'
import ROICalculator from '@/components/ROICalculator'
import StickyBar from '@/components/StickyBar'
import FadeIn from '@/components/FadeIn'
import IndustryTabs from '@/components/IndustryTabs'
import CursorGlow from '@/components/CursorGlow'

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
        className="bg-[#111318] min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden"
      >
        <CursorGlow />
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
            <TypewriterSwap className="text-[#7B3FF2]" />
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
            The AI-powered revenue system for home service businesses, professional service firms, and hospitality brands.
          </p>
          <CalButton className="inline-block bg-[#7B3FF2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#6930d4] transition-colors">
              Book a Free Audit →
            </CalButton>
        </div>
      </section>

      {/* Logo marquee — visual separator, no nav section */}
      <LogoMarquee />

      {/* Quote / stat divider */}
      <section className="bg-[#111318] py-10 px-4">
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
      <section id="how-it-works" className="bg-[#111318] py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-[#7B3FF2] text-xs font-semibold uppercase tracking-[0.15em] mb-3 text-center">
              HOW YOUR LEADS GET HANDLED
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">
              From first contact to booked appointment —<br />
              <span className="text-[#7B3FF2]">zero manual steps.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-gray-400 text-lg text-center mb-14 max-w-2xl mx-auto">
              Watch the flow. Every node is a real system component running 24/7. Hover each to see what it does.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <OrchestrationFlow />
          <div className="mt-10 text-center">
            <CalButton className="inline-block bg-[#7B3FF2] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#6930d4] transition-colors">
              Build this for my business →
            </CalButton>
          </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── ROI CALCULATOR ─────────────────────────────────── */}
      <ROICalculator />

      {/* ─── 3. INDUSTRIES ──────────────────────────────────── */}
      <section id="industries" className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3 text-center">Industries</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">Built for your business type</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-gray-500 text-center mb-12">Select your industry to see what we deploy.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <IndustryTabs />
          </FadeIn>
        </div>
      </section>

      {/* ─── 4. RESULTS ─────────────────────────────────────── */}
      <section id="results" className="bg-[#111318] py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn><p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3 text-center">Results</p></FadeIn>
          <FadeIn delay={0.1}><h2 className="text-4xl font-black text-white mb-4 text-center">The numbers don&apos;t lie.</h2></FadeIn>
          <FadeIn delay={0.2}><p className="text-gray-400 text-center mb-14 text-lg">Real outcomes from real Automate305 deployments across Miami-Dade and beyond.</p></FadeIn>

          {/* RevOps Dashboard */}
          <div id="revops-dashboard" className="mb-20 scroll-mt-20">
            <h3 className="text-2xl font-black text-white mb-2">RevOps Dashboard</h3>
            <p className="text-gray-500 mb-8 text-sm">Composite metrics across active accounts. Individual results vary by industry and deployment scope.</p>
            <div className="bg-[#FAF7F2] rounded-2xl p-6 md:p-8">
              <ResultsChart />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <CountUpStat value="<5 min" label="Avg. Response Time" sub="vs. 47 min industry avg" />
              <CountUpStat value="127" label="Leads Captured/Mo" sub="6-month high, HVAC client" />
              <CountUpStat value="3,000+" label="Contacts Sourced/Mo" sub="Aesthetics cold outbound" />
              <CountUpStat value="100%" label="Touchpoints Automated" sub="SMB lender, intake to close" />
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
          <FadeIn><p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3 text-center">About</p></FadeIn>
          <FadeIn delay={0.1}><h2 className="text-4xl font-black text-gray-900 mb-4 text-center">Miami-built. Revenue-first. AI-native.</h2></FadeIn>
          <FadeIn delay={0.2}><p className="text-gray-500 text-center mb-14 text-lg max-w-2xl mx-auto">
            We&apos;re not a software agency that bolted on AI. We build AI-native revenue systems from scratch — for businesses that compete on speed.
          </p></FadeIn>
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
      <section id="contact" className="bg-[#111318] py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3">Contact</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to pull ahead?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Book a free 30-minute audit. We&apos;ll map your revenue leaks and show you exactly where AI automation adds ROI — no pitch deck, no fluff.
          </p>
          <CalButton className="inline-block bg-[#7B3FF2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#6930d4] transition-colors mb-6">
              Book a Free Audit →
            </CalButton>
          <p className="text-gray-500 text-sm">
            Or{' '}
            <Link href="/contact" className="text-gray-400 hover:text-white underline">
              fill out our contact form
            </Link>
          </p>
        </div>
      </section>

      <Footer />
      <StickyBar />
    </main>
  )
}
