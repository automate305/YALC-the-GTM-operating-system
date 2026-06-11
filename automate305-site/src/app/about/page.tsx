import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import { Zap, MapPin, Target, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-[#0C0812] pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3">About</p>
          <h1 className="text-5xl font-black text-white mb-6">Miami-built. Revenue-obsessed.</h1>
          <p className="text-gray-400 text-xl">We&apos;re an AI automation agency rooted in Miami-Dade, building revenue systems for the businesses that keep this city running.</p>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <MapPin className="w-10 h-10 text-[#7B3FF2] mx-auto mb-4" />
              <h3 className="font-black text-xl mb-2">Miami-Based</h3>
              <p className="text-gray-600 text-sm">We operate in Miami-Dade and understand the local business landscape — the contractors, lenders, restaurateurs, and operators who power this market.</p>
            </div>
            <div className="text-center">
              <Target className="w-10 h-10 text-[#7B3FF2] mx-auto mb-4" />
              <h3 className="font-black text-xl mb-2">Revenue-First</h3>
              <p className="text-gray-600 text-sm">We don&apos;t sell technology for its own sake. Every system we build has one job: more leads, faster follow-up, and more revenue for our clients.</p>
            </div>
            <div className="text-center">
              <Zap className="w-10 h-10 text-[#7B3FF2] mx-auto mb-4" />
              <h3 className="font-black text-xl mb-2">AI-Native</h3>
              <p className="text-gray-600 text-sm">We build with the latest AI and automation tools — not legacy CRM bolt-ons. Our systems run leaner and faster than anything built 5 years ago.</p>
            </div>
          </div>

          <div className="bg-[#0C0812] rounded-2xl p-10 mb-20">
            <h2 className="text-3xl font-black text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Help home service, professional, and hospitality businesses in Miami-Dade run leaner and grow faster with AI — without enterprise budgets or full-time marketing teams.
            </p>
            <p className="text-gray-400 leading-relaxed">
              The tools that power big companies&apos; revenue machines — AI chat, automated follow-up, cold outbound, pipeline visibility — should be accessible to the HVAC contractor, the SMB lender, and the restaurant owner. That&apos;s what we build.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Team</h2>
            <p className="text-gray-600 mb-10">We&apos;re a lean team of operators, engineers, and growth practitioners based in Miami. We&apos;ve built and run revenue systems across the trades, financial services, and hospitality — so we build from experience, not theory.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-[#7B3FF2]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-[#7B3FF2]" />
                  </div>
                  <p className="font-bold text-gray-900">[Team Member]</p>
                  <p className="text-gray-500 text-sm">[Role] — placeholder</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection heading="Want to work with us?" />
      <Footer />
    </main>
  )
}
