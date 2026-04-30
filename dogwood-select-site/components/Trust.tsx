export default function Trust() {
  const points = [
    '50+ years of collective experience',
    'Locally owned and operated',
    'Central Virginia focused',
    'Expanding service routes',
    'Full exterior renovation capability',
    'Recurring service consistency',
    'Residential and commercial capable',
    'No job too small',
    'Larger complex work welcomed',
    'Timely, consistent service that impresses',
  ];
  return (
    <section id="trust" className="py-16 bg-ivory">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Dogwood Select</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {points.map((point, idx) => (
            <li
              key={idx}
              className="p-4 bg-white border border-stoneGray rounded-lg shadow-sm flex items-start gap-2"
            >
              <span className="text-dogwoodGreen">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}