import type { ReactNode } from 'react';

interface ServiceItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

const services: ServiceItem[] = [
  { title: 'Exterior Renovation', description: 'Full exterior upgrades and remodels to renew your property.' },
  { title: 'Curb Appeal Upgrades', description: 'Transform your front yard and entry with refined details.' },
  { title: 'Lawn Care & Routes', description: 'Consistent recurring lawn service tailored to your property.' },
  { title: 'Mulch & Bed Refreshes', description: 'Fresh mulch and garden bed renovation for a polished look.' },
  { title: 'Patio & Outdoor Living', description: 'Create inviting outdoor living spaces for family and friends.' },
  { title: 'Exterior Lighting', description: 'Highlight architecture and improve safety with lighting.' },
  { title: 'Pressure Washing', description: 'Restore surfaces with professional pressure washing.' },
  { title: 'Gutter & Exterior Maintenance', description: 'Keep gutters and exterior features in top condition.' },
  { title: 'Property Management', description: 'Punch-list work and ongoing care for managers and owners.' },
  { title: 'Seasonal Cleanup', description: 'Prepare your property for every season.' },
  { title: 'Custom Improvements', description: 'Unique outdoor projects tailored to your vision.' },
];

export default function Services() {
  return (
    <section id="services" className="py-16 bg-ivory">
      <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Complete Exterior Solutions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-6 bg-white border border-stoneGray rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="h-20 flex items-center justify-center mb-4 placeholder">
                  <span className="text-xs">SERVICE IMAGE</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
