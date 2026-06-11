import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import CaseStudyCard from '@/components/CaseStudyCard'
import ResultsChart from '@/components/ResultsChart'

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

const testimonials = [
  { name: '[Client Name]', company: '[Company]', text: 'Placeholder testimonial — real client testimonial coming soon.' },
  { name: '[Client Name]', company: '[Company]', text: 'Placeholder testimonial — real client testimonial coming soon.' },
  { name: '[Client Name]', company: '[Company]', text: 'Placeholder testimonial — real client testimonial coming soon.' },
]

export default function ResultsPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-[#0C0812] pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3">Results</p>
          <h1 className="text-5xl font-black text-white mb-6">The numbers don&apos;t lie.</h1>
          <p className="text-gray-400 text-xl">Real outcomes from real Automate305 deployments across Miami-Dade and beyond.</p>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-4">RevOps Dashboard</h2>
          <p className="text-gray-600 mb-10">Composite metrics across active accounts. Individual results vary by industry and deployment scope.</p>
          <ResultsChart />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { label: 'Avg. Response Time', value: '<5 min', sub: 'vs. 47 min industry avg' },
              { label: 'Leads Captured/Mo', value: '127', sub: '6-month high, HVAC client' },
              { label: 'Contacts Sourced/Mo', value: '3,000+', sub: 'Aesthetics cold outbound' },
              { label: 'Touchpoints Automated', value: '100%', sub: 'SMB lender, intake to close' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-100 text-center">
                <p className="text-3xl font-black text-[#7B3FF2]">{stat.value}</p>
                <p className="font-semibold text-gray-900 text-sm mt-1">{stat.label}</p>
                <p className="text-gray-500 text-xs mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0C0812] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-12 text-center">Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map(cs => <CaseStudyCard key={cs.company} {...cs} />)}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-4 text-center">What clients say</h2>
          <p className="text-gray-500 text-center mb-12 text-sm">(Placeholder — client testimonials coming soon)</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                <p className="text-gray-600 text-sm italic mb-4">"{t.text}"</p>
                <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
