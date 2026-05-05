'use client';

import { ChangeEvent, FormEvent, TouchEvent, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import DogwoodConfetti from '@/components/site/DogwoodConfetti';
import FieldLabel from '@/components/site/FieldLabel';
import FormSuccessCard from '@/components/site/FormSuccessCard';
import { serviceInterestOptions } from '@/lib/site';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  address: '',
  projectDescription: '',
  preferredTimeline: '',
};

const milestones = ['What needs help', 'Context and photos', 'Contact and timing'];

export default function SelfConsultationForm({
  initialSelectedService,
}: {
  initialSelectedService?: string;
}) {
  const [step, setStep] = useState(0);
  const [servicePage, setServicePage] = useState(0);
  const [compactBarrel, setCompactBarrel] = useState(false);
  const [formValues, setFormValues] = useState(initialForm);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const serviceOptions = useMemo(
    () => serviceInterestOptions.filter((option) => option !== 'Not sure yet'),
    []
  );
  const servicesPerPage = compactBarrel ? 4 : 6;
  const servicePages = useMemo(() => {
    const pages = [];
    for (let index = 0; index < serviceOptions.length; index += servicesPerPage) {
      pages.push(serviceOptions.slice(index, index + servicesPerPage));
    }
    return pages;
  }, [serviceOptions, servicesPerPage]);
  const isRootedMember = selectedServices.length >= 3;

  useEffect(() => {
    if (initialSelectedService && serviceOptions.includes(initialSelectedService)) {
      setSelectedServices((current) =>
        current.includes(initialSelectedService) ? current : [...current, initialSelectedService]
      );
      const initialIndex = serviceOptions.indexOf(initialSelectedService);
      if (initialIndex >= 0) {
        setServicePage(Math.floor(initialIndex / servicesPerPage));
      }
    }
  }, [initialSelectedService, serviceOptions, servicesPerPage]);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const media = window.matchMedia('(max-width: 760px)');
    const update = () => setCompactBarrel(media.matches);
    update();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    setServicePage((current) => Math.min(current, Math.max(servicePages.length - 1, 0)));
  }, [servicePages.length]);

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(event.currentTarget.files ?? []));
  };

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service]
    );
  };

  const changeServicePage = (direction: 'left' | 'right') => {
    setServicePage((current) => {
      if (direction === 'left') {
        return Math.max(current - 1, 0);
      }
      return Math.min(current + 1, servicePages.length - 1);
    });
  };

  const nextStep = () => {
    if (step === 0 && selectedServices.length === 0) {
      setError('Pick at least one service so we know what kind of help you need.');
      return;
    }

    if (step === 1 && selectedServices.length === 0) {
      setError('Keep at least one selected service so we know what kind of project this is.');
      return;
    }

    if (step === 1 && !formValues.projectDescription.trim()) {
      setError('Tell us what is going on before you continue.');
      return;
    }

    setError('');
    setStep((current) => Math.min(current + 1, 2));
  };

  const previousStep = () => {
    setError('');
    setStep((current) => Math.max(current - 1, 0));
  };

  const jumpToStep = (targetStep: number) => {
    if (targetStep <= step) {
      setError('');
      setStep(targetStep);
      return;
    }

    if (targetStep >= 1 && selectedServices.length === 0) {
      setError('Pick at least one service so we know what kind of help you need.');
      return;
    }

    if (targetStep >= 2 && !formValues.projectDescription.trim()) {
      setError('Tell us what is going on before you continue.');
      return;
    }

    setError('');
    setStep(targetStep);
  };

  const onBarrelTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onBarrelTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 28) {
      return;
    }

    if (delta < 0) {
      changeServicePage('right');
      return;
    }

    changeServicePage('left');
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    if (selectedServices.length === 0) {
      setSubmitting(false);
      setError('Select at least one service before you submit.');
      return;
    }

    if (!formValues.name || !formValues.phone || !formValues.email || !formValues.address) {
      setSubmitting(false);
      setError('We still need your name, phone, email, and property address.');
      return;
    }
    if (!formValues.projectDescription.trim()) {
      setSubmitting(false);
      setError('Tell us what is going on before you submit.');
      return;
    }

    const payload = {
      ...formValues,
      serviceTypes: selectedServices,
      photoNames: files.map((file) => file.name),
    };

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.message || 'We could not send that just yet. Give it one more try.');
      }

      setSuccess(true);
      setConfettiKey((current) => current + 1);
      setFormValues(initialForm);
      setFiles([]);
      setSelectedServices([]);
      setServicePage(0);
      setStep(0);
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

  return (
    <div className={isRootedMember ? 'space-y-6 consultation-shell consultation-shell-rooted' : 'space-y-6 consultation-shell'}>
      {success ? (
        <>
          <DogwoodConfetti burstKey={confettiKey} />
          <FormSuccessCard
            title="You are locked in."
            copy="You will receive a confirmation email right away, and we will call within one hour during business hours to talk through scope, timing, and anything your photos do not already tell us."
          />
        </>
      ) : null}

      <form onSubmit={handleSubmit} className="panel-card consultation-form-card p-6 md:p-8">
        <div className="consult-form-top">
          <div className="flex flex-wrap items-center gap-3">
            {milestones.map((milestone, index) => {
              const done = index < step;
              const active = index === step;

              return (
                <button
                  key={milestone}
                  type="button"
                  onClick={() => jumpToStep(index)}
                  className={`consult-chip ${done ? 'consult-chip-done' : ''} ${active ? 'consult-chip-active' : ''}`}
                  aria-pressed={active}
                >
                  <span className="consult-chip-index">0{index + 1}</span>
                  <span>{milestone}</span>
                </button>
              );
            })}
          </div>
        </div>

        {step === 0 ? (
          <div className="space-y-5">
            <div>
              <FieldLabel htmlFor="service-types">
                Which of these projects or services would your outdoor environment benefit from?
              </FieldLabel>
              <div id="service-types" className="service-barrel">
                <div className="service-barrel-top">
                  <button
                    type="button"
                    className="selector-wheel-nav"
                    onClick={() => changeServicePage('left')}
                    aria-label="Previous project type page"
                    disabled={servicePage === 0}
                  >
                    <span aria-hidden="true">←</span>
                  </button>

                  <div
                    className="service-barrel-viewport"
                    role="group"
                    aria-label="Project type selector"
                    onTouchStart={onBarrelTouchStart}
                    onTouchEnd={onBarrelTouchEnd}
                  >
                    <div
                      className="service-barrel-track"
                      style={{ transform: `translateX(-${servicePage * 100}%)` }}
                    >
                      {servicePages.map((page, pageIndex) => (
                        <div key={`page-${pageIndex}`} className="service-barrel-page">
                          {page.map((option) => {
                            const active = selectedServices.includes(option);

                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => toggleService(option)}
                                aria-pressed={active}
                                className={
                                  active
                                    ? 'service-pill service-pill-active service-barrel-chip'
                                    : 'service-pill service-barrel-chip'
                                }
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="selector-wheel-nav"
                    onClick={() => changeServicePage('right')}
                    aria-label="Next project type page"
                    disabled={servicePage === servicePages.length - 1}
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </div>

                <div className="service-barrel-dots" aria-label="Project type pages">
                  {servicePages.map((_, index) => (
                    <button
                      key={`dot-${index}`}
                      type="button"
                      onClick={() => setServicePage(index)}
                      aria-label={`Show project type page ${index + 1}`}
                      aria-pressed={index === servicePage}
                      className={
                        index === servicePage
                          ? 'service-barrel-dot service-barrel-dot-active'
                          : 'service-barrel-dot'
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {isRootedMember ? (
              <div className="rooted-card">
                <p className="eyebrow">Rooted Members</p>
                <h3>This service mix would make you a rooted member.</h3>
                <p className="rooted-callout">
                  When selecting <strong>3 or more services</strong>, you become a Rooted Member
                  for free. <strong>$600 dollar value.</strong>
                </p>
                <ul className="rooted-benefits">
                  <li>
                    <strong>10% discount on all multi service packages.</strong>
                    <span> Save more when the work is bundled under one plan.</span>
                  </li>
                  <li>
                    <strong>Priority scheduling.</strong>
                    <span> Route openings and timing-sensitive work move faster for members.</span>
                  </li>
                  <li>
                    <strong>Cleaner planning.</strong>
                    <span> Fewer repeat conversations and a smoother path across multiple scopes.</span>
                  </li>
                  <li>
                    <strong>More continuity.</strong>
                    <span> The property stays sharper because the same team handles more of it.</span>
                  </li>
                </ul>
                <p className="rooted-note">
                  Rooted Memberships are otherwise available for <strong>$99/month</strong> when
                  you only need one or two services. Book <strong>3 or more services</strong> and
                  that member fee is waived for the first <strong>6 months</strong> of recurring
                  service.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/rooted-members" className="button-secondary">
                    Become A Rooted Member
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-5">
            <div className="selected-services-shell">
              <p className="text-sm font-medium text-ink-soft">Selected services</p>
              <div className="selected-services-list">
                {selectedServices.map((service) => (
                  <span key={service} className="selected-service-chip">
                    <span>{service}</span>
                    <button
                      type="button"
                      onClick={() => toggleService(service)}
                      className="selected-service-chip-remove"
                      aria-label={`Remove ${service}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {selectedServices.length === 0 ? (
                <p className="mt-3 text-sm text-[color:var(--accent-hot)]">
                  Keep at least one service selected so the submission can be saved correctly.
                </p>
              ) : null}
            </div>
            <div>
              <FieldLabel htmlFor="projectDescription">Tell us what&apos;s going on</FieldLabel>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formValues.projectDescription}
                onChange={updateField}
                rows={6}
                className="input-shell"
                placeholder="What is bugging you, what changed, what needs attention first, and what would feel like a win?"
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="images" optional>
                Optional photo upload
              </FieldLabel>
              <input
                id="images"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={onFileChange}
                className="input-shell file:mr-4 file:rounded-[12px] file:border-0 file:bg-[color:var(--accent-warm)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[color:var(--ink-strong)]"
              />
              <p className="mt-2 text-sm text-ink-muted">
                {files.length > 0
                  ? `${files.length} photo${files.length > 1 ? 's are' : ' is'} ready to send.`
                  : 'Photos help. Not required, but very useful.'}
              </p>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <input
                id="name"
                name="name"
                value={formValues.name}
                onChange={updateField}
                className="input-shell"
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formValues.phone}
                onChange={updateField}
                className="input-shell"
                required
              />
            </div>
            <div className="md:col-span-2">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={updateField}
                className="input-shell"
                required
              />
            </div>
            <div className="md:col-span-2">
              <FieldLabel htmlFor="address">Property address</FieldLabel>
              <input
                id="address"
                name="address"
                value={formValues.address}
                onChange={updateField}
                className="input-shell"
                placeholder="Street address, neighborhood, or property location"
                required
              />
            </div>
            <div className="md:col-span-2">
              <FieldLabel htmlFor="preferredTimeline" optional>
                Preferred timing
              </FieldLabel>
              <input
                id="preferredTimeline"
                name="preferredTimeline"
                value={formValues.preferredTimeline}
                onChange={updateField}
                className="input-shell"
                placeholder="ASAP, this month, after closing, before listing, later this season"
              />
            </div>
          </div>
        ) : null}

        {error ? <p className="mt-5 text-sm text-[color:var(--accent-hot)]">{error}</p> : null}

        <div className="consult-form-actions mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={previousStep} className="button-ghost consult-form-back" disabled={step === 0}>
            Back
          </button>

          {step < 2 ? (
            <button type="button" onClick={nextStep} className="button-secondary consult-form-forward">
              Keep Going
            </button>
          ) : (
            <button type="submit" className="button-primary consult-form-forward" disabled={submitting}>
              {submitting ? 'Sending...' : 'Save Time, Book Now'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
