import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export default function SiteOfferBanner() {
  return (
    <div className="fixed inset-x-0 top-[104px] z-40 border-b border-[#c6a463]/18 bg-[#fbf7ee]/92 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2.5 text-sm text-[#5a564d] md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          Save $100 on your first service. Terms and conditions apply. Deal ends{' '}
          <span className="font-semibold text-[#2f3e2d]">{siteConfig.offerEndDate}</span>.
        </p>
        <Link href="/book-consultation" className="font-semibold text-[#6f7a4e] hover:text-[#4e5f3f]">
          Claim $100 Off
        </Link>
      </div>
    </div>
  );
}
