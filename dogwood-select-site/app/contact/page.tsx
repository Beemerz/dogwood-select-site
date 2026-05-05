import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/site/ContactForm';
import PageHero from '@/components/site/PageHero';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = createMetadata({
  title: 'Contact',
  description:
    'Contact Dogwood Select for exterior maintenance, curb appeal upgrades, wash work, outdoor renovation, and property management support in Richmond and Central Virginia.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach out directly if you already know the situation."
        description="If the work is urgent, weird, or easier to explain outside the form, send a message here and we will steer it the right way."
        primaryCta={{ label: 'Save Time, Book Now', href: '/book-consultation' }}
        secondaryCta={{ label: 'Our Services', href: '/services' }}
      />

      <section className="section-shell pt-0">
        <div className="site-frame split-hero">
          <aside className="service-card">
            <h2 className="font-display text-3xl text-ink-strong">{siteConfig.name}</h2>
            <div className="space-y-3 text-sm leading-7 text-ink-soft">
              <p>
                Phone:{' '}
                <a href={siteConfig.phoneHref} className="footer-link">
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <p>
                Email:{' '}
                <a href={siteConfig.emailHref} className="footer-link">
                  {siteConfig.email}
                </a>
              </p>
              <p>Operating area: {siteConfig.serviceArea}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/book-consultation" className="button-primary">
                Save Time, Book Now
              </Link>
              <Link href="/the-works" className="button-secondary">
                See The Works
              </Link>
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
