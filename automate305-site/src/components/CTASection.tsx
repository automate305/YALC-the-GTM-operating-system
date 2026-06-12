import CalButton from '@/components/CalButton'

export default function CTASection({ heading = 'Ready to stop leaving revenue on the table?' }: { heading?: string }) {
  return (
    <section className="bg-[#0C0812] py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{heading}</h2>
        <p className="text-gray-400 text-lg mb-10">Book a free 30-minute audit. We&apos;ll map your current revenue leaks and show you exactly where AI automation can add ROI — no pitch deck, no fluff.</p>
        <CalButton className="inline-block bg-[#7B3FF2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#6930d4] transition-colors cursor-pointer">
          Book a Free Audit →
        </CalButton>
      </div>
    </section>
  )
}
