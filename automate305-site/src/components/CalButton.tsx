'use client'

interface CalButtonProps {
  className?: string
  children: React.ReactNode
}

export default function CalButton({ className, children }: CalButtonProps) {
  return (
    <button
      type="button"
      className={className}
      data-cal-link="automate305/30min"
      data-cal-config='{"layout":"month_view","theme":"dark"}'
    >
      {children}
    </button>
  )
}
