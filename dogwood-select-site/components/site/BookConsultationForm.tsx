'use client';

import { FormEvent, useMemo, useState } from 'react';
import DogwoodConfetti from '@/components/site/DogwoodConfetti';
import FieldLabel from '@/components/site/FieldLabel';
import FormSuccessCard from '@/components/site/FormSuccessCard';
import { serviceInterestOptions } from '@/lib/site';

export default function BookConsultationForm() {
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const selectableServices = useMemo(
    () => serviceInterestOptions.filter((option) => option !== 'Not sure yet'),
    []
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const serviceTypes = formData.getAll('serviceTypes').map(String).filter(Boolean);
    const payload = {
      name: String(formData.get('name') || ''),
      phone: String(formData.get('phone') || ''),
      email: String(formData.get('email') || ''),
      address: String(formData.get('address') || ''),
      serviceTypes,
      preferredDate: String(formData.get('preferredDate') || ''),
      preferredTime: String(formData.get('preferredTime') || ''),
      preferredTimeline: String(formData.get('preferredTimeline') || ''),
      notes: String(formData.get('notes') || ''),
    };

    if (serviceTypes.length === 0) {
      setSubmitting(false);
      setError('Select at least one service need before submitting.');
      return;
    }
    if (!payload.preferredDate || !payload.preferredTime) {
      setSubmitting(false);
      setError('Preferred date and preferred time are both required.');
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.message || 'Unable to reserve a consultation right now.');
      }

      event.currentTarget.reset();
      setSuccess(true);
      setConfettiKey((current) => current + 1);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to reserve a consultation right now.'
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
            title="Your consultation request has been reserved."
            copy="Dogwood Select will review the property needs you selected, your notes, and your preferred timing before following up to confirm the next step."
          />
        </>
      ) : null}

      <form onSubmit={handleSubmit} className="panel-card p-6 md:p-8">
        <div className="mb-7 rounded-[1.4rem] border border-[#8e7b58]/14 bg-white/6 p-5">
          <p className="eyebrow">Consultation Intake</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ivory/80">
            Share what the property needs, select everything you want handled, then leave the
            timing and contact details that make follow-up easy.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <input id="name" name="name" className="input-shell" required />
          </div>
          <div>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <input id="phone" name="phone" type="tel" className="input-shell" required />
          </div>
          <div>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <input id="email" name="email" type="email" className="input-shell" required />
          </div>
          <div>
            <FieldLabel htmlFor="address">Property address or city</FieldLabel>
            <input id="address" name="address" className="input-shell" required />
          </div>
          <div className="md:col-span-2">
            <FieldLabel htmlFor="service-types">What does the property need?</FieldLabel>
            <div
              id="service-types"
              className="grid gap-3 rounded-[1.4rem] border border-[#8e7b58]/14 bg-white/4 p-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {selectableServices.map((option) => (
                <label
                  key={option}
                  className="flex items-start gap-3 rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-ivory/86 transition hover:border-[#c6a463]/30 hover:bg-white/8"
                >
                  <input
                    type="checkbox"
                    name="serviceTypes"
                    value={option}
                    className="mt-1 h-4 w-4 accent-[#c6a463]"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <FieldLabel htmlFor="preferredDate">Preferred date</FieldLabel>
            <input id="preferredDate" name="preferredDate" type="date" className="input-shell" required />
          </div>
          <div>
            <FieldLabel htmlFor="preferredTime">Preferred time</FieldLabel>
            <input id="preferredTime" name="preferredTime" type="time" className="input-shell" required />
          </div>
          <div className="md:col-span-2">
            <FieldLabel htmlFor="preferredTimeline" optional>
              Preferred timeline
            </FieldLabel>
            <input
              id="preferredTimeline"
              name="preferredTimeline"
              className="input-shell"
              placeholder="As soon as possible, this month, later this season"
            />
          </div>
          <div className="md:col-span-2">
            <FieldLabel htmlFor="notes">Project notes</FieldLabel>
            <textarea
              id="notes"
              name="notes"
              rows={5}
              className="input-shell"
              placeholder="Describe the property, any problem areas, and what kind of outcome you want."
            />
          </div>
        </div>

        {error ? <p className="mt-5 text-sm text-[#ffb7a4]">{error}</p> : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ivory/58">
            Save $100 on your first qualifying service. Terms and conditions apply.
          </p>
          <button type="submit" className="button-primary" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
}
