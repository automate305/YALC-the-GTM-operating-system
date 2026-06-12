'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { Wrench, Briefcase, UtensilsCrossed, Zap } from 'lucide-react'

const TABS = [
  {
    key: 'homeServices',
    title: 'Home Services',
    icon: Wrench,
    desc: 'HVAC, Roofing, Plumbing, Electrical, Restoration.',
    bullets: [
      'Speed-to-lead reply in under 60 seconds',
      'After-hours AI dispatcher captures & books jobs',
      'Automated review requests post-job completion',
    ],
    metrics: [
      { v: '<5 min', l: 'Avg response time' },
      { v: '127', l: 'Leads captured/mo' },
    ],
    href: '/industries/home-services',
  },
  {
    key: 'professionalServices',
    title: 'Professional Services',
    icon: Briefcase,
    desc: 'SMB Lenders, Law Firms, Consultants, Insurance.',
    bullets: [
      'Automated client intake & document collection',
      'Deal-status comms with zero manual follow-up',
      'Cold outbound engine with AI-personalized copy',
    ],
    metrics: [
      { v: '3,000+', l: 'Contacts sourced/mo' },
      { v: '100%', l: 'Touchpoints automated' },
    ],
    href: '/industries/professional-services',
  },
  {
    key: 'hospitality',
    title: 'Hospitality',
    icon: UtensilsCrossed,
    desc: 'Restaurants, Bars & Lounges, Hotels.',
    bullets: [
      'Reservation & waitlist automation 24/7',
      'VIP & bottle service lead capture from DMs',
      'Post-visit review loops & loyalty reactivation',
    ],
    metrics: [
      { v: '24/7', l: 'Automated coverage' },
      { v: '60s', l: 'Response time' },
    ],
    href: '/industries/hospitality',
  },
]

export default function IndustryTabs() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  const selectTab = (i: number) => {
    setDirection(i > active ? 1 : -1)
    setActive(i)
  }

  const tab = TABS[active]

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 mb-8 bg-[#0C0812] rounded-xl p-1 border border-gray-800">
        {TABS.map((t, i) => {
          const Icon = t.icon
          const isActive = i === active
          return (
            <button
              key={t.key}
              onClick={() => selectTab(i)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-[#7B3FF2] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {t.title}
            </button>
          )
        })}
      </div>

      {/* Content panel */}
      <div className="relative overflow-hidden min-h-[280px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-[#0C0812] rounded-2xl border border-gray-800 p-8"
          >
            {(() => {
              const Icon = tab.icon
              return (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-7 h-7 text-[#7B3FF2]" />
                      <h3 className="text-2xl font-black text-white">{tab.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-5">{tab.desc}</p>
                    <p className="text-xs font-semibold text-[#7B3FF2] uppercase tracking-widest mb-3">What we deploy:</p>
                    <ul className="space-y-3 mb-6">
                      {tab.bullets.map(b => (
                        <li key={b} className="flex items-start gap-2 text-sm text-gray-300">
                          <Zap className="w-3.5 h-3.5 text-[#7B3FF2] shrink-0 mt-0.5" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={tab.href}
                      className="inline-block text-[#7B3FF2] text-sm font-semibold border border-[#7B3FF2]/30 rounded-lg px-5 py-2.5 hover:bg-[#7B3FF2] hover:text-white transition-colors"
                    >
                      See full playbook →
                    </Link>
                  </div>
                  <div className="flex flex-col justify-center gap-4">
                    {tab.metrics.map(m => (
                      <div key={m.l} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                        <p className="text-4xl font-black text-[#7B3FF2] mb-1">{m.v}</p>
                        <p className="text-gray-400 text-sm">{m.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
