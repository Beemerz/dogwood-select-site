import type { Metadata } from 'next';
import PageHero from '@/components/site/PageHero';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Terms and Conditions',
  description:
    'Review Dogwood Select terms and conditions for estimates, scheduling, deposits, promotional offers, referral credits, and website updates.',
  path: '/terms-and-conditions',
});

const terms = [
  'Estimates provided by Dogwood Select are not final invoices and may change based on final scope, site conditions, or requested additions.',
  'Scheduling is subject to availability, weather conditions, and project readiness.',
  'Deposits may be required for qualifying services or project reservations.',
  'The Save $100 offer applies to qualifying first services only and ends July 30, 2026.',
  'Referral credits apply only after a referred friend books a qualifying service with Dogwood Select.',
  'Dogwood Select may update these terms and conditions from time to time.',
  'Questions about these terms may be sent to support@dogwoodselect.com.',
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms and Conditions"
        title="Core terms for consultations, scheduling, offers, and project planning."
        description="These terms are intended to keep service expectations clear while Dogwood Select continues to refine the client experience."
      />

      <section className="section-shell pt-0">
        <div className="site-frame max-w-4xl space-y-4">
          {terms.map((term) => (
            <div key={term} className="panel-card p-7 text-sm leading-7 text-ink-soft">
              {term}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
