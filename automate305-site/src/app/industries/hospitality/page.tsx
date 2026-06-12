import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import { Zap } from 'lucide-react'

const segments = [
  {
    name: 'Restaurants',
    useCases: [
      { title: 'Reservation & Waitlist Automation', desc: 'AI-powered reservation management responds to booking requests instantly, manages waitlists, and sends automated confirmations and reminders.' },
      { title: 'Post-Visit Review Requests', desc: 'Automated text and email after every visit requests Google and Yelp reviews — turning happy diners into marketing assets.' },
      { title: 'Event & Private Dining Outreach', desc: 'Automated outreach campaigns targeting corporate event planners and past private dining guests — filling your event calendar without a sales rep.' },
      { title: 'Loyalty Reactivation Campaigns', desc: 'AI segments lapsed customers by last visit date and sends personalized reactivation offers — filling tables that would have stayed empty.' },
    ],
  },
  {
    name: 'Bars & Lounges',
    useCases: [
      { title: 'VIP & Bottle Service Lead Capture', desc: 'AI chat captures every bottle service inquiry from Instagram DMs, website, and Google — qualifying and routing to your host team in real time.' },
      { title: 'Event Promotion Campaigns', desc: 'Automated SMS and email campaigns to your past guest list for upcoming events, guest DJ nights, and holiday parties.' },
      { title: 'Guestlist Automation', desc: 'Automated guestlist confirmation, door check-in instructions, and post-event follow-up — all without a coordinator on the phone.' },
      { title: 'Birthday & Anniversary Triggers', desc: 'Automated outreach to past guests 2 weeks before their birthday with a personalized offer — converting celebrators into bookings.' },
    ],
  },
  {
    name: 'Hotels',
    useCases: [
      { title: 'Pre-Arrival Upsell Sequences', desc: 'Automated pre-arrival emails offer room upgrades, spa bookings, and restaurant reservations — generating ancillary revenue before check-in.' },
      { title: 'Guest Experience Automation', desc: 'AI-powered messaging handles common guest requests, local recommendations, and housekeeping scheduling — freeing your front desk.' },
      { title: 'Post-Stay Review & Retargeting', desc: 'Automated post-stay sequences request reviews and re-engage past guests with loyalty offers for their next trip.' },
      { title: 'Group & Corporate Sales Outreach', desc: 'AI-personalized cold outreach targeting local corporate travel managers and event planners to drive group bookings.' },
    ],
  },
]

export default function HospitalityPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-[#0C0812] pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3">Hospitality</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Fill More Tables.<br /><span className="text-[#7B3FF2]">Automate the Rest.</span></h1>
          <p className="text-gray-400 text-xl mb-10">Every empty seat is lost revenue. AI automation fills your calendar, handles guest communications, and turns satisfied guests into repeat customers — without adding headcount.</p>
          <a href="https://cal.com/automate305/30min" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#7B3FF2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#6930d4] transition-colors">Book a Free Audit →</a>
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

      <CTASection heading="Ready to fill more seats and automate the guest experience?" />
      <Footer />
    </main>
  )
}
