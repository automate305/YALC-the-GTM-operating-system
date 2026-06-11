import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import { Zap } from 'lucide-react'

const trades = [
  {
    name: 'HVAC',
    useCases: [
      { title: 'Speed-to-Lead SMS', desc: 'Every web inquiry or missed call gets an automated text within 60 seconds — before the prospect can Google the next contractor.' },
      { title: 'After-Hours AI Dispatcher', desc: 'An AI agent handles inbound at 11pm, qualifies the issue, captures contact info, and books a morning slot. Your techs wake up to a full schedule.' },
      { title: 'Automated Review Requests', desc: 'After every completed job, the system sends a review-request text and email sequence — turning satisfied customers into 5-star reviews on autopilot.' },
      { title: 'Seasonal Tune-Up Campaign', desc: 'AI-personalized SMS and email campaigns hit your past customer list before peak season, reactivating dormant revenue without a single cold call.' },
    ],
  },
  {
    name: 'Roofing',
    useCases: [
      { title: 'Storm Damage Lead Alerts', desc: 'Monitor weather events and fire SMS campaigns to zip codes hit by hail or wind — capturing leads before your competitors mobilize.' },
      { title: 'Estimate Follow-Up Sequences', desc: 'Automated multi-touch follow-up after every estimate sent. Text, email, voicemail drop — until they say yes or ask to stop.' },
      { title: 'Insurance Claim Status Comms', desc: 'Keep homeowners updated on claim status automatically. Reduce inbound "where are we?" calls by 80%.' },
      { title: 'Sub-Crew Scheduling', desc: 'Automated job scheduling and crew notification when a project is confirmed — no manual dispatch bottleneck.' },
    ],
  },
  {
    name: 'Plumbing',
    useCases: [
      { title: 'Emergency Inbound Routing', desc: 'Burst pipe at 2am? AI agent captures the lead, triages urgency, and routes emergency calls to on-call techs instantly.' },
      { title: 'Quote-to-Book Automation', desc: 'Send quotes automatically after assessments and follow up with a 3-step sequence until the job is booked.' },
      { title: 'Maintenance Plan Upsells', desc: 'After every repair job, trigger an automated offer for your annual maintenance plan — turning one-time customers into recurring revenue.' },
      { title: 'Customer Reactivation', desc: 'Re-engage your past customer list with seasonal offers and reminders for water heater flushes, drain cleaning, and inspections.' },
    ],
  },
  {
    name: 'Electrical',
    useCases: [
      { title: 'Permit & Inspection Reminders', desc: 'Automated reminders to homeowners about upcoming inspections and permit deadlines — keeping projects on track.' },
      { title: 'Panel Upgrade Lead Nurture', desc: 'Educate and nurture leads considering panel upgrades through an automated email sequence that addresses common objections.' },
      { title: 'Generator Season Campaigns', desc: 'Hit your customer list before hurricane season with generator install and maintenance campaigns timed to weather forecasts.' },
      { title: 'Referral Request Automation', desc: 'After every completed job, request referrals automatically and offer a discount on the next visit — building a flywheel from happy customers.' },
    ],
  },
  {
    name: 'Restoration',
    useCases: [
      { title: 'Disaster Response Lead Capture', desc: 'When disaster strikes, your AI agent is live on the website and phone lines capturing every inbound inquiry — even at 3am.' },
      { title: 'Insurance Adjuster Coordination', desc: 'Automate communication timelines and document requests with insurance adjusters to keep claims moving.' },
      { title: 'Mitigation-to-Rebuild Pipeline', desc: 'Automatically move customers from emergency mitigation into the rebuild sales pipeline with status updates and upsell sequences.' },
      { title: 'Review & Referral Loop', desc: 'After project completion, automated review requests and referral campaigns capitalize on homeowner goodwill at peak satisfaction.' },
    ],
  },
]

export default function HomeServicesPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-[#0C0812] pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3">Home Services</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Built for the Trades.<br /><span className="text-[#7B3FF2]">Powered by AI.</span></h1>
          <p className="text-gray-400 text-xl mb-10">Stop losing jobs to faster competitors. AI automation handles your speed-to-lead, after-hours coverage, and follow-up — so you show up first, every time.</p>
          <a href="https://cal.com/automate305" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#7B3FF2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#6930d4] transition-colors">Book a Free Audit →</a>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto space-y-20">
          {trades.map((trade) => (
            <div key={trade.name}>
              <h2 className="text-3xl font-black text-gray-900 mb-8">{trade.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trade.useCases.map((uc) => (
                  <div key={uc.title} className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-[#7B3FF2]" />
                      <h3 className="font-bold text-gray-900">{uc.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{uc.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection heading="Ready to win more jobs with less effort?" />
      <Footer />
    </main>
  )
}
