import Navbar from '@/components/Navbar'
import CalButton from '@/components/CalButton'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import PlaybookLayout from '@/components/PlaybookLayout'
import type { Chapter } from '@/components/PlaybookLayout'

const HOSPITALITY_CHAPTERS: Chapter[] = [
  {
    id: 'restaurants',
    emoji: '🍽️',
    name: 'Restaurants',
    tagline: 'Every empty seat is revenue that walked out the door.',
    modules: [
      {
        step: 1,
        title: 'Reservation Automation',
        desc: 'AI-powered reservation management responds to booking requests instantly, manages waitlists, and sends automated confirmations and reminders.',
        badge: 'CORE',
        mockType: 'sms',
        mockData: {
          messages: [
            { from: 'lead', text: 'Hi do you have availability for 4 people this Saturday at 7pm?' },
            { from: 'ai', text: 'Hi! Yes, we have a table for 4 available at 7:00pm or 7:30pm Saturday. Which works better?' },
            { from: 'lead', text: '7pm works' },
            { from: 'ai', text: 'Perfect — confirmed! You\'ll receive a reminder Friday evening. See you Saturday 🍽️' },
          ],
        },
        tools: ['Twilio', 'Make', 'OpenTable'],
      },
      {
        step: 2,
        title: 'Post-Visit Reviews',
        desc: 'Automated text and email after every visit requests Google and Yelp reviews — turning happy diners into marketing assets.',
        badge: 'CORE',
        mockType: 'stat',
        mockData: { value: '+1.2★', label: 'avg Google rating increase after 90 days of review automation' },
        tools: ['Make', 'Twilio'],
      },
      {
        step: 3,
        title: 'Private Dining Outreach',
        desc: 'Automated outreach campaigns targeting corporate event planners and past private dining guests — filling your event calendar without a sales rep.',
        badge: 'GROWTH',
        mockType: 'email',
        mockData: {
          subject: 'Planning something special? We save the best room for you.',
          preview: 'Hi [First Name], it\'s been a while since your last private event at [Restaurant]. Our chef has a new seasonal menu and we\'ve just renovated the private dining room. Dates are filling for Q4 — want first pick?',
        },
        tools: ['SendGrid', 'Make', 'HubSpot'],
      },
      {
        step: 4,
        title: 'Loyalty Reactivation',
        desc: 'AI segments lapsed customers by last visit date and sends personalized reactivation offers — filling tables that would have stayed empty.',
        badge: 'GROWTH',
        mockType: 'timeline',
        mockData: { steps: ['30 Days No Visit', 'Reactivation SMS', 'Opens Offer', 'Clicks Link', 'Reservation Made'] },
        tools: ['Make', 'Twilio', 'HubSpot'],
      },
    ],
  },
  {
    id: 'bars-lounges',
    emoji: '🥂',
    name: 'Bars & Lounges',
    tagline: 'VIP inquiries die in DMs. Capture them automatically.',
    modules: [
      {
        step: 5,
        title: 'VIP Lead Capture',
        desc: 'AI chat captures every bottle service inquiry from Instagram DMs, website, and Google — qualifying and routing to your host team in real time.',
        badge: 'CORE',
        mockType: 'sms',
        mockData: {
          messages: [
            { from: 'lead', text: 'Hey looking to book a table for my birthday Saturday' },
            { from: 'ai', text: 'Happy early birthday! 🎉 For Saturday we have bottle service tables starting at $500 min. Party of how many?' },
            { from: 'lead', text: 'About 10-12 people' },
            { from: 'ai', text: 'Perfect — I\'ll hold a table for 12. Sending you the reservation form now.' },
          ],
        },
        tools: ['Twilio', 'Make', 'Instagram API'],
      },
      {
        step: 6,
        title: 'Event Promotion',
        desc: 'Automated SMS and email campaigns to your past guest list for upcoming events, guest DJ nights, and holiday parties.',
        badge: 'CORE',
        mockType: 'email',
        mockData: {
          subject: 'Saturday: [DJ Name] + bottle special — your spot is saved',
          preview: 'Hey [First Name], this Saturday we\'re hosting [DJ/Event]. We saved early access for our VIPs. Use code VIP30 for 30% off bottle service minimum. Tap below to lock your table — limited capacity.',
        },
        tools: ['SendGrid', 'Make', 'HubSpot'],
      },
      {
        step: 7,
        title: 'Guestlist Automation',
        desc: 'Automated guestlist confirmation, door check-in instructions, and post-event follow-up — all without a coordinator on the phone.',
        badge: 'GROWTH',
        mockType: 'timeline',
        mockData: { steps: ['Guestlist Request', 'Confirmation Sent', 'Door Instructions', 'Check-In', 'Post-Event Follow-Up'] },
        tools: ['Make', 'Twilio', 'HubSpot'],
      },
      {
        step: 8,
        title: 'Birthday Triggers',
        desc: 'Automated outreach to past guests 2 weeks before their birthday with a personalized offer — converting celebrators into bookings.',
        badge: 'GROWTH',
        mockType: 'stat',
        mockData: { value: '41%', label: 'of birthday outreach recipients book within 7 days' },
        tools: ['Make', 'Twilio', 'HubSpot'],
      },
    ],
  },
  {
    id: 'hotels',
    emoji: '🏨',
    name: 'Hotels',
    tagline: 'Your front desk can\'t upsell at check-in. Your AI can.',
    modules: [
      {
        step: 9,
        title: 'Pre-Arrival Upsells',
        desc: 'Automated pre-arrival emails offer room upgrades, spa bookings, and restaurant reservations — generating ancillary revenue before check-in.',
        badge: 'CORE',
        mockType: 'email',
        mockData: {
          subject: 'Your stay is in 3 days — a few extras to make it perfect',
          preview: 'Hi [Guest Name], we\'re looking forward to seeing you Thursday! A few things to make your stay exceptional: upgrade to a pool-view suite (just $45/night more), book the spa (30% off with code GUEST30), or reserve a table at our rooftop restaurant.',
        },
        tools: ['SendGrid', 'Make', 'HubSpot'],
      },
      {
        step: 10,
        title: 'Guest Experience AI',
        desc: 'AI-powered messaging handles common guest requests, local recommendations, and housekeeping scheduling — freeing your front desk.',
        badge: 'CORE',
        mockType: 'sms',
        mockData: {
          messages: [
            { from: 'lead', text: 'Hi what time does the pool close?' },
            { from: 'ai', text: 'The rooftop pool is open until 10pm tonight. Can I help with anything else — restaurant reservation, spa booking, or local recommendations?' },
            { from: 'lead', text: 'Can you book the restaurant for 2 at 7pm tonight?' },
            { from: 'ai', text: 'Done — you\'re confirmed at Marea for 2 at 7pm. Enjoy your evening! 🍷' },
          ],
        },
        tools: ['Twilio', 'Make', 'OpenAI'],
      },
      {
        step: 11,
        title: 'Post-Stay Review & Retargeting',
        desc: 'Automated post-stay sequences request reviews and re-engage past guests with loyalty offers for their next trip.',
        badge: 'GROWTH',
        mockType: 'timeline',
        mockData: { steps: ['Checkout', 'Review Request (24hr)', 'Loyalty Offer (72hr)', 'Retargeting Email (30 days)', 'Rebooking'] },
        tools: ['Make', 'SendGrid', 'Twilio'],
      },
      {
        step: 12,
        title: 'Group Sales Outreach',
        desc: 'AI-personalized cold outreach targeting local corporate travel managers and event planners to drive group bookings.',
        badge: 'ADVANCED',
        mockType: 'email',
        mockData: {
          subject: 'Q4 corporate block rates — [Hotel Name]',
          preview: 'Hi [Name], reaching out as Q4 travel season approaches. We\'re offering preferred corporate block rates for [City] travel — starts at $189/night with complimentary breakfast. Would love to set up a 10-min call to discuss your team\'s needs.',
        },
        tools: ['Make', 'Apollo', 'SendGrid'],
      },
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
          <CalButton className="inline-block bg-[#7B3FF2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#6930d4] transition-colors">
            Book a Free Audit →
          </CalButton>
        </div>
      </section>

      <PlaybookLayout chapters={HOSPITALITY_CHAPTERS} />

      <CTASection heading="Ready to fill more seats and automate the guest experience?" />
      <Footer />
    </main>
  )
}
