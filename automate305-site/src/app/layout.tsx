import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Automate305 | AI-Powered Revenue Systems for Home Services',
  description: 'Miami-based AI automation agency helping home service contractors, professional firms, and hospitality brands capture more revenue with less manual work.',
  openGraph: {
    title: 'Automate305 | AI-Powered Revenue Systems for Home Services',
    description: 'Miami-based AI automation agency helping home service contractors, professional firms, and hospitality brands capture more revenue with less manual work.',
    url: 'https://automate305.com',
    siteName: 'Automate305',
    locale: 'en_US',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Automate305',
  description: 'AI-powered revenue systems for home services, professional services, and hospitality.',
  url: 'https://automate305.com',
  telephone: '',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    postalCode: '33128',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.7617,
    longitude: -80.1918,
  },
  areaServed: 'Miami-Dade County',
  serviceType: 'AI Automation, Revenue Operations',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
