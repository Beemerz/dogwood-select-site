/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { siteConfig, storyChapters } from '@/lib/site';
import { homeRailPhotos } from '@/lib/workPhotos';

const VIDEO_PATH = '/video/backyard-oasis-walkthrough.mp4';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();

    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', update);
      return () => query.removeEventListener('change', update);
    }

    if (typeof query.addListener === 'function') {
      query.addListener(update);
      return () => query.removeListener(update);
    }

    return undefined;
  }, []);

  return reduced;
}

export default function HomeStoryExperience({
  midSection,
  children,
}: {
  midSection?: ReactNode;
  children?: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [duration, setDuration] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoMissing, setVideoMissing] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const reducedMotion = useReducedMotion();
  const chapters = useMemo(() => storyChapters, []);
  const visibleChapters = useMemo(() => storyChapters.slice(0, -1), []);
  const openingChapters = visibleChapters.slice(0, 3);
  const managerChapter = visibleChapters[3];
  const activePhoto = homeRailPhotos[activeChapter] ?? homeRailPhotos[0];

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const media = window.matchMedia('(max-width: 980px)');
    const update = () => setIsMobileViewport(media.matches);
    update();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  const goToChapter = (index: number) => {
    const length = chapters.length;
    setActiveChapter((index + length) % length);
  };

  useEffect(() => {
    if (reducedMotion || isMobileViewport) {
      return undefined;
    }

    const update = () => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = Math.max(containerRef.current.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const chapterIndex = Math.min(
        chapters.length - 1,
        Math.round(progress * (chapters.length - 1))
      );

      setActiveChapter(chapterIndex);

      if (videoRef.current && duration > 0 && videoReady && !videoMissing) {
        try {
          if (videoRef.current.readyState >= 1) {
            videoRef.current.currentTime = duration * progress;
          }
        } catch {
          setVideoMissing(true);
        }
      }
    };

    const onScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [chapters, duration, reducedMotion, videoMissing, videoReady, isMobileViewport]);

  const copyPhone = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(siteConfig.phoneDisplay);
      } else {
        const helper = document.createElement('textarea');
        helper.value = siteConfig.phoneDisplay;
        helper.setAttribute('readonly', '');
        helper.style.position = 'absolute';
        helper.style.left = '-9999px';
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        document.body.removeChild(helper);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  const railContent = (
    <div className="story-media-shell">
      {!reducedMotion && !isMobileViewport && !videoMissing ? (
        <video
          ref={videoRef}
          src={VIDEO_PATH}
          muted
          playsInline
          preload="metadata"
          poster="/brand/full-no-typeout-v2.png"
          className="story-video"
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration || 0);
            setVideoReady(true);
          }}
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoMissing(true)}
        />
      ) : null}
      <div className="story-video-overlay" />
      <Link href={activePhoto.href} className="story-photo-card">
        <div className="photo-frame story-photo-frame">
          <img
            src={activePhoto.src}
            alt={activePhoto.alt}
            className="photo-image absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="story-photo-copy">
          <p className="photo-kicker">{activePhoto.eyebrow}</p>
          <h4>{activePhoto.title}</h4>
          <p>{activePhoto.railCaption ?? activePhoto.caption}</p>
        </div>
      </Link>
      <div className="story-annotation">
        <div className="story-utility-stack">
          <div className="story-call-card">
            <p className="story-kicker">Need it faster?</p>
            <h3>Don&apos;t like forms? Call instead.</h3>
            <p>Tap {siteConfig.phoneDisplay} to call now, or copy it for later.</p>
            <div className="story-call-actions">
              <a href={siteConfig.phoneHref} className="story-call-link">
                {siteConfig.phoneDisplay}
              </a>
              <button type="button" className="story-copy-chip" onClick={copyPhone}>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <Link href="/book-consultation" className="button-primary story-inline-cta story-inline-cta-accent">
            Request This Service
          </Link>
        </div>
        <div className="story-progress">
          <button
            type="button"
            className="story-progress-nav"
            onClick={() => goToChapter(activeChapter - 1)}
            aria-label="Previous photo"
          >
            <span aria-hidden="true">←</span>
          </button>
          {chapters.map((chapter, index) => (
            <button
              key={chapter.eyebrow}
              type="button"
              onClick={() => goToChapter(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-pressed={index === activeChapter}
              className={index === activeChapter ? 'story-dot story-dot-active' : 'story-dot'}
            />
          ))}
          <button
            type="button"
            className="story-progress-nav"
            onClick={() => goToChapter(activeChapter + 1)}
            aria-label="Next photo"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="site-frame home-story-grid">
      <div className="space-y-20 pb-16">
        {openingChapters.map((chapter, index) => (
          <section key={chapter.title} className="story-section" id={index === 1 ? 'services-preview' : undefined}>
            <p className="eyebrow">{chapter.eyebrow}</p>
            <h2 className="story-headline">{chapter.title}</h2>
            <p className="story-body">{chapter.body}</p>
            {index === 0 ? (
              <>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={chapter.ctaHref} className="button-primary">
                    {chapter.ctaLabel}
                  </Link>
                  <a href={siteConfig.phoneHref} className="button-secondary">
                    Call {siteConfig.phoneDisplay}
                  </a>
                </div>
                <p className="mt-4 text-sm text-ink-muted">
                  New customer offer: $100 off your first qualifying service.
                </p>
              </>
            ) : (
              <Link href={chapter.ctaHref} className="button-secondary">
                {chapter.ctaLabel}
              </Link>
            )}
          </section>
        ))}
        {isMobileViewport ? <aside className="story-rail-mobile">{railContent}</aside> : null}
        {midSection ? <div className="pb-4">{midSection}</div> : null}
        {managerChapter ? (
          <section className="story-section" id="owners-and-managers">
            <p className="eyebrow">{managerChapter.eyebrow}</p>
            <h2 className="story-headline">{managerChapter.title}</h2>
            <p className="story-body">{managerChapter.body}</p>
            <Link href={managerChapter.ctaHref} className="button-secondary">
              {managerChapter.ctaLabel}
            </Link>
          </section>
        ) : null}
        {children ? <div className="space-y-16 pb-16">{children}</div> : null}
      </div>

      {!isMobileViewport ? <aside className="story-rail">{railContent}</aside> : null}
    </div>
  );
}
