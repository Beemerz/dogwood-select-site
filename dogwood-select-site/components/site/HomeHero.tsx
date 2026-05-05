'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const VIDEO_PATH = '/video/backyard-oasis-walkthrough.mp4';

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [duration, setDuration] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoMissing, setVideoMissing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !videoRef.current || !duration) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = Math.max(sectionRef.current.offsetHeight - window.innerHeight, 1);
      const progressed = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      videoRef.current.currentTime = duration * progressed;
    };

    const schedule = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration]);

  return (
    <section ref={sectionRef} className="relative h-[190vh]">
      <div className="sticky top-[144px] h-[calc(100vh-144px)] overflow-hidden">
        <div className="absolute inset-0">
          {!videoMissing ? (
            <video
              ref={videoRef}
              className={`h-full w-full object-cover transition duration-700 ${
                videoReady ? 'opacity-100' : 'opacity-0'
              }`}
              src={VIDEO_PATH}
              playsInline
              muted
              preload="metadata"
              aria-hidden="true"
              onLoadedMetadata={(event) => {
                setDuration(event.currentTarget.duration || 0);
                setVideoReady(true);
              }}
              onError={() => {
                setVideoMissing(true);
                setVideoReady(false);
              }}
            />
          ) : null}

          <div
            className={`absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,_rgba(245,230,184,0.28),_transparent_25%),radial-gradient(circle_at_80%_12%,_rgba(196,210,170,0.22),_transparent_28%),linear-gradient(180deg,_rgba(71,88,60,0.18),_rgba(66,78,58,0.46)),linear-gradient(130deg,_#708161,_#4e5e45)] transition duration-700 ${
              videoReady && !videoMissing ? 'opacity-35' : 'opacity-100'
            }`}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(54,65,45,0.78),_rgba(89,102,75,0.3),_rgba(58,69,48,0.66))]" />
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-14 pt-10 md:px-8 md:pb-18">
          <div className="max-w-3xl">
            <p className="eyebrow">Richmond / Central Virginia</p>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] text-ivory md:text-7xl">
              Transform Your Exterior Into a Property Asset
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/76 md:text-xl">
              Premium exterior maintenance, curb appeal upgrades, and outdoor renovation services
              for Richmond and Central Virginia properties.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/book-consultation" className="button-primary">
                Book Consultation
              </Link>
              <Link href="/book-consultation" className="button-secondary">
                Claim $100 Off
              </Link>
            </div>
            <p className="mt-8 text-sm text-ivory/58">
              Scroll to move through the backyard-to-oasis story. If the video is unavailable, the
              layout falls back to a polished visual treatment automatically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
