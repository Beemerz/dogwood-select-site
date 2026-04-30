import { useState } from 'react';

interface Project {
  title: string;
  beforeLabel: string;
  afterLabel: string;
}

const projects: Project[] = [
  {
    title: 'Patio lighting install for this lovely farmhouse below the James',
    beforeLabel: 'BEFORE IMAGE',
    afterLabel: 'AFTER IMAGE',
  },
  {
    title: 'Curb appeal reset for a Glen Allen brick colonial',
    beforeLabel: 'BEFORE IMAGE',
    afterLabel: 'AFTER IMAGE',
  },
  {
    title: 'Mulch, edging, and entry refresh for a West End family home',
    beforeLabel: 'BEFORE IMAGE',
    afterLabel: 'AFTER IMAGE',
  },
  {
    title: 'Backyard cleanup and outdoor living prep near Ashland',
    beforeLabel: 'BEFORE IMAGE',
    afterLabel: 'AFTER IMAGE',
  },
  {
    title: 'Commercial frontage cleanup for a Central VA property manager',
    beforeLabel: 'BEFORE IMAGE',
    afterLabel: 'AFTER IMAGE',
  },
];

export default function BeforeAfter() {
  return (
    <section id="projects" className="py-16 bg-stoneGray/40">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [showBefore, setShowBefore] = useState(false);
  return (
    <div
      className="bg-white border border-stoneGray rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div
        className="relative h-48 cursor-pointer"
        onMouseEnter={() => setShowBefore(true)}
        onMouseLeave={() => setShowBefore(false)}
        onClick={() => setShowBefore((prev) => !prev)}
      >
        {/* After image */}
        <div
          className={`absolute inset-0 flex items-center justify-center placeholder transition-opacity duration-300 ${showBefore ? 'opacity-0' : 'opacity-100'}`}
        >
          <span>{project.afterLabel}</span>
        </div>
        {/* Before image */}
        <div
          className={`absolute inset-0 flex items-center justify-center placeholder transition-opacity duration-300 ${showBefore ? 'opacity-100' : 'opacity-0'}`}
        >
          <span>{project.beforeLabel}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
      </div>
    </div>
  );
}