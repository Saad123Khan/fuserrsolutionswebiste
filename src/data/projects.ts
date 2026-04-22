export interface Project {
  slug: string;
  title: string;
  tagline: string;
  industry: string;
  service: string;
  year: string;
  duration: string;
  client: string;
  cover: string;
  color: string;
  overview: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  tech: string[];
  testimonial?: { quote: string; author: string; role: string };
}

export const projects: Project[] = [
  {
    slug: 'healthtrack-ai',
    title: 'HealthTrack AI',
    tagline: 'Intelligent patient monitoring platform',
    industry: 'Healthcare',
    service: 'AI Development',
    year: '2024',
    duration: '6 months',
    client: 'MediCore Systems',
    cover: '/projects/healthtrack.jpg',
    color: '#10B981',
    overview:
      'A real-time patient monitoring SaaS powered by machine learning, enabling hospitals to predict adverse events 48 hours before they occur with 94% accuracy.',
    challenge:
      'MediCore needed to reduce ICU readmission rates by identifying at-risk patients earlier. Their existing system relied on manual chart reviews, causing delays and missed signals in large patient volumes.',
    solution:
      'We built an AI pipeline ingesting EHR data, vitals streams, and lab results. An LSTM-based model flags deteriorating patients on a live dashboard. Clinicians receive prioritized alerts with explainable risk factors via a mobile-first interface.',
    results: [
      { metric: '94%', label: 'Prediction accuracy' },
      { metric: '48h', label: 'Early warning window' },
      { metric: '31%', label: 'Reduction in ICU readmissions' },
      { metric: '2.4×', label: 'Faster clinical response time' },
    ],
    tech: ['Python', 'PyTorch', 'FastAPI', 'React', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    testimonial: {
      quote:
        'Fuserr delivered a system that directly saves lives. The AI predictions have transformed how our clinical teams prioritize care.',
      author: 'Dr. Sarah Okonkwo',
      role: 'Chief Medical Officer, MediCore Systems',
    },
  },
  {
    slug: 'neobank-platform',
    title: 'NeoBank Platform',
    tagline: 'Next-generation digital banking experience',
    industry: 'Fintech',
    service: 'Web Applications',
    year: '2024',
    duration: '9 months',
    client: 'Arvest Financial',
    cover: '/projects/neobank.jpg',
    color: '#3B82F6',
    overview:
      'A fully compliant digital banking platform serving 500K+ users, with real-time transactions, multi-currency support, and embedded finance capabilities.',
    challenge:
      'Arvest needed to compete with challenger banks without rebuilding their legacy core. The new platform had to integrate with their existing core banking system while delivering a modern UX.',
    solution:
      'We built a Next.js frontend with a Go microservices backend, wrapping their legacy core via an API gateway. A BaaS layer handles KYC, AML screening, and regulatory reporting automatically.',
    results: [
      { metric: '500K+', label: 'Active users' },
      { metric: '<200ms', label: 'Transaction latency' },
      { metric: '99.99%', label: 'Platform uptime' },
      { metric: '4.8★', label: 'App store rating' },
    ],
    tech: ['Next.js', 'Go', 'Kubernetes', 'PostgreSQL', 'Kafka', 'Stripe', 'AWS', 'Terraform'],
    testimonial: {
      quote:
        'The platform is flawless. Our NPS jumped from 34 to 71 within three months of launch.',
      author: 'James Thorpe',
      role: 'CTO, Arvest Financial',
    },
  },
  {
    slug: 'edverse-lms',
    title: 'EduVerse LMS',
    tagline: 'AI-powered learning management system',
    industry: 'Education',
    service: 'Web Applications',
    year: '2023',
    duration: '5 months',
    client: 'Luminary Education',
    cover: '/projects/edverse.jpg',
    color: '#8B5CF6',
    overview:
      'An adaptive LMS serving 120K students across 14 countries, with AI-driven personalized learning paths and real-time progress analytics.',
    challenge:
      "Luminary's previous Moodle setup couldn't handle adaptive content or provide instructors with actionable analytics. Engagement rates were declining.",
    solution:
      "We designed a custom LMS with a React frontend, Node.js backend, and an AI recommendation engine that tailors content difficulty based on each learner's mastery curve.",
    results: [
      { metric: '120K', label: 'Active learners' },
      { metric: '67%', label: 'Improvement in course completion' },
      { metric: '3.2×', label: 'Increase in engagement' },
      { metric: '14', label: 'Countries deployed' },
    ],
    tech: ['React', 'Node.js', 'Python', 'MongoDB', 'Redis', 'WebRTC', 'GCP'],
  },
  {
    slug: 'shopflow-commerce',
    title: 'ShopFlow Commerce',
    tagline: 'Headless ecommerce at enterprise scale',
    industry: 'Ecommerce',
    service: 'Ecommerce',
    year: '2024',
    duration: '4 months',
    client: 'Meridian Brands',
    cover: '/projects/shopflow.jpg',
    color: '#F59E0B',
    overview:
      'A headless commerce platform for a multi-brand retailer, processing $12M+ monthly GMV with hyper-personalized storefronts and real-time inventory.',
    challenge:
      "Meridian operated 6 brands on a monolithic Magento setup. Performance was poor, conversion rates were below industry average, and the team couldn't iterate quickly.",
    solution:
      'We migrated to a headless architecture with Next.js storefronts, Shopify Plus as the commerce engine, and a custom PIM. Personalization is handled by a ML recommendation service.',
    results: [
      { metric: '$12M+', label: 'Monthly GMV processed' },
      { metric: '2.8×', label: 'Improvement in page speed' },
      { metric: '22%', label: 'Increase in conversion rate' },
      { metric: '6', label: 'Brands on single platform' },
    ],
    tech: ['Next.js', 'Shopify', 'GraphQL', 'Elasticsearch', 'Redis', 'Vercel', 'Cloudflare'],
  },
  {
    slug: 'legalease-pro',
    title: 'LegalEase Pro',
    tagline: 'AI contract analysis for legal teams',
    industry: 'Legal Tech',
    service: 'AI Development',
    year: '2023',
    duration: '7 months',
    client: 'Thornton & Associates',
    cover: '/projects/legalease.jpg',
    color: '#06B6D4',
    overview:
      'An AI-powered contract review platform that reduces legal review time by 70%, surfacing risks, obligations, and anomalies from thousands of documents.',
    challenge:
      'The firm reviewed 300+ contracts monthly using junior associates. Turnaround times were 5–10 days, and human error rates were unacceptable for a high-stakes practice.',
    solution:
      'We built an LLM-based pipeline (GPT-4 + fine-tuned BERT) that extracts clauses, identifies risks, and generates review summaries. A lawyer-in-the-loop interface allows one-click annotations.',
    results: [
      { metric: '70%', label: 'Reduction in review time' },
      { metric: '300+', label: 'Contracts processed monthly' },
      { metric: '98.2%', label: 'Clause extraction accuracy' },
      { metric: '4h→45min', label: 'Average review time' },
    ],
    tech: ['Python', 'OpenAI', 'LangChain', 'FastAPI', 'React', 'PostgreSQL', 'AWS'],
  },
  {
    slug: 'logichain-platform',
    title: 'LogiChain Platform',
    tagline: 'Real-time supply chain intelligence',
    industry: 'Logistics',
    service: 'Web Applications',
    year: '2024',
    duration: '8 months',
    client: 'TransGlobal Freight',
    cover: '/projects/logichain.jpg',
    color: '#EF4444',
    overview:
      'End-to-end supply chain visibility platform tracking 50K+ shipments daily with ML-based ETA predictions and anomaly detection.',
    challenge:
      'TransGlobal managed shipments across 40 countries with no unified visibility. Delays were discovered reactively, causing $2M+ annually in penalties.',
    solution:
      'We built a unified data platform aggregating IoT sensors, carrier APIs, and customs systems. An ML model predicts delays 72 hours out, enabling proactive rerouting.',
    results: [
      { metric: '50K+', label: 'Daily shipments tracked' },
      { metric: '72h', label: 'Delay prediction window' },
      { metric: '89%', label: 'On-time delivery improvement' },
      { metric: '$2.1M', label: 'Annual penalty savings' },
    ],
    tech: ['Python', 'Kafka', 'Spark', 'React', 'TimescaleDB', 'Kubernetes', 'GCP'],
  },
];
