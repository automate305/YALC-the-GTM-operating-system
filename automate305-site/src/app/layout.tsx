import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Automate305 | AI-Powered Revenue Systems for Miami Businesses",
  description:
    "Automate305 delivers AI-powered automation for home service businesses, professional service firms, and hospitality brands in Miami-Dade. More leads, faster follow-up, more revenue.",
  keywords: [
    "AI automation Miami",
    "business automation Miami-Dade",
    "home service automation",
    "HVAC lead automation",
    "Miami AI agency",
    "revenue automation",
  ],
  openGraph: {
    title: "Automate305 | AI-Powered Revenue Systems",
    description:
      "The AI-powered revenue system for home service businesses, professional service firms, and hospitality brands in Miami.",
    url: "https://automate305.com",
    siteName: "Automate305",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automate305 | AI-Powered Revenue Systems",
    description:
      "The AI-powered revenue system for home service, professional services, and hospitality brands in Miami-Dade.",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Automate305",
  description:
    "AI-powered revenue automation for home service businesses, professional service firms, and hospitality brands in Miami-Dade.",
  url: "https://automate305.com",
  telephone: "",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "33128",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.7617,
    longitude: -80.1918,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 25.7617,
      longitude: -80.1918,
    },
    geoRadius: "80000",
  },
  serviceType: [
    "AI Automation",
    "Lead Generation",
    "CRM Automation",
    "Revenue Operations",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
