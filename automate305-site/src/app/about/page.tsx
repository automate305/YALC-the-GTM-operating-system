import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Zap, Target, Users, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Automate305 | Miami AI Automation Agency",
  description: "Automate305 is a Miami-based AI automation agency helping home service, professional service, and hospitality businesses run leaner with AI.",
};

const values = [
  {
    icon: Zap,
    title: "Speed is Revenue",
    desc: "The first business to respond wins. We build systems that make your response time a competitive weapon.",
  },
  {
    icon: Target,
    title: "No Bloat, Just Revenue",
    desc: "We don't sell dashboards you won't look at. Every system we build traces directly to revenue in or revenue protected.",
  },
  {
    icon: Users,
    title: "Built for Operators",
    desc: "We work with founders and operators who run lean. Our systems replace headcount, not add to it.",
  },
  {
    icon: MapPin,
    title: "Miami-First Mindset",
    desc: "We're local. We know Miami-Dade's trades, its hospitality scene, its SMB lending ecosystem. Context matters.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-brand-cream min-h-screen">
      <Navbar />

      <section className="bg-brand-dark py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-brand-purple text-sm font-semibold uppercase tracking-wider">Our Story</span>
          <h1 className="text-5xl font-black text-white mt-3 mb-4">
            We Build the Revenue Systems<br />
            <span className="text-brand-purple">Miami Businesses Actually Need</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Miami AI automation agency. Local team. Real results.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Automate305 exists to help home service businesses, professional service firms,
                and hospitality brands in Miami-Dade compete and win — without adding headcount.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The businesses we work with are already good at what they do. They fix AC units,
                close loans, fill tables, and keep clients happy. What they don't have time for is
                manually following up on every lead, texting every client a status update, and
                chasing reviews after every job.
              </p>
              <p className="text-gray-700 leading-relaxed">
                That's where we come in. We build AI-powered revenue systems that handle all of
                it — so our clients can focus on the work that actually needs a human.
              </p>
            </div>
            <div className="bg-brand-dark rounded-2xl p-8 text-white">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-6 h-6 text-brand-purple fill-brand-purple" />
                <span className="font-black text-xl">AUTOMATE<span className="text-brand-purple">305</span></span>
              </div>
              <p className="text-gray-300 leading-relaxed italic">
                &quot;Most businesses in Miami are leaving revenue on the table every single day — not
                because they're bad at their job, but because their follow-up is slow, their lead
                capture is leaky, and their post-job loop is nonexistent. AI fixes all three.&quot;
              </p>
              <p className="text-brand-purple font-semibold mt-4 text-sm">— Automate305 Team</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-brand-cream rounded-2xl p-6 border border-gray-100">
                <v.icon className="w-8 h-8 text-brand-purple mb-3" />
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">Based in Miami. Built for Miami.</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            We operate in Miami-Dade County — zip 33128. We work with local businesses, understand
            local markets, and show up when needed. This isn't a remote SaaS tool. It's a local
            AI implementation partner.
          </p>
          <div className="inline-flex items-center gap-2 bg-brand-purple/10 border border-brand-purple/20 rounded-full px-5 py-2">
            <MapPin className="w-4 h-4 text-brand-purple" />
            <span className="text-brand-purple text-sm font-semibold">Miami, FL 33128 · Serving all of Miami-Dade</span>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
