import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Landmark, Scale, LineChart, Shield, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Services Automation | Automate305 Miami",
  description: "AI automation for SMB lenders, law firms, consultants, and insurance brokers in South Florida. Close more, follow up faster.",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Professional Services AI Automation",
  provider: { "@type": "LocalBusiness", name: "Automate305" },
  areaServed: { "@type": "City", name: "Miami" },
  serviceType: ["Lending Automation", "Law Firm CRM", "Insurance Lead Gen", "Consulting Pipeline"],
};

const verticals = [
  {
    icon: Landmark,
    name: "SMB Lenders",
    tagline: "A delayed status email costs you the deal.",
    useCases: [
      "Automated client intake forms with document collection and routing",
      "Deal-status SMS and email updates at every loan milestone",
      "Pipeline visibility dashboard fed by automated touchpoint tracking",
      "Re-engagement sequences for stalled applications",
    ],
  },
  {
    icon: Scale,
    name: "Law Firms",
    tagline: "Intake that converts, follow-up that closes.",
    useCases: [
      "AI intake bot qualifies prospects and books consultations automatically",
      "Automated retainer follow-up sequences post-consultation",
      "Case status updates sent to clients on schedule — no manual drafting",
      "Referral outreach sequences to past clients at key anniversaries",
    ],
  },
  {
    icon: LineChart,
    name: "Consultants",
    tagline: "Your proposals deserve a real follow-up engine.",
    useCases: [
      "Proposal follow-up sequences over email and LinkedIn",
      "Lead scoring automation to prioritize high-value prospects",
      "Newsletter and nurture automation to keep warm leads warm",
      "Onboarding automation for new clients — tasks, docs, kickoff scheduling",
    ],
  },
  {
    icon: Shield,
    name: "Insurance Brokers",
    tagline: "Renewals, cross-sells, and referrals — all automated.",
    useCases: [
      "Policy renewal reminder sequences sent 60, 30, and 7 days out",
      "Cross-sell campaign flows for existing clients based on life events",
      "New lead qualification bot captures coverage needs before first call",
      "Referral request automation triggered post-policy-binding",
    ],
  },
];

export default function ProfessionalServicesPage() {
  return (
    <main className="bg-brand-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />

      <section className="bg-brand-dark relative overflow-hidden py-24 px-4">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(123,63,242,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(123,63,242,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="text-brand-purple text-sm font-semibold uppercase tracking-wider">Professional Services</span>
          <h1 className="text-5xl sm:text-6xl font-black text-white mt-3 mb-6 leading-tight">
            Close More.<br />
            <span className="text-brand-purple">Follow Up Faster.</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10">
            Professional service firms lose deals to slow follow-up and manual communication gaps.
            We automate your entire client pipeline — from first inquiry to closed deal.
          </p>
          <a
            href="https://cal.com/automate305"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-purple text-white font-bold px-8 py-4 rounded-full hover:bg-purple-700 transition-colors"
          >
            Book a Free Audit <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black">AI for Every Professional Vertical</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Revenue operations automation built for the way professional service firms actually sell and retain clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {verticals.map((v) => (
              <div key={v.name} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-brand-purple hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <v.icon className="w-8 h-8 text-brand-purple" />
                  <h3 className="text-2xl font-black">{v.name}</h3>
                </div>
                <p className="text-gray-600 font-medium mb-5">{v.tagline}</p>
                <ul className="space-y-3 mb-6">
                  {v.useCases.map((uc) => (
                    <li key={uc} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-brand-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-brand-purple block" />
                      </span>
                      <span className="text-gray-700 text-sm leading-relaxed">{uc}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://cal.com/automate305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-purple font-semibold text-sm hover:text-purple-700"
                >
                  Automate my {v.name} firm <ArrowRight className="w-4 h-4" />
                </a>
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
