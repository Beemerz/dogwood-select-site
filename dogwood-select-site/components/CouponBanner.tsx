import Button from '@/components/Button';

export default function CouponBanner() {
  return (
    <section className="bg-dogwoodGreen text-ivory py-4 px-4 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xl font-semibold">
          <span className="text-mutedGold text-2xl">$100</span> off your first service
        </p>
        <Button href="#consultation" variant="secondary" className="text-lg">
          Claim Offer
        </Button>
      </div>
    </section>
  );
}