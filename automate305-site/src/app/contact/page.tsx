"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Mail, Calendar, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-brand-cream min-h-screen">
      <Navbar />

      <section className="bg-brand-dark py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-brand-purple text-sm font-semibold uppercase tracking-wider">Get in Touch</span>
          <h1 className="text-5xl font-black text-white mt-3 mb-4">Let's Talk Revenue</h1>
          <p className="text-gray-300 text-lg">Book a free audit and find out exactly where you're leaving money on the table.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-black mb-6">Book a Free Audit</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              No commitment, no sales pitch. A 30-minute call where we map your current lead capture,
              follow-up, and retention gaps — and tell you exactly what AI can fix.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <p className="font-semibold">Schedule Online</p>
                  <a href="https://cal.com/automate305" target="_blank" rel="noopener noreferrer" className="text-brand-purple text-sm hover:underline flex items-center gap-1">
                    cal.com/automate305 <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <p className="font-semibold">Email Us</p>
                  <p className="text-gray-500 text-sm">hello@automate305.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-500 text-sm">Miami, FL 33128 · Miami-Dade County</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <p className="font-semibold mb-2">Prefer to schedule directly?</p>
              <p className="text-gray-500 text-sm mb-4">Use our calendar link to pick a time that works for you.</p>
              <a
                href="https://cal.com/automate305"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-purple text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition-colors text-sm"
              >
                Open Calendar <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 text-brand-purple" />
                </div>
                <h3 className="text-2xl font-black mb-2">We got it!</h3>
                <p className="text-gray-600">We'll reach out within one business day. Or skip the wait — book directly at cal.com/automate305.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-purple"
                      placeholder="Carlos Rodriguez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-purple"
                      placeholder="carlos@yourcompany.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-purple"
                      placeholder="(305) 555-0100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Type *</label>
                    <select
                      required
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-purple bg-white"
                    >
                      <option value="">Select your industry</option>
                      <option value="hvac">HVAC</option>
                      <option value="roofing">Roofing</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="restoration">Restoration</option>
                      <option value="lending">SMB Lending</option>
                      <option value="law">Law Firm</option>
                      <option value="consulting">Consulting</option>
                      <option value="insurance">Insurance</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="bar-lounge">Bar / Lounge</option>
                      <option value="hotel">Hotel / Short-Term Rental</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What's your biggest revenue gap?</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-purple resize-none"
                      placeholder="E.g. We lose leads after hours, our follow-up is inconsistent..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-purple text-white font-bold py-3 rounded-full hover:bg-purple-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
