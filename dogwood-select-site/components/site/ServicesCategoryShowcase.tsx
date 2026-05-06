import Link from 'next/link';
import ServiceCategoryWheel from '@/components/site/ServiceCategoryWheel';
import ServiceCategoryIcon from '@/components/site/ServiceCategoryIcon';
import { serviceCategories } from '@/lib/site';
import { serviceCategoryWheels } from '@/lib/workPhotos';

export default function ServicesCategoryShowcase() {
  return (
    <div className="grid gap-6">
      {serviceCategories.map((category, index) => {
        const photos = serviceCategoryWheels[category.id];
        const reverse = index % 2 === 1;

        return (
          <article key={category.id} id={category.id} className="services-feature-card">
            <div className={reverse ? 'services-feature-grid services-feature-grid-reverse' : 'services-feature-grid'}>
              <div className="services-feature-copy">
                <p className="eyebrow">
                  <ServiceCategoryIcon name={category.icon} className="service-icon-inline" />
                  {category.title}
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink-strong md:text-[2.5rem]">
                  {category.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-ink-soft">{category.intro}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-hot)]">
                    Commonly includes
                  </p>
                  <Link
                    href={`/book-consultation?service=${encodeURIComponent(category.requestService)}`}
                    className="button-secondary services-inline-action"
                  >
                    Get this service
                  </Link>
                </div>
                <ul className="mt-4 grid gap-2 services-feature-pill-grid">
                  {category.items.map((item) => (
                    <li key={item} className="services-feature-pill">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="services-feature-visual">
                <ServiceCategoryWheel photos={photos} label={category.title} />
              </div>
            </div>
          </article>
        );
      })}

      <Link href="/book-consultation?service=Custom%20project" className="services-special-card">
        <p className="eyebrow">Something Special</p>
        <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink-strong md:text-[2.4rem]">
          Need something more custom than a standard category?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-ink-soft">
          If the work spans several categories, needs a more tailored plan, or does not fit the
          usual lanes, start a custom project consultation here.
        </p>
        <span className="services-special-link">Start a custom project consultation</span>
      </Link>
    </div>
  );
}
