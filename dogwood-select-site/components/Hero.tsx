import Button from '@/components/Button';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col justify-center items-center text-center text-ivory overflow-hidden"
    >
      {/* Background placeholder – replace with real video or image later */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full placeholder">
          <span className="text-lg">HERO VIDEO PLACEHOLDER</span>
        </div>
      </div>
      <div className="max-w-2xl px-4 space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-charcoal drop-shadow-lg">
          Exterior Renovation & Property Services in Central Virginia
        </h1>
        <p className="text-lg md:text-xl text-charcoal">
          Dogwood Select helps homeowners, property managers, and commercial clients improve, maintain, and elevate their outdoor spaces.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button href="#consultation" variant="primary">
            Start Self Consultation
          </Button>
          <Button href="#booking" variant="secondary">
            Book Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}