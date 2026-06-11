import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Wrench, Flame, Droplets, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Services Automation | Automate305 Miami",
  description: "AI-powered lead capture, dispatch, and follow-up for HVAC, roofing, plumbing, electrical, and restoration contractors in Miami-Dade.",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Home Services AI Automation",
  provider: { "@type": "LocalBusiness", name: "Automate305" },
  areaServed: { "@type": "City", name: "Miami" },
  serviceType: ["HVAC Automation", "Roofing Lead Capture", "Plumbing Dispatch", "Electrical Lead Gen"],
};

const trades = [
  {
    icon: Flame,
    name: "HVAC",
    tagline: "The contractor who calls back first wins.",
    useCases: [
      "24/7 AI agent captures and qualifies every inbound call and web lead",
      "After-hours dispatcher books emergency jobs directly to your calendar",
      "Automated review requests sent post-job to Google and Yelp",
      "Speed-to-lead follow-up — responds in under 5 minutes, every time",
    ],
  },
  {
    icon: Wrench,
    name: "Roofing",
    tagline: "Storm season waits for no one. Your follow-up shouldn't either.",
    useCases: [
      "Instant response to storm-damage inquiry forms and Google Ads leads",
      "Insurance claim status updates sent automatically via SMS",
      "Estimate follow-up sequences that close jobs without manual calls",
      "Referral capture loop after every completed job",
    ],
  },
  {
    icon: Droplets,
    name: "Plumbing",
    tagline: "Emergency jobs booked while you're under a sink.",
    useCases: [
      "AI triage identifies emergency vs. non-urgent jobs and routes accordingly",
      "Auto-dispatch confirmation texts with tech ETA",
      "Upsell sequences for maintenance plans after service calls",
      "Review automation sent 24 hours post-job",
    ],
  },
  {
    icon: Zap,
    name: "Electrical",
    tagline: "Every permit-ready lead automatically followed up.",
    useCases: [
      "Lead qualification filters for permit-required jobs vs. small repairs",
      "Automated quote follow-up sequences over SMS and email",
      "Project status update comms for multi-day jobs",
      "Annual inspection reminder campaigns to past clients",
    ],
  },
  {
    icon: ShieldCheck,
    name: "Restoration",
    tagline: "Insurance jobs require fast intake. AI makes it instant.",
    useCases: [
      "Emergency intake bot captures job details 24/7 — water, fire, mold",
      "Insurance adjuster coordination comms automated via email",
      "Photo and documentation request flows sent to homeowners automatically",
      "Job completion survey and review request in one automated sequence",
    ],
  },
];

export default function HomeServicesPage() {
  return (
    <main className="bg-brand-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />

      {/* Hero */}
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
          <span className="text-brand-purple text-sm font-semibold uppercase tracking-wider">Home Services</span>
          <h1 className="text-5xl sm:text-6xl font-black text-white mt-3 mb-6 leading-tight">
            Built for the Trades.<br />
            <span className="text-brand-purple">Powered by AI.</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10">
            In the trades, the contractor who responds first wins the job. We build AI systems
            that capture, qualify, and follow up every lead — before you even pick up the phone.
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

      {/* Trades */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black">AI Automation for Every Trade</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Purpose-built automation stacks for the most common home service verticals in Miami-Dade.
            </p>
          </div>
          <div className="space-y-8">
            {trades.map((trade, i) => (
              <div
                key={trade.name}
                className={`rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                  i % 2 === 0 ? "bg-white border border-gray-100" : "bg-brand-dark text-white"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <trade.icon className={`w-8 h-8 ${i % 2 === 0 ? "text-brand-purple" : "text-brand-purple"}`} />
                    <h3 className="text-2xl font-black">{trade.name}</h3>
                  </div>
                  <p className={`text-lg font-medium mb-6 ${i % 2 === 0 ? "text-gray-700" : "text-gray-300"}`}>
                    {trade.tagline}
                  </p>
                  <a
                    href="https://cal.com/automate305"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-purple text-white font-semibold px-5 py-2.5 rounded-full hover:bg-purple-700 transition-colors text-sm"
                  >
                    Get {trade.name} Automation <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <ul className="space-y-3">
                  {trade.useCases.map((uc) => (
                    <li key={uc} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-brand-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-brand-purple block" />
                      </span>
                      <span className={`text-sm leading-relaxed ${i % 2 === 0 ? "text-gray-700" : "text-gray-300"}`}>{uc}</span>
                    </li>
                  ))}
                </ul>
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
