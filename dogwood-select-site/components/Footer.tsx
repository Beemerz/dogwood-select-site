import Image from 'next/image';
import Button from '@/components/Button';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Image
            src="/dogwood-select-main-logo.png"
            alt="Dogwood Select logo"
            width={60}
            height={60}
            className="mb-4"
          />
          <p className="text-sm">Premium exterior renovation and property services in Central Virginia.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p>Phone: (000) 000-0000</p>
          <p>Email: info@dogwoodselect.com</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="#services" className="hover:text-mutedGold">Services</a></li>
            <li><a href="#consultation" className="hover:text-mutedGold">Self Consultation</a></li>
            <li><a href="#booking" className="hover:text-mutedGold">Book Consultation</a></li>
            <li><a href="#referrals" className="hover:text-mutedGold">Referrals</a></li>
            <li><a href="#service-area" className="hover:text-mutedGold">Service Area</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs">&copy; {new Date().getFullYear()} Dogwood Select LLC. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-xs hover:text-mutedGold">Privacy Policy</a>
          <a href="#" className="text-xs hover:text-mutedGold">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}