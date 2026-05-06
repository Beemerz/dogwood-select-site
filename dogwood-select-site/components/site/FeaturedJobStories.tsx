/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { featuredJobStories } from '@/lib/workPhotos';

export default function FeaturedJobStories({
  limit,
  compact = false,
}: {
  limit?: number;
  compact?: boolean;
}) {
  const jobs = typeof limit === 'number' ? featuredJobStories.slice(0, limit) : featuredJobStories;

  if (compact) {
    return (
      <div className="featured-jobs-grid featured-jobs-grid-compact">
        {jobs.map((job) => (
          <article key={job.title} className="services-feature-card featured-jobs-card">
            <div className="photo-frame featured-jobs-frame">
              <img
                src={job.photo.src}
                alt={job.photo.alt}
                className="photo-image absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="photo-overlay">
                <p className="photo-kicker">{job.photo.eyebrow}</p>
                <h3>{job.photo.title}</h3>
              </div>
            </div>
            <div className="featured-jobs-copy">
              <h3 className="font-display text-[1.5rem] leading-tight text-ink-strong">{job.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink-soft">{job.body}</p>
              <p className="mt-3 text-sm leading-7 text-ink-soft">{job.photo.caption}</p>
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {jobs.map((job, index) => {
        const reverse = index % 2 === 1;

        return (
          <article key={job.title} className="services-feature-card">
            <div className={reverse ? 'services-feature-grid services-feature-grid-reverse' : 'services-feature-grid'}>
              <div className="services-feature-copy">
                <p className="eyebrow">{job.photo.eyebrow}</p>
                <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink-strong md:text-[2.5rem]">
                  {job.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-ink-soft">{job.body}</p>
              </div>

              <div className="services-feature-visual">
                <div className="photo-frame services-feature-frame">
                  <img
                    src={job.photo.src}
                    alt={job.photo.alt}
                    className="photo-image absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <Link
                    href={`/book-consultation?service=${encodeURIComponent(job.photo.serviceInterest ?? 'Custom project')}`}
                    className="services-wheel-photo-action"
                  >
                    Get this service
                  </Link>
                  <div className="photo-overlay">
                    <p className="photo-kicker">{job.photo.eyebrow}</p>
                    <h3>{job.photo.title}</h3>
                  </div>
                </div>
                <p className="photo-copy mt-4">{job.photo.caption}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
