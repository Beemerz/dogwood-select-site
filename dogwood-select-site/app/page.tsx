import type { Metadata } from 'next';
import Link from 'next/link';
import BeforeAfterShowcase from '@/components/site/BeforeAfterShowcase';
import HomeQuickStartForm from '@/components/site/HomeQuickStartForm';
import HomeStoryExperience from '@/components/site/HomeStoryExperience';
import ServiceCategoryCards from '@/components/site/ServiceCategoryCards';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Home',
  description:
    'Dogwood Select helps Richmond and Central Virginia properties stay sharp with intentional exterior care, curb appeal improvements, outdoor living upgrades, and dependable support.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <section className="section-shell">
        <HomeStoryExperience
          midSection={
            <section className="story-section story-section-compact">
              <p className="eyebrow">Contact Now</p>
              <h2 className="story-headline story-headline-moderate">
                When you decide on excellence, send the context once and we will handle the next steps cleanly.
              </h2>
              <p className="story-body">
                Pick the work, choose the first date that makes sense, and hand off the next move
                without the usual back and forth.
              </p>
              <div className="mt-8">
                <HomeQuickStartForm />
              </div>
            </section>
          }
        >
          <section className="story-section story-section-compact">
            <p className="eyebrow">Our Services</p>
            <h2 className="story-headline story-headline-moderate">
              The right kind of exterior work protects value long before anyone talks numbers.
            </h2>
            <p className="story-body">
              Grounds care, surface cleaning, curb appeal work, outdoor living improvements, and
              property support each solve a different kind of visual or operational drag. That is
              why we keep them clearly defined.
            </p>
            <div className="mt-8">
              <Link href="/services" className="button-secondary">
                Browse All Services
              </Link>
            </div>
            <div className="mt-8">
              <ServiceCategoryCards compact />
            </div>
          </section>

          <section className="story-section story-section-compact">
            <p className="eyebrow">The Works</p>
            <h2 className="story-headline story-headline-moderate">
              The strongest properties are the ones that never look like they are catching up.
            </h2>
            <p className="story-body">
              This is where disciplined upkeep turns into visible advantage: cleaner entries,
              better hardscape presence, stronger backyard flow, and curb appeal that quietly
              outclasses the house next door.
            </p>
            <div className="mt-8">
              <Link href="/the-works" className="button-primary">
                See The Works
              </Link>
            </div>
            <div className="mt-8">
              <BeforeAfterShowcase limit={2} />
            </div>
          </section>
        </HomeStoryExperience>
      </section>
    </>
  );
}
