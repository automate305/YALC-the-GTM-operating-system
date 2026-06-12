const logos = [
  { name: 'Make', text: 'Make' },
  { name: 'HubSpot', text: 'HubSpot' },
  { name: 'GoHighLevel', text: 'GoHighLevel' },
  { name: 'ServiceTitan', text: 'ServiceTitan' },
  { name: 'Jobber', text: 'Jobber' },
  { name: 'Salesforce', text: 'Salesforce' },
  { name: 'OpenTable', text: 'OpenTable' },
  { name: 'Toast', text: 'Toast' },
  { name: 'Encompass', text: 'Encompass' },
  { name: 'Instantly', text: 'Instantly' },
  { name: 'Apollo', text: 'Apollo.io' },
  { name: 'Zapier', text: 'Zapier' },
]

export default function LogoMarquee() {
  const doubled = [...logos, ...logos]

  return (
    <section className="bg-white border-y border-gray-100 py-8 overflow-hidden">
      <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
        Integrated with the tools you already use
      </p>
      <div className="relative">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {doubled.map((logo, i) => (
            <span
              key={`${logo.name}-${i}`}
              className="text-gray-300 font-black text-lg tracking-tight select-none opacity-60 hover:opacity-100 transition-opacity"
            >
              {logo.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
