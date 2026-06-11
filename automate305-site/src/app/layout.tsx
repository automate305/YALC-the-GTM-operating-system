import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Automate305 | AI-Powered Revenue System for Miami Businesses',
  description: 'The AI-powered revenue system for home service businesses, professional service firms, and hospitality brands in Miami-Dade.',
  keywords: 'AI automation, Miami, home services, professional services, hospitality, lead generation, revenue automation',
  openGraph: {
    title: 'Automate305 | AI-Powered Revenue System',
    description: 'More Leads. Faster Follow-Up. More Revenue. AI automation for Miami businesses.',
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
  description: 'AI-powered revenue automation for home service, professional service, and hospitality businesses in Miami-Dade.',
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
  areaServed: 'Miami-Dade County, FL',
  serviceType: 'AI Revenue Automation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
