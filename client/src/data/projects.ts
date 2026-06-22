export interface Project {
  slug: string;
  title: string;
  tagline: string;
  industry: string;
  service: string;
  client: string;
  cover: string;
  color: string;
  overview: string;
  challenge: string;
  solution: string;
  results?: { metric: string; label: string }[];
  sections?: { heading: string; points: string[] }[];
  tech: string[];
  testimonial?: { quote: string; author: string; role: string };
}

export const projects: Project[] = [
  {
    slug: 'tko',
    title: 'TKO Vitality Patient Portal MVP',
    tagline: 'Intelligent patient monitoring platform',
    industry: 'TKO',
    service: 'AI Development',
    client: 'MediCore Systems',
    cover: '/Gemini_Generated_Image_8tgotw8tgotw8tgo.png',
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
    sections: [
      {
        heading: 'TKO Vitality Patient Portal MVP — Overview',
        points: [
          'HIPAA-compliant patient portal centralizing intake, consultations, prescriptions, lab orders, and membership management for thousands of patients.',
          'Supports patient onboarding, intake forms, telehealth consultations, medication ordering, lab access, and membership subscriptions from a single portal.',
        ],
      },
      {
        heading: 'The Challenge',
        points: [
          'Patient data was fragmented across multiple systems and manual processes slowed care delivery.',
          'Membership billing, consent tracking, and state licensing needed robust enforcement and auditability.',
          'Providers and staff lacked streamlined workflows for consults, prescriptions, lab results, and operational visibility.',
        ],
      },
      {
        heading: 'Our Solution',
        points: [
          'Built a secure, scalable telehealth ecosystem with three portals: Patient, Provider, and Staff/Admin.',
          'Implemented dynamic intake, membership tiers, consultation workflows, prescription management, lab integrations, and consent controls.',
        ],
      },
      {
        heading: 'What We Built',
        points: [
          'Patient Portal: account creation, dynamic medical intake, scheduling, medication purchase, lab ordering, and order tracking.',
          'Provider Portal: review patient histories, conduct live/asynchronous consults, upload prescriptions and lab results, and manage treatment eligibility.',
          'Staff & Admin Portal: patient and membership management, consult queue oversight, lab and pharmacy order monitoring, and platform configuration.',
        ],
      },
      {
        heading: 'Technical Highlights',
        points: [
          'AWS-hosted infrastructure with secure authentication, encrypted storage, and audit-ready consent tracking.',
          'Dynamic intake engine with conditional logic for treatment-specific workflows (e.g., TRT, HRT, NAD+).',
          'Integrated pharmacy and lab APIs for secure ordering and real-time tracking.',
        ],
      },
      {
        heading: 'Key Features',
        points: [
          'Membership management with tiered benefits and recurring billing',
          'Asynchronous and live video consultations',
          'Prescription uploads and medication ordering',
          'Lab panel requisitions and result access',
          'Consent & compliance framework for HIPAA and controlled substances',
        ],
      },
      {
        heading: 'Integrations',
        points: [
          'AWS Cognito for authentication',
          'NMI for payments',
          'Google Meet for video consultations',
          'Junction API for laboratory integrations',
          'VS Digital Health API for pharmacy integration',
          'Partel for communication and notifications',
          'AWS S3 for secure document storage',
          'Email notification system for transactional messages',
        ],
      },
      {
        heading: 'Results',
        points: [
          'Transformed a manual telehealth operation into a centralized platform, improving patient experience and operational efficiency.',
          'Enabled scalable handling of patient onboarding, consults, prescriptions, labs, and memberships with improved auditability and compliance.',
        ],
      },
    ],
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS Lambda', 'AWS Cognito', 'AWS', 'NMI', 'Junction API', 'VS Digital Health API', 'Partel', 'Google Meet'],
    testimonial: {
      quote:
        'Fuserr delivered a system that directly saves lives. The AI predictions have transformed how our clinical teams prioritize care.',
      author: 'Dr. Sarah Okonkwo',
      role: 'Chief Medical Officer, MediCore Systems',
    },
  },
  {
    slug: 'erebix',
    title: 'Erebix',
    tagline: 'AI-powered fitness & nutrition coaching',
    industry: 'Health & Fitness',
    service: 'Mobile & Web Applications',
    client: 'Erebix Inc.',
    cover: '/image2.png',
    color: '#3B82F6',
    overview:
      'Erebix is an AI-powered fitness and nutrition platform that delivers personalized workout plans, adaptive meal programs, and intelligent coaching through a mobile-first ecosystem.',
    challenge:
      'Most fitness apps provide generic programs that fail to account for individual goals, limitations, dietary needs, and progress. The client needed a scalable solution that could automate personalized coaching and remain accessible globally.',
    solution:
      'We built a mobile-first AI coaching platform combining React Native apps, a React admin dashboard, and a Node.js backend. OpenAI-based workflows generate personalized workouts and meal plans, while subscription, referral, and analytics systems handle monetization and growth.',
    sections: [
      {
        heading: 'What We Built',
        points: [
          'Mobile application (React Native) with personalized onboarding, AI-generated workout and meal plans, progress tracking, and push notifications',
          'AI Coaching System: conversational coach with contextual awareness of goals, plans, and progress',
          'Admin Dashboard (React & TypeScript) for user, subscription, and influencer management',
          'Backend services (Node.js) for AI orchestration, subscription billing, referrals, and notifications',
        ],
      },
      {
        heading: 'Key Features',
        points: [
          'AI-powered personalized plan generation during onboarding',
          'Intelligent fitness dashboard with daily summaries and progress indicators',
          'AI nutrition planning with allergy- and preference-aware meal programs',
          'Conversational AI coach for guidance and motivation',
          'Adaptive plan optimization based on progress and user feedback',
          'Influencer referral and subscription management',
        ],
      },
      {
        heading: 'Technical Highlights',
        points: [
          'Integrated OpenAI models for plan generation, coaching, and progress analysis',
          'React Native mobile apps and React admin dashboard in TypeScript',
          'Node.js backend with REST APIs and AI workflow engine',
          'Stripe for payments and Resend for transactional emails',
          'Scalable cloud infrastructure and performant data pipelines',
        ],
      },
      {
        heading: 'Core Platform Modules',
        points: [
          'AI Fitness Coach',
          'AI Meal Planning Engine',
          'AI Workout Generation',
          'Progress Tracking & Analysis',
          'Subscription Management',
          'Influencer Referral System',
          'Notifications & Reminders',
          'User & Plan Management',
          'Admin Dashboard',
          'Fitness Analytics',
          'Personalized Coaching Engine',
        ],
      },
      {
        heading: 'Business Impact',
        points: [
          'Erebix transforms traditional fitness applications into an intelligent coaching ecosystem capable of delivering highly personalized fitness and nutrition experiences at scale.',
          'The platform reduces dependency on manual coaching while providing users with individualized guidance, adaptive training programs, and continuous motivation throughout their fitness journey.',
          'By combining artificial intelligence, subscription-based monetization, influencer-driven growth, and adaptive coaching workflows, Erebix creates a scalable digital fitness solution capable of serving thousands of users simultaneously.',
        ],
      },
    ],
    tech: [
      'React Native',
      'React',
      'TypeScript',
      'Node.js',
      'OpenAI',
      'Stripe',
      'Resend',
      'PostgreSQL',
      'AWS',
    ],
    testimonial: {
      quote:
        'The AI coach delivers truly personalized guidance; engagement and retention improved dramatically.',
      author: 'Nora Patel',
      role: 'Head of Product, Erebix',
    },
  },
  {
    slug: 'assistify',
    title: 'Assistify web',
    tagline: 'AI-powered learning management system',
    industry: 'Assistify',
    service: 'Web Applications',
    client: 'Luminary Education',
    cover: '/Gemini_Generated_Image_jrdqwgjrdqwgjrdq.png',
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
    slug: 'copy-smart',
    title: 'Copy Smart (Ecommerce)',
    tagline: 'Headless ecommerce at enterprise scale',
    industry: 'Copy Smart',
    service: 'Ecommerce',
    client: 'Meridian Brands',
    cover: '/image2.jpg',
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
    sections: [
      {
        heading: 'CopySmart – Online Printing & Design Services Platform — Overview',
        points: [
          'CopySmart is a digital platform designed to simplify ordering professional printing, copying, design, and marketing materials online. Customers can place orders, upload requirements, make secure payments, track progress, and receive completed products through integrated delivery services.',
          'Built to replace manual order management with a streamlined digital workflow that improves operational efficiency and customer experience.',
        ],
      },
      {
        heading: 'The Challenge',
        points: [
          'Client required a modern web platform to allow customers to order printing and design services online without manual quotations, approvals, payment collection, and delivery coordination.',
          'Needed centralized management for products, orders, payments, shipping, and content while providing full visibility into the order lifecycle.',
        ],
      },
      {
        heading: 'Our Solution',
        points: [
          'Designed and developed a full-featured printing and design services platform that digitizes the entire customer journey—from order placement and payment processing to production tracking and delivery updates.',
          'Administrators can manage products, categories, orders, content, and promotions through a powerful CMS.',
        ],
      },
      {
        heading: 'Customer Experience Platform',
        points: [
          'Online ordering for printing, copying, design, and marketing services',
          'Responsive UX across desktop and mobile',
          'Secure checkout and payment processing',
          'Instant invoice generation and order status tracking',
          'Real-time shipment visibility and automated notifications',
        ],
      },
      {
        heading: 'Admin Management Portal',
        points: [
          'Product and service management',
          'Category and content management',
          'Order processing and fulfillment workflows',
          'Sales monitoring and reporting',
          'Marketing and promotional content administration',
        ],
      },
      {
        heading: 'Shipping & Delivery Integration',
        points: [
          'NetParcel integration for shipping management',
          'Real-time delivery tracking and shipment status synchronization',
          'Automated delivery updates for end-to-end order visibility',
        ],
      },
      {
        heading: 'Key Features',
        points: [
          'Digital order processing with minimal manual intervention',
          'Integrated Stripe payments and automatic invoicing',
          'Real-time order tracking and shipment visibility',
          'Flexible content management via Payload CMS',
        ],
      },
      {
        heading: 'Technical Highlights',
        points: [
          'Built a high-performance web app using Next.js',
          'Scalable backend services with Node.js',
          'Payload CMS for content and commerce management',
          'Stripe integration for payments and NetParcel for shipping',
          'Transactional email workflows via Resend and deployment on Vercel',
        ],
      },
      {
        heading: 'Outcome',
        points: [
          'Transformed manual ordering into a fully digital workflow',
          'Improved operational efficiency, increased order visibility, and reduced administrative overhead',
          'Delivered a scalable foundation for future growth',
        ],
      },
    ],
    tech: [
      'Frontend: Next.js',
      'Backend: Node.js',
      'CMS: Payload CMS',
      'Payments: Stripe',
      'Shipping: NetParcel',
      'Email Services: Resend',
      'Hosting & Deployment: Vercel',
      'Database & APIs: Custom Node.js Services',
    ],
  },
  {
    slug: 'scrub-art',
    title: ' Scrub-Art On-Demand Cleaning Services Marketplace',
    tagline: 'AI-powered art restoration platform',
    industry: 'Scrub Art',
    service: 'AI Development',
    client: 'Thornton & Associates',
    cover: '/image.png',
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
    sections: [
      {
        heading: 'On-Demand Cleaning Services Marketplace — Overview',
        points: [
          'A complete on-demand cleaning services platform connecting customers with professional cleaning providers through instant booking, automated job assignment, secure payments, and real-time service management.',
          'Designed to simplify booking for customers while providing providers with tools to manage jobs, payments, and daily operations.',
        ],
      },
      {
        heading: 'The Challenge',
        points: [
          'Build a scalable marketplace to connect customers with nearby cleaning professionals while automating booking, pricing, provider assignment, and payment workflows.',
          'Support multiple service categories, location-based matching, dynamic pricing, scheduling flexibility, and admin oversight for quality control.',
        ],
      },
      {
        heading: 'Our Solution',
        points: [
          'Developed a service marketplace ecosystem with customer and provider mobile apps, an admin portal, and centralized backend infrastructure.',
          'Customers can request services, get transparent pricing, schedule appointments, and pay securely. Providers receive nearby job opportunities, manage bookings, and track earnings.',
        ],
      },
      {
        heading: 'Customer Mobile Application (React Native)',
        points: [
          'Cleaning service selection and booking',
          'Square footage calculator for accurate estimates',
          'Dynamic pricing engine',
          'Custom scheduling and appointment management',
          'Secure Stripe payment integration',
          'Booking history and service tracking',
          'Ratings and reviews system',
        ],
      },
      {
        heading: 'Provider Mobile Application (React Native)',
        points: [
          'Real-time job notifications within a 25km service radius',
          'GPS navigation and route assistance',
          'Job acceptance and management tools',
          'Service status updates',
          'In-app earnings wallet and withdrawal requests',
          'Customer communication capabilities',
        ],
      },
      {
        heading: 'Admin Dashboard (React.js)',
        points: [
          'Service category management',
          'Pricing and package configuration',
          'Booking oversight and analytics',
          'Manual provider assignment capabilities',
          'Provider management and verification',
          'Payment monitoring and reporting',
        ],
      },
      {
        heading: 'Backend Infrastructure',
        points: [
          'Automated provider matching system',
          'Dynamic pricing engine and booking management',
          'Stripe payment processing and wallet/payout management',
          'Notification and communication services',
          'Analytics and reporting tools',
        ],
      },
      {
        heading: 'Key Features',
        points: [
          'Location-based provider matching within a 25km radius',
          'Dynamic pricing based on service type, property size, and add-ons',
          'Automated job assignment with manual override',
          'Integrated wallet & payout management for providers',
          'Flexible service management with packages and add-ons',
        ],
      },
      {
        heading: 'Technical Highlights',
        points: [
          'Automated provider-matching engine',
          'Custom pricing calculator supporting square footage-based pricing',
          'Stripe integration for payments and payouts',
          'Location-aware notifications and GPS-assisted navigation',
          'Scalable architecture for multiple service categories',
        ],
      },
      {
        heading: 'Outcome',
        points: [
          'Delivered a fully operational on-demand cleaning marketplace that streamlined bookings and improved operational visibility',
          'Simplified payment management and automated provider assignment',
          'Established a scalable foundation for growth and new service categories',
        ],
      },
    ],
    tech: [
      'Mobile: React Native',
      'Web: React.js',
      'Backend: Laravel / REST APIs',
      'Database: MySQL',
      'Payments: Stripe',
      'Services: GPS Tracking, Push Notifications, In-App Wallet System, Dynamic Pricing Engine',
    ],
  },
  {
    slug: 'fixie',
    title: 'Fixie – Home Services Marketplace Platform',
    tagline: 'On-demand home services marketplace',
    industry: 'Fixie',
    service: 'Home Services Marketplace',
    client: 'Image5 Client',
    cover: '/image5.png',
    color: '#7C3AED',
    overview:
      'Fixie is a comprehensive home services marketplace that connects homeowners with trusted local service professionals via a mobile-first experience. It supports discovery, booking, secure payments, provider verification, and dispute resolution.',
    challenge:
      'Finding reliable local service professionals involved fragmented communication, uncertain pricing, limited availability info, and low trust. Providers struggled to consistently acquire clients and manage schedules, payments, and reputation.',
    solution:
      'We built a two-sided marketplace with customer and provider mobile apps, a scalable backend, and an admin portal to streamline discovery, booking, payments, verification, and operations.',
    results: [
      { metric: '45%', label: 'Conversion uplift' },
      { metric: '2.1×', label: 'Revenue per visitor' },
    ],
    sections: [
      {
        heading: 'Overview',
        points: [
          'Fixie connects homeowners with trusted local service professionals through a seamless mobile-first experience.',
          'The platform enables discovery, booking, secure payments, reviews, and provider management in a single ecosystem.',
        ],
      },
      {
        heading: 'The Challenge',
        points: [
          'Fragmented communication, uncertain pricing, and limited availability information made discovery and booking unreliable for homeowners.',
          'Service professionals needed better tools for client acquisition, scheduling, payments, and reputation management.',
        ],
      },
      {
        heading: 'Our Solution',
        points: [
          'Delivered dedicated mobile apps for customers and providers, plus an admin portal and scalable backend.',
          'Features include provider verification, booking workflows, secure payments, ratings, and dispute resolution.',
        ],
      },
      {
        heading: 'Customer Mobile Application (React Native)',
        points: [
          'User registration and authentication',
          'Service category browsing and advanced provider search',
          'Provider profile viewing and booking/scheduling',
          'Secure online payments and booking history',
          'Ratings, reviews, and real-time booking status updates',
        ],
      },
      {
        heading: 'Service Provider Mobile Application (React Native)',
        points: [
          'Professional profile creation and verification workflow',
          'Skills and service management, availability scheduling',
          'Job request management, accept/decline bookings',
          'Earnings dashboard and transaction history',
          'Push notifications and customer communication tools',
        ],
      },
      {
        heading: 'Admin Management Portal',
        points: [
          'User and provider management with verification and approval',
          'Booking oversight and transaction monitoring',
          'Commission and dispute management tools',
          'Analytics, reporting, and platform moderation controls',
        ],
      },
      {
        heading: 'Key Features',
        points: [
          'Service discovery and provider matching',
          'Booking and scheduling system with estimated pricing',
          'Provider verification and reputation system',
          'Secure Stripe payments with automated commission deductions',
          'Location-based services via Mapbox integration',
        ],
      },
      {
        heading: 'Technical Highlights',
        points: [
          'Separate mobile apps for customers and providers',
          'Scalable backend services built with Spring Boot',
          'Redis caching for improved performance',
          'Mapbox integration for geolocation and service areas',
          'Transactional email and notifications via Resend',
          'RESTful APIs supporting marketplace operations',
        ],
      },
      {
        heading: 'Business Impact',
        points: [
          'Digitized traditional home services booking, increasing booking efficiency and provider earnings',
          'Improved trust via verification and reviews, reducing disputes and cancellations',
          'Established a scalable foundation for regional expansion',
        ],
      },
    ],
    tech: [
      'Mobile Applications: React Native',
      'Backend: Spring Boot (Java)',
      'Database & Caching: PostgreSQL, Redis',
      'Payments: Stripe',
      'Maps & Location Services: Mapbox',
      'Email & Notifications: Resend',
      'APIs: RESTful Services',
      'Infrastructure: Cloud-based scalable architecture',
    ],
  },
  {
    slug: 'kargo-domus',
    title: 'Kargo Domus Logistics Marketplace Platform',
    tagline: 'Real-time supply chain intelligence',
    industry: 'Kargo Domus',
    service: 'Web Applications',
    client: 'TransGlobal Freight',
    cover: '/image4.png',
    color: '#EF4444',
    overview:
      'Built a complete logistics marketplace that connects customers with delivery service providers through a centralized platform. The solution enables parcel booking, provider matching, real-time shipment tracking, automated payments, and operational management across web and mobile applications.',
    challenge:
      'TransGlobal managed shipments across 40 countries with no unified visibility. Delays were discovered reactively, causing $2M+ annually in penalties.',
    solution:
      'We built a complete logistics marketplace that connects customers with delivery service providers through a centralized platform.',
    sections: [
      {
        heading: 'Solution Delivered — Customer Mobile Application (React Native)',
        points: [
          'Multi-parcel booking system',
          'Location-based pickup and delivery selection',
          'Parcel details management including type, value, weight, and volume',
          'Service provider comparison and selection',
          'Secure online payment processing',
          'Real-time shipment tracking and status updates',
        ],
      },
      {
        heading: 'Provider Mobile Application (React Native)',
        points: [
          'Company profile and service management',
          'Service area configuration',
          'Dynamic pricing setup based on routes and parcel categories',
          'Real-time order notifications',
          'In-app customer communication',
          'Delivery status management',
        ],
      },
      {
        heading: 'Admin Dashboard (React.js)',
        points: [
          'Logistics operations management',
          'Agency and location configuration',
          'Working hours management',
          'Pricing and route management',
          'Order monitoring and reporting',
        ],
      },
      {
        heading: 'Backend Infrastructure (Laravel & MySQL)',
        points: [
          'Intelligent provider matching engine',
          'Stripe Connect payment integration',
          'Automated payment distribution',
          'Real-time tracking system',
          'Refund and dispute management',
          'Scalable API architecture',
        ],
      },
      {
        heading: 'Key Features',
        points: [
          'Intelligent provider matching based on parcel type, destination, and service capabilities',
          'Dynamic pricing engine with custom rates by location, category, distance, and delivery preferences',
          'Real-time delivery tracking from pickup to final delivery',
          'Automated payment split system using Stripe Connect',
          'Multilingual user experience',
          'In-app communication between customers and providers',
          'Refund processing and dispute resolution workflows',
        ],
      },
      {
        heading: 'Results',
        points: [
          'Reduced booking complexity through automated provider matching',
          'Implemented automated payment distribution with 70/30 milestone-based payouts',
          'Increased delivery transparency through real-time shipment tracking',
          'Improved dispute handling with automated refund and provider flagging processes',
          'Enabled flexible pricing models for different delivery scenarios',
          'Delivered a complete end-to-end logistics ecosystem across web and mobile platforms',
        ],
      },
    ],
    tech: [
      'Frontend: React Native, React.js',
      'Backend: Laravel, PHP',
      'Database: MySQL',
      'Payments: Stripe Connect',
      'Infrastructure: REST APIs, Real-Time Tracking Services',
    ],
  },
  {
    slug: 'ai-chatbot',
    title: 'AI Shopping Assistant for E-Commerce',
    tagline: 'Conversational product discovery for ecommerce',
    industry: 'Ecommerce',
    service: 'AI & Product Discovery',
    client: 'Image6 Client',
    cover: '/image6.png',
    color: '#F97316',
    overview:
      'An AI-powered conversational shopping assistant that helps customers find and compare products through natural text and voice conversations, improving discovery and conversion for apparel and accessories retailers.',
    challenge:
      'Customers struggled to find the right products across large catalogs (bags, shoes, sandals, jackets). The client wanted a natural, conversational experience that could ask follow-ups and return personalized recommendations in real time.',
    solution:
      'Built a conversational AI layer using OpenAI for dialogue and a fast retrieval pipeline against the product catalog. The assistant supports follow-up questions, contextual filtering, product comparisons, intelligent upsell/cross-sell, and both text and voice interactions. D-ID avatar integration provides optional video/voice responses for a human-like shopping experience.',
    results: [
      { metric: '+18%', label: 'Conversion uplift (pilot)' },
      { metric: '+32%', label: 'Average session engagement' },
    ],
    sections: [
      {
        heading: 'Project Requirements',
        points: [
          'AI-powered conversational product discovery for bags, shoes, sandals, and jackets',
          'Context-aware follow-up questioning to refine user preferences',
          'Support for both text and voice interactions (voice-to-text and text-to-speech)',
          'Accurate, real-time product retrieval and recommendation from the catalog',
        ],
      },
      {
        heading: 'Key Capabilities',
        points: [
          'Personalized recommendations based on preferences and context',
          'Detailed product information, feature explanations, and comparisons',
          'Upsell and cross-sell suggestions during conversations',
          'Voice note support and hands-free shopping flows',
        ],
      },
      {
        heading: 'Technology Implementation',
        points: [
          'AI & Recommendation Engine: OpenAI ChatGPT for dialogue + retrieval-augmented generation against product data',
          'Backend: Node.js services for AI orchestration, product catalog API, and real-time recommendations',
          'Frontend: React (Next.js) chat UI with voice controls and interactive product cards',
          'AI Avatar: D-ID integration for real-time video + lip-synced voice responses',
        ],
      },
      {
        heading: 'Business Value',
        points: [
          'Transforms browsing into an interactive shopping experience that reduces friction and speeds discovery',
          'Increases average order value via contextual upsells and personalized suggestions',
          'Improves engagement and reduces bounce with multi-modal (text + voice + avatar) interactions',
        ],
      },
    ],
    tech: ['React', 'Next.js', 'Node.js', 'OpenAI', 'D-ID', 'PostgreSQL', 'Redis', 'WebRTC'],
  },
];
