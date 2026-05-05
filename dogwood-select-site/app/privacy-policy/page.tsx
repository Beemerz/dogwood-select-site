import type { Metadata } from 'next';
import PageHero from '@/components/site/PageHero';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Privacy Policy',
  description:
    'Read the Dogwood Select privacy policy covering information collected through forms, photo uploads, scheduling details, analytics, and contact follow-up.',
  path: '/privacy-policy',
});

const privacyPoints = [
  'Dogwood Select collects information submitted through website forms, including names, phone numbers, email addresses, city or property area details, service interest, project descriptions, scheduling information, and any other details you choose to share.',
  'If you upload photos through the self consultation experience, those images may be stored and reviewed so Dogwood Select can evaluate your project and follow up with recommendations.',
  'Dogwood Select may contact you by phone or email to respond to an inquiry, follow up on a consultation request, discuss scheduling, or continue a project conversation.',
  'Basic website analytics may be used to understand site usage and improve the website experience.',
  'Dogwood Select does not sell personal information submitted through this website.',
  'If you have questions about privacy or want to reach Dogwood Select regarding your information, email support@dogwoodselect.com.',
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="A straightforward explanation of how Dogwood Select handles website information."
        description="This page summarizes the information collected through the website and how it is used for project follow-up and communication."
      />

      <section className="section-shell pt-0">
        <div className="site-frame max-w-4xl space-y-4">
          {privacyPoints.map((point) => (
            <div key={point} className="panel-card p-7 text-sm leading-7 text-ink-soft">
              {point}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
