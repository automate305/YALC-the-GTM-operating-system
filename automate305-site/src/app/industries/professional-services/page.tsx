import Navbar from '@/components/Navbar'
import CalButton from '@/components/CalButton'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import { Zap } from 'lucide-react'

const segments = [
  {
    name: 'SMB Lenders',
    useCases: [
      { title: 'Client Intake Automation', desc: 'Automated intake forms, document collection, and status confirmations from application to close — without a human chasing paperwork.' },
      { title: 'Deal-Status Communications', desc: 'Keep borrowers informed at every milestone. Automated emails and texts reduce inbound "where is my loan?" calls by over 80%.' },
      { title: 'Pipeline Visibility', desc: 'AI-driven pipeline tracking surfaces stalled deals and triggers re-engagement sequences before they fall through the cracks.' },
      { title: 'Referral Partner Nurture', desc: 'Automated nurture sequences for realtor and broker referral partners — staying top of mind without manual outreach.' },
    ],
  },
  {
    name: 'Law Firms',
    useCases: [
      { title: 'Intake & Qualification', desc: 'AI chat and form qualification screens potential clients 24/7, routing qualified leads directly to attorney calendars.' },
      { title: 'Client Status Updates', desc: 'Automated case milestone updates keep clients informed and reduce non-billable status calls from your staff.' },
      { title: 'Document Collection Sequences', desc: 'Automated follow-up sequences request missing documents until the file is complete — no manual chasing.' },
      { title: 'Review & Referral Campaigns', desc: 'After successful matters, automated review requests and referral prompts turn satisfied clients into your best marketing channel.' },
    ],
  },
  {
    name: 'Consultants',
    useCases: [
      { title: 'Inbound Lead Response', desc: 'Every contact form and inquiry gets an immediate, personalized AI response that books a discovery call — while you\'re billing.' },
      { title: 'Proposal Follow-Up', desc: 'Multi-step automated follow-up after every proposal sent. Addresses common objections and nudges prospects to a decision.' },
      { title: 'Cold Outbound Engine', desc: 'AI-personalized cold email campaigns targeting your ICP, with sender infrastructure and anti-spam warm-up built in.' },
      { title: 'Client Onboarding Automation', desc: 'Automated onboarding sequences collect information, set expectations, and deliver assets — so every client engagement starts strong.' },
    ],
  },
  {
    name: 'Insurance Brokers',
    useCases: [
      { title: 'Quote Request Automation', desc: 'Automated response to every quote request within 2 minutes, with AI pre-qualification to surface high-value prospects first.' },
      { title: 'Renewal Reminder Campaigns', desc: 'Automated renewal sequences starting 90 days out — so you never lose a policy to a competitor who reached out first.' },
      { title: 'Cross-Sell Sequences', desc: 'AI-triggered cross-sell campaigns based on policy type and life events — surfacing upsell opportunities without manual analysis.' },
      { title: 'Claims Support Comms', desc: 'Automated communications during the claims process keep clients informed and reduce support burden on your team.' },
    ],
  },
]

export default function ProfessionalServicesPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-[#0C0812] pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3">Professional Services</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Close More.<br /><span className="text-[#7B3FF2]">Follow Up Faster.</span></h1>
          <p className="text-gray-400 text-xl mb-10">Your competitors are still doing intake manually and losing deals to delayed follow-up. We automate the entire client journey — from first inquiry to signed engagement.</p>
          <CalButton className="inline-block bg-[#7B3FF2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#6930d4] transition-colors">
              Book a Free Audit →
            </CalButton>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto space-y-20">
          {segments.map((seg) => (
            <div key={seg.name}>
              <h2 className="text-3xl font-black text-gray-900 mb-8">{seg.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {seg.useCases.map((uc) => (
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

      <CTASection heading="Ready to close more deals with less manual work?" />
      <Footer />
    </main>
  )
}
