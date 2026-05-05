'use client';

import type { CSSProperties } from 'react';
import { useEffect, useMemo } from 'react';

type Props = {
  burstKey: number;
};

export default function DogwoodConfetti({ burstKey }: Props) {
  const petals = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        id: `${burstKey}-${index}`,
        left: `${Math.random() * 100}%`,
        duration: 3200 + Math.random() * 1800,
        delay: Math.random() * 240,
        driftStart: `${-20 + Math.random() * 140}vw`,
        driftEnd: `${-10 + Math.random() * 120}vw`,
        rotate: `${140 + Math.random() * 280}deg`,
        scale: `${0.7 + Math.random() * 0.7}`,
      })),
    [burstKey]
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => undefined, 4500);
    return () => window.clearTimeout(timeout);
  }, [burstKey]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={
            {
              left: petal.left,
              animationDuration: `${petal.duration}ms`,
              animationDelay: `${petal.delay}ms`,
              '--petal-x-start': petal.driftStart,
              '--petal-x-end': petal.driftEnd,
              '--petal-rotate': petal.rotate,
              '--petal-scale': petal.scale,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
