'use client';

import { FormEvent, useState } from 'react';
import DogwoodConfetti from '@/components/site/DogwoodConfetti';
import FieldLabel from '@/components/site/FieldLabel';
import FormSuccessCard from '@/components/site/FormSuccessCard';
import { serviceInterestOptions } from '@/lib/site';

export default function ReferFriendForm() {
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

    if (!('consent' in payload)) {
      setSubmitting(false);
      setError('Consent is required before sending a referral.');
      return;
    }

    try {
      const response = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Unable to send the referral right now.');
      }

      event.currentTarget.reset();
      setSuccess(true);
      setConfettiKey((current) => current + 1);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to send the referral right now.'
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
            title="Your referral has been passed along."
            copy="Thank you for sending a friend to Dogwood Select. Referral savings apply after the referred friend books a qualifying service."
          />
        </>
      ) : null}

      <form onSubmit={handleSubmit} className="panel-card p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="referrerName">Your name</FieldLabel>
            <input id="referrerName" name="referrerName" className="input-shell" required />
          </div>
          <div>
            <FieldLabel htmlFor="referrerContact">Your phone or email</FieldLabel>
            <input id="referrerContact" name="referrerContact" className="input-shell" required />
          </div>
          <div>
            <FieldLabel htmlFor="referredName">Friend name</FieldLabel>
            <input id="referredName" name="referredName" className="input-shell" required />
          </div>
          <div>
            <FieldLabel htmlFor="referredContact">Friend phone or email</FieldLabel>
            <input id="referredContact" name="referredContact" className="input-shell" required />
          </div>
          <div className="md:col-span-2">
            <FieldLabel htmlFor="friendServiceInterest">Friend service interest</FieldLabel>
            <select id="friendServiceInterest" name="notes" className="input-shell" required>
              <option value="">Choose a likely service</option>
              {serviceInterestOptions.map((option) => (
                <option key={option} value={`Friend service interest: ${option}`}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="mt-6 flex items-start gap-3 rounded-[1.2rem] border border-[color:var(--line)] bg-white/40 p-4 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="consent"
            value="true"
            className="mt-1 h-4 w-4 accent-[#c6a463]"
            required
          />
          <span>
            I confirm that my friend would welcome contact from Dogwood Select about the service
            interest listed above.
          </span>
        </label>

        {error ? <p className="mt-5 text-sm text-[color:var(--accent-hot)]">{error}</p> : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-muted">
            Save $100 for each referred friend who books a qualifying service.
          </p>
          <button type="submit" className="button-primary" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Refer a Friend'}
          </button>
        </div>
      </form>
    </div>
  );
}
