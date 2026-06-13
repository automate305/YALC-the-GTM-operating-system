'use client'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CalButton from '@/components/CalButton'

type FollowUpSpeed = 'under5' | '5to30' | '30to60' | '1hour' | 'nextday'

const conversionRates: Record<FollowUpSpeed, number> = {
  under5:  0.38,
  '5to30':   0.26,
  '30to60':  0.17,
  '1hour':   0.11,
  nextday: 0.05,
}
const optimizedRate = 0.38

const FOLLOW_UP_OPTIONS: { value: FollowUpSpeed; label: string }[] = [
  { value: 'under5',  label: 'Under 5 minutes' },
  { value: '5to30',   label: '5–30 minutes' },
  { value: '30to60',  label: '30–60 minutes' },
  { value: '1hour',   label: '1+ hour' },
  { value: 'nextday', label: 'Next day or later' },
]

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

function useCountUp(target: number, duration = 600) {
  const [display, setDisplay] = useState(target)
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startRef = useRef<number>(target)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    startRef.current = display
    startTimeRef.current = null
    if (rafRef.current) clearInterval(rafRef.current)
    const steps = 30
    const interval = duration / steps
    let step = 0
    rafRef.current = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(startRef.current + (target - startRef.current) * eased))
      if (step >= steps) {
        clearInterval(rafRef.current!)
        setDisplay(target)
      }
    }, interval)
    return () => { if (rafRef.current) clearInterval(rafRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration])

  return display
}

export default function ROICalculator() {
  const [leads, setLeads] = useState(30)
  const [leadsInput, setLeadsInput] = useState('30')
  const [dealValue, setDealValue] = useState(2500)
  const [speed, setSpeed] = useState<FollowUpSpeed>('1hour')

  const leadsNum = Number(leadsInput) || 0

  const rate = conversionRates[speed]
  const currentMonthlyRevenue = leadsNum * dealValue * rate
  const optimizedMonthlyRevenue = leadsNum * dealValue * optimizedRate
  const rawMonthlyLost = Math.max(0, Math.floor(optimizedMonthlyRevenue - currentMonthlyRevenue))
  const monthlyRevenueLost = Math.min(rawMonthlyLost, 250000)
  const annualRevenueLost = monthlyRevenueLost * 12
  const extraDealsPerMonth = Math.round(leadsNum * (optimizedRate - rate) * 10) / 10
  const currentClosedDeals = Math.round(leadsNum * rate * 10) / 10
  const optimizedClosedDeals = Math.round(leadsNum * optimizedRate * 10) / 10

  const animatedMonthly = useCountUp(monthlyRevenueLost)
  const animatedAnnual = useCountUp(annualRevenueLost)
  const animatedCurrent = useCountUp(currentClosedDeals)
  const animatedOptimized = useCountUp(optimizedClosedDeals)

  const noLeads = leadsNum === 0 || leadsInput === ''
  const isAlreadyFast = speed === 'under5'

  return (
    <section id="roi-calculator" className="bg-[#0C0812] py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#7B3FF2] text-xs font-semibold uppercase tracking-[0.15em] mb-3 text-center">
          ROI CALCULATOR
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-12 text-center">
          How much revenue are you<br />
          <span className="text-[#7B3FF2]">losing right now?</span>
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-10">
          {/* Step 1 */}
          <div>
            <p className="text-[#7B3FF2] text-xs font-semibold uppercase tracking-widest mb-3">Step 1</p>
            <label className="block text-white font-semibold mb-4 text-lg">
              How many inbound leads per month?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={500}
                value={leadsNum}
                onChange={e => {
                  const v = Number(e.target.value)
                  setLeadsInput(String(v))
                  setLeads(v)
                }}
                className="flex-1 accent-[#7B3FF2] h-2 rounded-full"
              />
              <input
                type="number"
                min={0}
                max={500}
                value={leadsInput}
                onChange={e => {
                  setLeadsInput(e.target.value)
                  const v = Math.max(0, Math.min(500, Number(e.target.value) || 0))
                  setLeads(v)
                }}
                className="w-20 bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-center font-bold focus:outline-none focus:border-[#7B3FF2]"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <p className="text-[#7B3FF2] text-xs font-semibold uppercase tracking-widest mb-3">Step 2</p>
            <label className="block text-white font-semibold mb-4 text-lg">
              Average job / deal value?
            </label>
            <div className="relative w-48">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
              <input
                type="number"
                min={0}
                value={dealValue}
                onChange={e => setDealValue(Math.max(0, Number(e.target.value)))}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg pl-7 pr-3 py-2 font-bold focus:outline-none focus:border-[#7B3FF2]"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <p className="text-[#7B3FF2] text-xs font-semibold uppercase tracking-widest mb-3">Step 3</p>
            <label className="block text-white font-semibold mb-4 text-lg">
              How fast do you currently follow up?
            </label>
            <select
              value={speed}
              onChange={e => setSpeed(e.target.value as FollowUpSpeed)}
              className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2.5 font-medium focus:outline-none focus:border-[#7B3FF2] w-full max-w-xs"
            >
              {FOLLOW_UP_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value} className="bg-[#0C0812]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {noLeads ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="text-center text-gray-400 py-8"
              >
                Enter your monthly leads to see your revenue opportunity.
              </motion.div>
            ) : isAlreadyFast ? (
              <motion.div
                key="already-fast"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
                  <p className="text-green-400 text-xl font-bold mb-4">
                    {"You're already in the top 5% for speed. Let's make sure your system never misses a lead — even at 2am. →"}
                  </p>
                  <CalButton
                    data-cal-link="automate305/30min"
                    className="inline-block bg-[#7B3FF2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#6930d4] transition-colors"
                  >
                    Fix this with Automate305 →
                  </CalButton>
                  <p className="text-gray-500 text-sm mt-3">Free 30-min audit. No pitch deck. No fluff.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="bg-[#7B3FF2]/10 border border-[#7B3FF2]/30 rounded-2xl p-8 text-center space-y-4">
                  <p className="text-4xl md:text-5xl font-black text-[#7B3FF2]">
                    {"You're leaving "}{fmt(animatedMonthly)}/mo on the table
                  </p>
                  <p className="text-gray-300 text-xl font-semibold">
                    {"That's "}{fmt(animatedAnnual)}/year in missed revenue
                  </p>
                  <p className="text-gray-400 text-base">
                    {"At your current speed, you're closing ~"}{animatedCurrent}{" deals/mo. With AI follow-up under 5 min, that jumps to ~"}{animatedOptimized}.
                  </p>
                  <div className="pt-4">
                    <CalButton
                      data-cal-link="automate305/30min"
                      className="inline-block bg-[#7B3FF2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#6930d4] transition-colors"
                    >
                      Fix this with Automate305 →
                    </CalButton>
                    <p className="text-gray-500 text-sm mt-3">Free 30-min audit. No pitch deck. No fluff.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-gray-600 text-xs text-center mt-8">
          Conversion rate assumptions based on Lead Response Management study data and internal Automate305 deployment benchmarks.
        </p>
      </div>
    </section>
  )
}
