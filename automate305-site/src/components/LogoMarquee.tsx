'use client'

const C = '1a1a2e'

function u(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

// Custom SVGs for brands not available on Simple Icons
const CUSTOM: Record<string, string> = {
  // Actum Processing — blue shield A with arrow sweep (matches their logo)
  actum: u(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="24" fill="#0A6EBD"/>
    <path d="M24 8 L38 36 H10 Z" fill="none" stroke="white" stroke-width="3.5" stroke-linejoin="round"/>
    <line x1="14" y1="28" x2="34" y2="28" stroke="white" stroke-width="3.5"/>
    <path d="M33 18 Q40 12 36 26" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <polygon points="36,26 38,20 42,24" fill="white"/>
  </svg>`),

  // DocuSign — purple square with white d (their mark)
  docusign: u(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <rect width="48" height="48" rx="8" fill="#1A1B1F"/>
    <text x="24" y="33" font-family="Arial" font-weight="900" font-size="28" text-anchor="middle" fill="#4C00FF">d</text>
  </svg>`),

  // ServiceTitan — dark navy with ST monogram
  servicetitan: u(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <rect width="48" height="48" rx="8" fill="#002B5C"/>
    <text x="24" y="31" font-family="Arial" font-weight="900" font-size="16" text-anchor="middle" fill="#00A3E0" letter-spacing="1">ST</text>
  </svg>`),

  // HouseCall Pro — green with minimal house outline
  housecallpro: u(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <rect width="48" height="48" rx="8" fill="#00A651"/>
    <polygon points="24,10 38,22 38,38 10,38 10,22" fill="none" stroke="white" stroke-width="3" stroke-linejoin="round"/>
    <rect x="20" y="28" width="8" height="10" fill="white" rx="1"/>
    <polyline points="16,22 24,10 32,22" fill="none" stroke="white" stroke-width="3" stroke-linejoin="round"/>
  </svg>`),

  // Jobber — green J in rounded rect (their brand)
  jobber: u(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <rect width="48" height="48" rx="10" fill="#00875A"/>
    <text x="24" y="34" font-family="Arial" font-weight="900" font-size="30" text-anchor="middle" fill="white">J</text>
  </svg>`),

  // Experian — purple circle with lowercase e (their mark)
  experian: u(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="24" fill="#702F8A"/>
    <text x="24" y="33" font-family="Georgia,serif" font-weight="bold" font-size="26" text-anchor="middle" fill="white">e</text>
    <circle cx="34" cy="14" r="4" fill="#E63B3B"/>
    <circle cx="40" cy="20" r="3" fill="#F4A020"/>
    <circle cx="38" cy="28" r="3" fill="#00A651"/>
  </svg>`),

  // Microsoft — four-color windows grid
  microsoft: u(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <rect x="4"  y="4"  width="18" height="18" fill="#F25022"/>
    <rect x="26" y="4"  width="18" height="18" fill="#7FBA00"/>
    <rect x="4"  y="26" width="18" height="18" fill="#00A4EF"/>
    <rect x="26" y="26" width="18" height="18" fill="#FFB900"/>
  </svg>`),
}

const logos = [
  { name: 'Make',              src: `https://cdn.simpleicons.org/make/${C}` },
  { name: 'HubSpot',           src: `https://cdn.simpleicons.org/hubspot/${C}` },
  { name: 'OpenAI',            src: `https://cdn.simpleicons.org/openai/${C}` },
  { name: 'Anthropic',         src: `https://cdn.simpleicons.org/anthropic/${C}` },
  { name: 'Notion',            src: `https://cdn.simpleicons.org/notion/${C}` },
  { name: 'Google Workspace',  src: `https://cdn.simpleicons.org/googleworkspace/${C}` },
  { name: 'Zapier',            src: `https://cdn.simpleicons.org/zapier/${C}` },
  { name: 'n8n',               src: `https://cdn.simpleicons.org/n8n/${C}` },
  { name: 'Slack',             src: `https://cdn.simpleicons.org/slack/${C}` },
  { name: 'Twilio',            src: `https://cdn.simpleicons.org/twilio/${C}` },
  { name: 'SendGrid',          src: `https://cdn.simpleicons.org/sendgrid/${C}` },
  { name: 'DocuSign',          src: CUSTOM.docusign },
  { name: 'Microsoft Suite',   src: CUSTOM.microsoft },
  { name: 'Actum Processing',  src: CUSTOM.actum },
  { name: 'Experian',          src: CUSTOM.experian },
  { name: 'ServiceTitan',      src: CUSTOM.servicetitan },
  { name: 'HouseCall Pro',     src: CUSTOM.housecallpro },
  { name: 'Jobber',            src: CUSTOM.jobber },
]

const doubled = [...logos, ...logos]

export default function LogoMarquee() {
  return (
    <section className="py-10 overflow-hidden border-t border-b border-gray-200 bg-[#FAF7F2]">
      <p className="text-center text-xs font-medium tracking-[0.15em] uppercase mb-7 text-gray-400"
        style={{ fontFamily: 'Inter, sans-serif' }}>
        Integrated with the tools you already use
      </p>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((logo, i) => (
            <span
              key={`${logo.name}-${i}`}
              className="inline-flex items-center gap-2.5 mx-8 md:mx-10 shrink-0 cursor-default group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                width={20}
                height={20}
                className="h-5 w-5 object-contain opacity-50 group-hover:opacity-80 transition-opacity"
              />
              <span
                className="text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {logo.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
