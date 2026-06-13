'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CalButton from '@/components/CalButton'

export default function StickyBar() {
  const [visible, setVisible] = useState(false)
  const contactInView = useRef(false)

  useEffect(() => {
    const contactEl = document.getElementById('contact')

    const observer = contactEl
      ? new IntersectionObserver(
          ([entry]) => {
            contactInView.current = entry.isIntersecting
            setVisible(window.scrollY > 400 && !entry.isIntersecting)
          },
          { threshold: 0.1 }
        )
      : null

    if (contactEl && observer) observer.observe(contactEl)

    const onScroll = () => {
      setVisible(window.scrollY > 400 && !contactInView.current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (observer && contactEl) observer.unobserve(contactEl)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 py-3 px-6 bg-[#111318]/95 backdrop-blur-md border-t border-[#7B3FF2]/20 flex items-center justify-between gap-4"
        >
          <p className="text-white font-semibold text-sm hidden sm:block">
            Ready to automate your revenue?
          </p>
          <CalButton className="ml-auto bg-[#7B3FF2] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#6930d4] transition-colors whitespace-nowrap">
            Book a Free Audit →
          </CalButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
