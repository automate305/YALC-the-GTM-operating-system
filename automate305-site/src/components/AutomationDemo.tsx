'use client'
import { useState } from 'react'
import { Wrench, Briefcase, UtensilsCrossed, Zap, Mail, Calendar, Star, ArrowRight } from 'lucide-react'

const workflows: Record<string, {
  label: string
  color: string
  steps: { icon: React.ElementType; label: string; desc: string; delay: number }[]
}> = {
  'home-services': {
    label: 'Home Services',
    color: '#7B3FF2',
    steps: [
      { icon: Zap, label: 'Lead Captured', desc: 'Web form / missed call / SMS', delay: 0 },
      { icon: Mail, label: 'AI Responds', desc: 'Instant reply in < 60 seconds', delay: 400 },
      { icon: Calendar, label: 'Job Booked', desc: 'Calendar slot confirmed', delay: 800 },
      { icon: Star, label: 'Review Sent', desc: 'Auto-request post-job', delay: 1200 },
    ],
  },
  'professional-services': {
    label: 'Professional Services',
    color: '#7B3FF2',
    steps: [
      { icon: Zap, label: 'Inquiry In', desc: 'Contact form or cold reply', delay: 0 },
      { icon: Mail, label: 'Intake Sent', desc: 'Automated qualification form', delay: 400 },
      { icon: Calendar, label: 'Discovery Booked', desc: 'Calendly / Cal.com handoff', delay: 800 },
      { icon: Star, label: 'Deal Tracked', desc: 'Pipeline updated in CRM', delay: 1200 },
    ],
  },
  hospitality: {
    label: 'Hospitality',
    color: '#7B3FF2',
    steps: [
      { icon: Zap, label: 'Reservation Request', desc: 'Website, Google, Instagram', delay: 0 },
      { icon: Mail, label: 'Confirmation Sent', desc: 'Automated + personalized', delay: 400 },
      { icon: Calendar, label: 'Pre-Visit Upsell', desc: 'Private room / bottle offer', delay: 800 },
      { icon: Star, label: 'Review Triggered', desc: '24hrs after visit', delay: 1200 },
    ],
  },
}

const tabs = [
  { key: 'home-services', Icon: Wrench },
  { key: 'professional-services', Icon: Briefcase },
  { key: 'hospitality', Icon: UtensilsCrossed },
]

export default function AutomationDemo() {
  const [active, setActive] = useState('home-services')
  const [running, setRunning] = useState(false)
  const [lit, setLit] = useState<number[]>([])

  const wf = workflows[active]

  const runDemo = () => {
    if (running) return
    setRunning(true)
    setLit([])
    wf.steps.forEach((step, i) => {
      setTimeout(() => {
        setLit(prev => [...prev, i])
        if (i === wf.steps.length - 1) setRunning(false)
      }, step.delay + 200)
    })
  }

  const switchTab = (key: string) => {
    setActive(key)
    setLit([])
    setRunning(false)
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {tabs.map(({ key, Icon }) => (
          <button
            key={key}
            onClick={() => switchTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold transition-colors ${active === key ? 'bg-[#7B3FF2]/5 text-[#7B3FF2] border-b-2 border-[#7B3FF2]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{workflows[key].label}</span>
          </button>
        ))}
      </div>

      {/* Workflow nodes */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-2 mb-6">
          {wf.steps.map((step, i) => {
            const Icon = step.icon
            const isLit = lit.includes(i)
            return (
              <div key={step.label} className="flex items-center gap-2 flex-1">
                <div className={`flex flex-col items-center flex-1`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all duration-500 ${isLit ? 'bg-[#7B3FF2] text-white shadow-lg shadow-[#7B3FF2]/30 animate-pulse-node' : 'bg-gray-100 text-gray-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className={`text-xs font-semibold text-center transition-colors duration-300 ${isLit ? 'text-[#7B3FF2]' : 'text-gray-400'}`}>{step.label}</p>
                  <p className={`text-[10px] text-center mt-0.5 transition-colors duration-300 ${isLit ? 'text-gray-600' : 'text-gray-300'}`}>{step.desc}</p>
                </div>
                {i < wf.steps.length - 1 && (
                  <div className={`w-6 h-0.5 mb-5 transition-colors duration-500 ${lit.includes(i + 1) ? 'bg-[#7B3FF2]' : 'bg-gray-200'}`} />
                )}
              </div>
            )
          })}
        </div>

        <button
          onClick={runDemo}
          disabled={running}
          className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${running ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#7B3FF2] text-white hover:bg-[#6930d4] hover:shadow-lg hover:shadow-[#7B3FF2]/20'}`}
        >
          {running ? (
            <>
              <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              Running automation…
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              {lit.length > 0 ? 'Run again' : 'See it in action'}
            </>
          )}
        </button>
      </div>

      <div className="bg-[#FAF7F2] border-t border-gray-100 px-6 py-3 flex items-center justify-between">
        <p className="text-xs text-gray-500">This runs 24/7 — without a human on standby.</p>
        <a
          href="https://cal.com/automate305/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#7B3FF2] hover:underline flex items-center gap-1"
        >
          Activate for your business <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}
