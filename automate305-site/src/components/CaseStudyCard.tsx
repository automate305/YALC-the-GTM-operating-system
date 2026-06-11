interface CaseStudyCardProps {
  name: string
  company: string
  industry: string
  location: string
  description: string
  stat: string
  quote: string
}

export default function CaseStudyCard({ name, company, industry, location, description, stat, quote }: CaseStudyCardProps) {
  return (
    <div className="bg-[#130d1f] border border-[#7B3FF2]/20 rounded-2xl p-8 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[#7B3FF2] text-sm font-semibold">{industry} · {location}</p>
          <h3 className="text-white text-xl font-bold mt-1">{company}</h3>
          <p className="text-gray-400 text-sm">{name}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[#7B3FF2] text-2xl font-black">{stat}</p>
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      <blockquote className="border-l-2 border-[#7B3FF2] pl-4 text-gray-400 text-sm italic">
        "{quote}"
      </blockquote>
    </div>
  )
}
