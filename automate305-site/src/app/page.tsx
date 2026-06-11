import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CaseStudyCard from "@/components/CaseStudyCard";
import ChatDemo from "@/components/ChatDemo";
import {
  Wrench,
  Briefcase,
  UtensilsCrossed,
  Zap,
  Clock,
  TrendingUp,
  Shield,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const caseStudies = [
  {
    client: "Carlos Z.",
    business: "Pure Air Pros",
    industry: "HVAC · Miami-Dade",
    description:
      "Speed-to-lead capture, after-hours dispatcher, automated review-request loop, calendar handoff for booked jobs.",
    stat: "<5 min response",
    quote:
      "Every inbound inquiry replied to before it shops the next contractor.",
  },
  {
    client: "Independent Aesthetics Rep",
    business: "Aesthetics Sales",
    industry: "Aesthetics · National",
    description:
      "A lead-gen engine, end-to-end — sender infrastructure, two parallel cold campaigns, anti-cannibalization across a shared ICP, booking handoff to her calendar.",
    stat: "3,000+ contacts/mo",
    quote: "Cold outbound across two campaigns, one rep, zero SDRs.",
  },
  {
    client: "Felipe C.",
    business: "Mint Financial",
    industry: "Financial Services · S. FL",
    description:
      "Client intake automation, deal-status comms, pipeline visibility across the loan lifecycle — intake to close, on one rail.",
    stat: "100% touchpoints automated",
    quote:
      "Built for an SMB lender who can't afford to lose another deal to a delayed status email.",
  },
];

const industries = [
  {
    icon: Wrench,
    title: "Home Services",
    desc: "HVAC, roofing, plumbing, electrical, restoration. Speed-to-lead wins jobs. We automate your intake, dispatch, and follow-up.",
    href: "/industries/home-services",
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    desc: "Lenders, law firms, consultants, insurance brokers. Close more deals with automated intake, follow-up, and pipeline comms.",
    href: "/industries/professional-services",
  },
  {
    icon: UtensilsCrossed,
    title: "Hospitality",
    desc: "Restaurants, bars, lounges, hotels. Fill more seats and tables with AI-powered reservations, reviews, and retention.",
    href: "/industries/hospitality",
  },
];

export default function HomePage() {
  return (
    <main className="bg-brand-cream min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-brand-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(123,63,242,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(123,63,242,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-purple/20 border border-brand-purple/30 rounded-full px-4 py-1.5 mb-8">
            <Zap className="w-3.5 h-3.5 text-brand-purple" />
            <span className="text-brand-purple text-xs font-semibold uppercase tracking-wider">
              AI Revenue Systems · Miami-Dade
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none mb-6 tracking-tight">
            More Leads.<br />
            <span className="text-brand-purple">Faster Follow-Up.</span><br />
            More Revenue.
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The AI-powered revenue system for home service businesses,
            professional service firms, and hospitality brands.
          </p>
          <a
            href="https://cal.com/automate305"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-purple text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-purple-700 transition-colors shadow-lg shadow-purple-900/40"
          >
            Book a Free Audit
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-gray-500 text-sm mt-4">No commitment. No sales pitch. Just a clear picture of your revenue gaps.</p>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="bg-white border-y border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
          <p className="text-gray-500 text-sm font-medium">
            Serving Miami-Dade contractors, lenders &amp; hospitality brands
          </p>
          <div className="hidden sm:block w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Wrench className="w-4 h-4 text-brand-purple" />
              <span className="text-xs font-semibold">Trades</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="w-4 h-4 text-brand-purple" />
              <span className="text-xs font-semibold">Finance</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <UtensilsCrossed className="w-4 h-4 text-brand-purple" />
              <span className="text-xs font-semibold">Hospitality</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4 text-brand-purple" />
              <span className="text-xs font-semibold">24/7 Response</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="w-4 h-4 text-brand-purple" />
              <span className="text-xs font-semibold">Revenue Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live demo */}
      <section id="solutions" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand-purple text-sm font-semibold uppercase tracking-wider">Live Demo</span>
              <h2 className="text-4xl font-black mt-2 mb-4 leading-tight">
                Your AI Agent,<br />Working at 2 AM.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                While you sleep, your AI agent captures leads, qualifies them,
                books appointments, and sends follow-ups — automatically. No missed
                calls. No cold leads going cold.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Responds to every inbound inquiry in under 5 minutes",
                  "Captures name, number, location, and job type",
                  "Books directly to your calendar",
                  "Triggers review requests after job completion",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-brand-purple mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://cal.com/automate305"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-purple text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
              >
                Get This for My Business
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="flex justify-center">
              <ChatDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="results" className="bg-brand-dark py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-purple text-sm font-semibold uppercase tracking-wider">Real Results</span>
            <h2 className="text-4xl font-black text-white mt-2">
              What Happens When AI Runs Your Revenue Loop
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.name} {...cs} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/results"
              className="inline-flex items-center gap-2 text-brand-purple font-semibold hover:text-purple-400 transition-colors"
            >
              See all results
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-purple text-sm font-semibold uppercase tracking-wider">Industries We Serve</span>
            <h2 className="text-4xl font-black mt-2">Built for Your Business Type</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              We&apos;ve built purpose-built automation stacks for Miami-Dade&apos;s three most
              revenue-dense sectors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industries.map((ind) => (
              <Link key={ind.href} href={ind.href} className="group">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-brand-purple hover:shadow-lg transition-all h-full">
                  <ind.icon className="w-10 h-10 text-brand-purple mb-4" />
                  <h3 className="font-bold text-xl mb-2 group-hover:text-brand-purple transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{ind.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-brand-purple font-semibold text-sm">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
