import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { UtensilsCrossed, Wine, Music, Hotel, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospitality Automation | Automate305 Miami",
  description: "AI automation for restaurants, bars, lounges, and hotels in Miami. Fill more tables, automate reviews, and drive repeat visits.",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hospitality AI Automation",
  provider: { "@type": "LocalBusiness", name: "Automate305" },
  areaServed: { "@type": "City", name: "Miami" },
  serviceType: ["Restaurant Automation", "Bar Marketing Automation", "Hotel Guest Journey"],
};

const segments = [
  {
    icon: UtensilsCrossed,
    name: "Restaurants",
    tagline: "Full tables every night, not just on weekends.",
    useCases: [
      "Automated reservation confirmation and reminder sequences via SMS",
      "No-show recovery flows — automated rebooking prompts sent same-day",
      "Post-visit review request campaigns targeted to diners who didn't cancel",
      "Birthday and anniversary reactivation campaigns to your past guest list",
    ],
  },
  {
    icon: Wine,
    name: "Bars & Lounges",
    tagline: "Your regulars should hear from you before Friday.",
    useCases: [
      "Weekly event announcements automated to your guest database",
      "VIP list management with automated invite flows for special events",
      "Google and Yelp review request sequences post-visit",
      "Reactivation campaigns for guests who haven't visited in 60+ days",
    ],
  },
  {
    icon: Music,
    name: "Event Venues",
    tagline: "Sell out every show without a marketing team.",
    useCases: [
      "Event announcement sequences to segmented audience lists",
      "Ticketing reminder flows — 7 days, 48 hours, and day-of",
      "Post-event review capture and photo-tag follow-up automation",
      "Sponsor and partnership outreach sequences automated end-to-end",
    ],
  },
  {
    icon: Hotel,
    name: "Hotels & Short-Term Rentals",
    tagline: "A great stay should generate the next booking automatically.",
    useCases: [
      "Pre-arrival communication sequences with upsell offers and local tips",
      "In-stay satisfaction check-in via SMS at the 24-hour mark",
      "Post-checkout review request with platform routing (Google, TripAdvisor)",
      "Return-visit discount sequences triggered 60 days post-checkout",
    ],
  },
];

export default function HospitalityPage() {
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
          <span className="text-brand-purple text-sm font-semibold uppercase tracking-wider">Hospitality</span>
          <h1 className="text-5xl sm:text-6xl font-black text-white mt-3 mb-6 leading-tight">
            Fill More Tables.<br />
            <span className="text-brand-purple">Automate the Rest.</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10">
            Miami&apos;s hospitality scene is competitive. The businesses that win aren&apos;t just the ones
            with the best food — they&apos;re the ones with the best guest journey and the most consistent follow-up.
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
            <h2 className="text-4xl font-black">AI for Every Hospitality Segment</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              From reservation management to post-visit retention — we automate the full guest lifecycle.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {segments.map((seg) => (
              <div key={seg.name} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-brand-purple hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <seg.icon className="w-8 h-8 text-brand-purple" />
                  <h3 className="text-2xl font-black">{seg.name}</h3>
                </div>
                <p className="text-gray-600 font-medium mb-5">{seg.tagline}</p>
                <ul className="space-y-3 mb-6">
                  {seg.useCases.map((uc) => (
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
                  Automate my {seg.name.toLowerCase()} <ArrowRight className="w-4 h-4" />
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
