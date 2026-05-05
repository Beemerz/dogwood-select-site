"use client";

import { useState, FormEvent } from 'react';
import Button from '@/components/Button';

export default function ReferralForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);
    const formData = new FormData(e.currentTarget);
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    try {
      const res = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSuccess(true);
      e.currentTarget.reset();
    } catch (err: any) {
      setError(err.message ?? 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="referrals" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Refer a Friend</h2>
        <p className="mb-4 text-center">
          Refer a friend, neighbor, or family member. If they sign up for recurring service and list your name and number as the referral, you receive a $100 gift card after they are onboarded.
        </p>
        {success && (
          <p className="mb-4 text-green-700 text-center">Thank you! Your referral has been submitted.</p>
        )}
        {error && (
          <p className="mb-4 text-red-600 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="referrerName">Your Name</label>
              <input type="text" id="referrerName" name="referrerName" required className="w-full border border-stoneGray rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="referrerContact">Your Phone/Email</label>
              <input type="text" id="referrerContact" name="referrerContact" required className="w-full border border-stoneGray rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="referredName">Friend&apos;s Name</label>
              <input type="text" id="referredName" name="referredName" required className="w-full border border-stoneGray rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="referredContact">Friend&apos;s Phone/Email</label>
              <input type="text" id="referredContact" name="referredContact" required className="w-full border border-stoneGray rounded p-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" rows={3} className="w-full border border-stoneGray rounded p-2" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="interestedRecurring" name="interestedRecurring" className="mr-2" />
            <label htmlFor="interestedRecurring" className="text-sm">
              Check if your friend is interested in recurring service
            </label>
          </div>
          <div className="text-center pt-4">
            <Button type="submit" variant="primary" className="w-full md:w-auto">
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
