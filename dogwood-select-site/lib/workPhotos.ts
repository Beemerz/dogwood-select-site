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
    title: 'Terraced patio reset',
    eyebrow: 'Outdoor Refresh',
    caption: 'Layered patio space, cleaner lines, and a stronger gathering area.',
    href: '/services#outdoor-living-and-hardscape',
    railCaption: 'Layered patio space with cleaner flow.',
  },
  {
    src: '/work/hardscape2.png',
    alt: 'Outdoor patio with fire pit and integrated landscape lighting at dusk',
    title: 'Evening patio refresh',
    eyebrow: 'Outdoor Refresh',
    caption: 'Hardscape, lighting, and planting working together in one outdoor area.',
    href: '/services#outdoor-living-and-hardscape',
    railCaption: 'Lighting, hardscape, and planting working together cleanly.',
  },
  {
    src: '/work/small-backyard-lighting.png',
    alt: 'Small backyard patio with lighting and privacy fence',
    title: 'Backyard lighting refresh',
    eyebrow: 'Outdoor Refresh',
    caption: 'A smaller patio area with cleaner edges, lighting, and more usable seating.',
    href: '/services#curb-appeal',
    railCaption: 'Compact patio area with lighting and sharper edges.',
  },
  {
    src: '/work/mulch-and-edgework1.png',
    alt: 'Large residential backyard with fresh lawn edges and garden bed cleanup',
    title: 'Bed cleanup and edging',
    eyebrow: 'Bed Cleanup',
    caption: 'Fresh bed lines, cleaner edging, and a sharper lawn frame.',
    href: '/services#landscape-care',
    railCaption: 'Fresh edging and cleaner lawn framing.',
  },
  {
    src: '/work/commercial-lines1.png',
    alt: 'Commercial frontage with striped lawn and fresh black mulch beds',
    title: 'Commercial frontage reset',
    eyebrow: 'Property Refresh',
    caption: 'Fresh mulch, clean bed lines, and a sharper commercial frontage.',
    href: '/services#property-support-and-seasonal-care',
    railCaption: 'Commercial frontage sharpened with mulch and clean lines.',
  },
  {
    src: '/work/commercial-mulchwork1.png',
    alt: 'Commercial building with refreshed planting beds and clean walkway edges',
    title: 'Front entry refresh',
    eyebrow: 'Fresh Mulch',
    caption: 'Fresh mulch, cleaner edges, and a more intentional entry approach.',
    href: '/services#curb-appeal',
    railCaption: 'Entry cleaned up with mulch and sharper edges.',
  },
  {
    src: '/work/lines1.png',
    alt: 'Residential front lawn with stripe pattern and fresh border definition',
    title: 'Residential lawn edging',
    eyebrow: 'Lawn Edging',
    caption: 'Cleaner edges and a more intentional front-lawn presentation.',
    href: '/services#landscape-care',
    railCaption: 'Cleaner edges and a sharper front-lawn presentation.',
  },
  {
    src: '/work/commercial-edgework1.png',
    alt: 'Commercial walkway and landscape edgework with a cleaner entry approach',
    title: 'Walkway and edge cleanup',
    eyebrow: 'Exterior Cleanup',
    caption: 'Cleaner edges, tidier surfaces, and a better-kept entry route.',
    href: '/services#property-support-and-seasonal-care',
    railCaption: 'Edgework and cleanup tightened along the approach.',
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
    eyebrow: 'Pressure Washing',
    caption: 'Cleaner surfaces and sharper edges around the approach.',
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
      title: 'Large-property lawn care',
      eyebrow: 'Lawn Edging',
      caption: 'Clean stripes and maintained edges across a larger lawn.',
      href: '/services#landscape-care',
      railCaption: 'Clean stripes and maintained edges across a larger lawn.',
    },
  ],
  'wash-and-restore': [
    serviceCategoryPhotos['wash-and-restore'],
    {
      src: '/work/commercial-edgework2.png',
      alt: 'Exterior surface cleanup and walkway edgework around a commercial property',
      title: 'Entry wash and edge reset',
      eyebrow: 'Exterior Cleanup',
      caption: 'Cleaner hard surfaces and a tidier entry approach.',
      href: '/services#wash-and-restore',
      railCaption: 'Exterior details cleaned up along the entry.',
    },
    {
      src: '/work/mulch-and-edgework2.png',
      alt: 'Garden bed cleanup with refreshed edges and cleaner hardscape lines',
      title: 'Bed and surface cleanup',
      eyebrow: 'Pressure Washing',
      caption: 'Cleaner edges and sharper hardscape lines around the beds.',
      href: '/services#wash-and-restore',
      railCaption: 'Cleaner edges and sharper hardscape lines.',
    },
  ],
  'curb-appeal': [
    workPhotos[5],
    workPhotos[2],
    {
      src: '/work/commercial-mulchwork2.png',
      alt: 'Commercial entry landscaping with refreshed mulch and planting lines',
      title: 'Front entry refresh',
      eyebrow: 'Fresh Mulch',
      caption: 'Fresh mulch, cleaner planting lines, and a sharper front approach.',
      href: '/services#curb-appeal',
      railCaption: 'Mulch and entry lines brought back into shape.',
    },
  ],
  'outdoor-living-and-hardscape': [
    workPhotos[0],
    workPhotos[1],
    {
      src: '/work/hardscsape3.png',
      alt: 'Hardscape seating area with planted edges and exterior lighting accents',
      title: 'Hardscape and lighting finish',
      eyebrow: 'Outdoor Refresh',
      caption: 'Hardscape, lighting, and planted edges working together more cleanly.',
      href: '/services#outdoor-living-and-hardscape',
      railCaption: 'Hardscape and lighting working together more cleanly.',
    },
  ],
  'property-support-and-seasonal-care': [
    workPhotos[4],
    workPhotos[7],
    {
      src: '/work/commercial-lines2.png',
      alt: 'Commercial grounds with precise mowing patterns and maintained curb presence',
      title: 'Recurring site presentation',
      eyebrow: 'Property Refresh',
      caption: 'Steady mowing lines and clean frontage that keep the site looking handled.',
      href: '/services#property-support-and-seasonal-care',
      railCaption: 'Steady upkeep that keeps the site looking handled.',
    },
  ],
} as const;

export const featuredJobStories = [
  {
    title: 'Commercial frontage reset',
    photo: workPhotos[4],
    body:
      'Fresh mulch, clean striping, and stronger bed definition sharpened the whole frontage.',
  },
  {
    title: 'Backyard evening refresh',
    photo: workPhotos[1],
    body:
      'Lighting, hardscape, and planted edges gave the patio a warmer and more usable feel.',
  },
  {
    title: 'Front entry refresh',
    photo: workPhotos[5],
    body:
      'Fresh mulch, cleaner edges, and better planting definition made the approach feel more intentional.',
  },
] as const;
