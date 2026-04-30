import Image from 'next/image';
import Button from '@/components/Button';
import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Self Consultation', href: '#consultation' },
  { label: 'Book Consultation', href: '#booking' },
  { label: 'Referrals', href: '#referrals' },
  { label: 'Service Area', href: '#service-area' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full bg-ivory/90 backdrop-blur-sm z-50 border-b border-stoneGray">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            {/* Replace with your actual logo */}
            <Image
              src="/dogwood-select-main-logo.png"
              alt="Dogwood Select logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-semibold">Dogwood Select</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-dogwoodGreen">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex gap-4">
          <Button href="#consultation" variant="primary">
            Start Self Consultation
          </Button>
          <Button href="#booking" variant="secondary">
            Book Consultation
          </Button>
        </div>
        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Open menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6h18M3 12h18M3 18h18"
              />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-ivory border-t border-stoneGray">
          <ul className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block py-2 px-4 hover:bg-stoneGray/50 rounded"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Button href="#consultation" variant="primary" className="w-full text-center">
                Self Consultation
              </Button>
            </li>
            <li>
              <Button href="#booking" variant="secondary" className="w-full text-center">
                Book Consultation
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}