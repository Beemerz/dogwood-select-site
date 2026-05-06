import type { Metadata } from 'next';
import Link from 'next/link';
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
              Dogwood Select is an outdoor care and renovation company built with Virginia habits
              in mind: properties that should look welcoming, work hard through the seasons, and
              feel like they belong to people who take pride in where they live.
            </p>
            <div className="mt-8">
              <Link href="/the-works" className="button-primary">
                See The Works
              </Link>
            </div>
            <div className="mt-8 homepage-works-proof">
              <article className="service-card homepage-company-intro">
                <p className="text-[1.04rem] leading-8 text-ink-soft md:text-[1.08rem]">
                  Around Richmond and Central Virginia, the best outdoor spaces are the ones that
                  feel settled into the landscape instead of forced onto it. We take that
                  seriously, whether the work is a lawn that needs steadier care, an entry that
                  needs to look more welcoming, or a backyard that should finally feel worth using.
                </p>
                <p className="text-[1.04rem] leading-8 text-ink-soft md:text-[1.08rem]">
                  Our goal is simple: cleaner presentation, stronger upkeep, and outdoor work that
                  feels rooted in the way Virginia properties are actually lived in.
                </p>
              </article>
            </div>
          </section>
        </HomeStoryExperience>
      </section>
    </>
  );
}
