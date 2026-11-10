import {
  MonitorSmartphone,
  ServerCog,
  TabletSmartphone,
  Blocks,
  Webhook,
  Palette,
  BrainCircuit,
  CloudCog,
  LayoutDashboard,
  ShoppingCart,
  Gauge,
  Search,
  Globe,
  Smartphone,
  WifiOff,
  BellRing,
  Store,
  Users,
  CreditCard,
  ShieldCheck,
  BarChart3,
  Layers,
  Database,
  Lock,
  Zap,
  Boxes,
  Bot,
  MessageSquareText,
  FileSearch,
  Workflow,
  Sparkles,
  LineChart,
  Plug,
  RefreshCw,
  Truck,
  PenTool,
  MousePointerClick,
  Component,
  Accessibility,
  Server,
  GitBranch,
  Activity,
  DollarSign,
  type LucideIcon,
} from 'lucide-react';
import type { FAQItem } from '@/data/faqs';

export interface ServiceOffering {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceStep {
  title: string;
  description: string;
}

export interface Service {
  /** Short id: legacy anchor on /services (e.g. /services#web) and visual key. */
  id: string;
  /** URL slug for /services/:slug. */
  slug: string;
  title: string;
  short: string;
  icon: LucideIcon;
  accent: string;
  tech: string[];
  /** Detail page */
  heroTitle: string;
  heroHighlight: string;
  intro: string;
  offerings: ServiceOffering[];
  process: ServiceStep[];
  relatedProjects: string[];
  faqs: FAQItem[];
  metaDescription: string;
}

/** Back-compat alias used by older components. */
export type ServiceSummary = Service;

export const services: Service[] = [
  {
    id: 'web',
    slug: 'web-development',
    title: 'Web Development',
    short: 'Fast, scalable web apps and platforms built with React and Next.js.',
    icon: MonitorSmartphone,
    accent: '#3B82F6',
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    heroTitle: 'Web applications that are',
    heroHighlight: 'fast, secure and built to scale',
    intro:
      'From marketing websites to complex customer portals and marketplaces, we build web products with modern frameworks, clean architecture and performance baked in from day one.',
    offerings: [
      { icon: LayoutDashboard, title: 'Web apps & portals', description: 'Customer portals, dashboards and internal tools with secure auth and role-based access.' },
      { icon: Store, title: 'Marketplaces', description: 'Multi-vendor platforms with listings, bookings, payments and admin panels.' },
      { icon: ShoppingCart, title: 'Ecommerce', description: 'Headless storefronts and custom checkout flows that convert.' },
      { icon: Globe, title: 'Company websites', description: 'Fast, SEO-friendly marketing sites with a CMS your team can update.' },
      { icon: Gauge, title: 'Performance optimisation', description: 'Core Web Vitals, caching and bundle tuning for sub-second page loads.' },
      { icon: Search, title: 'SEO-ready builds', description: 'Server rendering, structured data and clean URLs so you rank from launch.' },
    ],
    process: [
      { title: 'Discovery', description: 'Goals, users and scope turned into a clear plan and estimate.' },
      { title: 'UX & UI design', description: 'Wireframes and clickable designs you approve before we build.' },
      { title: 'Development', description: 'Sprint-based builds with weekly demos on a staging link.' },
      { title: 'Launch & care', description: 'Deployment, monitoring and ongoing improvements.' },
    ],
    relatedProjects: ['kargo-domus', 'copy-smart', 'assistify'],
    faqs: [
      { q: 'Which framework will you use?', a: 'Usually React with Next.js for most web apps because of its performance, SEO and ecosystem. We recommend the stack that fits your product, team and budget.' },
      { q: 'Can you work on an existing web app?', a: 'Yes. We start with a short code audit, then improve, extend or gradually modernise what you already have.' },
      { q: 'Will my website be mobile-friendly?', a: 'Always. Every build is responsive and tested across modern browsers and devices.' },
    ],
    metaDescription: 'Custom web application development with React and Next.js: portals, marketplaces, ecommerce and fast, SEO-ready websites.',
  },
  {
    id: 'mobile',
    slug: 'mobile-app-development',
    title: 'Mobile Apps',
    short: 'iOS and Android apps, cross-platform or native, from MVP to scale.',
    icon: TabletSmartphone,
    accent: '#8B5CF6',
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase'],
    heroTitle: 'Mobile apps your users',
    heroHighlight: 'actually love to use',
    intro:
      'We design and build iOS and Android apps, cross-platform or native, with smooth performance, offline support and everything needed to publish on the App Store and Google Play.',
    offerings: [
      { icon: Smartphone, title: 'Cross-platform apps', description: 'One codebase for iOS and Android with React Native or Flutter.' },
      { icon: TabletSmartphone, title: 'Native iOS & Android', description: 'Swift and Kotlin builds when you need maximum performance or device access.' },
      { icon: Zap, title: 'MVPs', description: 'Launch a focused first version fast, then iterate on real user feedback.' },
      { icon: WifiOff, title: 'Offline-first', description: 'Local storage and sync so your app keeps working without a connection.' },
      { icon: BellRing, title: 'Push & real-time', description: 'Notifications, chat, live tracking and in-app updates.' },
      { icon: Store, title: 'Store launch', description: 'App Store and Google Play submission, review handling and release management.' },
    ],
    process: [
      { title: 'Product discovery', description: 'Define core features, user journeys and the MVP scope.' },
      { title: 'App design', description: 'Platform-native UI and interactive prototypes.' },
      { title: 'Build & test', description: 'Sprints with TestFlight / internal testing builds every week.' },
      { title: 'Release & grow', description: 'Store launch, analytics and continuous updates.' },
    ],
    relatedProjects: ['erebix', 'fixie', 'scrub-art'],
    faqs: [
      { q: 'Cross-platform or native — which should I choose?', a: 'For most products, cross-platform (React Native or Flutter) gets you to both stores faster and at lower cost. Native makes sense for heavy device features or demanding performance. We advise based on your use case.' },
      { q: 'Do you publish the app to the stores?', a: 'Yes. We handle App Store and Google Play setup, submission and review, under your developer accounts.' },
      { q: 'Can the app share a backend with my website?', a: 'Yes. We usually build one API that powers both your mobile app and web dashboard.' },
    ],
    metaDescription: 'iOS and Android app development: cross-platform React Native and Flutter, native Swift and Kotlin, MVPs and App Store launch.',
  },
  {
    id: 'saas',
    slug: 'saas-development',
    title: 'SaaS Development',
    short: 'Multi-tenant products with billing, roles and admin dashboards.',
    icon: Blocks,
    accent: '#F59E0B',
    tech: ['Next.js', 'Node.js', 'Stripe', 'PostgreSQL', 'Redis', 'AWS'],
    heroTitle: 'SaaS products built to',
    heroHighlight: 'launch fast and scale',
    intro:
      'We take SaaS ideas from MVP to a production-ready platform with multi-tenancy, subscriptions, roles and the admin tools you need to run the business.',
    offerings: [
      { icon: Layers, title: 'Multi-tenant architecture', description: 'Secure data isolation per customer, built to grow with you.' },
      { icon: CreditCard, title: 'Subscriptions & billing', description: 'Stripe plans, trials, invoices and usage-based pricing.' },
      { icon: Users, title: 'Roles & permissions', description: 'Teams, invites and fine-grained role-based access control.' },
      { icon: LayoutDashboard, title: 'Admin dashboards', description: 'Internal tools to manage customers, plans and support.' },
      { icon: BarChart3, title: 'Analytics & reporting', description: 'In-app dashboards and exports your customers will use daily.' },
      { icon: Zap, title: 'MVP to scale', description: 'Ship the core quickly, then harden performance as you grow.' },
    ],
    process: [
      { title: 'Validate & scope', description: 'Prioritise the features that prove your idea.' },
      { title: 'Design the product', description: 'Onboarding, core flows and billing UX.' },
      { title: 'Build the platform', description: 'Tenancy, billing, roles and the core product.' },
      { title: 'Launch & iterate', description: 'Go live, measure, and ship improvements.' },
    ],
    relatedProjects: ['tko', 'assistify', 'erebix'],
    faqs: [
      { q: 'How quickly can we launch an MVP?', a: 'It depends on scope, but we focus the first release on the features that prove your idea so you can start onboarding users as early as possible.' },
      { q: 'Which payment providers do you support?', a: 'Mostly Stripe, but we have also integrated PayPal, NMI and regional gateways.' },
      { q: 'Can the platform handle enterprise customers later?', a: 'Yes. We design tenancy, roles and audit logging so adding SSO and enterprise features later is straightforward.' },
    ],
    metaDescription: 'SaaS product development: multi-tenant architecture, Stripe subscriptions, roles and admin dashboards, from MVP to scale.',
  },
  {
    id: 'backend',
    slug: 'backend-api-development',
    title: 'Backend & APIs',
    short: 'Secure, high-uptime backends, REST and GraphQL APIs.',
    icon: ServerCog,
    accent: '#06B6D4',
    tech: ['Node.js', 'NestJS', 'Python', 'Laravel', 'GraphQL', 'Redis'],
    heroTitle: 'Backends and APIs that',
    heroHighlight: 'never let you down',
    intro:
      'The engine behind your product: secure APIs, clean data models and infrastructure that stays fast and reliable as your user base grows.',
    offerings: [
      { icon: Plug, title: 'REST & GraphQL APIs', description: 'Well-documented APIs for your web, mobile and partner apps.' },
      { icon: Database, title: 'Database design', description: 'Data models, migrations and query optimisation that scale.' },
      { icon: Lock, title: 'Auth & security', description: 'Login, SSO, permissions and best-practice security hardening.' },
      { icon: Boxes, title: 'Microservices', description: 'Modular and serverless architectures when your product needs them.' },
      { icon: Zap, title: 'Real-time systems', description: 'WebSockets, queues and background jobs for live features.' },
      { icon: Gauge, title: 'Performance tuning', description: 'Caching, profiling and load testing for high traffic.' },
    ],
    process: [
      { title: 'Architecture', description: 'Data model, services and API contracts agreed up front.' },
      { title: 'Build', description: 'Tested endpoints delivered sprint by sprint.' },
      { title: 'Harden', description: 'Security review, load testing and monitoring.' },
      { title: 'Operate', description: 'Deploy, observe and scale with confidence.' },
    ],
    relatedProjects: ['fixie', 'kargo-domus', 'tko'],
    faqs: [
      { q: 'Which backend languages do you use?', a: 'Mainly Node.js (Express/NestJS), Python and Laravel, with Java or Go when a project calls for it.' },
      { q: 'Do you document the APIs?', a: 'Yes. Every API ships with OpenAPI/Swagger or GraphQL schema documentation.' },
      { q: 'Can you take over an existing backend?', a: 'Yes. We audit the code and infrastructure first, then stabilise and extend it.' },
    ],
    metaDescription: 'Backend and API development: REST and GraphQL APIs, database design, authentication, microservices and real-time systems.',
  },
  {
    id: 'ai',
    slug: 'ai-automation',
    title: 'AI & Automation',
    short: 'AI assistants, LLM features and workflow automation that save time.',
    icon: BrainCircuit,
    accent: '#6366F1',
    tech: ['OpenAI', 'LangChain', 'Python', 'FastAPI', 'Pinecone', 'n8n'],
    heroTitle: 'Put AI to work',
    heroHighlight: 'inside your product',
    intro:
      'We add practical AI to real products: chat assistants, smart search, document processing and automations that cut manual work, built responsibly and measured by results.',
    offerings: [
      { icon: Bot, title: 'AI assistants & chatbots', description: 'Product and support assistants trained on your own data.' },
      { icon: MessageSquareText, title: 'LLM features', description: 'Summaries, generation and smart replies inside your app.' },
      { icon: FileSearch, title: 'Document AI', description: 'Extract, classify and search data from PDFs and forms.' },
      { icon: Search, title: 'Semantic search & RAG', description: 'Search that understands meaning, grounded in your content.' },
      { icon: Workflow, title: 'Workflow automation', description: 'Connect tools and automate repetitive tasks end to end.' },
      { icon: LineChart, title: 'Predictions & insights', description: 'Recommendations and forecasting from your business data.' },
    ],
    process: [
      { title: 'Find the use case', description: 'Pick the problem where AI delivers clear value.' },
      { title: 'Prototype', description: 'A quick proof of concept on your real data.' },
      { title: 'Productionise', description: 'Guardrails, evaluation and integration into your app.' },
      { title: 'Measure & improve', description: 'Track quality and cost, then iterate.' },
    ],
    relatedProjects: ['ai-chatbot', 'erebix', 'assistify'],
    faqs: [
      { q: 'Is my data safe with AI features?', a: 'Yes. We use providers and settings that do not train on your data, and keep sensitive information protected with access controls.' },
      { q: 'Can you add AI to my existing product?', a: 'Yes. Most of our AI work plugs into existing apps through an API, without a rebuild.' },
      { q: 'How do you keep AI answers accurate?', a: 'We ground responses in your own content (RAG), add guardrails and evaluate output quality before and after launch.' },
    ],
    metaDescription: 'AI development and automation: AI chatbots, LLM features, document AI, semantic search and workflow automation for your product.',
  },
  {
    id: 'integrations',
    slug: 'api-integrations',
    title: 'Integrations',
    short: 'Payments, CRMs, ERPs and third-party APIs, connected cleanly.',
    icon: Webhook,
    accent: '#10B981',
    tech: ['Stripe', 'HubSpot', 'Salesforce', 'Webhooks', 'OAuth', 'Zapier'],
    heroTitle: 'Make your tools',
    heroHighlight: 'work together',
    intro:
      'We connect your product with the services your business runs on: payments, CRMs, ERPs, shipping, labs, maps and more, reliably and securely.',
    offerings: [
      { icon: CreditCard, title: 'Payment gateways', description: 'Stripe, PayPal, NMI and local gateways, including payouts.' },
      { icon: Users, title: 'CRM & marketing', description: 'HubSpot, Salesforce and email platforms kept in sync.' },
      { icon: Boxes, title: 'ERP & inventory', description: 'Orders, stock and invoices flowing between systems.' },
      { icon: Truck, title: 'Shipping & logistics', description: 'Rates, labels and tracking from carrier APIs.' },
      { icon: RefreshCw, title: 'Data sync & webhooks', description: 'Event-driven pipelines with retries and monitoring.' },
      { icon: ShieldCheck, title: 'Secure auth', description: 'OAuth, API keys and SSO handled the right way.' },
    ],
    process: [
      { title: 'Map the systems', description: 'Which data moves where, and when.' },
      { title: 'Design the flow', description: 'Error handling, retries and edge cases planned up front.' },
      { title: 'Build & test', description: 'Sandboxes first, then production with monitoring.' },
      { title: 'Monitor', description: 'Alerts and logs so nothing silently breaks.' },
    ],
    relatedProjects: ['tko', 'copy-smart', 'scrub-art'],
    faqs: [
      { q: 'Can you integrate an API that has poor documentation?', a: 'Yes. We have worked with plenty of legacy and under-documented APIs, testing carefully in sandboxes first.' },
      { q: 'What happens if a third-party service goes down?', a: 'We build in retries, queues and alerts so data is not lost and your team knows immediately.' },
    ],
    metaDescription: 'API and third-party integrations: payment gateways, CRM, ERP, shipping, webhooks and secure data sync.',
  },
  {
    id: 'ui',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    short: 'Product design and pixel-perfect interfaces users enjoy.',
    icon: Palette,
    accent: '#EC4899',
    tech: ['Figma', 'Design Systems', 'Prototyping', 'Tailwind CSS', 'Framer Motion', 'Storybook'],
    heroTitle: 'Design that makes your product',
    heroHighlight: 'easy and enjoyable',
    intro:
      'Research-led product design: user flows, wireframes, polished interfaces and design systems, handed off to developers (or built by us) pixel-perfect.',
    offerings: [
      { icon: MousePointerClick, title: 'UX research & flows', description: 'Understand users and map journeys before designing screens.' },
      { icon: PenTool, title: 'Wireframes & prototypes', description: 'Clickable prototypes to test ideas early and cheaply.' },
      { icon: Palette, title: 'UI design', description: 'Modern, on-brand interfaces for web and mobile.' },
      { icon: Component, title: 'Design systems', description: 'Reusable components that keep your product consistent.' },
      { icon: Sparkles, title: 'Motion & micro-interactions', description: 'Subtle animation that makes products feel alive.' },
      { icon: Accessibility, title: 'Accessibility', description: 'WCAG-friendly designs that work for everyone.' },
    ],
    process: [
      { title: 'Research', description: 'Users, competitors and goals.' },
      { title: 'Wireframe', description: 'Structure and flows, fast.' },
      { title: 'Visual design', description: 'High-fidelity UI and prototype.' },
      { title: 'Handoff', description: 'Specs, assets and design system for developers.' },
    ],
    relatedProjects: ['fixie', 'erebix', 'copy-smart'],
    faqs: [
      { q: 'Can you design only, without development?', a: 'Yes. We can deliver Figma designs and a design system for your own team to build.' },
      { q: 'Can you redesign an existing product?', a: 'Yes. We start with a UX review to find what to keep and what to improve.' },
    ],
    metaDescription: 'UI/UX design services: user research, wireframes, prototypes, UI design and design systems for web and mobile products.',
  },
  {
    id: 'cloud',
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    short: 'AWS and GCP infrastructure, CI/CD and monitoring that just works.',
    icon: CloudCog,
    accent: '#0EA5E9',
    tech: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    heroTitle: 'Cloud infrastructure that',
    heroHighlight: 'scales without surprises',
    intro:
      'We set up and run the infrastructure behind your product: secure cloud environments, automated deployments and monitoring, with costs kept under control.',
    offerings: [
      { icon: Server, title: 'Cloud setup', description: 'AWS and Google Cloud environments designed for security and scale.' },
      { icon: GitBranch, title: 'CI/CD pipelines', description: 'Automated testing and one-click deployments.' },
      { icon: Boxes, title: 'Containers', description: 'Docker and Kubernetes for consistent, portable deployments.' },
      { icon: Activity, title: 'Monitoring & alerts', description: 'Logs, metrics and uptime alerts before users notice issues.' },
      { icon: ShieldCheck, title: 'Security & backups', description: 'Hardening, secrets management and disaster recovery.' },
      { icon: DollarSign, title: 'Cost optimisation', description: 'Right-sized resources so you only pay for what you use.' },
    ],
    process: [
      { title: 'Assess', description: 'Review current setup, risks and costs.' },
      { title: 'Design', description: 'Target architecture as code.' },
      { title: 'Migrate & automate', description: 'Move workloads and set up pipelines.' },
      { title: 'Run', description: 'Monitor, patch and optimise continuously.' },
    ],
    relatedProjects: ['tko', 'copy-smart', 'fixie'],
    faqs: [
      { q: 'Can you migrate us to the cloud without downtime?', a: 'In most cases, yes. We plan migrations in stages with rollbacks ready, and schedule cut-overs for low-traffic windows.' },
      { q: 'Which cloud provider do you recommend?', a: 'AWS for most products, Google Cloud where its data and AI tools fit better. We are happy to work with your existing provider.' },
    ],
    metaDescription: 'Cloud and DevOps services: AWS and Google Cloud setup, CI/CD, Docker and Kubernetes, monitoring and cost optimisation.',
  },
];

export const serviceHref = (idOrSlug: string) => {
  const s = services.find((x) => x.id === idOrSlug || x.slug === idOrSlug);
  return s ? `/services/${s.slug}` : '/services';
};

export const getServiceBySlug = (slug: string | undefined) => services.find((s) => s.slug === slug);
