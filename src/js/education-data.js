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
      { label: 'ISC SCORE', value: '98.25%' },
      { label: 'HONOR', value: 'Gold Medalist' }
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
      { label: 'ICSE SCORE', value: '98.00%' },
      { label: 'HONOR', value: 'Gold Medalist' }
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
    patronages: 'UNICEF, UNESCO',
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
