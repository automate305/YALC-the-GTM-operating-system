'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import Image from 'next/image'
import { MapPin, Target, Zap } from 'lucide-react'
import { motion, type Transition } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] } as Transition,
})

const STACK = [
  { name: 'Make',             role: 'Automation Engine',  slug: 'make',             color: '6D00CC' },
  { name: 'HubSpot',          role: 'CRM & Pipeline',     slug: 'hubspot',           color: 'FF7A59' },
  { name: 'Apollo',           role: 'Lead Intelligence',  slug: 'apollo',            color: '3B6AE8' },
  { name: 'Smartlead',        role: 'Outbound Engine',    slug: 'smartlead',         color: '6366F1' },
  { name: 'Notion',           role: 'Operating Brain',    slug: 'notion',            color: '000000' },
  { name: 'Google Workspace', role: 'Comms Layer',        slug: 'googleworkspace',   color: '4285F4' },
  { name: 'Vercel + Cursor',  role: 'Build Stack',        slug: 'vercel',            color: 'ffffff' },
  { name: 'Claude / OpenAI',  role: 'AI Core',            slug: 'openai',            color: '412991' },
]

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* ── HERO ── */}
      <section id="our-story" className="bg-[#111318] pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-3">About</p>
          <h1 className="text-5xl font-black text-white mb-6">Miami-built. Revenue-obsessed.</h1>
          <p className="text-gray-400 text-xl">We&apos;re an AI automation agency rooted in Miami-Dade, building revenue systems for the businesses that keep this city running.</p>
        </div>
      </section>

      {/* ── VALUES 3-COL ── */}
      <section className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <MapPin className="w-10 h-10 text-[#7B3FF2] mx-auto mb-4" />
              <h3 className="font-black text-xl text-gray-900 mb-2">Miami-Based</h3>
              <p className="text-gray-600 text-sm leading-relaxed">We operate in Miami-Dade and understand the local business landscape — the contractors, lenders, restaurateurs, and operators who power this market.</p>
            </div>
            <div className="text-center">
              <Target className="w-10 h-10 text-[#7B3FF2] mx-auto mb-4" />
              <h3 className="font-black text-xl text-gray-900 mb-2">Revenue-First</h3>
              <p className="text-gray-600 text-sm leading-relaxed">We don&apos;t sell technology for its own sake. Every system we build has one job: more leads, faster follow-up, and more revenue for our clients.</p>
            </div>
            <div className="text-center">
              <Zap className="w-10 h-10 text-[#7B3FF2] mx-auto mb-4" />
              <h3 className="font-black text-xl text-gray-900 mb-2">AI-Native</h3>
              <p className="text-gray-600 text-sm leading-relaxed">We build with the latest AI and automation tools — not legacy CRM bolt-ons. Our systems run leaner and faster than anything built 5 years ago.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR MISSION ── */}
      <section id="our-mission" className="py-24 px-4 bg-[#FAF7F2]">
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp(0)} className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-4">
            Our Mission
          </motion.p>
          <motion.h2 {...fadeUp(0.05)} className="text-4xl font-black text-gray-900 mb-8 leading-tight">
            We put enterprise-grade revenue systems in the hands of the businesses that actually run Miami.
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="text-gray-600 text-lg leading-relaxed">
            The HVAC contractor losing jobs because a competitor replies faster. The SMB lender watching deals go cold over a delayed email. The restaurant owner manually chasing reservations at midnight. These aren&apos;t small problems — they&apos;re revenue walking out the door. Automate305 exists to close that gap. We build AI-native systems that capture leads, follow up instantly, and keep your pipeline moving — without adding headcount or enterprise budgets.
          </motion.p>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section id="meet-the-founder" className="py-24 px-4 bg-[#111318]">
        <div className="max-w-5xl mx-auto">
          <motion.h2 {...fadeUp(0)} className="text-3xl md:text-4xl font-black text-white mb-12 text-center md:text-left">
            Meet the Founder
          </motion.h2>
          <div className="flex flex-col md:flex-row items-stretch gap-12">

            {/* Photo */}
            <motion.div
              {...fadeUp(0.05)}
              className="relative flex-shrink-0 w-80 md:w-[420px] self-stretch min-h-[480px]"
            >
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.22) 0%, transparent 70%)' }}
              />
              <Image
                src="/camilo-founder.png"
                alt="Camilo — Founder, Automate305"
                fill
                className="object-contain object-bottom"
                priority
              />
            </motion.div>

            {/* Bio */}
            <div className="flex-1">
              <motion.div {...fadeUp(0.08)}>
                <p className="text-3xl font-black text-white mb-1">Camilo</p>
                <p className="text-sm text-[#7B3FF2] font-semibold uppercase tracking-widest mb-8">Founder &amp; Operator, Automate305</p>
              </motion.div>

              {[
                "I'm not running a 20-person agency. I'm one operator who built the system I wish my clients had — then started selling it.",
                "Automate305 was launched in February 2025, seven weeks into one of the hardest seasons of my life. I built the first webhook in the middle of chaos — caregiving, uncertainty, and a son I was missing every single day.",
                "I train Muay Thai to stay sharp. I think in systems. And I believe the same AI infrastructure that powers enterprise revenue teams should be accessible to the HVAC contractor, the lender, and the restaurateur trying to compete on speed.",
                "That's what I build. For you.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-gray-300 leading-relaxed mb-4 text-base"
                >
                  {para}
                </motion.p>
              ))}

              <motion.p {...fadeUp(0.5)} className="text-[#7B3FF2] italic font-semibold mt-6 mb-6 text-lg">
                &ldquo;Built in the middle of everything, because waiting wasn&apos;t an option.&rdquo;
              </motion.p>

              <motion.p {...fadeUp(0.55)} className="text-gray-500 text-sm tracking-wide">
                Miami-Dade &nbsp;·&nbsp; B2B Revenue Systems &nbsp;·&nbsp; AI-Native Builds Since 2025
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW ONE PERSON SCALES ── */}
      <section className="py-24 px-4 bg-[#111318] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p {...fadeUp(0)} className="text-[#7B3FF2] text-sm font-semibold uppercase tracking-widest mb-4">
            How One Person Scales
          </motion.p>
          <motion.h2 {...fadeUp(0.05)} className="text-4xl font-black text-white mb-4">
            The stack runs while I sleep.
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="text-gray-400 text-base mb-14 max-w-xl mx-auto">
            No account managers. No junior devs. Just a purpose-built operating system that runs the work.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {STACK.map(({ name, role, slug, color }) => (
              <motion.div
                key={name}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
                }}
                className="flex items-center gap-3 bg-[#1E2235] border border-[#7B3FF2]/20 rounded-xl px-4 py-3 text-left"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://cdn.simpleicons.org/${slug}/${color}`}
                  alt={name}
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain flex-shrink-0 opacity-80"
                />
                <div className="min-w-0">
                  <p className="text-white text-sm font-semibold leading-tight truncate">{name}</p>
                  <p className="text-gray-500 text-xs leading-tight mt-0.5">{role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p {...fadeUp(0.3)} className="text-gray-500 text-sm mt-10">
            Same infrastructure. Built for your business.
          </motion.p>
        </div>
      </section>

      <CTASection heading="Want to work with us?" />
      <Footer />
    </main>
  )
}
