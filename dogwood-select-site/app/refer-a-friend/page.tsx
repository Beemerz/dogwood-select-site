import type { Metadata } from 'next';
import PageHero from '@/components/site/PageHero';
import ReferFriendForm from '@/components/site/ReferFriendForm';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Refer a Friend',
  description:
    'Refer a friend to Dogwood Select for qualifying exterior maintenance and outdoor renovation services in Richmond and Central Virginia and save $100 when they book.',
  path: '/refer-a-friend',
});

export default function ReferFriendPage() {
  return (
    <>
      <PageHero
        eyebrow="Refer a Friend"
        title="Share Dogwood Select with a friend and save $100 when they book a qualifying service."
        description="Send a quick referral for lawn care, curb appeal, pressure washing, property management maintenance, or outdoor renovation work."
      />

      <section className="section-shell pt-0">
        <div className="mx-auto max-w-5xl">
          <ReferFriendForm />
        </div>
      </section>
    </>
  );
}
