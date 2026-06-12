'use client'

// Using Simple Icons CDN for real brand logos (dark color for cream background)
const C = '1a1a2e' // near-black fill on cream bg

const logos = [
  { name: 'Make',              icon: `https://cdn.simpleicons.org/make/${C}` },
  { name: 'HubSpot',          icon: `https://cdn.simpleicons.org/hubspot/${C}` },
  { name: 'OpenAI',           icon: `https://cdn.simpleicons.org/openai/${C}` },
  { name: 'Anthropic',        icon: `https://cdn.simpleicons.org/anthropic/${C}` },
  { name: 'Notion',           icon: `https://cdn.simpleicons.org/notion/${C}` },
  { name: 'Google Workspace', icon: `https://cdn.simpleicons.org/googleworkspace/${C}` },
  { name: 'Zapier',           icon: `https://cdn.simpleicons.org/zapier/${C}` },
  { name: 'n8n',              icon: `https://cdn.simpleicons.org/n8n/${C}` },
  { name: 'Slack',            icon: `https://cdn.simpleicons.org/slack/${C}` },
  { name: 'Twilio',           icon: `https://cdn.simpleicons.org/twilio/${C}` },
  { name: 'ServiceTitan',     icon: `https://cdn.simpleicons.org/servicetitan/${C}` },
  { name: 'Housecall Pro',    icon: `https://cdn.simpleicons.org/housecallpro/${C}` },
  { name: 'Jobber',           icon: `https://cdn.simpleicons.org/jobber/${C}` },
  { name: 'Toast',            icon: `https://cdn.simpleicons.org/toast/${C}` },
  { name: 'OpenTable',        icon: `https://cdn.simpleicons.org/opentable/${C}` },
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
                src={logo.icon}
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
