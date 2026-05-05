export const siteConfig = {
  name: 'Dogwood Select',
  phoneDisplay: '804-629-7632',
  phoneHref: 'tel:8046297632',
  email: 'support@dogwoodselect.com',
  emailHref: 'mailto:support@dogwoodselect.com',
  serviceArea: 'Richmond / Central Virginia',
  url: 'https://dogwoodselect.com',
  offerEndDate: 'July 30, 2026',
};

export const primaryNav = [
  { label: 'Our Services', href: '/services' },
  { label: 'The Works', href: '/the-works' },
  { label: 'Our History', href: '/our-history' },
  { label: 'Rooted Members', href: '/rooted-members' },
] as const;

export const footerLinks = [
  { label: 'Our Services', href: '/services' },
  { label: 'The Works', href: '/the-works' },
  { label: 'Our History', href: '/our-history' },
  { label: 'Rooted Members', href: '/rooted-members' },
  { label: 'Book Consultation', href: '/book-consultation' },
  { label: 'Refer a Friend', href: '/refer-a-friend' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms and Conditions', href: '/terms-and-conditions' },
] as const;

export const serviceCategories = [
  {
    id: 'landscape-care',
    title: 'Landscape Care',
    navTitle: 'Landscape Care',
    navCopy: 'Mowing, pruning, bed care.',
    icon: 'landscape',
    intro: 'Steady exterior care that keeps the property clean, healthy, and visibly well-kept.',
    items: [
      'Mowing and edging',
      'Pruning and shaping',
      'Garden bed cleanup',
      'Recurring upkeep routes',
      'Seasonal cutbacks',
      'Clean property line finishing',
    ],
  },
  {
    id: 'wash-and-restore',
    title: 'Wash and Restore',
    navTitle: 'Wash and Restore',
    navCopy: 'Siding, stone, concrete, trim.',
    icon: 'wash',
    intro: 'A proper surface reset for siding, stone, trim, concrete, and all the places grime loves to settle.',
    items: [
      'Soft washing',
      'Pressure washing',
      'Concrete cleanup',
      'Patio and entry refreshes',
      'Walkway brightening',
      'Surface detail cleanup',
    ],
  },
  {
    id: 'curb-appeal',
    title: 'Curb Appeal',
    navTitle: 'Curb Appeal',
    navCopy: 'Mulch, planting, front entry polish.',
    icon: 'curb',
    intro: 'The visible refinements that sharpen first impressions and make the approach feel considered.',
    items: [
      'Mulch and bed refreshes',
      'Planting touch-ups',
      'Seasonal color updates',
      'Front entry tune-ups',
      'Shrub definition work',
      'Arrival sequence polish',
    ],
  },
  {
    id: 'outdoor-living-and-hardscape',
    title: 'Outdoor Living and Hardscape',
    navTitle: 'Outdoor Living',
    navCopy: 'Patios, hardscape, layout upgrades.',
    icon: 'outdoor',
    intro: 'Bigger outdoor improvements for owners who want the property to feel more complete, useful, and lasting.',
    items: [
      'Patios and hardscape',
      'Drainage improvements',
      'Backyard layout upgrades',
      'Exterior lighting',
      'Seat-wall integration',
      'Garden framing around hardscape',
    ],
  },
  {
    id: 'property-support-and-seasonal-care',
    title: 'Property Support and Seasonal Care',
    navTitle: 'Property Support',
    navCopy: 'Turnovers, storm cleanup, seasonal resets.',
    icon: 'property',
    intro: 'Reliable support for rentals, portfolios, turnovers, and seasonal cleanup that need to stay presentation-ready.',
    items: [
      'Turnover cleanup',
      'Recurring portfolio upkeep',
      'Storm cleanup',
      'Leaf and debris removal',
      'Frontage presentation resets',
      'Route-based upkeep planning',
    ],
  },
] as const;

export const serviceInterestOptions = [
  'Landscape care',
  'Mowing and edging',
  'Pruning and cleanup',
  'Soft washing',
  'Pressure washing',
  'Curb appeal',
  'Patios and hardscape',
  'Oasis Remodel',
  'Drainage help',
  'Property support and seasonal care',
  'Custom project',
  'Not sure yet',
];

export const storyChapters = [
  {
    eyebrow: 'This Starts With Time',
    title: 'The outside of a property can quietly lower the standard of everything else around it.',
    body:
      'When the grounds slip, the beds flatten out, or the hardscape starts looking tired, the whole place feels behind. Dogwood Select keeps that slide from becoming the first impression.',
    ctaLabel: 'Save Time, Book Now',
    ctaHref: '/book-consultation',
  },
  {
    eyebrow: 'The Shift',
    title: 'The difference is rarely one big issue. It is the accumulation of small misses.',
    body:
      'Soft edges, weathered surfaces, thin mulch, clogged gutters, underwhelming entries, and outdoor areas that never quite come together. We fix the visual drag before it becomes the story of the property.',
    ctaLabel: 'See Our Services',
    ctaHref: '/services',
  },
  {
    eyebrow: 'The Works',
    title: 'Some jobs are maintenance. Some need a reset. We keep the line between those clear.',
    body:
      'That means practical upkeep when upkeep is enough, and bigger moves only when the property actually benefits from them. No filler. No fake luxury language. No mystery scope creep.',
    ctaLabel: 'Browse The Works',
    ctaHref: '/the-works',
  },
  {
    eyebrow: 'For Owners And Managers',
    title: 'If you manage homes for a living, you need faster answers and less vendor babysitting.',
    body:
      'We support property managers and fast-moving owners with recurring upkeep, turnover cleanup, wash work, and curb appeal fixes that make the next showing easier.',
    ctaLabel: 'See Management Support',
    ctaHref: '/services#property-support-and-seasonal-care',
  },
  {
    eyebrow: 'Ready When You Are',
    title: 'When you decide on excellence, send the context once and we will handle the next steps cleanly.',
    body:
      'The consultation flow is there to save time, not cheapen the work. You send the details, we confirm by email right away, and we follow up within one hour during business hours.',
    ctaLabel: 'Save Time, Book Now',
    ctaHref: '/book-consultation',
  },
] as const;

export const worksProjects = [
  {
    title: 'Entry Sequence Cleanup',
    before: 'Flat beds, messy edging, and a walkway that looked tired by noon.',
    after: 'Sharper edges, cleaner stone, warmer planting lines, and a front arrival that finally looks awake.',
  },
  {
    title: 'Backyard Reset',
    before: 'Patchy lawn edges, dirty hardscape, and no obvious reason to spend time back there.',
    after: 'A cleaner patio zone, stronger circulation, and a backyard that feels worth stepping into after work.',
  },
  {
    title: 'Turnover Exterior Triage',
    before: 'Deferred cleanup, inconsistent curb appeal, and multiple small issues slowing leasing momentum.',
    after: 'Fast cleanup, restored presentation, and a property that looks handled instead of lingering.',
  },
] as const;

export const historyPoints = [
  {
    year: 'Now',
    title: 'Built for people who value time and standards.',
    body:
      'Dogwood Select is built around time discipline, cleaner communication, and work that is meant to hold up in the real Virginia heat, growth cycles, and seasonal swings.',
  },
  {
    year: 'Short Pump',
    title: 'Started small, worked serious.',
    body:
      'The company started with two brothers living out of a car in Short Pump, Virginia, taking lawn work seriously, learning routes block by block, and building trust through consistent results.',
  },
  {
    year: 'Growth',
    title: 'Backed through the quality of the work.',
    body:
      'Professional work led to financial backing, stronger partners, and a small fleet. Now the focus is expanding carefully, establishing solid routes, capitalizing on time, and making the finished work feel unmistakable.',
  },
] as const;
