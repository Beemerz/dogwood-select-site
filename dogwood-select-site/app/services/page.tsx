import type { Metadata } from 'next';
import PageHero from '@/components/site/PageHero';
import ServicesCategoryShowcase from '@/components/site/ServicesCategoryShowcase';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Our Services',
  description:
    'Explore Dogwood Select service categories for grounds care, exterior washing, curb appeal work, outdoor living upgrades, property support, and seasonal recovery.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="A stronger exterior starts with knowing which kind of work actually moves the property forward."
        description="From recurring grounds care to outdoor living upgrades, each service category is built to solve a distinct kind of exterior problem without overlap or guesswork."
        primaryCta={{ label: 'Save Time, Book Now', href: '/book-consultation' }}
        secondaryCta={{ label: 'See The Works', href: '/the-works' }}
      />

      <section className="section-shell pt-0">
        <div className="site-frame">
          <ServicesCategoryShowcase />
        </div>
      </section>
    </>
  );
}
