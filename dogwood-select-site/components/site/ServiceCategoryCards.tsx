import ServiceCategoryIcon from '@/components/site/ServiceCategoryIcon';
import { serviceCategories } from '@/lib/site';

export default function ServiceCategoryCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-5">
      {serviceCategories.slice(0, compact ? 3 : serviceCategories.length).map((category) => (
        <article key={category.id} id={category.id} className="service-card">
          <div>
            <p className="eyebrow">
              <ServiceCategoryIcon name={category.icon} className="service-icon-inline" />
              {category.title}
            </p>
            <h3 className="mt-3 font-display text-[1.7rem] leading-tight text-ink-strong md:text-3xl">
              {category.title}
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">{category.intro}</p>
            {compact ? (
              <p className="mt-4 text-sm leading-7 text-ink-muted">
                Includes {category.items.slice(0, 3).join(', ')}.
              </p>
            ) : null}
          </div>
          {!compact ? (
            <ul className="service-list">
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  );
}
