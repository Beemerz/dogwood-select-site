export type WorkPhoto = {
  src: string;
  alt: string;
  title: string;
  eyebrow: string;
  caption: string;
  href: string;
  railCaption?: string;
};

export const workPhotos: WorkPhoto[] = [
  {
    src: '/work/hardscape1.png',
    alt: 'Backyard hardscape patio with fire feature and tiered steps',
    title: 'Terraced hardscape and fire feature',
    eyebrow: 'Outdoor Living',
    caption: 'Expanded patio layout, cleaner circulation, and a stronger evening gathering zone.',
    href: '/services#outdoor-living-and-hardscape',
    railCaption: 'Expanded patio layout with a stronger gathering zone.',
  },
  {
    src: '/work/hardscape2.png',
    alt: 'Outdoor patio with fire pit and integrated landscape lighting at dusk',
    title: 'Evening patio experience',
    eyebrow: 'Outdoor Living',
    caption: 'Hardscape, lighting, and planting brought together for a more complete outdoor room.',
    href: '/services#outdoor-living-and-hardscape',
    railCaption: 'Lighting, hardscape, and planting working as one outdoor room.',
  },
  {
    src: '/work/small-backyard-lighting.png',
    alt: 'Small backyard patio with lighting and privacy fence',
    title: 'Compact backyard lighting',
    eyebrow: 'Curb Appeal',
    caption: 'A smaller footprint, finished properly with clean edges, lighting, and usable seating space.',
    href: '/services#curb-appeal',
    railCaption: 'Compact space, cleaned up with lighting and sharper edges.',
  },
  {
    src: '/work/mulch-and-edgework1.png',
    alt: 'Large residential backyard with fresh lawn edges and garden bed cleanup',
    title: 'Backyard edge and bed refresh',
    eyebrow: 'Landscape Care',
    caption: 'Fresh edging, sharpened bed lines, and a cleaner lawn frame around the outdoor living area.',
    href: '/services#landscape-care',
    railCaption: 'Fresh edging and cleaner lawn framing around the home.',
  },
  {
    src: '/work/commercial-lines1.png',
    alt: 'Commercial frontage with striped lawn and fresh black mulch beds',
    title: 'Commercial frontage reset',
    eyebrow: 'Property Support',
    caption: 'Crisp striping, cleaner bed definition, and stronger curb presence for a commercial site.',
    href: '/services#property-support-and-seasonal-care',
    railCaption: 'Commercial curb presence sharpened with striping and bed definition.',
  },
  {
    src: '/work/commercial-mulchwork1.png',
    alt: 'Commercial building with refreshed planting beds and clean walkway edges',
    title: 'Entry landscape polish',
    eyebrow: 'Curb Appeal',
    caption: 'Mulch, planting, and walkway edgework tightened up around a high-visibility entry sequence.',
    href: '/services#curb-appeal',
    railCaption: 'Entry sequence cleaned up with mulch, planting, and edgework.',
  },
  {
    src: '/work/lines1.png',
    alt: 'Residential front lawn with stripe pattern and fresh border definition',
    title: 'Residential stripe and lawn finish',
    eyebrow: 'Landscape Care',
    caption: 'Precision mowing lines and clean borders that make the whole front elevation read better.',
    href: '/services#landscape-care',
    railCaption: 'Precision stripe work and clean borders across the front elevation.',
  },
  {
    src: '/work/commercial-edgework1.png',
    alt: 'Commercial walkway and landscape edgework with a cleaner entry approach',
    title: 'Site edgework and presentation reset',
    eyebrow: 'Property Support',
    caption: 'Walkway edges, surface cleanup, and presentation details tightened up for a cleaner site handoff.',
    href: '/services#property-support-and-seasonal-care',
    railCaption: 'Edgework and cleanup tightened for a cleaner site handoff.',
  },
];

export const homeRailPhotos: WorkPhoto[] = [
  workPhotos[6],
  workPhotos[5],
  workPhotos[0],
  workPhotos[4],
  workPhotos[2],
];

export const serviceExamples: WorkPhoto[] = [
  workPhotos[6],
  workPhotos[5],
  workPhotos[0],
  workPhotos[4],
];

export const consultationExamples: WorkPhoto[] = [workPhotos[6], workPhotos[2], workPhotos[0]];

