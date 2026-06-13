'use client'
import { useState } from 'react'
import CalButton from '@/components/CalButton'

type FormState = {
  name: string
  email: string
  phone: string
  business: string
  industry: string
  message: string
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    business: '',
    industry: '',
    message: '',
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    // In production, wire this to your form backend (e.g. Resend, Formspree, Make webhook)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-[#111318] font-black text-2xl mb-3">Message Sent!</h3>
        <p className="text-gray-500 text-base mb-6">
          We&apos;ll reach out within 24 hours to schedule your revenue audit.
        </p>
        <CalButton className="inline-block bg-[#7B3FF2] text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
              Or Book Directly on Cal.com →
            </CalButton>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 space-y-5">
      <h3 className="text-[#111318] font-black text-xl mb-2">Send Us a Message</h3>
      <p className="text-gray-500 text-sm mb-4">We&apos;ll get back to you within 24 hours.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-[#111318] text-sm font-semibold mb-1">
            Name <span className="text-[#7B3FF2]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#111318] focus:outline-none focus:border-[#7B3FF2] transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[#111318] text-sm font-semibold mb-1">
            Email <span className="text-[#7B3FF2]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#111318] focus:outline-none focus:border-[#7B3FF2] transition-colors"
            placeholder="you@yourbusiness.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-[#111318] text-sm font-semibold mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#111318] focus:outline-none focus:border-[#7B3FF2] transition-colors"
            placeholder="305-000-0000"
          />
        </div>
        <div>
          <label htmlFor="business" className="block text-[#111318] text-sm font-semibold mb-1">
            Business Name
          </label>
          <input
            type="text"
            id="business"
            name="business"
            value={form.business}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#111318] focus:outline-none focus:border-[#7B3FF2] transition-colors"
            placeholder="Your business"
          />
        </div>
      </div>

      <div>
        <label htmlFor="industry" className="block text-[#111318] text-sm font-semibold mb-1">
          Industry <span className="text-[#7B3FF2]">*</span>
        </label>
        <select
          id="industry"
          name="industry"
          required
          value={form.industry}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#111318] focus:outline-none focus:border-[#7B3FF2] transition-colors bg-white"
        >
          <option value="">Select your industry</option>
          <option value="hvac">HVAC</option>
          <option value="roofing">Roofing</option>
          <option value="plumbing">Plumbing</option>
          <option value="electrical">Electrical</option>
          <option value="restoration">Restoration</option>
          <option value="lending">Lending / Financial Services</option>
          <option value="legal">Law Firm</option>
          <option value="consulting">Consulting</option>
          <option value="insurance">Insurance</option>
          <option value="restaurant">Restaurant</option>
          <option value="bar-lounge">Bar / Lounge</option>
          <option value="hotel">Hotel</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-[#111318] text-sm font-semibold mb-1">
          What&apos;s your biggest revenue challenge right now?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#111318] focus:outline-none focus:border-[#7B3FF2] transition-colors resize-none"
          placeholder="e.g. We're losing leads after hours. Our quote follow-up is manual and inconsistent..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#7B3FF2] text-white font-semibold py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message →'}
      </button>
      <p className="text-gray-400 text-xs text-center">
        No spam. We&apos;ll only reach out to schedule your free audit.
      </p>
    </form>
  )
}
