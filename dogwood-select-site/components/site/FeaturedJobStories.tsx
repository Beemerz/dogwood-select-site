/* eslint-disable @next/next/no-img-element */
import { featuredJobStories } from '@/lib/workPhotos';

export default function FeaturedJobStories() {
  return (
    <div className="grid gap-6">
      {featuredJobStories.map((job, index) => {
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
