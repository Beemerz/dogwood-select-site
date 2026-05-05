/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

type Variant = 'header' | 'typed' | 'fullTypeout' | 'micro';

const logoMap: Record<Variant, { src: string; alt: string; width: number; height: number }> = {
  header: {
    src: '/brand/full-no-typeout-v2.png',
    alt: 'Dogwood Select logo',
    width: 720,
    height: 220,
  },
  typed: {
    src: '/brand/typed-out-v2.png',
    alt: 'Dogwood Select wordmark',
    width: 760,
    height: 220,
  },
  fullTypeout: {
    src: '/brand/full-typeout-v2.png',
    alt: 'Dogwood Select full logo',
    width: 760,
    height: 760,
  },
  micro: {
    src: '/brand/micro-logo-v2.png',
    alt: 'Dogwood Select micro logo',
    width: 512,
    height: 512,
  },
};

export default function BrandMark({
  href = '/',
  variant = 'header',
  className = '',
}: {
  href?: string;
  variant?: Variant;
  className?: string;
}) {
  const logo = logoMap[variant];

  return (
    <Link href={href} className={className || 'inline-flex'}>
      <img
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className="h-auto w-auto max-w-full object-contain"
        loading={variant === 'header' ? 'eager' : 'lazy'}
        decoding="async"
      />
    </Link>
  );
}
