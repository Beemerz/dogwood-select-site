/* eslint-disable @next/next/no-img-element */
import { serviceExamples } from '@/lib/workPhotos';

export default function ServiceExamplesStrip() {
  return (
    <section className="section-shell pt-0">
      <div className="site-frame">
        <div className="mb-8">
          <p className="eyebrow">Selected Work</p>
          <h2 className="story-headline story-headline-moderate max-w-3xl">
            A few examples of how these categories show up in the real world.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {serviceExamples.map((photo) => (
            <article key={photo.src} className="photo-card photo-card-compact">
              <div className="photo-frame photo-frame-compact">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="photo-image absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="photo-overlay">
                  <p className="photo-kicker">{photo.eyebrow}</p>
                  <h3>{photo.title}</h3>
                </div>
              </div>
              <p className="photo-copy">{photo.caption}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
