import type { Metadata } from 'next';
import ConsultationPhotoLine from '@/components/site/ConsultationPhotoLine';
import HeroPhotoWheel from '@/components/site/HeroPhotoWheel';
import SelfConsultationForm from '@/components/site/SelfConsultationForm';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Book Consultation',
  description:
    'Start the Dogwood Select self consultation for exterior maintenance, wash work, curb appeal upgrades, outdoor renovation, and property support in Richmond and Central Virginia.',
  path: '/book-consultation',
});

export default function BookConsultationPage({
  searchParams,
}: {
  searchParams?: { service?: string };
}) {
  const initialSelectedService = searchParams?.service;

  return (
    <>
      <section className="section-shell section-shell-tight">
        <div className="site-frame split-hero booking-hero">
          <div className="split-copy booking-copy">
            <p className="eyebrow">Book Consultation</p>
            <h1 className="story-headline story-headline-inner max-w-3xl">
              Send the details once, save time on the back and forth.
            </h1>
            <p className="story-body max-w-2xl">
              Pick the work you need, tell us what is going on, upload photos if helpful, and
              choose the timing that makes sense.
            </p>

            <div className="booking-intro-grid mt-8">
              <article className="service-card">
                <p className="eyebrow">What To Have Ready</p>
                <p className="text-base leading-8 text-ink-soft">
                  A rough sense of the work, a few photos if you have them, and the first date
                  that would make the schedule easier on your side.
                </p>
              </article>
              <article className="service-card">
                <p className="eyebrow">What Happens Next</p>
                <p className="text-base leading-8 text-ink-soft">
                  We confirm by email right away, then follow up during business hours with a call
                  that actually moves the project forward.
                </p>
              </article>
            </div>

          </div>

          <aside className="split-visual">
            <HeroPhotoWheel eyebrow="Book Consultation" />
          </aside>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="site-frame booking-form-shell">
          <div className="booking-guide-arrow" aria-hidden="true">
            <span className="booking-guide-line" />
            <span className="booking-guide-head" />
          </div>
          <SelfConsultationForm initialSelectedService={initialSelectedService} />
        </div>
      </section>

      <ConsultationPhotoLine />
    </>
  );
}
