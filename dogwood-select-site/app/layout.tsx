import '@/app/globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Dogwood Select | Exterior Care, Upgraded',
    template: '%s | Dogwood Select',
  },
  icons: {
    icon: '/icon-v2.png',
    shortcut: '/icon-v2.png',
    apple: '/icon-v2.png',
  },
  description:
    'Dogwood Select handles exterior maintenance, curb appeal upgrades, outdoor renovation, and property management support for Richmond and Central Virginia.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: 'Dogwood Select | Exterior Care, Upgraded',
    description:
      'Sharper exteriors, cleaner upkeep, and smart renovation work for Richmond and Central Virginia properties.',
    siteName: 'Dogwood Select',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dogwood Select | Exterior Care, Upgraded',
    description:
      'Exterior maintenance, curb appeal upgrades, wash work, and property support without the usual contractor runaround.',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description:
    'Premium exterior maintenance and outdoor property renovation company serving Richmond and Central Virginia.',
  url: siteConfig.url,
  telephone: siteConfig.phoneDisplay,
  email: siteConfig.email,
  areaServed: ['Richmond, Virginia', 'Central Virginia'],
  serviceType: [
    'Exterior maintenance',
    'Lawn care',
    'Mulch and garden beds',
    'Gutter cleaning',
    'Pressure washing',
    'Curb appeal packages',
    'Property management maintenance',
    'Patios and hardscape',
    'Backyard oasis upgrades',
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          id="dogwood-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <div className="min-h-screen bg-site text-ink-strong">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
