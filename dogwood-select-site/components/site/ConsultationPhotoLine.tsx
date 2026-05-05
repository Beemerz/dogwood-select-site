/* eslint-disable @next/next/no-img-element */
import { consultationExamples } from '@/lib/workPhotos';

export default function ConsultationPhotoLine() {
  return (
    <section className="section-shell pt-0">
      <div className="site-frame">
        <div className="consultation-line">
          <div className="mb-6">
            <p className="eyebrow">Project Snapshot</p>
            <p className="max-w-2xl text-sm leading-7 text-ink-soft">
              A quick sense of the range: clean lawn finish, compact lighting work, and larger
              outdoor living upgrades.
            </p>
          </div>
          <div className="consultation-line-grid">
            {consultationExamples.map((photo) => (
              <article key={photo.src} className="consultation-line-card">
                <div className="photo-frame consultation-frame">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="photo-image absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="consultation-line-copy">{photo.title}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
