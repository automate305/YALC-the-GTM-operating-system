interface CaseStudyCardProps {
  tag: string
  name: string
  company?: string
  industry: string
  description: string
  stat: string
  statLabel: string
  quote: string
}

export default function CaseStudyCard({ tag, name, company, industry, description, stat, statLabel, quote }: CaseStudyCardProps) {
  return (
    <div className="bg-[#0C0812] border border-gray-800 rounded-2xl p-8 flex flex-col gap-6 hover:border-[#7B3FF2] transition-colors">
      <div className="flex items-center gap-2">
        <span className="bg-[#7B3FF2]/20 text-[#7B3FF2] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>
        <span className="text-gray-500 text-xs">{industry}</span>
      </div>
      <div>
        <h3 className="text-white font-bold text-lg">{name}</h3>
        {company && <p className="text-gray-400 text-sm mt-1">{company}</p>}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      <div className="border-t border-gray-800 pt-6">
        <div className="flex items-end gap-2 mb-4">
          <span className="text-[#7B3FF2] text-4xl font-black">{stat}</span>
          <span className="text-gray-400 text-sm mb-1">{statLabel}</span>
        </div>
        <blockquote className="text-gray-300 text-sm italic leading-relaxed border-l-2 border-[#7B3FF2] pl-4">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>
    </div>
  )
}
