/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { serviceExamples } from '@/lib/workPhotos';

export default function HeroPhotoWheel({ eyebrow }: { eyebrow: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  const goToIndex = (index: number) => {
    const length = serviceExamples.length;
    setActiveIndex((index + length) % length);
  };

  const goToPrevious = () => {
    goToIndex(activeIndex - 1);
  };

  const goToNext = () => {
    goToIndex(activeIndex + 1);
  };

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const media = window.matchMedia('(max-width: 980px)');
    const update = () => setAutoRotate(!media.matches);
    update();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    if (!autoRotate) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % serviceExamples.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [activeIndex, autoRotate]);

  const activePhoto = serviceExamples[activeIndex];

  return (
    <div className="hero-wheel-card">
      <div className="photo-frame hero-wheel-frame">
        <img
          key={activePhoto.src}
          src={activePhoto.src}
          alt={activePhoto.alt}
          className="photo-image absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="photo-overlay hero-wheel-overlay">
          <p className="photo-kicker">{activePhoto.eyebrow}</p>
          <h3>{activePhoto.title}</h3>
        </div>
      </div>

      <p className="hero-wheel-copy">{activePhoto.railCaption ?? activePhoto.caption}</p>

      <div className="hero-wheel-controls">
        <button type="button" className="hero-wheel-nav" onClick={goToPrevious} aria-label="Previous photo">
          <span aria-hidden="true">←</span>
        </button>
        {serviceExamples.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => goToIndex(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-pressed={index === activeIndex}
            className={index === activeIndex ? 'hero-wheel-dot hero-wheel-dot-active' : 'hero-wheel-dot'}
          />
        ))}
        <button type="button" className="hero-wheel-nav" onClick={goToNext} aria-label="Next photo">
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <Link href="/book-consultation" className="button-primary hero-wheel-button hero-wheel-button-toned">
        Request This Service
      </Link>
    </div>
  );
}
