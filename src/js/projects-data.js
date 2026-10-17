/**
 * Canonical Project Records for Prashant Shukla's Portfolio
 * Structured Intensity Portfolio - Phase 6 Projects Section
 */

export const PROJECTS = [
  {
    id: 'bickerbape',
    title: 'BickerBape',
    category: 'Fintech & Compounding',
    statusTag: '● 98/98 TESTS',
    oneLiner: 'Algorithmic mutual fund screener & compounding engine built with Next.js 16 and a 98-test Vitest harness.',
    narrative: 'Engineered to invest my first salary without biased advisor ratings or high active fees. Gives retail investors clean, mathematically rigorous compounding simulations and instant portfolio clarity.',
    innovations: [
      {
        title: 'Dual-Engine Compounding Simulator',
        metric: '100% Client-Side',
        desc: 'Real-time Monte Carlo progression engine running thousands of compounding trajectory calculations entirely client-side. Dynamically computes multi-decade CAGR distributions, rolling standard deviations, and tax-drag impact with sub-millisecond reaction times.'
      },
      {
        title: 'Vitest Mathematical Test Harness',
        metric: '98/98 Tests Passed',
        desc: 'Exhaustive unit, property-based, and mathematical boundary verification suite. Validates expense ratio decay curves, benchmark alpha/beta computations, and inflation-adjusted terminal value algorithms against commercial fund matrices.'
      },
      {
        title: 'Next.js 16 & React 19 Core',
        metric: 'Sub-50ms Filtering',
        desc: 'Zero-overhead component architecture leveraging React 19 compiler primitives and concurrent state transitions. Enables instant parametric multi-filter traversal across thousands of schemes without re-render cascades or layout shifts.'
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
        src: './images/projects/bickerbape/slide-1.webp',
        thumb: './images/projects/bickerbape/thumb_slide-1.webp',
        caption: 'Interactive Mutual Fund Screener with category filters & CAGR rankers',
        alt: 'BickerBape mutual fund screener showing scheme rankings'
      },
      {
        src: './images/projects/bickerbape/slide-2.webp',
        thumb: './images/projects/bickerbape/thumb_slide-2.webp',
        caption: 'Historical performance & expense ratio distribution breakdown',
        alt: 'BickerBape historical performance charts and distribution'
      },
      {
        src: './images/projects/bickerbape/slide-3.webp',
        thumb: './images/projects/bickerbape/thumb_slide-3.webp',
        caption: 'Compounding simulator input deck with monthly SIP toggles',
        alt: 'BickerBape compounding simulator inputs'
      },
      {
        src: './images/projects/bickerbape/slide-4.webp',
        thumb: './images/projects/bickerbape/thumb_slide-4.webp',
        caption: 'Visual growth trajectory comparison across hybrid and equity funds',
        alt: 'BickerBape growth trajectory curves'
      },
      {
        src: './images/projects/bickerbape/slide-5.webp',
        thumb: './images/projects/bickerbape/thumb_slide-5.webp',
        caption: 'Category-wise risk/reward quadrant and beta score matrix',
        alt: 'BickerBape risk and reward matrix'
      },
      {
        src: './images/projects/bickerbape/slide-6.webp',
        thumb: './images/projects/bickerbape/thumb_slide-6.webp',
        caption: 'Portfolio allocation inspector and tax efficiency estimators',
        alt: 'BickerBape portfolio allocation inspector'
      },
      {
        src: './images/projects/bickerbape/slide-7.webp',
        thumb: './images/projects/bickerbape/thumb_slide-7.webp',
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
    narrative: 'Frustrated by opaque email tools and punitive per-seat SaaS taxes. Built a sovereign, self-hosted cold outreach engine with complete control over inbox deliverability and sending cadence.',
    innovations: [
      {
        title: 'Sovereign Deliverability Engine',
        metric: '0 SaaS Fees',
        desc: 'Direct SMTP socket orchestrator with multi-inbox round-robin rotation and dynamic throttle pacing. Automates custom domain DKIM/SPF/DMARC alignment validation and detects early ISP reputation throttling before deliverability drops.'
      },
      {
        title: 'Zero-Latency SQLite Subsystem',
        metric: '<10MB RAM Idle',
        desc: 'Embedded ACID-compliant SQLite architecture with Express 5 connection pooling delivering sub-5ms sequence queries. Eliminates memory-heavy Docker microservices and costly cloud database bills for solo operators.'
      },
      {
        title: 'Multi-Stage Campaign State Machine',
        metric: '6-Stage Flow',
        desc: 'Visual stage pipeline tracking lead states from warm-up to replied with automated time-delay follow-ups. Features real-time webhook ingestion for open and click tracking with strict deduplication guards.'
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
        src: './images/projects/strokecrm/slide-1.webp',
        thumb: './images/projects/strokecrm/thumb_slide-1.webp',
        caption: 'Campaign performance dashboard with live sending cadence',
        alt: 'StrokeCRM campaign performance dashboard'
      },
      {
        src: './images/projects/strokecrm/slide-2.webp',
        thumb: './images/projects/strokecrm/thumb_slide-2.webp',
        caption: 'Multi-account SMTP configuration & inbox warming health status',
        alt: 'StrokeCRM SMTP and inbox configuration'
      },
      {
        src: './images/projects/strokecrm/slide-3.webp',
        thumb: './images/projects/strokecrm/thumb_slide-3.webp',
        caption: 'Lead list segmentation and personalized tag injection matrix',
        alt: 'StrokeCRM lead segmentation matrix'
      },
      {
        src: './images/projects/strokecrm/slide-4.webp',
        thumb: './images/projects/strokecrm/thumb_slide-4.webp',
        caption: 'Automated sequence timeline builder with time-delay triggers',
        alt: 'StrokeCRM automated sequence builder'
      },
      {
        src: './images/projects/strokecrm/slide-5.webp',
        thumb: './images/projects/strokecrm/thumb_slide-5.webp',
        caption: 'Real-time delivery log and bounce detection inspector',
        alt: 'StrokeCRM delivery log and bounce monitor'
      },
      {
        src: './images/projects/strokecrm/slide-6.webp',
        thumb: './images/projects/strokecrm/thumb_slide-6.webp',
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
    narrative: 'Bridging the discovery void in Indian hardware manufacturing. Built an interactive geospatial engine and multimodal AI parser to map 500+ verified production facilities direct to founders.',
    innovations: [
      {
        title: 'Geospatial Industrial Cluster Map',
        metric: '500+ Plants Mapped',
        desc: 'Hardware-accelerated MapLibre GL vector canvas plotting verified precision manufacturing clusters across Gujarat, Maharashtra, and Tamil Nadu. Features dynamic spatial clustering and millisecond viewport filtering.'
      },
      {
        title: 'Multimodal Gemini Extraction Engine',
        metric: 'Automated Ingestion',
        desc: 'Multimodal AI pipeline parsing unstructured supplier machinery spec sheets, CNC tolerance brochures, and ISO compliance PDFs into structured machine capacity records with high entity extraction accuracy.'
      },
      {
        title: 'Parametric RFP Matchmaking',
        metric: 'Instant Search',
        desc: 'Direct manufacturer discovery engine matching engineering bill-of-materials tolerances directly to certified job shops, eliminating opaque brokerage layers and procurement latency.'
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
        src: './images/projects/trinet/slide-1.webp',
        thumb: './images/projects/trinet/thumb_slide-1.webp',
        caption: 'National industrial cluster map with interactive regional filters',
        alt: 'TRINET national manufacturing cluster map'
      },
      {
        src: './images/projects/trinet/slide-2.webp',
        thumb: './images/projects/trinet/thumb_slide-2.webp',
        caption: 'Vendor capability dossier with machine specs and quality certifications',
        alt: 'TRINET vendor capability and machinery dossier'
      },
      {
        src: './images/projects/trinet/slide-3.webp',
        thumb: './images/projects/trinet/thumb_slide-3.webp',
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
    narrative: 'Most personality tests rely on transparent, gameable binary questions. Designed an 18-dilemma simulation engine that maps executive charisma into continuous 2D vector coordinates.',
    innovations: [
      {
        title: 'Continuous 2D Vector Plane',
        metric: 'Vector Coordinates',
        desc: 'Mathematical vector engine projecting multi-factor psychological answers onto a continuous 2D polar plane (Magnetism vs Authority, Warmth vs Vision). Replaces reductive Myers-Briggs binaries with nuanced spatial coordinate clusters.'
      },
      {
        title: '18-Scenario Dilemma Engine',
        metric: 'Branching Logic',
        desc: 'Realistic high-stakes executive leadership dilemmas forcing calibrated trade-offs under competing constraints. Dynamically weights subconscious risk tolerance, empathy markers, and strategic decisive posture.'
      },
      {
        title: 'Zero-Dependency Micro-Engine',
        metric: '<12KB Zero-Dependency',
        desc: 'Handcrafted Vanilla JS and mathematical SVG rendering engine executing entirely client-side. Boots in under 15ms with zero external UI frameworks, yielding instant interaction and absolute cross-browser portability.'
      }
    ],
    techStack: [
      { name: 'Vanilla JS', primary: true },
      { name: 'SVG Math', primary: true },
      { name: 'Webhooks', primary: false },
      { name: 'Vanilla CSS', primary: false }
    ],
    liveUrl: 'https://prashant1873.github.io/KnowYourArchetype/',
    githubUrl: 'https://github.com/Prashant1873/KnowYourArchetype',
    screenshots: [
      {
        src: './images/projects/archetype/slide-1.webp',
        thumb: './images/projects/archetype/thumb_slide-1.webp',
        caption: 'Assessment welcome interface and psychometric philosophy intro',
        alt: 'Know Your Archetype welcome assessment screen'
      },
      {
        src: './images/projects/archetype/slide-2.webp',
        thumb: './images/projects/archetype/thumb_slide-2.webp',
        caption: 'Interactive scenario evaluation card with moral dilemma options',
        alt: 'Know Your Archetype dilemma decision card'
      },
      {
        src: './images/projects/archetype/slide-3.webp',
        thumb: './images/projects/archetype/thumb_slide-3.webp',
        caption: 'Intermediate response calibration and sentiment balance meter',
        alt: 'Know Your Archetype sentiment balance meter'
      },
      {
        src: './images/projects/archetype/slide-4.webp',
        thumb: './images/projects/archetype/thumb_slide-4.webp',
        caption: 'Archetype coordinate visualization on continuous 2D polar plane',
        alt: 'Know Your Archetype polar coordinate plane'
      },
      {
        src: './images/projects/archetype/slide-5.webp',
        thumb: './images/projects/archetype/thumb_slide-5.webp',
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
    narrative: 'Cutting through recruiter spam and stale job boards. Direct API ingestion across 200+ elite tech firms with natural language querying and community referral intelligence.',
    innovations: [
      {
        title: 'Multi-ATS Ingestion Pipeline',
        metric: '200+ Elite Firms',
        desc: 'Direct API polling pipelines aggregating live job feeds from Greenhouse, Lever, Ashby, and Workday CXS endpoints. Bypasses stale scraper aggregators to deliver verified, zero-latency job opportunities direct from source.'
      },
      {
        title: 'Semantic Natural Language Parser',
        metric: 'Omnibox Intelligence',
        desc: 'Conversational omnibox parser converting complex unstructured queries like "remote junior product in fintech" into multi-dimensional structured database filters with instant facet reactivity.'
      },
      {
        title: 'Master-Detail Control Cockpit',
        metric: 'Sub-50ms Nav',
        desc: 'Linear-inspired 3-column split view with full keyboard shortcuts (J/K navigation, Space to preview). Features instant inspector drawers, compensation breakdowns, and community referral intelligence.'
      }
    ],
    techStack: [
      { name: 'NLP Search', primary: true },
      { name: 'Master-Detail UI', primary: true },
      { name: 'Community Intel', primary: false },
      { name: 'Direct ATS Ingestion', primary: false }
    ],
    liveUrl: 'https://careerloom-frontend.onrender.com/',
    githubUrl: 'https://github.com/Prashant1873/CareerLoom',
    screenshots: [
      {
        src: './images/projects/careerloom/slide-1.webp',
        thumb: './images/projects/careerloom/thumb_slide-1.webp',
        caption: 'Desktop master-detail career search command center',
        alt: 'CareerLoom master-detail job search interface'
      },
      {
        src: './images/projects/careerloom/slide-2.webp',
        thumb: './images/projects/careerloom/thumb_slide-2.webp',
        caption: 'Interactive job detail inspector with direct ATS application pipeline',
        alt: 'CareerLoom job detail split view'
      },
      {
        src: './images/projects/careerloom/slide-3.webp',
        thumb: './images/projects/careerloom/thumb_slide-3.webp',
        caption: 'Enterprise career directory with multi-ATS company index',
        alt: 'CareerLoom enterprise company directory'
      },
      {
        src: './images/projects/careerloom/slide-4.webp',
        thumb: './images/projects/careerloom/thumb_slide-4.webp',
        caption: 'Pan-India tech lead discovery with regional hub filtering',
        alt: 'CareerLoom India leads and tech hubs locator'
      },
      {
        src: './images/projects/careerloom/slide-5.webp',
        thumb: './images/projects/careerloom/thumb_slide-5.webp',
        caption: 'Natural language semantic query parser transforming conversational inputs',
        alt: 'CareerLoom semantic NLP search in action'
      },
      {
        src: './images/projects/careerloom/slide-6.webp',
        thumb: './images/projects/careerloom/thumb_slide-6.webp',
        caption: 'Community referral network intelligence modal',
        alt: 'CareerLoom referral intelligence modal'
      },
      {
        src: './images/projects/careerloom/slide-7.webp',
        thumb: './images/projects/careerloom/thumb_slide-7.webp',
        caption: 'Targeted referral pitch builder and alumni outreach synthesizer',
        alt: 'CareerLoom referral pitch builder'
      }
    ]
  },
  {
    id: 'marcutie',
    title: 'Marcutie',
    category: 'Creative Automation',
    statusTag: '● LOCAL-FIRST',
    oneLiner: 'Brag-grade product launch video generator transforming codebases and repo URLs into cinematic motion clips.',
    narrative: 'Product builders shouldn\'t spend entire weekends fighting video editors to announce releases. Generates brag-grade 60fps launch videos directly in the browser with zero cloud render fees.',
    innovations: [
      {
        title: 'Local-First Browser Rendering',
        metric: 'Zero Cloud Fees',
        desc: 'Deterministic HTML Canvas and WebCodecs encoding pipeline rendering and exporting 60fps high-bitrate MP4 launch clips directly on client hardware with zero remote server rendering costs.'
      },
      {
        title: 'Multimodal Codebase Ingestion',
        metric: 'Instant Scaffolding',
        desc: 'Deep codebase parser analyzing repository structures, package.json dependencies, and commit logs to automatically synthesize kinetic scene blueprints and typography sequences.'
      },
      {
        title: 'Spring-Physics Kinetic Typography',
        metric: '60 FPS Springs',
        desc: 'Dynamic typography engine synchronizing monospace text reveals and motion transitions to audio waveforms using Apple fluid spring curves and precise audio ducking clocks.'
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
        src: './images/projects/marcutie/slide-1.webp',
        thumb: './images/projects/marcutie/thumb_slide-1.webp',
        caption: 'Video creation studio overview with real-time browser canvas preview',
        alt: 'Marcutie video creation studio overview'
      },
      {
        src: './images/projects/marcutie/slide-2.webp',
        thumb: './images/projects/marcutie/thumb_slide-2.webp',
        caption: 'Tone, pacing, and format configuration with kinetic aspect controls',
        alt: 'Marcutie tone and format configuration'
      },
      {
        src: './images/projects/marcutie/slide-3.webp',
        thumb: './images/projects/marcutie/thumb_slide-3.webp',
        caption: 'Brand and visual identity system with custom typography palettes',
        alt: 'Marcutie brand and visual settings'
      },
      {
        src: './images/projects/marcutie/slide-4.webp',
        thumb: './images/projects/marcutie/thumb_slide-4.webp',
        caption: 'Voiceover synthesis and audio wave synchronizer controls',
        alt: 'Marcutie voiceover settings and audio controls'
      },
      {
        src: './images/projects/marcutie/slide-5.webp',
        thumb: './images/projects/marcutie/thumb_slide-5.webp',
        caption: 'Advanced video rendering engine and export settings modal',
        alt: 'Marcutie settings modal and export configuration'
      }
    ]
  }
];
