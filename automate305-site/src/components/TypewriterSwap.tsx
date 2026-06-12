'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const PHRASES = ['More Revenue.', 'More Booked Jobs.', 'More Repeat Clients.']

export default function TypewriterSwap({ className = '' }: { className?: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % PHRASES.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className={className}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ display: 'inline-block' }}
        >
          {PHRASES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
