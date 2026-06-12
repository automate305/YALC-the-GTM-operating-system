'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: string
  label: string
  sub: string
}

function parseValue(value: string): { num: number | null; prefix: string; suffix: string } {
  if (value === '<5 min') return { num: null, prefix: '', suffix: '' }
  const match = value.match(/^([^0-9]*)([0-9,]+)([^0-9]*)$/)
  if (!match) return { num: null, prefix: '', suffix: '' }
  const num = parseInt(match[2].replace(/,/g, ''), 10)
  return { num, prefix: match[1], suffix: match[3] }
}

function formatNum(n: number, original: string): string {
  if (original.includes(',')) {
    return n.toLocaleString()
  }
  return n.toString()
}

export default function CountUpStat({ value, label, sub }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [displayed, setDisplayed] = useState(value)
  const { num, prefix, suffix } = parseValue(value)

  useEffect(() => {
    if (!isInView || num === null) {
      if (num === null) setDisplayed(value)
      return
    }
    const duration = 1500
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * num)
      setDisplayed(prefix + formatNum(current, value) + suffix)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, num, prefix, suffix, value])

  const isNonNumeric = num === null

  return (
    <div ref={ref} className="bg-[#FAF7F2] rounded-xl p-5 text-center">
      {isNonNumeric ? (
        <p
          className="text-3xl font-black text-[#7B3FF2] transition-opacity duration-700"
          style={{ opacity: isInView ? 1 : 0 }}
        >
          {value}
        </p>
      ) : (
        <p className="text-3xl font-black text-[#7B3FF2]">{displayed}</p>
      )}
      <p className="font-semibold text-gray-900 text-sm mt-1">{label}</p>
      <p className="text-gray-500 text-xs mt-1">{sub}</p>
    </div>
  )
}
