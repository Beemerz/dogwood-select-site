import type { ReactNode } from 'react';
import Link from 'next/link';
import HeroPhotoWheel from '@/components/site/HeroPhotoWheel';

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  badge?: ReactNode;
  compact?: boolean;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  badge,
  compact = false,
}: Props) {
  return (
    <section className={compact ? 'section-shell section-shell-tight' : 'section-shell'}>
      <div className="site-frame split-hero">
        <div className="split-copy">
          {badge ? <div className="mb-4">{badge}</div> : null}
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="story-headline story-headline-inner max-w-3xl">{title}</h1>
          <p className="story-body max-w-2xl">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryCta ? (
              <Link href={primaryCta.href} className="button-primary">
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link href={secondaryCta.href} className="button-secondary">
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>

        <aside className="split-visual">
          <HeroPhotoWheel eyebrow={eyebrow} />
        </aside>
      </div>
    </section>
  );
}
