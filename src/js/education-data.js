/**
 * Authentic Education & Achievements Data Model - Phase 7
 * Pedigree: IIT Bombay B.Tech Aerospace, CMS Gold Medal, St. Francis Gold Medal
 * Leadership: Abhyuday (Head, ₹10M+ Budget), Placement Cell (Coordinator, 2000+ Students)
 * Arts & Sports: Dramatics Inter IIT Culturals 2x Gold, Stand-up Comedy, Basketball & Hockey
 */

export const ACADEMICS = [
  {
    id: 'iit-bombay',
    institution: 'Indian Institute of Technology Bombay',
    shortName: 'IIT Bombay',
    degree: 'B.Tech in Aerospace Engineering',
    timeline: '2022 - 2026',
    badge: 'UNDERGRADUATE',
    logo: '/images/logos/Indian_Institute_of_Technology_Bombay_Logo.svg.webp',
    details: 'Focus on flight mechanics, aerodynamics, autonomous control, and quantitative engineering optimization.',
    metrics: [
      { label: 'DEGREE', value: 'B.Tech Aerospace' },
      { label: 'GRADUATION', value: 'Class of 2026' }
    ]
  },
  {
    id: 'cms-lucknow',
    institution: 'City Montessori School (CMS), Lucknow',
    shortName: 'City Montessori School (CMS)',
    degree: 'ISC Examination (Class XII)',
    timeline: '2020 - 2022',
    badge: 'GOLD MEDAL',
    score: '98.25%',
    logo: '/images/logos/cms.png',
    details: 'Awarded Gold Medal for academic excellence; national percentile ranking with mathematics and physics concentration.',
    metrics: [
      { label: 'SCORE', value: '98.25% ISC' },
      { label: 'HONOR', value: 'Gold Medal' }
    ]
  },
  {
    id: 'st-francis-lucknow',
    institution: "St. Francis' College, Lucknow",
    shortName: "St. Francis' College",
    degree: 'ICSE Examination (Class X)',
    timeline: 'Till 2020',
    badge: 'GOLD MEDAL',
    score: '98.00%',
    logo: '/images/logos/St._Francis_Lucknow.png',
    details: 'Awarded Gold Medal for graduating at the top of the batch; foundation in analytical science, literature, and stage dramatics.',
    metrics: [
      { label: 'SCORE', value: '98.00% ICSE' },
      { label: 'HONOR', value: 'Gold Medal' }
    ]
  }
];

export const GOVERNANCE = [
  {
    id: 'abhyuday',
    title: 'Operations & Marketing Head',
    organization: 'Abhyuday, IIT Bombay',
    timeline: 'Apr 2024 - Apr 2025',
    scale: "Asia's Largest Student Social Body",
    patronages: 'UNICEF, PETA, UNESCO',
    impactBullets: [
      'Managed a ₹10M+ operational budget and coordinated a team of 150+ organizers across campus.',
      'Organised Advitya annual flagship festival with 50,000+ footfall across IIT Bombay campus.',
      'Spearheaded Pan-India Impact Innovator Summit, securing ₹20M+ in on-spot venture funding.',
      'Directed city-wide Female Hygiene & Education campaign, directly impacting 5,000+ young girls.'
    ],
    metricTag: '₹10M+ Budget // 7M+ Reach'
  },
  {
    id: 'placement-cell',
    title: 'Department Placement Coordinator',
    organization: 'Placement Cell, IIT Bombay',
    timeline: 'Jul 2025 - May 2026',
    scale: 'Aerospace Engineering Department',
    impactBullets: [
      'Facilitated recruitment operations for 2,000+ graduating students in collaboration with 65+ coordinators.',
      'Engaged with 40+ premier corporate recruiters across strategy, consulting, technology, and quant finance.',
      'Orchestrated 16-week long, 30+ event placement prep bootcamp for 100+ candidates across 5 core domains.'
    ],
    metricTag: '2,000+ Students // 40+ Recruiters'
  }
];

export const EXTRACURRICULARS = [
  {
    category: 'Stage & Dramatics',
    badge: '2× GOLD MEDALIST',
    role: 'Writer & Director',
    achievements: [
      'Gold Medal (Writer & Director) at Inter IIT Cultural Meet (2024, 2025).',
      'Triple Gold Medal winner at Inter-Hostel Dramatics Championship (2023, 2024, 2025).'
    ]
  },
  {
    category: 'Speaking & Comedy',
    badge: 'FEATURED SPEAKER',
    role: 'Performer & Host',
    achievements: [
      'Selected Stand-up Comedy Performer at Institute Annual Cultural Showcase (2023).',
      'Master of Ceremonies & Host for Abhyuday CSR + ESG National Conclave.'
    ]
  },
  {
    category: 'Competitive Athletics',
    badge: 'TEAM CAPTAIN',
    role: 'Basketball & Hockey',
    achievements: [
      'Champion, Freshiesta Basketball League (2023).',
      'Captained the winning championship team at Mixed Hockey League (2024).'
    ]
  }
];

export const SKILLS = [
  {
    category: 'Strategy & Product',
    items: ['Storyboarding', 'GTM Playbooks', 'User Research', 'Demand Modeling', 'UI/UX Design Systems']
  },
  {
    category: 'Data & Analytics',
    items: ['Python', 'Power BI', 'Alteryx', 'Tableau', 'Financial Modeling', 'Advanced Excel']
  },
  {
    category: 'Automation & AI',
    items: ['AI Agents', 'Production Bots', 'Selenium', 'Webhooks', 'API Architecture', 'Three.js']
  }
];
