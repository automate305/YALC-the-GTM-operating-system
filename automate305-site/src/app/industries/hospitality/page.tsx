import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Hospitality Automation | Automate305',
  description: 'AI automation for restaurants, bars, lounges, and hotels in Miami-Dade. Reservation flows, loyalty outreach, review automation.',
  openGraph: {
    title: 'Hospitality Automation | Automate305',
    description: 'Reservation flows, loyalty outreach, and review automation for Miami restaurants, bars, and hotels.',
    url: 'https://automate305.com/industries/hospitality',
    type: 'website',
  },
}

const segments = [
  {
    icon: '🍽️',
    name: 'Restaurants',
    useCases: [
      {
        title: 'Reservation confirmation + reminder flows',
        desc: 'Every reservation confirmed instantly and followed up with a day-before reminder to cut no-shows dramatically.',
      },
      {
        title: 'Post-dining review requests',
        desc: 'Automated Google and Yelp review asks go out 2 hours after the reservation end time. More reviews, less work.',
      },
      {
        title: 'Loyalty outreach + win-back campaigns',
        desc: "Guests who haven't visited in 60 days get a personalized win-back offer. Guests who dine frequently get a VIP acknowledgment.",
      },
      {
        title: 'Event and special promotion announcements',
        desc: "New menu launches, chef's table events, holiday reservations — reach your whole guest list automatically.",
      },
    ],
  },
  {
    icon: '🍸',
    name: 'Bars & Lounges',
    useCases: [
      {
        title: 'Table and bottle service reservation automation',
        desc: 'VIP reservation requests handled instantly via AI — deposit collected, confirmation sent, guest experience set.',
      },
      {
        title: 'Guest list management + event promotion',
        desc: 'Build your guest list automatically from past visitors and promote upcoming events via SMS and email.',
      },
      {
        title: 'Post-event review and share requests',
        desc: 'After every private event, an automated follow-up goes out requesting reviews and social shares.',
      },
      {
        title: 'Loyalty and VIP tier outreach',
        desc: 'High-frequency guests get personalized VIP treatment — early access, complimentary offers, birthday acknowledgments.',
      },
    ],
  },
  {
    icon: '🏨',
    name: 'Hotels',
    useCases: [
      {
        title: 'Pre-arrival and post-departure guest journeys',
        desc: 'Automated welcome sequences before arrival, upsell flows during the stay, and review requests after checkout.',
      },
      {
        title: 'Direct booking re-engagement',
        desc: 'Guests who book through OTAs get re-engaged for direct bookings on their next stay — recovering the commission margin.',
      },
      {
        title: 'In-stay service request automation',
        desc: 'AI concierge handles common in-stay requests — late checkout, room service inquiries, amenity bookings.',
      },
      {
        title: 'Seasonal and event-based outreach',
        desc: 'Past guests are reached with targeted offers around high-demand periods, local events, and shoulder season promotions.',
      },
    ],
  },
]

export default function HospitalityPage() {
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
            <span className="text-[#7B3FF2] text-sm font-medium">Hospitality</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Fill More Seats.<br />
            <span className="text-[#7B3FF2]">Keep More Guests.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
            Reservation flows, loyalty outreach, and automated review requests for Miami restaurants, bars, and hotels.
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
              { stat: '30%', label: 'Fewer no-shows' },
              { stat: '5x', label: 'More Google reviews' },
              { stat: '60 days', label: 'Win-back trigger window' },
              { stat: '24/7', label: 'Reservation AI uptime' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <div className="text-[#7B3FF2] text-3xl font-black mb-1">{stat}</div>
                <div className="text-gray-500 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segment sections */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0C0812] mb-4">Built for Miami Hospitality</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Every hospitality segment has different revenue levers. We build the automation layer that captures value at each one.
            </p>
          </div>
          <div className="space-y-20">
            {segments.map((segment, i) => (
              <div key={segment.name} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">{segment.icon}</span>
                    <h2 className="text-3xl font-black text-[#0C0812]">{segment.name}</h2>
                  </div>
                  <div className="space-y-4">
                    {segment.useCases.map((uc) => (
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
                  <div className="text-6xl mb-6 text-center">{segment.icon}</div>
                  <h3 className="text-white text-center font-bold text-xl mb-2">{segment.name} Automation System</h3>
                  <p className="text-gray-400 text-center text-sm mb-6">
                    Built specifically for {segment.name.toLowerCase()} operators who want to run tighter guest journeys without more staff.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {segment.useCases.map((uc) => (
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

      {/* Miami angle */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-[#0C0812] mb-6">Miami Hospitality Is Different</h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            Miami has one of the highest restaurant densities in the US, a deeply seasonal tourism cycle, and guests who expect an exceptional experience end-to-end. We build systems that match that pace — high volume, high touch, fully automated.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🌴', title: 'Seasonality-aware', desc: 'Peak season outreach triggers, shoulder season promotions, and off-season win-back flows.' },
              { icon: '🌎', title: 'Multi-language ready', desc: 'English and Spanish outreach built in — right for Miami-Dade guest demographics.' },
              { icon: '⭐', title: 'Review-first approach', desc: 'Every guest journey ends with a review ask. More stars, more discoverability.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-6 border border-gray-200 rounded-2xl">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-[#0C0812] font-bold mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
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
