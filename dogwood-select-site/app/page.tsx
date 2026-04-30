import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CouponBanner from '@/components/CouponBanner';
import Services from '@/components/Services';
import BeforeAfter from '@/components/BeforeAfter';
import ConsultationForm from '@/components/ConsultationForm';
import BookingForm from '@/components/BookingForm';
import ReferralForm from '@/components/ReferralForm';
import Trust from '@/components/Trust';
import ServiceArea from '@/components/ServiceArea';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <CouponBanner />
        <Services />
        <BeforeAfter />
        <ConsultationForm />
        <BookingForm />
        <ReferralForm />
        <Trust />
        <ServiceArea />
      </main>
      <Footer />
    </>
  );
}