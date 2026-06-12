import Navbar from '@/components/Navbar'
import CalButton from '@/components/CalButton'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import PlaybookLayout from '@/components/PlaybookLayout'
import type { Chapter } from '@/components/PlaybookLayout'

const HOME_SERVICES_CHAPTERS: Chapter[] = [
  {
    id: 'hvac',
    emoji: '🌡️',
    name: 'HVAC',
    tagline: 'Speed wins jobs. Here\'s how you build that edge.',
    modules: [
      {
        step: 1,
        title: 'Speed-to-Lead SMS',
        desc: 'Every web inquiry or missed call gets an automated text within 60 seconds — before the prospect can Google the next contractor.',
        badge: 'CORE',
        mockType: 'sms',
        mockData: {
          messages: [
            { from: 'ai', text: 'Hi! I saw you reached out about AC repair. Are you dealing with no cooling, or unusual noises?' },
            { from: 'lead', text: 'No cooling at all — been like this since last night' },
            { from: 'ai', text: 'Got it — that sounds urgent. I have a tech available tomorrow at 8am or 10am. Which works better?' },
          ],
        },
        tools: ['Twilio', 'Make', 'HubSpot'],
      },
      {
        step: 2,
        title: 'After-Hours AI Dispatcher',
        desc: 'An AI agent handles inbound at 11pm, qualifies the issue, captures contact info, and books a morning slot. Your techs wake up to a full schedule.',
        badge: 'CORE',
        mockType: 'timeline',
        mockData: { steps: ['Missed Call / Form', 'AI Responds <60s', 'Qualifies Issue', 'Books Morning Slot', 'Tech Notified'] },
        tools: ['Make', 'OpenAI', 'Google Calendar'],
      },
      {
        step: 3,
        title: 'Automated Review Requests',
        desc: 'After every completed job, the system sends a review-request text and email sequence — turning satisfied customers into 5-star reviews on autopilot.',
        badge: 'GROWTH',
        mockType: 'sms',
        mockData: {
          messages: [
            { from: 'ai', text: 'Hi Carlos! Thanks for letting us service your AC today. Mind leaving us a quick review? It takes 30 seconds and helps our team a lot 🙏' },
            { from: 'lead', text: 'Sure, happy to!' },
            { from: 'ai', text: 'Amazing — here\'s the link: [Google Review Link]. Thank you!' },
          ],
        },
        tools: ['Twilio', 'Make'],
      },
      {
        step: 4,
        title: 'Seasonal Campaign',
        desc: 'AI-personalized SMS and email campaigns hit your past customer list before peak season, reactivating dormant revenue without a single cold call.',
        badge: 'GROWTH',
        mockType: 'email',
        mockData: {
          subject: 'Your AC is ready for summer — are you?',
          preview: 'Hi [First Name], peak season is 3 weeks away. Our tune-up slots are filling fast. Lock yours in now before the heat hits — reply YES or click below to grab a time.',
        },
        tools: ['Make', 'HubSpot', 'SendGrid'],
      },
    ],
  },
  {
    id: 'roofing',
    emoji: '🏠',
    name: 'Roofing',
    tagline: 'The contractor who calls first wins the job. Every time.',
    modules: [
      {
        step: 5,
        title: 'Storm Damage Alerts',
        desc: 'Monitor weather events and fire SMS campaigns to zip codes hit by hail or wind — capturing leads before your competitors mobilize.',
        badge: 'CORE',
        mockType: 'stat',
        mockData: { value: '<4hr', label: 'avg time from storm event to first SMS blast' },
        tools: ['Make', 'Twilio'],
      },
      {
        step: 6,
        title: 'Estimate Follow-Up',
        desc: 'Automated multi-touch follow-up after every estimate sent. Text, email, voicemail drop — until they say yes or ask to stop.',
        badge: 'CORE',
        mockType: 'timeline',
        mockData: { steps: ['Estimate Sent', 'Day 1: SMS Follow-Up', 'Day 3: Email', 'Day 7: Final Offer', 'Booked'] },
        tools: ['Make', 'HubSpot', 'Twilio'],
      },
      {
        step: 7,
        title: 'Insurance Claim Comms',
        desc: 'Keep homeowners updated on claim status automatically. Reduce inbound "where are we?" calls by 80%.',
        badge: 'GROWTH',
        mockType: 'email',
        mockData: {
          subject: 'Update on your roof claim — next steps inside',
          preview: 'Hi [First Name], your claim with [Insurance Co.] is currently in review. Expected timeline: 5–7 business days. We\'ll notify you the moment we hear back — no need to call.',
        },
        tools: ['Make', 'SendGrid'],
      },
      {
        step: 8,
        title: 'Sub-Crew Scheduling',
        desc: 'Automated job scheduling and crew notification when a project is confirmed — no manual dispatch bottleneck.',
        badge: 'ADVANCED',
        mockType: 'timeline',
        mockData: { steps: ['Job Confirmed', 'Crew Assigned', 'Materials Ordered', 'Schedule Locked', 'Crew Notified'] },
        tools: ['Make', 'Google Calendar', 'Slack'],
      },
    ],
  },
  {
    id: 'plumbing',
    emoji: '🔧',
    name: 'Plumbing',
    tagline: 'Emergencies don\'t wait. Neither should your follow-up.',
    modules: [
      {
        step: 9,
        title: 'Emergency Routing',
        desc: 'Burst pipe at 2am? AI agent captures the lead, triages urgency, and routes emergency calls to on-call techs instantly.',
        badge: 'CORE',
        mockType: 'sms',
        mockData: {
          messages: [
            { from: 'lead', text: 'HELP my basement is flooding right now' },
            { from: 'ai', text: 'On it — sending you our emergency line and dispatching the nearest available tech to your address. ETA ~35 min.' },
            { from: 'ai', text: 'Tech is 12 min away. His name is Marco. Here\'s his cell: [number]' },
          ],
        },
        tools: ['Twilio', 'Make', 'Google Maps'],
      },
      {
        step: 10,
        title: 'Quote-to-Book',
        desc: 'Send quotes automatically after assessments and follow up with a 3-step sequence until the job is booked.',
        badge: 'CORE',
        mockType: 'timeline',
        mockData: { steps: ['Assessment Done', 'Quote Sent', 'Day 1 Follow-Up', 'Day 4 Follow-Up', 'Job Booked'] },
        tools: ['Make', 'HubSpot', 'Twilio'],
      },
      {
        step: 11,
        title: 'Maintenance Upsell',
        desc: 'After every repair job, trigger an automated offer for your annual maintenance plan — turning one-time customers into recurring revenue.',
        badge: 'GROWTH',
        mockType: 'email',
        mockData: {
          subject: 'Protect your pipes this winter — one quick offer',
          preview: 'Hi [First Name], since we just fixed your water heater, this is a great time to lock in our annual maintenance plan. One call a year, we handle the rest. Reply PLAN to learn more.',
        },
        tools: ['SendGrid', 'Make'],
      },
      {
        step: 12,
        title: 'Reactivation Campaign',
        desc: 'Re-engage your past customer list with seasonal offers and reminders for water heater flushes, drain cleaning, and inspections.',
        badge: 'GROWTH',
        mockType: 'stat',
        mockData: { value: '34%', label: 'avg reactivation rate from past customer list campaigns' },
        tools: ['Make', 'HubSpot', 'Twilio'],
      },
    ],
  },
  {
    id: 'electrical',
    emoji: '⚡',
    name: 'Electrical',
    tagline: 'The permits are complex. The follow-up shouldn\'t be.',
    modules: [
      {
        step: 13,
        title: 'Permit Reminders',
        desc: 'Automated reminders to homeowners about upcoming inspections and permit deadlines — keeping projects on track.',
        badge: 'CORE',
        mockType: 'email',
        mockData: {
          subject: 'Your electrical permit inspection is in 3 days',
          preview: 'Hi [First Name], just a heads-up — your permit inspection is scheduled for Thursday at 10am. Here\'s what to have ready: [checklist]. Reply to this email if you need to reschedule.',
        },
        tools: ['Make', 'SendGrid'],
      },
      {
        step: 14,
        title: 'Panel Upgrade Nurture',
        desc: 'Educate and nurture leads considering panel upgrades through an automated email sequence that addresses common objections.',
        badge: 'GROWTH',
        mockType: 'timeline',
        mockData: { steps: ['Initial Inquiry', 'Education Email 1', 'Objection Handler', 'Final Offer', 'Booked'] },
        tools: ['Make', 'HubSpot', 'SendGrid'],
      },
      {
        step: 15,
        title: 'Generator Campaign',
        desc: 'Hit your customer list before hurricane season with generator install and maintenance campaigns timed to weather forecasts.',
        badge: 'GROWTH',
        mockType: 'sms',
        mockData: {
          messages: [
            { from: 'ai', text: 'Hi [Name] — hurricane season starts in 3 weeks. We have 6 generator install slots left this month. Want us to lock one in for you?' },
            { from: 'lead', text: 'Yes how much?' },
            { from: 'ai', text: 'Whole-home starts at $4,800 installed. I can send a full quote and book a site visit — works for you?' },
          ],
        },
        tools: ['Twilio', 'Make'],
      },
      {
        step: 16,
        title: 'Referral Automation',
        desc: 'After every completed job, request referrals automatically and offer a discount on the next visit — building a flywheel from happy customers.',
        badge: 'ADVANCED',
        mockType: 'stat',
        mockData: { value: '2.3x', label: 'avg referral multiplier from post-job automation sequences' },
        tools: ['Make', 'HubSpot', 'Twilio'],
      },
    ],
  },
  {
    id: 'restoration',
    emoji: '🏗️',
    name: 'Restoration',
    tagline: 'When disaster strikes, speed-to-lead is everything.',
    modules: [
      {
        step: 17,
        title: 'Disaster Lead Capture',
        desc: 'When disaster strikes, your AI agent is live on the website and phone lines capturing every inbound inquiry — even at 3am.',
        badge: 'CORE',
        mockType: 'sms',
        mockData: {
          messages: [
            { from: 'lead', text: 'Our roof caved in from the storm — we need help immediately' },
            { from: 'ai', text: 'I\'m so sorry — we\'re on this. Can you confirm your address and the type of damage?' },
            { from: 'lead', text: '123 Main St, Miami — water is coming in through the ceiling' },
            { from: 'ai', text: 'Got it. Dispatching an emergency assessment team. ETA 90 min. You\'ll get a call from our crew lead in 15 min.' },
          ],
        },
        tools: ['Twilio', 'Make', 'HubSpot'],
      },
      {
        step: 18,
        title: 'Adjuster Coordination',
        desc: 'Automate communication timelines and document requests with insurance adjusters to keep claims moving.',
        badge: 'ADVANCED',
        mockType: 'email',
        mockData: {
          subject: 'Re: Claim #48291 — documentation package enclosed',
          preview: 'Hi [Adjuster Name], attached is the full damage assessment report, photo documentation (47 images), and our repair estimate for 123 Main St. All items requested in your initial review are included. Please confirm receipt.',
        },
        tools: ['Make', 'SendGrid', 'Google Drive'],
      },
      {
        step: 19,
        title: 'Mitigation-to-Rebuild Pipeline',
        desc: 'Automatically move customers from emergency mitigation into the rebuild sales pipeline with status updates and upsell sequences.',
        badge: 'ADVANCED',
        mockType: 'timeline',
        mockData: { steps: ['Emergency Mitigation', 'Claim Filed', 'Adjuster Review', 'Rebuild Approved', 'Project Scheduled'] },
        tools: ['Make', 'HubSpot', 'Google Calendar'],
      },
      {
        step: 20,
        title: 'Review & Referral Loop',
        desc: 'After project completion, automated review requests and referral campaigns capitalize on homeowner goodwill at peak satisfaction.',
        badge: 'GROWTH',
        mockType: 'stat',
        mockData: { value: '4.9★', label: 'avg Google rating for clients using our post-job review loop' },
        tools: ['Make', 'Twilio', 'Google'],
      },
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
          <CalButton className="inline-block bg-[#7B3FF2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#6930d4] transition-colors">
            Book a Free Audit →
          </CalButton>
        </div>
      </section>

      <PlaybookLayout chapters={HOME_SERVICES_CHAPTERS} />

      <CTASection heading="Ready to win more jobs with less effort?" />
      <Footer />
    </main>
  )
}
