import ServiceCategoryIcon from '@/components/site/ServiceCategoryIcon';
import ServiceCategoryWheel from '@/components/site/ServiceCategoryWheel';
import { serviceCategories } from '@/lib/site';
import { serviceCategoryWheels } from '@/lib/workPhotos';

export default function WorkPhotoGallery() {
  return (
    <div className="grid gap-6">
      {serviceCategories.map((category, index) => {
        const reverse = index % 2 === 1;
        const photos = serviceCategoryWheels[category.id];

        return (
          <article key={category.id} className="services-feature-card">
            <div className={reverse ? 'services-feature-grid services-feature-grid-reverse' : 'services-feature-grid'}>
              <div className="services-feature-copy">
                <p className="eyebrow">
                  <ServiceCategoryIcon name={category.icon} className="service-icon-inline" />
                  {category.title}
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink-strong md:text-[2.5rem]">
                  {category.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-ink-soft">
                  {category.intro}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-8 text-ink-soft">
                  The finished result should feel sharper, more settled, and more obviously cared
                  for without needing a long explanation.
                </p>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {category.items.slice(0, 4).map((item) => (
                    <div key={item} className="services-feature-pill">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="services-feature-visual">
                <ServiceCategoryWheel photos={photos} label={category.title} />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
