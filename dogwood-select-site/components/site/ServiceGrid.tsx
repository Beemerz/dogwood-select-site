type Service = {
  title: string;
  description: string;
};

export default function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <article key={service.title} className="panel-card p-7">
          <h3 className="font-display text-3xl text-ivory">{service.title}</h3>
          <p className="mt-4 text-sm leading-7 text-ivory/70">{service.description}</p>
        </article>
      ))}
    </div>
  );
}
