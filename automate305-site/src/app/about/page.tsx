import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const team = [
  {
    initials: "OA",
    name: "Othmane Khadri",
    title: "Founder & CEO",
    bio: "Miami-based operator and AI systems architect. Built revenue automation systems for home service companies, financial services firms, and B2B sales organizations.",
  },
  {
    initials: "AA",
    name: "Alex A.",
    title: "Head of Automation",
    bio: "Automation engineer specializing in CRM integrations, workflow orchestration, and AI-native business systems built for speed and reliability.",
  },
  {
    initials: "MR",
    name: "Maria R.",
    title: "Client Success Lead",
    bio: "Former operations manager who bridges the gap between business goals and technical systems — ensuring every automation stack actually drives revenue.",
  },
];

const values = [
  {
    emoji: "⚡",
    title: "Speed is the product",
    desc: "The businesses that win respond faster. Everything we build is optimized for speed-to-lead, speed-to-response, and speed-to-close.",
  },
  {
    emoji: "🎯",
    title: "Revenue, not features",
    desc: "We don't sell dashboards. We sell revenue systems. Every automation we build is tied to a measurable outcome — leads, bookings, or dollars.",
  },
  {
    emoji: "🔒",
    title: "Your data stays yours",
    desc: "We never hold your data hostage. Everything we build lives in systems you own and control. No lock-in, no black boxes.",
  },
  {
    emoji: "🤝",
    title: "Operators first",
    desc: "We work with founders and operators, not enterprise procurement. We move fast, communicate directly, and ship systems that work.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-brand-cream">
      <Navbar />

      {/* Hero */}
      <section className="bg-brand-dark pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Miami-Built.<br />
            <span className="text-brand-purple">Revenue-Focused.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Automate305 is a Miami-Dade AI automation agency. We build revenue systems for the businesses that power South Florida — the contractors, lenders, restaurants, and professional firms that keep this city running.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-brand-purple text-sm font-bold uppercase tracking-wider mb-4">Our Mission</div>
              <h2 className="text-3xl font-black text-brand-dark mb-6 leading-tight">
                Give Miami businesses the revenue infrastructure that enterprise companies take for granted.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The average HVAC company loses 30% of its inbound leads to slow response times. The average law firm follows up once, maybe twice, then lets prospects go cold. The average restaurant never asks a happy guest to come back.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We fix that. One automation system at a time. Built for operators who run lean, move fast, and want their data on systems they control.
              </p>
            </div>
            <div className="bg-brand-cream rounded-2xl p-10 text-center">
              <div className="text-brand-purple font-black text-6xl mb-2">305</div>
              <p className="text-gray-500 text-sm font-medium">Miami-Dade area code</p>
              <div className="border-t border-gray-200 mt-6 pt-6">
                <p className="text-gray-700 text-sm leading-relaxed">
                  We are proud to be a Miami company. Our clients are our neighbors. Their success is our success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-brand-dark text-center mb-4">The Team</h2>
          <p className="text-center text-gray-500 mb-16 max-w-xl mx-auto">
            Small team. Deep expertise. We have been building revenue systems for Miami businesses since 2023.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
                <div className="w-20 h-20 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto mb-5">
                  <span className="text-brand-purple font-black text-xl">{member.initials}</span>
                </div>
                <h3 className="font-bold text-brand-dark text-lg">{member.name}</h3>
                <p className="text-brand-purple text-sm font-semibold mb-3">{member.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-brand-dark text-center mb-16">How we work</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.title} className="flex gap-5 items-start">
                <div className="text-3xl mt-1">{v.emoji}</div>
                <div>
                  <h3 className="font-bold text-brand-dark text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
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
