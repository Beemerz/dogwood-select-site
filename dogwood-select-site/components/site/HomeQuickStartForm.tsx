'use client';

import { FormEvent, useMemo, useRef, useState } from 'react';
import FormSuccessCard from '@/components/site/FormSuccessCard';
import { serviceInterestOptions } from '@/lib/site';

const initialValues = {
  name: '',
  phone: '',
  preferredDate: '',
};

export default function HomeQuickStartForm() {
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const [values, setValues] = useState(initialValues);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const options = useMemo(
    () => serviceInterestOptions.filter((option) => option !== 'Not sure yet'),
    []
  );

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service]
    );
  };

  const updateField = (name: keyof typeof initialValues, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const scrollWheel = (direction: 'left' | 'right') => {
    if (!wheelRef.current) {
      return;
    }

    const offset = Math.min(wheelRef.current.clientWidth * 0.78, 320);
    wheelRef.current.scrollBy({
      left: direction === 'right' ? offset : -offset,
      behavior: 'smooth',
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!values.name.trim() || !values.phone.trim() || !values.preferredDate.trim()) {
      setError('Name, phone, and preferred start date are required.');
      return;
    }

    if (selectedServices.length === 0) {
      setError('Pick at least one service so we know where to start.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/quick-start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          preferredDate: values.preferredDate,
          serviceTypes: selectedServices,
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.message || 'We could not send that just yet. Give it one more try.');
      }

      setSuccess(true);
      setValues(initialValues);
      setSelectedServices([]);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'We could not send that just yet. Give it one more try.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <FormSuccessCard
        title="You are on the board."
        copy="We received your first-date request and service picks. Expect a follow-up within one hour during business hours."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="home-quick-form panel-card p-6">
      <p className="eyebrow">Contact Now</p>
      <h3 className="mt-3 font-display text-[1.9rem] leading-tight text-ink-strong">
        Lock in the first day and let us take it from there.
      </h3>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="quick-name" className="mb-2 block text-sm font-medium text-ink-soft">
            Name
          </label>
          <input
            id="quick-name"
            value={values.name}
            onChange={(event) => updateField('name', event.currentTarget.value)}
            className="input-shell"
            required
          />
        </div>
        <div>
          <label htmlFor="quick-phone" className="mb-2 block text-sm font-medium text-ink-soft">
            Phone
          </label>
          <input
            id="quick-phone"
            type="tel"
            value={values.phone}
            onChange={(event) => updateField('phone', event.currentTarget.value)}
            className="input-shell"
            required
          />
        </div>
        <div>
          <label htmlFor="quick-date" className="mb-2 block text-sm font-medium text-ink-soft">
            First day to start
          </label>
          <input
            id="quick-date"
            type="date"
            value={values.preferredDate}
            onChange={(event) => updateField('preferredDate', event.currentTarget.value)}
            className="input-shell"
            required
          />
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-sm font-medium text-ink-soft">Services</p>
        <div className="selector-wheel-shell">
          <button
            type="button"
            className="selector-wheel-nav"
            onClick={() => scrollWheel('left')}
            aria-label="Scroll services left"
          >
            <span aria-hidden="true">←</span>
          </button>
          <div ref={wheelRef} className="selector-wheel-track" role="group" aria-label="Service selector">
            {options.map((option) => {
              const active = selectedServices.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleService(option)}
                  aria-pressed={active}
                  className={active ? 'service-pill service-pill-active selector-wheel-chip' : 'service-pill selector-wheel-chip'}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="selector-wheel-nav"
            onClick={() => scrollWheel('right')}
            aria-label="Scroll services right"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-[color:var(--accent-hot)]">{error}</p> : null}

      <div className="mt-5">
        <button type="submit" className="button-primary w-full md:w-auto" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}
