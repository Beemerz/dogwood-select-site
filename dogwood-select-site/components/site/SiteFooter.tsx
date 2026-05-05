/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import BrandMark from '@/components/site/BrandMark';
import { footerLinks, siteConfig } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--panel-soft)]">
      <div className="site-frame grid gap-10 px-5 py-14 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div className="space-y-5">
          <div className="footer-brand-row">
            <BrandMark variant="header" className="footer-mark" />
            <BrandMark variant="typed" className="footer-wordmark" />
          </div>
          <p className="max-w-xl text-sm leading-7 text-ink-muted">
            Rooted in Virginia beauty, designing timeless outdoor spaces.
          </p>
          <div className="space-y-2 text-sm text-ink-soft">
            <p>
              <a href={siteConfig.phoneHref} className="footer-link">
                {siteConfig.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={siteConfig.emailHref} className="footer-link">
                {siteConfig.email}
              </a>
            </p>
            <p>{siteConfig.serviceArea}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-ink-soft">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="footer-link">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="site-frame flex items-center justify-center px-5 pb-8 md:px-8">
        <div className="footer-stamp">
          <div className="relative h-10 w-10 overflow-hidden">
            <img
              src="/brand/micro-logo-v2.png"
              alt="Dogwood Select stamp"
              width={160}
              height={160}
              className="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
