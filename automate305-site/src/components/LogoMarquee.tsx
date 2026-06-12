import Image from 'next/image'

const logos = [
  { name: 'Make', src: '/logos/make.svg' },
  { name: 'HubSpot', src: '/logos/hubspot.svg' },
  { name: 'OpenAI', src: '/logos/openai.svg' },
  { name: 'Anthropic', src: '/logos/anthropic.svg' },
  { name: 'Notion', src: '/logos/notion.svg' },
  { name: 'Google Workspace', src: '/logos/google.svg' },
  { name: 'Zapier', src: '/logos/zapier.svg' },
  { name: 'n8n', src: '/logos/n8n.svg' },
  { name: 'Slack', src: '/logos/slack.svg' },
  { name: 'Twilio', src: '/logos/twilio.svg' },
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
        style={{ color: 'hsl(0 0% 96% / 0.3)', fontFamily: 'Inter, sans-serif' }}
      >
        Integrated with the tools you already use
      </p>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((logo, i) => (
            <span
              key={`${logo.name}-${i}`}
              className="inline-flex items-center gap-2 mx-8 md:mx-12 text-sm md:text-base font-medium shrink-0 opacity-50 hover:opacity-80 transition-opacity cursor-default"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'white' }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={20}
                height={20}
                className="h-4 w-4 md:h-5 md:w-5 object-contain"
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
