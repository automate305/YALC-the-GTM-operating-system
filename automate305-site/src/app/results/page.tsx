import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CaseStudyCard from "@/components/CaseStudyCard";
import ResultsChart from "@/components/ResultsChart";
import { Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Results & Case Studies | Automate305 Miami",
  description: "See how Automate305 has helped Miami-Dade businesses capture more leads, follow up faster, and generate more revenue with AI automation.",
};

const caseStudies = [
  {
    name: "Carlos Z.",
    company: "Pure Air Pros",
    industry: "HVAC · Miami-Dade",
    description: "Speed-to-lead capture, after-hours dispatcher, automated review-request loop, calendar handoff for booked jobs.",
    stat: "<5 min response",
    quote: "Every inbound inquiry replied to before it shops the next contractor.",
  },
  {
    name: "Independent Aesthetics Rep",
    company: "",
    industry: "Aesthetics · National",
    description: "A lead-gen engine, end-to-end — sender infrastructure, two parallel cold campaigns, anti-cannibalization across a shared ICP, booking handoff to her calendar.",
    stat: "3,000+ contacts/mo",
    quote: "Cold outbound across two campaigns, one rep, zero SDRs.",
  },
  {
    name: "Felipe C.",
    company: "Mint Financial",
    industry: "Financial Services · S. FL",
    description: "Client intake automation, deal-status comms, pipeline visibility across the loan lifecycle — intake to close, on one rail.",
    stat: "100% touchpoints automated",
    quote: "Built for an SMB lender who can't afford to lose another deal to a delayed status email.",
  },
];

const testimonials = [
  {
    name: "Carlos Z.",
    role: "Owner, Pure Air Pros",
    text: "Before Automate305, we were losing jobs to competitors because we couldn't call back fast enough. Now our AI agent responds in minutes, even at 2 AM. It's like hiring a full-time dispatcher for a fraction of the cost.",
  },
  {
    name: "Felipe C.",
    role: "Principal, Mint Financial",
    text: "We were manually texting borrowers at every loan milestone. Automate305 built us an automation that handles every touchpoint from intake to closing. We've had zero deals fall through due to communication since.",
  },
  {
    name: "Miami Aesthetics Rep",
    role: "Independent Sales Rep",
    text: "I'm running two outbound campaigns simultaneously with zero SDRs. The system sources, sequences, and books appointments for me. I just show up to the calls.",
  },
];

export default function ResultsPage() {
  return (
    <main className="bg-brand-cream min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-brand-dark py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-brand-purple text-sm font-semibold uppercase tracking-wider">Proven Results</span>
          <h1 className="text-5xl font-black text-white mt-3 mb-4">What AI Revenue Systems Actually Deliver</h1>
          <p className="text-gray-300 text-lg">Real outcomes from real Miami-Dade businesses.</p>
        </div>
      </section>

      {/* Chart */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black">Revenue Dashboard</h2>
            <p className="text-gray-600 mt-2">Average client growth trajectory in the 6 months post-deployment.</p>
          </div>
          <ResultsChart />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Avg. Response Time", value: "<5 min" },
              { label: "Lead Capture Rate", value: "+68%" },
              { label: "Booking Conversion", value: "+41%" },
              { label: "Revenue Growth", value: "+3.9x" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-5 text-center border border-gray-100">
                <p className="text-3xl font-black text-brand-purple">{stat.value}</p>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-brand-dark py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-12">Client Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.name} {...cs} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-purple text-brand-purple" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">&quot;{t.text}&quot;</p>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
