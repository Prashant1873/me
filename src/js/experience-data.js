/**
 * Commercial & Venture Experience Data Model
 * 5 pure-play corporate, startup, and venture roles
 */

export const EXPERIENCES = [
  {
    id: 'iqvia',
    company: 'IQVIA',
    logo: './images/logos/IQVIA.png',
    role: 'Analyst, Strategy Consulting',
    period: 'Jul 2026 – Present',
    category: 'strategy',
    categoryLabel: 'Strategy',
    tagline: 'Healthcare Analytics & AI Automation for Global Pharma',
    metricHighlight: '5+ AI Bots & 7+ Dashboards',
    bullets: [
      'Developed automation mechanisms for everyday data analysis using AI agents and building 5+ production Python bots.',
      'Managed 7+ enterprise dashboards for India expansion-monitoring for international clients including Sanofi, Eli Lilly, and Pfizer.',
      'Engineered an AI data management portal for 5-year historical knowledge keeping and research reproducibility.'
    ],
    linkedinUrl: 'https://www.linkedin.com/company/iqvia/',
    photos: [
      './images/experience/iqvia/20260717_110908.jpg',
      './images/experience/iqvia/20260731_141440.jpg',
      './images/experience/iqvia/20260910_155612.jpg'
    ],
    badgeColor: 'royal-blue'
  },
  {
    id: 'revolut',
    company: 'Revolut',
    logo: './images/logos/revolut_white.png',
    role: "CEO's Office Product Strategy Intern",
    period: 'Jan 2026 – Jun 2026',
    category: 'strategy',
    categoryLabel: 'Strategy',
    tagline: 'Global Remittance Optimization & India Trading Launch',
    metricHighlight: '£19.7M Fee Optimization',
    bullets: [
      'Launched Revolut’s first teen loyalty programme, benchmarking 5 international markets and building the core business case.',
      'Quantified remittance costs across 900+ trade corridors, uncovering £19.7M in excess Agency Banking fees.',
      'Shaped go-to-market strategy for Revolut’s India Trading platform launch, closely aligning product velocity with compliance requirements.'
    ],
    linkedinUrl: 'https://www.linkedin.com/company/revolut/',
    photos: [
      './images/experience/revolut/1729271100596.jpeg',
      './images/experience/revolut/AGC_EGO_BASE_20260602_003850962.jpg'
    ],
    badgeColor: 'royal-blue'
  },
  {
    id: 'ketto',
    company: 'Ketto.org',
    logo: './images/logos/ketto_dark.png',
    role: 'Product, Strategy & Operations Intern',
    period: 'Sep 2025 – Nov 2025',
    category: 'product',
    categoryLabel: 'Product',
    tagline: '0→1 Clinical Product Validation & Hybrid GTM Funnel',
    metricHighlight: '+28% Conversion Lift',
    bullets: [
      'Identified a weight-loss treatment gap in the market and built an MVP funnel, validating Product-Market Fit with 50+ clinicians.',
      'Designed the entire offline GTM blending clinician referrals and targeted outreach, driving a 28% lift in conversions over digital channels.',
      'Synthesized quantitative & qualitative insights from 50+ deep clinician interviews to define product roadmap and expansion playbook.'
    ],
    linkedinUrl: 'https://www.linkedin.com/company/ketto/',
    photos: [
      './images/experience/ketto/IMG-20250930-WA0388(1).jpg',
      './images/experience/ketto/Snapchat-374168654.jpg',
      './images/experience/ketto/Snapchat-841329839.jpg'
    ],
    badgeColor: 'coral'
  },
  {
    id: 'kalam-labs',
    company: 'Kalam Labs (YC S21)',
    logo: './images/logos/kalamLabsLogo.png',
    role: "Founder's Office Intern",
    period: 'May 2025 – Jul 2025',
    category: 'product',
    categoryLabel: 'Product',
    tagline: 'Stratospheric Aerial Vehicle Deal & Growth Automation',
    metricHighlight: '₹5M+ Deal with Indian Air Force',
    bullets: [
      'Awarded Letter of Recommendation for exceptional growth leadership and scaling the STEM Workshops Vertical.',
      'Led an ₹5M+ deal with the Indian Air Force for a high-altitude stratospheric aerial vehicle program.',
      'Reduced manual overhead by 10+ hours per week through custom web scrapers and automation pipelines using Selenium, BeautifulSoup, and Zapier.'
    ],
    linkedinUrl: 'https://www.linkedin.com/company/kalam-labs/',
    photos: [
      './images/experience/kalam-labs/IMG-20250712-WA0010.jpg'
    ],
    badgeColor: 'coral'
  },
  {
    id: 'faoud',
    company: 'FAOUD',
    logo: './images/logos/faoud_transparent.png',
    role: 'Head of Product',
    period: 'Dec 2024 – Apr 2025',
    category: 'product',
    categoryLabel: 'Product',
    tagline: 'MSME Onboarding & Algorithmic Demand Forecasting',
    metricHighlight: '150+ MSMEs & 82% Model Accuracy',
    bullets: [
      'Architected the customer onboarding experience from ground zero, piloting successfully with 150+ MSMEs nationwide.',
      'Rolled out standardized GTM playbooks and self-serve onboarding flows spanning 39 FMCG categories across the platform.',
      'Engineered a demand-forecasting model utilizing Google Analytics and Python, reaching 82% forecast accuracy overall.',
      'Initiated real-time event tracking and webhook reporting, surfacing operational insights on 50K+ daily active visitors via Power BI.'
    ],
    linkedinUrl: 'https://www.linkedin.com/company/faoud/',
    photos: [
      './images/experience/faoud/20260820_175739.jpg',
      './images/experience/faoud/20260820_180125.jpg'
    ],
    badgeColor: 'coral'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Experience', count: 5 },
  { id: 'strategy', label: 'Strategy', count: 2 },
  { id: 'product', label: 'Product', count: 3 }
];

export const TIMELINE_YEARS = [
  {
    year: 2024,
    months: [
      { name: 'Jan', expId: null },
      { name: 'Feb', expId: null },
      { name: 'Mar', expId: null },
      { name: 'Apr', expId: null },
      { name: 'May', expId: null },
      { name: 'Jun', expId: null },
      { name: 'Jul', expId: null },
      { name: 'Aug', expId: null },
      { name: 'Sep', expId: null },
      { name: 'Oct', expId: null },
      { name: 'Nov', expId: null },
      { name: 'Dec', expId: 'faoud' },
    ]
  },
  {
    year: 2025,
    months: [
      { name: 'Jan', expId: 'faoud' },
      { name: 'Feb', expId: 'faoud' },
      { name: 'Mar', expId: 'faoud' },
      { name: 'Apr', expId: 'faoud' },
      { name: 'May', expId: 'kalam-labs' },
      { name: 'Jun', expId: 'kalam-labs' },
      { name: 'Jul', expId: 'kalam-labs' },
      { name: 'Aug', expId: null },
      { name: 'Sep', expId: 'ketto' },
      { name: 'Oct', expId: 'ketto' },
      { name: 'Nov', expId: 'ketto' },
      { name: 'Dec', expId: null },
    ]
  },
  {
    year: 2026,
    months: [
      { name: 'Jan', expId: 'revolut' },
      { name: 'Feb', expId: 'revolut' },
      { name: 'Mar', expId: 'revolut' },
      { name: 'Apr', expId: 'revolut' },
      { name: 'May', expId: 'revolut' },
      { name: 'Jun', expId: 'revolut' },
      { name: 'Jul', expId: 'iqvia' },
      { name: 'Aug', expId: 'iqvia' },
      { name: 'Sep', expId: 'iqvia' },
      { name: 'Oct', expId: 'iqvia' },
      { name: 'Nov', expId: 'iqvia' },
      { name: 'Dec', expId: 'iqvia' },
    ]
  }
];

export const CHRONOLOGICAL_ROLES = [
  { id: 'faoud', company: 'FAOUD', role: 'Head of Product', period: 'Dec 2024 – Apr 2025', duration: '5 mos', category: 'product', color: 'coral' },
  { id: 'kalam-labs', company: 'Kalam Labs', role: "Founder's Office Intern", period: 'May 2025 – Jul 2025', duration: '3 mos', category: 'product', color: 'coral' },
  { id: 'ketto', company: 'Ketto.org', role: 'Product & Strategy Intern', period: 'Sep 2025 – Nov 2025', duration: '3 mos', category: 'product', color: 'coral' },
  { id: 'revolut', company: 'Revolut', role: "CEO's Office Product Strategy", period: 'Jan 2026 – Jun 2026', duration: '6 mos', category: 'strategy', color: 'royal-blue' },
  { id: 'iqvia', company: 'IQVIA', role: 'Analyst, Strategy Consulting', period: 'Jul 2026 – Present', duration: '6+ mos', category: 'strategy', color: 'royal-blue' },
];
