import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export default function OfferCard() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="rounded-[2rem] border border-gold-soft/30 bg-[linear-gradient(135deg,_rgba(239,229,206,0.96),_rgba(221,228,204,0.92)_42%,_rgba(209,220,195,0.9)_100%)] p-8 shadow-premium md:flex md:items-end md:justify-between md:gap-10">
        <div>
          <p className="eyebrow">Limited Offer</p>
          <h2 className="mt-4 font-display text-4xl text-[#324031]">Save $100 on your first service.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#524d42]">
            Terms and conditions apply. Deal ends {siteConfig.offerEndDate}. Refer a friend who
            books a qualifying service and save $100 for each confirmed referral.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 md:mt-0 md:min-w-[230px]">
          <Link href="/book-consultation" className="button-primary">
            Claim $100 Off
          </Link>
          <Link href="/refer-a-friend" className="button-secondary">
            Refer a Friend
          </Link>
        </div>
      </div>
    </div>
  );
}
