"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import Button from '@/components/Button';

interface ConsultationFormProps {}

export default function ConsultationForm({}: ConsultationFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);
    const form = e.currentTarget;
    const formData = new FormData(form);
    files.forEach((file) => formData.append('images', file));
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSuccess(true);
      form.reset();
      setFiles([]);
    } catch (err: any) {
      setError(err.message ?? 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(e.target.files ?? []);
    setFiles(newFiles);
  }

  return (
    <section id="consultation" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Start Self Consultation</h2>
        {success && (
          <p className="mb-4 text-green-700 text-center">Thank you! Your information has been submitted.</p>
        )}
        {error && (
          <p className="mb-4 text-red-600 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full border border-stoneGray rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full border border-stoneGray rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border border-stoneGray rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="address">
                Service Address or Area
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full border border-stoneGray rounded p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="serviceType">
              Service Type
            </label>
            <select
              id="serviceType"
              name="serviceType"
              required
              className="w-full border border-stoneGray rounded p-2"
            >
              <option value="">Select a service type</option>
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
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="projectDescription">
              Project Description
            </label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              className="w-full border border-stoneGray rounded p-2"
              rows={4}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="preferredTimeline">
                Preferred Timeline
              </label>
              <input
                type="text"
                id="preferredTimeline"
                name="preferredTimeline"
                placeholder="e.g. Within 1 month"
                className="w-full border border-stoneGray rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="budgetRange">
                Budget Range
              </label>
              <input
                type="text"
                id="budgetRange"
                name="budgetRange"
                placeholder="e.g. $5,000 - $10,000"
                className="w-full border border-stoneGray rounded p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="priority">
              Priority Snapshot
            </label>
            <select id="priority" name="priority" className="w-full border border-stoneGray rounded p-2">
              <option value="">What matters most?</option>
              <option>Fastest possible scheduling</option>
              <option>Best long-term result</option>
              <option>Budget-conscious repair</option>
              <option>Curb appeal upgrade</option>
              <option>Recurring service route</option>
              <option>Property manager / commercial request</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="images">
              Upload Photos
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full"
            />
            {files.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {files.length} file{files.length > 1 ? 's' : ''} selected
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="referralName">
              Referral Name (optional)
            </label>
            <input
              type="text"
              id="referralName"
              name="referralName"
              className="w-full border border-stoneGray rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="referralContact">
              Referral Contact (optional)
            </label>
            <input
              type="text"
              id="referralContact"
              name="referralContact"
              className="w-full border border-stoneGray rounded p-2"
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="consent" name="consent" required className="mr-2" />
            <label htmlFor="consent" className="text-sm">
              I consent to be contacted about my project
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
