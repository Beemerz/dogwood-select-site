import type { Metadata } from 'next';
import BrandMark from '@/components/site/BrandMark';
import ConsultationPhotoLine from '@/components/site/ConsultationPhotoLine';
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
        <div className="site-frame booking-hero-simple">
          <div className="booking-copy">
            <p className="eyebrow">Book Consultation</p>
            <h1 className="story-headline story-headline-inner max-w-3xl">
              Send the details once, save time on the back and forth.
            </h1>
            <p className="story-body max-w-2xl">
              Pick the work you need, tell us what is going on, upload photos if helpful, and
              choose the timing that makes sense.
            </p>

            <div className="booking-intro-shell mt-8">
              <div className="booking-intro-grid">
                <article className="service-card">
                  <p className="eyebrow">What To Have Ready</p>
                  <p className="text-base leading-8 text-ink-soft">
                    A rough sense of the work, a few photos if you have them, and the first date
                    that would make the schedule easier on your side.
                  </p>
                </article>
                <article className="service-card booking-logo-card">
                  <BrandMark variant="fullTypeout" className="booking-logo-mark" />
                  <p className="booking-logo-copy">
                    Clear scope, clean follow-through, and a team that treats your time like it
                    matters from the first step forward.
                  </p>
                  <a href="#consultation-form" className="booking-scroll-inline">
                    <span>Scroll</span>
                    <span className="booking-scroll-inline-arrow" aria-hidden="true" />
                  </a>
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
          </div>
        </div>
      </section>

      <section id="consultation-form" className="section-shell pt-0">
        <div className="site-frame booking-form-shell">
          <p className="mb-4 text-sm text-ink-muted">
            New customer offer: $100 off your first qualifying service.
          </p>
          <SelfConsultationForm initialSelectedService={initialSelectedService} />
        </div>
      </section>

      <ConsultationPhotoLine />
    </>
  );
}
