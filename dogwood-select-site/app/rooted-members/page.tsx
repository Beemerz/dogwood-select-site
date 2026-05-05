import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/site/PageHero';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Rooted Members',
  description:
    'Learn how Dogwood Select Rooted Members get priority service, steadier route planning, and a more pristine outdoor environment through deeper service support.',
  path: '/rooted-members',
});

const rootedBenefits = [
  {
    title: '10% off all multi service packages',
    body: 'When the work is bundled together, Rooted Members get a cleaner price on the full plan instead of paying full rate across separate one-off visits.',
  },
  {
    title: 'Priority scheduling',
    body: 'Members move up faster when route space opens, the weather creates narrow timing windows, or several scopes need to be coordinated at once.',
  },
  {
    title: 'Less trial and error',
    body: 'You stop repeating the same notes to different contractors. One team handles more, so the standard stays consistent and your time stays protected.',
  },
  {
    title: 'A more pristine outdoor environment',
    body: 'The result is not just maintenance. It is a property that feels cleaner, sharper, and more complete because the outside is being managed as a whole.',
  },
];

export default function RootedMembersPage() {
  return (
    <>
      <PageHero
        eyebrow="Rooted Members"
        title="For clients who would rather let the right team handle more, save time, and stop sorting through the other guys."
        description="Rooted Members are the clients who want more of the exterior handled under one relationship, with priority treatment, cleaner planning, a 10% discount on all multi service packages, and an outdoor environment that stays more pristine with less back and forth."
        primaryCta={{ label: 'Become A Rooted Member', href: '/book-consultation' }}
        secondaryCta={{ label: 'See Our Services', href: '/services' }}
        compact
      />

      <section className="section-shell pt-0">
        <div className="site-frame rooted-member-band">
          <div>
            <p className="eyebrow">Membership Access</p>
            <h2 className="story-headline story-headline-moderate max-w-3xl">
              Select 3 or more services and Rooted Membership is free. Otherwise it is $99 per month.
            </h2>
            <p className="story-body max-w-3xl">
              When selecting <strong>3 or more services</strong>, you become a Rooted Member for
              free. <strong>$99 dollar value.</strong> If you only need one or two services, you
              can still join for <strong>$99/month</strong> and get the same planning and priority
              advantages. The free member-fee waiver applies for the first <strong>6 months</strong>
              of recurring service after booking 3 or more services.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book-consultation" className="button-primary">
              Become A Rooted Member
            </Link>
            <Link href="/services" className="button-secondary">
              Build Your Service Mix
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="site-frame rooted-members-grid">
          {rootedBenefits.map((benefit) => (
            <article key={benefit.title} className="service-card rooted-member-card">
              <p className="eyebrow">Member Benefit</p>
              <h2 className="font-display text-3xl text-ink-strong">{benefit.title}</h2>
              <p className="max-w-3xl text-base leading-8 text-ink-soft">{benefit.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
