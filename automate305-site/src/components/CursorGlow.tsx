'use client'
import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return
      ref.current.style.left = e.clientX + 'px'
      ref.current.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(123,63,242,0.22) 0%, rgba(123,63,242,0.06) 40%, transparent 70%)' }}
    />
  )
}
