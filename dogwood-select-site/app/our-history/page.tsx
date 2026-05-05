import type { Metadata } from 'next';
import PageHero from '@/components/site/PageHero';
import { createMetadata } from '@/lib/metadata';
import { historyPoints } from '@/lib/site';

export const metadata: Metadata = createMetadata({
  title: 'Our History',
  description:
    'Read the Dogwood Select story and how the brand approaches exterior maintenance, property presentation, and modern service support in Richmond and Central Virginia.',
  path: '/our-history',
});

export default function OurHistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our History"
        badge={
          <div className="history-badge">
            <svg viewBox="0 0 36 36" fill="none" className="history-badge-icon" aria-hidden="true">
              <path
                d="M8 8.5 12.6 4h8.7l6.7 5.4-1.1 16.2-9.4 6.4-9.5-6.6L8 8.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M19.4 18.1c.9-1.4 3.2-1.5 4.2-.1.7 1 .5 2.3-.5 3.4l-3.1 3-3.1-3c-1-1.1-1.2-2.4-.5-3.4 1-1.4 3.3-1.3 4.2.1Z"
                fill="currentColor"
              />
              <circle cx="18.6" cy="18.7" r="1.2" fill="#fbf6f0" />
            </svg>
            <span>Virginia rooted, Richmond at heart</span>
          </div>
        }
        title="Building a better exterior operator that serves both Virginians, as well as Virginia itself. 15 years of service."
        description="Excellence is the standard, perfection is the goal, and commercial-quality work with a superb attitude is the baseline throughout."
        secondaryCta={{ label: 'The Works', href: '/the-works' }}
      />

      <section className="section-shell pt-0">
        <div className="site-frame grid gap-5">
          {historyPoints.map((point) => (
            <article key={point.title} className="service-card">
              <p className="eyebrow">{point.year}</p>
              <h2 className="font-display text-3xl text-ink-strong">{point.title}</h2>
              <p className="max-w-3xl text-base leading-8 text-ink-soft">{point.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
