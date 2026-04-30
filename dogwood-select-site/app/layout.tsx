import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dogwood Select | Exterior Renovation & Property Services',
  description:
    'Premium exterior renovation, property maintenance, and outdoor living solutions for Central Virginia. Start your self consultation or book a consultation today.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-ivory text-charcoal antialiased`}>{children}</body>
    </html>
  );
}