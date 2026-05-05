import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Self Consultation',
  description:
    'Start a self consultation with Dogwood Select for exterior maintenance, outdoor renovation, lawn care, pressure washing, gutter cleaning, patios, and backyard oasis projects in Richmond and Central Virginia.',
  path: '/self-consultation',
});

export default function SelfConsultationPage() {
  redirect('/book-consultation');
}
