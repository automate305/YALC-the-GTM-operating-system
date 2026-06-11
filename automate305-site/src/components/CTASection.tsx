export default function CTASection({ heading = "Ready to stop leaving revenue on the table?" }: { heading?: string }) {
  return (
    <section className="bg-brand-dark py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-white text-4xl md:text-5xl font-black mb-6 leading-tight">
          {heading}
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          Book a free 30-minute audit. We&apos;ll map your highest-ROI automation opportunity and show you exactly how it works.
        </p>
        <a
          href="https://cal.com/automate305"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-purple text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-purple-700 transition-colors"
        >
          Book a Free Audit
        </a>
      </div>
    </section>
  );
}
