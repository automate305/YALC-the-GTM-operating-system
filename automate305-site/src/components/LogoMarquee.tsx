'use client'
import Image from 'next/image'

const logos = [
  // Existing 10
  { name: 'Make',              src: '/logos/make.svg' },
  { name: 'HubSpot',          src: '/logos/hubspot.svg' },
  { name: 'OpenAI',           src: '/logos/openai.svg' },
  { name: 'Anthropic',        src: '/logos/anthropic.svg' },
  { name: 'Notion',           src: '/logos/notion.svg' },
  { name: 'Google Workspace', src: '/logos/google.svg' },
  { name: 'Zapier',           src: '/logos/zapier.svg' },
  { name: 'n8n',              src: '/logos/n8n.svg' },
  { name: 'Slack',            src: '/logos/slack.svg' },
  { name: 'Twilio',           src: '/logos/twilio.svg' },
  // New 8
  { name: 'ServiceTitan',     src: '/logos/servicetitan.svg' },
  { name: 'Housecall Pro',    src: '/logos/housecallpro.svg' },
  { name: 'Jobber',           src: '/logos/jobber.svg' },
  { name: 'Kabbage',          src: '/logos/kabbage.svg' },
  { name: 'OnDeck',           src: '/logos/ondeck.svg' },
  { name: 'Toast',            src: '/logos/toast.svg' },
  { name: 'OpenTable',        src: '/logos/opentable.svg' },
  { name: 'Tock',             src: '/logos/tock.svg' },
]

const doubled = [...logos, ...logos]

export default function LogoMarquee() {
  return (
    <section
      className="py-12 overflow-hidden border-t border-b"
      style={{
        background: 'hsl(240 12% 6%)',
        borderColor: 'hsl(240 12% 12%)',
      }}
    >
      <p
        className="text-center text-xs font-medium tracking-[0.15em] uppercase mb-8"
        style={{ color: 'hsl(0 0% 96% / 0.4)', fontFamily: 'Inter, sans-serif' }}
      >
        Integrated with the tools you already use
      </p>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((logo, i) => (
            <span
              key={`${logo.name}-${i}`}
              className="inline-flex items-center gap-2 mx-8 md:mx-10 text-sm font-medium shrink-0 transition-opacity cursor-default"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                color: 'rgba(255,255,255,0.75)',
                opacity: 0.75,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0.75' }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={18}
                height={18}
                className="h-4 w-4 md:h-[18px] md:w-[18px] object-contain brightness-0 invert"
                unoptimized
              />
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
