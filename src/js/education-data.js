/**
 * Authentic Education & Achievements Data Model - Milestone 3
 * Pedigree: IIT Bombay B.Tech Aerospace, CMS Gold Medal, St. Francis Gold Medal
 * Leadership: Abhyuday (Head, ₹10M+ Budget), Placement Cell (Coordinator, 2000+ Students)
 * Arts & Sports: Dramatics Inter IIT Culturals 2x Gold, Stand-up Comedy, Basketball & Hockey
 * Competencies: Comprehensive multi-domain resume proficiencies
 */

export const ACADEMICS = [
  {
    id: 'iit-bombay',
    institution: 'Indian Institute of Technology Bombay',
    shortName: 'IIT Bombay',
    degree: 'B.Tech in Aerospace Engineering',
    timeline: '2022 - 2026',
    badge: 'UNDERGRADUATE',
    logo: './images/logos/Indian_Institute_of_Technology_Bombay_Logo.svg.webp',
    metrics: [
      { value: 'AIR 1543', label: 'JEE ADVANCED' },
      { value: '2026', label: 'GRADUATION' }
    ],
    tags: ['Autonomous Systems & Flight Optimization']
  },
  {
    id: 'cms-lucknow',
    institution: 'City Montessori School (CMS), Lucknow',
    shortName: 'City Montessori School (CMS)',
    degree: 'ISC Examination (Class XII)',
    timeline: '2020 - 2022',
    badge: 'GOLD MEDAL',
    score: '98.25%',
    logo: './images/logos/cms.png',
    metrics: [
      { value: '98.25%', label: 'ISC SCORE' },
      { value: 'Gold Medalist', label: 'HONOR' }
    ],
    tags: ['National Percentile Ranking']
  },
  {
    id: 'st-francis-lucknow',
    institution: "St. Francis' College, Lucknow",
    shortName: "St. Francis' College",
    degree: 'ICSE Examination (Class X)',
    timeline: 'Till 2020',
    badge: 'GOLD MEDAL',
    score: '98.00%',
    logo: './images/logos/St._Francis_Lucknow.png',
    metrics: [
      { value: '98.00%', label: 'ICSE SCORE' },
      { value: 'Gold Medalist', label: 'HONOR' }
    ],
    tags: ['Batch Topper & Gold Medal']
  }
];

export const GOVERNANCE = [
  {
    id: 'abhyuday',
    title: 'Operations & Marketing Head',
    organization: 'Abhyuday, IIT Bombay',
    timeline: '2024 - 2025',
    scale: "Asia's Largest Student Social Body",
    logo: './images/logos/abhyuday.png',
    patronages: 'UNICEF & UNESCO Patronage',
    bullets: [
      'Directed operations with <strong>₹10M+</strong> budget and led <strong>150+</strong> team members',
      'Orchestrated <strong>50,000+</strong> footfall with <strong>₹20M+</strong> sponsorships raised'
    ],
    metrics: [
      { value: '₹10M+', label: 'Budget' },
      { value: '50K+', label: 'Footfall' },
      { value: '150+', label: 'Team Led' },
      { value: '₹20M+', label: 'Raised' }
    ],
    tags: ["Asia's Largest Student Body", 'UNICEF & UNESCO Patronage']
  },
  {
    id: 'placement-cell',
    title: 'Department Placement Coordinator',
    organization: 'Placement Cell, IIT Bombay',
    timeline: '2025 - 2026',
    scale: 'Aerospace Engineering Department',
    logo: './images/logos/Indian_Institute_of_Technology_Bombay_Logo.svg.webp',
    patronages: 'Quant & Strategy Placement Support',
    bullets: [
      'Facilitated placement for <strong>2,000+</strong> candidates across <strong>40+</strong> top recruiters',
      'Designed <strong>16-week</strong> intensive quantitative and strategy preparation bootcamp'
    ],
    metrics: [
      { value: '2,000+', label: 'Candidates' },
      { value: '40+', label: 'Recruiters' },
      { value: '16-Wk', label: 'Bootcamp' },
      { value: '100%', label: 'Placement Support' }
    ],
    tags: ['Aerospace Department', 'Quant & Strategy Prep']
  }
];

export const EXTRACURRICULARS = [
  {
    id: 'stage-dramatics',
    category: 'Stage & Dramatics',
    icon: 'theater',
    badge: '2× GOLD MEDALIST',
    role: 'Writer & Director',
    highlights: [
      { value: '2× Gold', label: 'Inter IIT Cultural Meet' },
      { value: '3× Gold', label: 'Inter-Hostel Championship' }
    ]
  },
  {
    id: 'speaking-comedy',
    category: 'Speaking & Comedy',
    icon: 'mic',
    badge: 'FEATURED SPEAKER',
    role: 'Performer & Host',
    highlights: [
      { value: 'Stand-up Comic', label: 'Institute Cultural Showcase' },
      { value: 'Conclave MC', label: 'Abhyuday National Conclave' }
    ]
  },
  {
    id: 'athletics',
    category: 'Competitive Athletics',
    icon: 'sports',
    badge: 'TEAM CAPTAIN',
    role: 'Basketball & Hockey',
    highlights: [
      { value: 'Champion', label: 'Mixed Hockey League (2024)' },
      { value: 'Champion', label: 'Freshiesta Basketball (2023)' }
    ]
  }
];

export const SKILLS = [
  {
    category: 'Strategy & Product Execution',
    items: [
      'Storyboarding',
      'GTM Playbooks',
      'MVP Funnel Building',
      'User Research',
      'Demand Modeling',
      'UI/UX Design Systems',
      'Product Roadmapping',
      'Unit Economics'
    ]
  },
  {
    category: 'Data Systems & Analytics',
    items: [
      'Python',
      'Power BI',
      'Alteryx',
      'Tableau',
      'SQL',
      'Financial Modeling',
      'Advanced Excel',
      'Monte Carlo Simulations',
      'DAX Architecture'
    ]
  },
  {
    category: 'Engineering & AI Automation',
    items: [
      'AI Agents',
      'Production Bots',
      'Webhooks',
      'API Architecture',
      'Selenium',
      'Three.js',
      'GSAP Animations',
      'Fastify',
      'Vector Search'
    ]
  }
];
