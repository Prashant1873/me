/**
 * Contact & Channels Data Model - Phase 7
 * Authentic links, phone, email, resume, and Newsreader editorial statement
 */

export const CONTACT_CHANNELS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/prashantmanishukla',
    url: 'https://www.linkedin.com/in/prashantmanishukla',
    actionText: 'Connect on LinkedIn',
    icon: 'linkedin'
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'github.com/Prashant1873',
    url: 'https://github.com/Prashant1873',
    actionText: 'Explore Repositories',
    icon: 'github'
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'shuklaprashant847@gmail.com',
    url: 'mailto:shuklaprashant847@gmail.com',
    actionText: 'Copy Email Address',
    icon: 'email',
    isCopyable: true
  },
  {
    id: 'phone',
    label: 'Phone',
    handle: '+91 96967 21493',
    url: 'tel:+919696721493',
    actionText: 'Call Directly',
    icon: 'phone'
  }
];

export const EDITORIAL_STATEMENT = {
  quote: 'Architecting category-defining product strategies from first principles and forging high-leverage systems that turn ambitious visions into market-defining products people revere.',
  author: 'Prashant Shukla',
  sub: 'IIT Bombay Aerospace // Product, Strategy & AI Automation'
};

export const RESUME_DATA = {
  label: 'Download Official Resume',
  format: 'PDF (IIT Bombay)',
  fileName: 'Prashant Shukla Resume IIT Bombay.pdf',
  url: './Prashant_Shukla_Resume_IIT_Bombay.pdf'
};

