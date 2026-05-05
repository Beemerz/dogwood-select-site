import type { Metadata } from 'next';
import FeaturedJobStories from '@/components/site/FeaturedJobStories';
import PageHero from '@/components/site/PageHero';
import WorkPhotoGallery from '@/components/site/WorkPhotoGallery';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'The Works',
  description:
    'See how Dogwood Select presents real exterior transformation work across curb appeal upgrades, wash and restore jobs, outdoor renovation, and property resets.',
  path: '/the-works',
});

export default function TheWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="The Works"
        title="This is where the property starts looking obviously more dialed in."
        description="Before and after, clearly labeled, cleanly framed, and honest about what actually changed."
        primaryCta={{ label: 'Save Time, Book Now', href: '/book-consultation' }}
        secondaryCta={{ label: 'Our Services', href: '/services' }}
        compact
      />

      <section className="section-shell pt-0 works-hero-merge">
        <div className="site-frame works-hero-merge-frame">
          <div className="mb-8 works-hero-merge-intro">
            <p className="eyebrow">Featured Jobs</p>
            <h2 className="story-headline story-headline-moderate max-w-3xl">
              Individual jobs that left the property feeling warmer, sharper, and more complete.
            </h2>
          </div>
          <FeaturedJobStories />
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="site-frame">
          <div className="mb-8">
            <p className="eyebrow">After Photos</p>
            <h2 className="story-headline story-headline-moderate max-w-3xl">
              Redefining what care to your out door space really means.
            </h2>
          </div>
          <WorkPhotoGallery />
        </div>
      </section>
    </>
  );
}
