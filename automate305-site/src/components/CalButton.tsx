'use client'

declare global {
  interface Window {
    Cal?: (...args: unknown[]) => void
  }
}

interface CalButtonProps {
  className?: string
  children: React.ReactNode
}

export default function CalButton({ className, children }: CalButtonProps) {
  const open = () => {
    if (typeof window !== 'undefined' && window.Cal) {
      window.Cal('ui', {
        calLink: 'automate305/30min',
        styles: { branding: { brandColor: '#9B50F5' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
        theme: 'dark',
      })
    }
  }

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  )
}
