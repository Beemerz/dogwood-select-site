/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import type { WorkPhoto } from '@/lib/workPhotos';

export default function ServiceCategoryWheel({
  photos,
  label,
}: {
  photos: readonly WorkPhoto[];
  label: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activePhoto = photos[activeIndex] ?? photos[0];

  const goToIndex = (index: number) => {
    const length = photos.length;
    setActiveIndex((index + length) % length);
  };

  return (
    <div className="services-wheel">
      <div className="photo-frame services-feature-frame services-wheel-frame">
        <img
          key={activePhoto.src}
          src={activePhoto.src}
          alt={activePhoto.alt}
          className="photo-image services-wheel-image absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="photo-overlay services-wheel-overlay">
          <p className="photo-kicker">{activePhoto.eyebrow}</p>
          <h3>{activePhoto.title}</h3>
        </div>
      </div>

      <p className="photo-copy mt-4">{activePhoto.caption}</p>

      <div className="services-wheel-controls" aria-label={`${label} photo wheel controls`}>
        <button
          type="button"
          className="services-wheel-nav"
          onClick={() => goToIndex(activeIndex - 1)}
          aria-label={`Previous ${label} photo`}
        >
          <span aria-hidden="true">←</span>
        </button>
        <div className="services-wheel-dots">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => goToIndex(index)}
              aria-label={`Show ${label} slide ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={
                index === activeIndex ? 'services-wheel-dot services-wheel-dot-active' : 'services-wheel-dot'
              }
            />
          ))}
        </div>
        <button
          type="button"
          className="services-wheel-nav"
          onClick={() => goToIndex(activeIndex + 1)}
          aria-label={`Next ${label} photo`}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
