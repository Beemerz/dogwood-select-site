export default function ServiceArea() {
  const areas = [
    'Richmond',
    'Glen Allen',
    'Ashland',
    'Hanover',
    'Henrico',
    'Short Pump',
    'Midlothian',
    'Chesterfield',
    'Central VA surroundings',
  ];
  return (
    <section id="service-area" className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Service Area</h2>
        <p className="mb-4">We proudly serve homes and businesses across Central Virginia.</p>
        <div className="flex flex-wrap justify-center gap-4">
          {areas.map((area, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-stoneGray/40 rounded-full text-sm text-charcoal"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}