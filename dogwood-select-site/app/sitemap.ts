import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

const routes = [
  '',
  '/services',
  '/the-works',
  '/our-history',
  '/self-consultation',
  '/book-consultation',
  '/refer-a-friend',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route || '/'}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
