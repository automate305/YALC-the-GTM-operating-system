interface CaseStudyCardProps {
  client: string;
  business: string;
  industry: string;
  description: string;
  stat: string;
  quote: string;
}

export default function CaseStudyCard({
  client,
  business,
  industry,
  description,
  stat,
  quote,
}: CaseStudyCardProps) {
  return (
    <div className="bg-[#130F1C] border border-gray-800 rounded-2xl p-8 flex flex-col gap-6">
      <div>
        <div className="inline-block bg-brand-purple/20 text-brand-purple text-xs font-semibold px-3 py-1 rounded-full mb-4">
          {industry}
        </div>
        <h3 className="text-white font-bold text-lg">{client}</h3>
        <p className="text-gray-400 text-sm">{business}</p>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      <div className="border-t border-gray-800 pt-6">
        <div className="text-brand-purple font-black text-3xl mb-1">{stat}</div>
        <p className="text-gray-400 text-sm italic">&ldquo;{quote}&rdquo;</p>
      </div>
    </div>
  );
}
