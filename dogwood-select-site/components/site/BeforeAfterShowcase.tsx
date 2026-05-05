import { worksProjects } from '@/lib/site';

export default function BeforeAfterShowcase({ limit }: { limit?: number }) {
  const projects = typeof limit === 'number' ? worksProjects.slice(0, limit) : worksProjects;

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <article key={project.title} className="before-after-card">
          <div className="before-after-frame">
            <div className="before-after-side">
              <p className="before-after-label">Before</p>
              <p>{project.before}</p>
            </div>
            <div className="before-after-divider" />
            <div className="before-after-side">
              <p className="before-after-label">After</p>
              <p>{project.after}</p>
            </div>
          </div>
          <h3 className="font-display text-3xl text-ink-strong">{project.title}</h3>
          <p className="max-w-2xl text-sm leading-7 text-ink-soft">
            Honest framing only. This comparison stays here to explain the scope shift, and the
            finished photography below shows how that work lands in the real world.
          </p>
        </article>
      ))}
    </div>
  );
}
