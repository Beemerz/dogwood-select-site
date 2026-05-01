"use client";

import { useState, FormEvent } from 'react';
import Button from '@/components/Button';

export default function BookingForm() {
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
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    <section id="booking" className="py-16 bg-stoneGray/40">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Book a Consultation</h2>
        {success && (
          <p className="mb-4 text-green-700 text-center">Thank you! Your booking request has been submitted.</p>
        )}
        {error && (
          <p className="mb-4 text-red-600 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required className="w-full border border-stoneGray rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" className="w-full border border-stoneGray rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required className="w-full border border-stoneGray rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="address">Service Address</label>
              <input type="text" id="address" name="address" className="w-full border border-stoneGray rounded p-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="projectType">Project Type</label>
            <select id="projectType" name="projectType" className="w-full border border-stoneGray rounded p-2" required>
              <option value="">Select project type</option>
              <option>Exterior renovation</option>
              <option>Lawn care / recurring route</option>
              <option>Curb appeal upgrade</option>
              <option>Mulch / bed refresh</option>
              <option>Patio / outdoor living</option>
              <option>Lighting</option>
              <option>Pressure washing</option>
              <option>Gutter / exterior maintenance</option>
              <option>Property management request</option>
              <option>Commercial property request</option>
              <option>Not sure yet</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="preferredDate">Preferred Date</label>
              <input type="date" id="preferredDate" name="preferredDate" className="w-full border border-stoneGray rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="preferredTime">Preferred Time</label>
              <input type="time" id="preferredTime" name="preferredTime" className="w-full border border-stoneGray rounded p-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" rows={4} className="w-full border border-stoneGray rounded p-2" />
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
