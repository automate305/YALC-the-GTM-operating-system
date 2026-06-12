import Navbar from '@/components/Navbar'
import CalButton from '@/components/CalButton'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import PlaybookLayout from '@/components/PlaybookLayout'
import type { Chapter } from '@/components/PlaybookLayout'

const PROF_SERVICES_CHAPTERS: Chapter[] = [
  {
    id: 'smb-lenders',
    emoji: '🏦',
    name: 'SMB Lenders',
    tagline: 'Every delayed status email is a deal at risk.',
    modules: [
      {
        step: 1,
        title: 'Client Intake Automation',
        desc: 'Automated intake forms, document collection, and status confirmations from application to close — without a human chasing paperwork.',
        badge: 'CORE',
        mockType: 'timeline',
        mockData: { steps: ['Application In', 'AI Sends Intake Form', 'Docs Collected', 'Status Confirmed', 'Underwriting Started'] },
        tools: ['Make', 'HubSpot', 'SendGrid'],
      },
      {
        step: 2,
        title: 'Deal-Status Comms',
        desc: 'Keep borrowers informed at every milestone. Automated emails and texts reduce inbound "where is my loan?" calls by over 80%.',
        badge: 'CORE',
        mockType: 'email',
        mockData: {
          subject: 'Your loan application — status update',
          preview: 'Hi [First Name], your application is currently in underwriting review. Expected timeline: 3–5 business days. No action needed from you right now — we\'ll notify you the moment there\'s an update.',
        },
        tools: ['SendGrid', 'Make', 'HubSpot'],
      },
      {
        step: 3,
        title: 'Pipeline Visibility',
        desc: 'AI-driven pipeline tracking surfaces stalled deals and triggers re-engagement sequences before they fall through the cracks.',
        badge: 'GROWTH',
        mockType: 'stat',
        mockData: { value: '80%', label: 'reduction in "where is my loan?" calls after deploying status automation' },
        tools: ['Make', 'HubSpot'],
      },
      {
        step: 4,
        title: 'Referral Partner Nurture',
        desc: 'Automated nurture sequences for realtor and broker referral partners — staying top of mind without manual outreach.',
        badge: 'GROWTH',
        mockType: 'email',
        mockData: {
          subject: 'Q2 closing numbers — wanted to share with you',
          preview: 'Hi [Partner Name], just wrapped another strong quarter. Wanted to share our avg close timeline (18 days) and keep you in the loop. Have any deals in pipeline we could collaborate on? Let\'s connect this week.',
        },
        tools: ['SendGrid', 'Make', 'HubSpot'],
      },
    ],
  },
  {
    id: 'law-firms',
    emoji: '⚖️',
    name: 'Law Firms',
    tagline: 'Non-billable intake hours are your biggest hidden cost.',
    modules: [
      {
        step: 5,
        title: 'Intake & Qualification',
        desc: 'AI chat and form qualification screens potential clients 24/7, routing qualified leads directly to attorney calendars.',
        badge: 'CORE',
        mockType: 'sms',
        mockData: {
          messages: [
            { from: 'ai', text: 'Hi, thanks for reaching out to [Firm Name]. To connect you with the right attorney, can I ask — what type of legal matter are you dealing with?' },
            { from: 'lead', text: 'Family law — divorce filing' },
            { from: 'ai', text: 'Got it. I\'m checking attorney availability now. Can you do a 15-min call tomorrow at 2pm or 4pm?' },
          ],
        },
        tools: ['Twilio', 'Make', 'Calendly'],
      },
      {
        step: 6,
        title: 'Client Status Updates',
        desc: 'Automated case milestone updates keep clients informed and reduce non-billable status calls from your staff.',
        badge: 'CORE',
        mockType: 'email',
        mockData: {
          subject: 'Case update — [Matter Name]',
          preview: 'Hi [Client Name], your matter has reached the discovery phase. No action is required from you at this time. Estimated timeline to next milestone: 3–4 weeks. We\'ll send another update when documents are ready for your review.',
        },
        tools: ['SendGrid', 'Make'],
      },
      {
        step: 7,
        title: 'Document Collection',
        desc: 'Automated follow-up sequences request missing documents until the file is complete — no manual chasing.',
        badge: 'GROWTH',
        mockType: 'timeline',
        mockData: { steps: ['Retainer Signed', 'Doc Request Sent', 'Reminder Day 3', 'Reminder Day 7', 'File Complete'] },
        tools: ['Make', 'SendGrid', 'HubSpot'],
      },
      {
        step: 8,
        title: 'Review & Referral',
        desc: 'After successful matters, automated review requests and referral prompts turn satisfied clients into your best marketing channel.',
        badge: 'GROWTH',
        mockType: 'stat',
        mockData: { value: '67%', label: 'of new matters at top firms come from referrals — most go unasked' },
        tools: ['Make', 'Twilio', 'SendGrid'],
      },
    ],
  },
  {
    id: 'consultants',
    emoji: '💼',
    name: 'Consultants',
    tagline: 'While you\'re billing, leads are going cold. Fix that.',
    modules: [
      {
        step: 9,
        title: 'Inbound Lead Response',
        desc: 'Every contact form and inquiry gets an immediate, personalized AI response that books a discovery call — while you\'re billing.',
        badge: 'CORE',
        mockType: 'sms',
        mockData: {
          messages: [
            { from: 'ai', text: 'Hi [Name] — thanks for reaching out about [service]! I\'d love to set up a quick 20-min discovery call. Are you available Thursday or Friday this week?' },
            { from: 'lead', text: 'Friday works — afternoon?' },
            { from: 'ai', text: 'Perfect — I\'ll send a calendar invite for Friday at 2pm. Talk soon!' },
          ],
        },
        tools: ['Twilio', 'Make', 'Cal.com'],
      },
      {
        step: 10,
        title: 'Proposal Follow-Up',
        desc: 'Multi-step automated follow-up after every proposal sent. Addresses common objections and nudges prospects to a decision.',
        badge: 'CORE',
        mockType: 'timeline',
        mockData: { steps: ['Proposal Sent', 'Day 2: Check-In SMS', 'Day 5: Objection Email', 'Day 10: Final Nudge', 'Decision'] },
        tools: ['Make', 'HubSpot', 'SendGrid'],
      },
      {
        step: 11,
        title: 'Cold Outbound Engine',
        desc: 'AI-personalized cold email campaigns targeting your ICP, with sender infrastructure and anti-spam warm-up built in.',
        badge: 'GROWTH',
        mockType: 'email',
        mockData: {
          subject: 'Quick question about [Company]\'s ops',
          preview: 'Hi [First Name], noticed [Company] recently [trigger event]. A lot of consulting firms in your space are running into [pain point] around this time — we\'ve helped 3 similar firms cut [metric] by 40%. Worth a 15-min call?',
        },
        tools: ['Make', 'Apollo', 'SendGrid'],
      },
      {
        step: 12,
        title: 'Client Onboarding',
        desc: 'Automated onboarding sequences collect information, set expectations, and deliver assets — so every client engagement starts strong.',
        badge: 'GROWTH',
        mockType: 'timeline',
        mockData: { steps: ['Contract Signed', 'Onboarding Email Sent', 'Questionnaire Filled', 'Kickoff Scheduled', 'Assets Delivered'] },
        tools: ['Make', 'HubSpot', 'Notion'],
      },
    ],
  },
  {
    id: 'insurance-brokers',
    emoji: '🛡️',
    name: 'Insurance Brokers',
    tagline: 'Renewals are won 90 days out, not the week before.',
    modules: [
      {
        step: 13,
        title: 'Quote Request Automation',
        desc: 'Automated response to every quote request within 2 minutes, with AI pre-qualification to surface high-value prospects first.',
        badge: 'CORE',
        mockType: 'stat',
        mockData: { value: '<2 min', label: 'avg response time to new quote requests with AI follow-up' },
        tools: ['Make', 'Twilio', 'HubSpot'],
      },
      {
        step: 14,
        title: 'Renewal Reminders',
        desc: 'Automated renewal sequences starting 90 days out — so you never lose a policy to a competitor who reached out first.',
        badge: 'CORE',
        mockType: 'timeline',
        mockData: { steps: ['90 Days Out: Email', '60 Days: SMS Reminder', '30 Days: Call Prompt', '7 Days: Final Notice', 'Renewed'] },
        tools: ['Make', 'Twilio', 'SendGrid'],
      },
      {
        step: 15,
        title: 'Cross-Sell Sequences',
        desc: 'AI-triggered cross-sell campaigns based on policy type and life events — surfacing upsell opportunities without manual analysis.',
        badge: 'GROWTH',
        mockType: 'email',
        mockData: {
          subject: 'One more thing we can protect for you',
          preview: 'Hi [First Name], now that we\'ve got your home covered, I noticed [trigger event]. A lot of our clients in similar situations have added [product] — it\'s often less than $40/mo. Mind if I run a quick quote?',
        },
        tools: ['SendGrid', 'Make', 'HubSpot'],
      },
      {
        step: 16,
        title: 'Claims Support Comms',
        desc: 'Automated communications during the claims process keep clients informed and reduce support burden on your team.',
        badge: 'ADVANCED',
        mockType: 'timeline',
        mockData: { steps: ['Claim Filed', 'Acknowledgment Sent', 'Day 3 Update', 'Day 7 Update', 'Resolution Confirmed'] },
        tools: ['Make', 'SendGrid', 'HubSpot'],
      },
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

      <PlaybookLayout chapters={PROF_SERVICES_CHAPTERS} />

      <CTASection heading="Ready to close more deals with less manual work?" />
      <Footer />
    </main>
  )
}
