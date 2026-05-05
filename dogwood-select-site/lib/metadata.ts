import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

type MetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createMetadata({ title, description, path }: MetadataInput): Metadata {
  const canonical = path === '/' ? '/' : path.replace(/\/$/, '');
  const url = canonical === '/' ? siteConfig.url : `${siteConfig.url}${canonical}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | Dogwood Select`,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Dogwood Select`,
      description,
    },
  };
}
