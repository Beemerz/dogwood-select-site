'use client';

import { FormEvent, useState } from 'react';
import DogwoodConfetti from '@/components/site/DogwoodConfetti';
import FieldLabel from '@/components/site/FieldLabel';
import FormSuccessCard from '@/components/site/FormSuccessCard';
import { serviceInterestOptions } from '@/lib/site';

export default function ContactForm() {
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    if (!String(payload.phone || '').trim() && !String(payload.email || '').trim()) {
      setSubmitting(false);
      setError('Add a phone number or email so we can get back to you.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.message || 'Unable to send your message right now.');
      }

      event.currentTarget.reset();
      setSuccess(true);
      setConfettiKey((current) => current + 1);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to send your message right now.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {success ? (
        <>
          <DogwoodConfetti burstKey={confettiKey} />
          <FormSuccessCard
            title="Your message has been received."
            copy="Dogwood Select will reply by phone or email and point you to the fastest next move instead of making you guess."
          />
        </>
      ) : null}

      <form onSubmit={handleSubmit} className="panel-card p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <input id="name" name="name" className="input-shell" required />
          </div>
          <div>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <input id="phone" name="phone" type="tel" className="input-shell" />
          </div>
          <div>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <input id="email" name="email" type="email" className="input-shell" />
          </div>
          <div>
            <FieldLabel htmlFor="city">City or property area</FieldLabel>
            <input id="city" name="city" className="input-shell" />
          </div>
          <div className="md:col-span-2">
            <FieldLabel htmlFor="serviceInterest">Service interest</FieldLabel>
            <select id="serviceInterest" name="serviceInterest" className="input-shell">
              <option value="">Select a service interest</option>
              {serviceInterestOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <textarea id="message" name="message" rows={5} className="input-shell" required />
          </div>
        </div>

        {error ? <p className="mt-5 text-sm text-[color:var(--accent-hot)]">{error}</p> : null}

        <div className="mt-8 flex justify-end">
          <button type="submit" className="button-primary" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
}
