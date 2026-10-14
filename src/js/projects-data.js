/**
 * Canonical Project Records for Prashant Shukla's Portfolio
 * Structured Intensity Portfolio — Phase 6 Projects Section
 */

export const PROJECTS = [
  {
    id: 'bickerbape',
    title: 'BickerBape',
    category: 'Fintech & Compounding',
    statusTag: '● 98/98 TESTS',
    oneLiner: 'Algorithmic mutual fund screener & compounding engine built with Next.js 16 and a 98-test Vitest harness.',
    narrative: 'Frustrated by opaque fund rating agencies and high-expense active funds while allocating my first salary, I engineered BickerBape to bring systematic quantitative screening and mathematical CAGR compounding simulation to retail investors with zero commission bias.',
    innovations: [
      {
        title: 'Dual-Engine Compounding Simulator',
        metric: '100% Client-Side',
        desc: 'Real-time Monte Carlo simulations and NAV progression calculators rendering instant compound return visual projections.'
      },
      {
        title: 'Vitest Rigorous Test Harness',
        metric: '98/98 Tests',
        desc: 'Exhaustive unit and mathematical boundary test suite verifying compounding formulas, expense ratios, and alpha/beta indices.'
      },
      {
        title: 'Next.js 16 & React 19 Architecture',
        metric: 'Sub-50ms Render',
        desc: 'Zero-latency filtering over thousands of fund schemes with Tailwind 4 styling and dark-mode aesthetic.'
      }
    ],
    techStack: [
      { name: 'Next.js 16', primary: true },
      { name: 'React 19', primary: true },
      { name: 'TypeScript', primary: false },
      { name: 'Tailwind 4', primary: false },
      { name: 'Vitest', primary: false }
    ],
    liveUrl: 'https://prashant1873.github.io/BickerBape/',
    githubUrl: 'https://github.com/Prashant1873/BickerBape',
    screenshots: [
      {
        src: '/images/projects/bickerbape/slide-1.png',
        caption: 'Interactive Mutual Fund Screener with category filters & CAGR rankers',
        alt: 'BickerBape mutual fund screener showing scheme rankings'
      },
      {
        src: '/images/projects/bickerbape/slide-2.png',
        caption: 'Historical performance & expense ratio distribution breakdown',
        alt: 'BickerBape historical performance charts and distribution'
      },
      {
        src: '/images/projects/bickerbape/slide-3.png',
        caption: 'Compounding simulator input deck with monthly SIP toggles',
        alt: 'BickerBape compounding simulator inputs'
      },
      {
        src: '/images/projects/bickerbape/slide-4.png',
        caption: 'Visual growth trajectory comparison across hybrid and equity funds',
        alt: 'BickerBape growth trajectory curves'
      },
      {
        src: '/images/projects/bickerbape/slide-5.png',
        caption: 'Category-wise risk/reward quadrant and beta score matrix',
        alt: 'BickerBape risk and reward matrix'
      },
      {
        src: '/images/projects/bickerbape/slide-6.png',
        caption: 'Portfolio allocation inspector and tax efficiency estimators',
        alt: 'BickerBape portfolio allocation inspector'
      },
      {
        src: '/images/projects/bickerbape/slide-7.png',
        caption: 'Detailed fund deep-dive modal showing top holdings and sector weights',
        alt: 'BickerBape fund holdings deep dive'
      }
    ]
  },
  {
    id: 'strokecrm',
    title: 'StrokeCRM',
    category: 'Cold Outreach',
    statusTag: '● SELF-HOSTED',
    oneLiner: 'Self-hosted cold-email campaign command center and deliverability workspace powered by SQLite and Node.',
    narrative: 'Exasperated by punitive seat-based SaaS pricing and opaque warm-up algorithms on commercial email platforms, I engineered StrokeCRM as a fully sovereign, self-hosted outreach engine with real-time sequence pacing and inbox rotation.',
    innovations: [
      {
        title: 'Sovereign Deliverability Engine',
        metric: '0 SaaS Fees',
        desc: 'Direct SMTP integration with multi-inbox rotation, custom domain DKIM/SPF alignment, and automated bounce handling.'
      },
      {
        title: 'Lightweight SQLite Architecture',
        metric: '<10MB RAM Idle',
        desc: 'Ultra-fast local database operations via SQLite with Express 5 backend delivering sub-5ms sequence queries.'
      },
      {
        title: 'Visual Campaign Builder',
        metric: '6-Stage Flow',
        desc: 'Step-by-step pipeline tracking cold email open rates, click-through metrics, and automatic follow-up dispatches.'
      }
    ],
    techStack: [
      { name: 'React 19', primary: true },
      { name: 'Express 5', primary: true },
      { name: 'SQLite', primary: false },
      { name: 'Tailwind 4', primary: false },
      { name: 'Nodemailer', primary: false }
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/Prashant1873/StrokeCRM',
    screenshots: [
      {
        src: '/images/projects/strokecrm/slide-1.png',
        caption: 'Campaign performance dashboard with live sending cadence',
        alt: 'StrokeCRM campaign performance dashboard'
      },
      {
        src: '/images/projects/strokecrm/slide-2.png',
        caption: 'Multi-account SMTP configuration & inbox warming health status',
        alt: 'StrokeCRM SMTP and inbox configuration'
      },
      {
        src: '/images/projects/strokecrm/slide-3.png',
        caption: 'Lead list segmentation and personalized tag injection matrix',
        alt: 'StrokeCRM lead segmentation matrix'
      },
      {
        src: '/images/projects/strokecrm/slide-4.png',
        caption: 'Automated sequence timeline builder with time-delay triggers',
        alt: 'StrokeCRM automated sequence builder'
      },
      {
        src: '/images/projects/strokecrm/slide-5.png',
        caption: 'Real-time delivery log and bounce detection inspector',
        alt: 'StrokeCRM delivery log and bounce monitor'
      },
      {
        src: '/images/projects/strokecrm/slide-6.png',
        caption: 'Inbox reply monitor with categorization and thread context',
        alt: 'StrokeCRM inbox reply tracker'
      }
    ]
  },
  {
    id: 'trinet',
    title: 'TRINET',
    category: 'Manufacturing Intel',
    statusTag: '● 500+ MFRS',
    oneLiner: 'India-wide manufacturing cluster intelligence and vendor discovery platform powered by Gemini AI and MapLibre GL.',
    narrative: 'Witnessing supply chain bottlenecks during industrial hardware sourcing, I built TRINET to catalog Indian manufacturing powerhouses on an interactive geospatial canvas backed by semantic multimodal LLM extraction.',
    innovations: [
      {
        title: 'Geospatial Industrial Cluster Map',
        metric: '500+ Plants',
        desc: 'Hardware-accelerated MapLibre GL vector map plotting manufacturing clusters across Gujarat, Maharashtra, and Tamil Nadu.'
      },
      {
        title: 'Gemini AI Vendor Profiler',
        metric: 'Multimodal AI',
        desc: 'Automated ingestion and extraction of technical capability sheets, CNC tolerances, and ISO certifications using Gemini.'
      },
      {
        title: 'B2B RFP Matchmaking Engine',
        metric: 'Instant Search',
        desc: 'Direct manufacturer discovery matching bill-of-materials specifications to certified Indian tier-2 and tier-3 job shops.'
      }
    ],
    techStack: [
      { name: 'Python/Flask', primary: true },
      { name: 'MapLibre GL', primary: true },
      { name: 'Gemini AI', primary: false },
      { name: 'SQLite', primary: false },
      { name: 'Vanilla JS', primary: false }
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/Prashant1873/Trinet',
    screenshots: [
      {
        src: '/images/projects/trinet/slide-1.png',
        caption: 'National industrial cluster map with interactive regional filters',
        alt: 'TRINET national manufacturing cluster map'
      },
      {
        src: '/images/projects/trinet/slide-2.png',
        caption: 'Vendor capability dossier with machine specs and quality certifications',
        alt: 'TRINET vendor capability and machinery dossier'
      },
      {
        src: '/images/projects/trinet/slide-3.png',
        caption: 'Category-based search matrix for precision tooling and sheet metal fabrication',
        alt: 'TRINET category search matrix'
      }
    ]
  },
  {
    id: 'archetype',
    title: 'Know Your Archetype',
    category: 'Behavioral Psych',
    statusTag: '● 18 SCENARIOS',
    oneLiner: 'Scenario-based psychometric assessment engine mapping executive charisma into continuous 2D vector coordinates.',
    narrative: 'Driven by an obsession with behavioral psychology and leadership archetypes, I formulated this psychometric engine to measure charisma through nuanced high-stakes dilemma simulations instead of simplistic binary questionnaires.',
    innovations: [
      {
        title: 'Continuous Coordinate Mapping',
        metric: 'Vector Math',
        desc: 'Mathematical SVG mapping of responses onto dual-axis archetype spectrums (Magnetism vs Authority, Warmth vs Vision).'
      },
      {
        title: 'Branching Dilemma Engine',
        metric: '18 Scenarios',
        desc: 'High-context boardroom and interpersonal dilemmas that force calibrated trade-offs and reveal underlying instincts.'
      },
      {
        title: 'Zero-Dependency Micro-UI',
        metric: '<12KB Bundle',
        desc: 'Hand-crafted Vanilla JS and SVG engine running client-side with zero external UI dependencies and sub-10ms response times.'
      }
    ],
    techStack: [
      { name: 'Vanilla JS', primary: true },
      { name: 'SVG Math', primary: true },
      { name: 'Webhooks', primary: false },
      { name: 'Vanilla CSS', primary: false }
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/Prashant1873/Archetype',
    screenshots: [
      {
        src: '/images/projects/archetype/slide-1.png',
        caption: 'Assessment welcome interface and psychometric philosophy intro',
        alt: 'Know Your Archetype welcome assessment screen'
      },
      {
        src: '/images/projects/archetype/slide-2.png',
        caption: 'Interactive scenario evaluation card with moral dilemma options',
        alt: 'Know Your Archetype dilemma decision card'
      },
      {
        src: '/images/projects/archetype/slide-3.png',
        caption: 'Intermediate response calibration and sentiment balance meter',
        alt: 'Know Your Archetype sentiment balance meter'
      },
      {
        src: '/images/projects/archetype/slide-4.png',
        caption: 'Archetype coordinate visualization on continuous 2D polar plane',
        alt: 'Know Your Archetype polar coordinate plane'
      },
      {
        src: '/images/projects/archetype/slide-5.png',
        caption: 'Detailed psychometric profile report with cognitive blindspots',
        alt: 'Know Your Archetype psychometric report'
      }
    ]
  },
  {
    id: 'careerloom',
    title: 'CareerLoom',
    category: 'Career Discovery',
    statusTag: '● 200+ FIRMS',
    oneLiner: 'Natural language career discovery engine aggregating direct enterprise ATS feeds across 200+ elite global firms.',
    narrative: 'Frustrated by recruiter spam, stale job boards, and disjointed ATS portals, I created CareerLoom as a desktop-grade command center that ingests direct career feeds from OpenAI, Stripe, Jane Street, and top Indian startups.',
    innovations: [
      {
        title: 'Multi-ATS Direct Feed Ingestion',
        metric: '200+ Elite Firms',
        desc: 'Zero-scraping direct ingestion pipelines across Greenhouse, Lever, Ashby, and Workday CXS endpoints.'
      },
      {
        title: 'Natural Language Semantic Querying',
        metric: 'Free LLM Parser',
        desc: 'Conversational omnibox parser converting queries like "remote junior python in fintech" into precise facet filters.'
      },
      {
        title: '3-Column Master-Detail Control Center',
        metric: 'Sub-50ms Nav',
        desc: 'Linear-inspired keyboard-first navigation with instant inspector drawer and community interview intelligence.'
      }
    ],
    techStack: [
      { name: 'NLP Search', primary: true },
      { name: 'Master-Detail UI', primary: true },
      { name: 'Community Intel', primary: false },
      { name: 'Direct ATS Ingestion', primary: false }
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/Prashant1873/CareerLoom',
    screenshots: [
      {
        src: '/images/projects/careerloom/slide-1.png',
        caption: 'Desktop master-detail career search command center',
        alt: 'CareerLoom master-detail job search interface'
      },
      {
        src: '/images/projects/careerloom/slide-2.png',
        caption: 'Direct ATS application pipeline with company sentiment badges',
        alt: 'CareerLoom ATS pipeline view'
      },
      {
        src: '/images/projects/careerloom/slide-3.png',
        caption: 'Faceted query filtering and regional Indian tech hub locator',
        alt: 'CareerLoom query filters and Indian tech hubs'
      }
    ]
  },
  {
    id: 'marcutie',
    title: 'Marcutie',
    category: 'Creative Automation',
    statusTag: '● LOCAL-FIRST',
    oneLiner: 'Brag-grade product launch video generator transforming codebases and repo URLs into cinematic motion clips.',
    narrative: 'Tired of spending hours in video editors just to announce code releases, I designed Marcutie to render high-octane launch videos locally from git commits and landing page URLs using generative motion primitives.',
    innovations: [
      {
        title: 'Local-First Video Rendering',
        metric: 'Zero Cloud Fees',
        desc: 'Deterministic browser-based canvas and WebCodecs rendering pipeline exporting 60fps MP4s directly on the client machine.'
      },
      {
        title: 'Multimodal Code Ingestion',
        metric: 'Instant Scaffolding',
        desc: 'Parses package.json, git log, and code comments to generate kinetic scene blueprints and typography sequences.'
      },
      {
        title: 'Kinetic Monospace Subtitles',
        metric: '60 FPS Springs',
        desc: 'Dynamic spring-physics caption animations synced to audio wave tracks for punchy, product-led social announcements.'
      }
    ],
    techStack: [
      { name: 'Local Rendering', primary: true },
      { name: 'Multimodal AI', primary: true },
      { name: 'Kinetic Subtitles', primary: false },
      { name: 'GSAP / Canvas', primary: false }
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/Prashant1873/Marcutie',
    screenshots: [
      {
        src: '/images/projects/marcutie/slide-1.png',
        caption: 'Video storyboard studio with kinetic typography and audio timeline',
        alt: 'Marcutie video storyboard studio'
      },
      {
        src: '/images/projects/marcutie/slide-2.png',
        caption: 'Dynamic template customization panel with aspect-ratio controls',
        alt: 'Marcutie template customization panel'
      },
      {
        src: '/images/projects/marcutie/slide-3.png',
        caption: 'Deterministic WebCodecs rendering progress and preview player',
        alt: 'Marcutie rendering preview player'
      }
    ]
  }
];