export const serviceCategoryPhotos = {
  'landscape-care': workPhotos[6],
  'wash-and-restore': {
    src: '/work/commercial-edgework1.png',
    alt: 'Commercial walkway and landscape edgework',
    title: 'Surface cleanup and edge definition',
    eyebrow: 'Wash and Restore',
    caption: 'A cleaner hardscape edge and refreshed exterior surfaces that sharpen the whole approach.',
    href: '/services#wash-and-restore',
  },
  'curb-appeal': workPhotos[5],
  'outdoor-living-and-hardscape': workPhotos[0],
  'property-support-and-seasonal-care': workPhotos[7],
} as const;

export const serviceCategoryWheels = {
  'landscape-care': [
    workPhotos[6],
    workPhotos[3],
    {
      src: '/work/large-property-lines1.png',
      alt: 'Large property lawn with clean mowing stripes and maintained edges',
      title: 'Large property lawn discipline',
      eyebrow: 'Landscape Care',
      caption: 'Consistent mowing patterns and maintained borders that keep a larger property looking intentional.',
      href: '/services#landscape-care',
      railCaption: 'Consistent mowing patterns and cleaner borders across a larger property.',
    },
  ],
  'wash-and-restore': [
    serviceCategoryPhotos['wash-and-restore'],
    {
      src: '/work/commercial-edgework2.png',
      alt: 'Exterior surface cleanup and walkway edgework around a commercial property',
      title: 'Entry wash and edge reset',
      eyebrow: 'Wash and Restore',
      caption: 'Hard surfaces, entry lines, and exterior details cleaned up so the whole approach reads fresher.',
      href: '/services#wash-and-restore',
      railCaption: 'Exterior details cleaned up for a fresher approach.',
    },
    {
      src: '/work/mulch-and-edgework2.png',
      alt: 'Garden bed cleanup with refreshed edges and cleaner hardscape lines',
      title: 'Surface cleanup and finish work',
      eyebrow: 'Wash and Restore',
      caption: 'The difference after cleanup is usually subtle in one spot and major across the whole property.',
      href: '/services#wash-and-restore',
      railCaption: 'Cleanup and finish work that sharpens the whole property.',
    },
  ],
  'curb-appeal': [
    workPhotos[5],
    workPhotos[2],
    {
      src: '/work/commercial-mulchwork2.png',
      alt: 'Commercial entry landscaping with refreshed mulch and planting lines',
      title: 'Front entry refresh',
      eyebrow: 'Curb Appeal',
      caption: 'Mulch, planting, and cleaner lines around the entrance make the whole property feel more current.',
      href: '/services#curb-appeal',
      railCaption: 'Mulch, planting, and entry lines brought back into shape.',
    },
  ],
  'outdoor-living-and-hardscape': [
    workPhotos[0],
    workPhotos[1],
    {
      src: '/work/hardscsape3.png',
      alt: 'Hardscape seating area with planted edges and exterior lighting accents',
      title: 'Hardscape room with lighting',
      eyebrow: 'Outdoor Living',
      caption: 'Hardscape, planted edges, and exterior lighting working together like one finished outdoor room.',
      href: '/services#outdoor-living-and-hardscape',
      railCaption: 'Hardscape and lighting brought together as one outdoor room.',
    },
  ],
  'property-support-and-seasonal-care': [
    workPhotos[4],
    workPhotos[7],
    {
      src: '/work/commercial-lines2.png',
      alt: 'Commercial grounds with precise mowing patterns and maintained curb presence',
      title: 'Recurring site presentation',
      eyebrow: 'Property Support',
      caption: 'The kind of recurring upkeep that keeps a property ready for ownership visits, tenants, and turnover windows.',
      href: '/services#property-support-and-seasonal-care',
      railCaption: 'Recurring upkeep that keeps the site ready for the next visit.',
    },
  ],
} as const;

export const featuredJobStories = [
  {
    title: 'A frontage that finally felt cared for again',
    photo: workPhotos[4],
    body:
      'This kind of work matters because it changes how the whole property is received. Cleaner striping, stronger bed lines, and a steadier presentation turned a flat commercial frontage into something that felt looked after.',
  },
  {
    title: 'A backyard that invited people to stay outside longer',
    photo: workPhotos[1],
    body:
      'What started as a dim outdoor area became a warmer place to spend an evening. Lighting, hardscape, and planting came together in a way that made the space feel settled and welcoming.',
  },
  {
    title: 'An entry sequence that looked more proud of the home',
    photo: workPhotos[5],
    body:
      'Fresh mulch, sharper walkway lines, and better planting definition gave this approach a cleaner rhythm. The result was simple, but it felt more intentional the moment you pulled in.',
  },
] as const;
